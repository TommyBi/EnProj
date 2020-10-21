var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    /**
     * VideoControlComponent
     * 可以操作视频开始暂停的效果
     */
    var VideoControlComponent = (function (_super) {
        __extends(VideoControlComponent, _super);
        function VideoControlComponent() {
            var _this = _super.call(this) || this;
            _this.mLength = 0; // 当前视频长度
            _this._mIsPlaying = false; // 是否正在播放
            _this.skinName = "VideoControlComponentSkin";
            return _this;
        }
        Object.defineProperty(VideoControlComponent.prototype, "mIsPlaying", {
            get: function () { return this._mIsPlaying; },
            set: function (b) {
                this._mIsPlaying = b;
                this.kImgPlay.source = b ? "img_pause_png" : "img_play_png";
            },
            enumerable: true,
            configurable: true
        });
        VideoControlComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.register();
        };
        VideoControlComponent.prototype.register = function () {
            this.mVideo = new egret.Video();
            this.mVideo.x = 0; //设置视频坐标x
            this.mVideo.y = 0; //设置视频坐标y
            this.mVideo.width = 1440; //设置视频宽
            this.mVideo.height = 1080; //设置视频高
            this.mVideo.fullscreen = false; //设置是否全屏（暂不支持移动设备）
            this.kGrpVideo.addChild(this.mVideo);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventFinishVideoProgress, this.adjustPlay, this);
            this.kImgPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
            // this.kImgPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
            this.kImgRePlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
            // this.kImgPlay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverPlay, this);
            // this.kImgPlay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutplay, this);
            // this.kImgPause.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverPause, this);
            // this.kImgPause.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutPause, this);
            // this.kImgRePlay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverReplay, this);
            // this.kImgRePlay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutReplay, this);
            // mouse.enable(this.stage);
        };
        VideoControlComponent.prototype.setSkinType = function (type) {
            this.kComPro.setSkinType(type);
        };
        /** 播放的视频索引 */
        VideoControlComponent.prototype.play = function (name) {
            this.mVideo.load("resource/assets/video/" + name + ".mp4");
            this.mVideo.once(egret.Event.COMPLETE, this.onLoad, this);
            this.mVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        };
        /** 加载成功 */
        VideoControlComponent.prototype.onLoad = function () {
            //获取视频长度
            console.log("获取视频长度: " + this.mVideo.length);
            this.mLength = this.mVideo.length;
            //播放视频
            this.mIsPlaying = true;
            this.mVideo.play(0, false);
            this.kComPro.reset(this.mLength);
        };
        /** 加载失败 */
        VideoControlComponent.prototype.onLoadErr = function (err) {
            console.log("video load error happened", err);
        };
        /** 调整性播放进度 */
        VideoControlComponent.prototype.adjustPlay = function (e) {
            if (this.mLength == 0) {
                console.log("视频尚未加载完成");
            }
            else {
                console.log("this.mvideo:", this.mVideo);
                this.mVideo.play(e.data * this.mVideo.length);
                this.kComPro.updateProPos(this.mVideo.length - e.data * this.mVideo.length);
            }
        };
        /** ----- 右下角三个控制按钮 ----- */
        /** 继续播放 */
        VideoControlComponent.prototype.onStart = function () {
            if (!this.mIsPlaying) {
                if (this.mVideo) {
                    this.mIsPlaying = true;
                    this.mVideo.play(this.kComPro.schedule * this.mVideo.length);
                    this.kComPro.updateProPos(this.mVideo.length - this.kComPro.schedule * this.mVideo.length);
                }
                else {
                    this.mIsPlaying = false;
                }
            }
            else {
                this.onPause();
            }
        };
        /** 暂停 */
        VideoControlComponent.prototype.onPause = function () {
            this.mIsPlaying = false;
            this.mVideo.pause();
            this.kComPro.pause();
        };
        /** 重新开始 */
        VideoControlComponent.prototype.onRestart = function () {
            this.mIsPlaying = true;
            this.mVideo.play(0, false);
            this.kComPro.reset(this.mVideo.length);
        };
        return VideoControlComponent;
    }(eui.Component));
    game.VideoControlComponent = VideoControlComponent;
    __reflect(VideoControlComponent.prototype, "game.VideoControlComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=VideoControlComponent.js.map