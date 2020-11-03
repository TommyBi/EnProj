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
     * CaptionPlayerCom
     * 卡拉ok模式播放器
     */
    var CaptionPlayerCom = (function (_super) {
        __extends(CaptionPlayerCom, _super);
        function CaptionPlayerCom() {
            var _this = _super.call(this) || this;
            _this.mLength = 0; // 当前视频长度
            _this._mIsPlayCaption = false; // 是否开启麦克风
            _this._mIsPlaying = false; // 是否正在播放
            _this.skinName = "CaptionPlayerComSkin";
            return _this;
        }
        Object.defineProperty(CaptionPlayerCom.prototype, "mIsPlaying", {
            get: function () { return this._mIsPlaying; },
            set: function (b) {
                this._mIsPlaying = b;
                this.kImgPlay.source = b ? "img_pause_png" : "img_play_png";
            },
            enumerable: true,
            configurable: true
        });
        CaptionPlayerCom.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.register();
        };
        CaptionPlayerCom.prototype.register = function () {
            this.mVideo = new egret.Video();
            this.mVideo.x = 0; //设置视频坐标x
            this.mVideo.y = 0; //设置视频坐标y
            this.mVideo.width = 1440; //设置视频宽
            this.mVideo.height = 1080; //设置视频高
            this.mVideo.fullscreen = false; //设置是否全屏（暂不支持移动设备）
            this.mVideo.volume = 0.1;
            this.kGrpVideo.addChild(this.mVideo);
            this.kGrpControl.visible = false;
            this.kImgPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
            this.kImgRePlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showControl, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideControl, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventFinishVideoProgress, this.adjustPlay, this);
        };
        CaptionPlayerCom.prototype.setSkinType = function (type) {
            this.kComPro.setSkinType(type);
        };
        /** 播放的视频索引 */
        CaptionPlayerCom.prototype.load = function (name) {
            this.mVideo.load("resource/assets/video/" + name + ".mp4");
            this.mVideo.once(egret.Event.COMPLETE, this.onLoad, this);
            this.mVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        };
        /** 加载成功 */
        CaptionPlayerCom.prototype.onLoad = function () {
            var _this = this;
            this.mLength = this.mVideo.length;
            this.kGrpControl.visible = true;
            this.mIsPlaying = false;
            this.mVideo.play(0);
            egret.Tween.get(this).wait(1).call(function () {
                _this.mVideo.pause();
            });
        };
        /** 加载失败 */
        CaptionPlayerCom.prototype.onLoadErr = function (err) {
            console.log("video load error happened", err);
        };
        /** 调整性播放进度 */
        CaptionPlayerCom.prototype.adjustPlay = function (e) {
            egret.log(e);
            if (this.mLength == 0) {
                console.log("视频尚未加载完成");
            }
            else {
                this.mVideo.play(e.data * this.mVideo.length);
                this.kComPro.updateProPos(this.mVideo.length - e.data * this.mVideo.length);
            }
        };
        /** ----- 右下角三个控制按钮 ----- */
        /** 继续播放 */
        CaptionPlayerCom.prototype.onStart = function () {
            if (!this.mIsPlaying) {
                if (this.mVideo) {
                    this.mIsPlaying = true;
                    var startTime = this.kComPro.schedule * this.mVideo.length;
                    this.mVideo.play(startTime);
                    this.kComPro.updateProPos(this.mVideo.length - startTime);
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
        CaptionPlayerCom.prototype.onPause = function () {
            this.mVideo.pause();
            this.kComPro.pause();
            this.mIsPlaying = false;
        };
        /** 重新开始 */
        CaptionPlayerCom.prototype.onRestart = function () {
            this.mVideo.play(0, false);
            this.kComPro.reset(this.mVideo.length);
        };
        CaptionPlayerCom.prototype.showControl = function () {
            egret.Tween.removeTweens(this.kGrpControl);
            this.kGrpControl.alpha = 0.4;
            egret.Tween.get(this.kGrpControl).to({ alpha: 1 }, 1000, egret.Ease.cubicInOut);
            egret.Tween.removeTweens(this.kComPro);
            this.kComPro.alpha = 0.4;
            egret.Tween.get(this.kComPro).to({ alpha: 1 }, 1000, egret.Ease.cubicInOut);
        };
        CaptionPlayerCom.prototype.hideControl = function () {
            egret.Tween.removeTweens(this.kGrpControl);
            this.kGrpControl.alpha = 1;
            egret.Tween.get(this.kGrpControl).to({ alpha: 0.4 }, 1000, egret.Ease.cubicInOut);
            egret.Tween.removeTweens(this.kComPro);
            this.kComPro.alpha = 1;
            egret.Tween.get(this.kComPro).to({ alpha: 0.4 }, 1000, egret.Ease.cubicInOut);
        };
        return CaptionPlayerCom;
    }(eui.Component));
    game.CaptionPlayerCom = CaptionPlayerCom;
    __reflect(CaptionPlayerCom.prototype, "game.CaptionPlayerCom", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=CaptionPlayerCom.js.map