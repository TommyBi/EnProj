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
     * VideoComponent
     */
    var VideoComponent = (function (_super) {
        __extends(VideoComponent, _super);
        function VideoComponent() {
            var _this = _super.call(this) || this;
            _this.mLength = 0; // 当前视频长度
            _this.skinName = "VideoComponentSkin";
            return _this;
        }
        VideoComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.register();
        };
        VideoComponent.prototype.register = function () {
            this.mVideo = new egret.Video();
            this.mVideo.x = 0; //设置视频坐标x
            this.mVideo.y = 0; //设置视频坐标y
            this.mVideo.width = 720; //设置视频宽
            this.mVideo.height = 540; //设置视频高
            this.mVideo.fullscreen = false; //设置是否全屏（暂不支持移动设备）
            this.kGrpVideo.addChild(this.mVideo);
            this.kImgMaskPrePlay.visible = true;
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventFinishVideoProgress, this.adjustPlay, this);
        };
        /** 设置滑动条的皮肤 */
        VideoComponent.prototype.setSkinType = function (skinType) {
            this.kComPro.setSkinType(skinType);
        };
        /** 播放的视频索引 */
        VideoComponent.prototype.play = function (idx) {
            this.kRect.alpha = 1;
            this.kImgMaskPrePlay.visible = false;
            egret.Tween.removeTweens(this.kRect);
            egret.log("load idx: ", idx);
            var url = window.__math2_res_config__ ? window.__math2_res_config__ + "/assets/video/" + idx + ".mp4" : "resource/assets/video/" + idx + ".mp4";
            this.mVideo.load(url);
            this.mVideo.once(egret.Event.COMPLETE, this.onLoad, this);
            this.mVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        };
        /** 加载成功 */
        VideoComponent.prototype.onLoad = function () {
            this.mVideo.play(0, false);
            this.kRect.alpha = 1;
            egret.Tween.get(this.kRect).to({ alpha: 0 }, 500, egret.Ease.cubicOut);
            //获取视频长度
            console.log("获取视频长度: " + this.mVideo.length);
            this.mLength = this.mVideo.length;
            this.kComPro.reset(this.mLength);
        };
        /** 加载失败 */
        VideoComponent.prototype.onLoadErr = function (err) {
            console.log("video load error happened", err);
        };
        /** 调整性播放进度 */
        VideoComponent.prototype.adjustPlay = function (e) {
            egret.log(e);
            if (this.mLength == 0) {
                console.log("视频尚未加载完成");
            }
            else {
                console.log("this.mvideo:", this.mVideo);
                this.mVideo.play(e.data * this.mVideo.length);
                this.kComPro.updateProPos(this.mVideo.length - e.data * this.mVideo.length);
            }
        };
        return VideoComponent;
    }(eui.Component));
    game.VideoComponent = VideoComponent;
    __reflect(VideoComponent.prototype, "game.VideoComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=VideoComponent.js.map