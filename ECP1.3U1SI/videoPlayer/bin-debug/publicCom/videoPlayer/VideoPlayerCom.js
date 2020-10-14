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
     * CatpionPlayerCom
     * 卡拉ok模式播放器
     */
    var CatpionPlayerCom = (function (_super) {
        __extends(CatpionPlayerCom, _super);
        // private get canPlay(): boolean {
        //     return this.mVideo && this.mVideo.length > 0 && this.mCaptionsVideo && this.mCaptionsVideo.length > 0;
        // }
        function CatpionPlayerCom() {
            var _this = _super.call(this) || this;
            // private mCaptionsVideo: egret.Video;
            _this.mLength = 0; // 当前视频长度
            _this.skinName = "CaptionPlayerComSkin";
            return _this;
        }
        CatpionPlayerCom.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.register();
        };
        CatpionPlayerCom.prototype.register = function () {
            this.mVideo = new egret.Video();
            this.mVideo.x = 0; //设置视频坐标x
            this.mVideo.y = 0; //设置视频坐标y
            this.mVideo.width = 1440; //设置视频宽
            this.mVideo.height = 1080; //设置视频高
            this.mVideo.fullscreen = false; //设置是否全屏（暂不支持移动设备）
            this.mVideo.volume = 0.1;
            this.kGrpVideo.addChild(this.mVideo);
            // this.mCaptionsVideo = new egret.Video();
            // this.mCaptionsVideo.x = 0;                       //设置视频坐标x
            // this.mCaptionsVideo.y = 500;                       //设置视频坐标y
            // this.mCaptionsVideo.width = 1440;                //设置视频宽
            // this.mCaptionsVideo.height = 1080;               //设置视频高
            // this.mCaptionsVideo.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
            // this.kGrpCaptionVideo.addChild(this.mCaptionsVideo);
            this.kGrpControl.visible = false;
            this.kImgPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
            this.kImgPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
            this.kImgRePlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
            this.kImgPlay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverPlay, this);
            this.kImgPlay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutplay, this);
            this.kImgPause.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverPause, this);
            this.kImgPause.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutPause, this);
            this.kImgRePlay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverReplay, this);
            this.kImgRePlay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutReplay, this);
            mouse.enable(this.stage);
            this.kImgShowCaption.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeCaptionShowState, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventFinishVideoProgress, this.adjustPlay, this);
        };
        /** 播放的视频索引 */
        CatpionPlayerCom.prototype.load = function (name) {
            this.mVideo.load("resource/assets/video/" + name + ".mp4");
            // this.mCaptionsVideo.load(`resource/assets/video/${name}_caption.mp4`);
            this.mVideo.once(egret.Event.COMPLETE, this.onLoad, this);
            this.mVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
            // this.mCaptionsVideo.once(egret.Event.COMPLETE, this.onLoadCaption, this);
            // this.mCaptionsVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadCaptionErr, this);
        };
        /** 加载成功 */
        CatpionPlayerCom.prototype.onLoad = function () {
            console.log("获取视频长度: " + this.mVideo.length);
            this.mLength = this.mVideo.length;
            // this.kGrpControl.visible = this.canPlay;
            this.kGrpControl.visible = true;
        };
        /** 加载失败 */
        CatpionPlayerCom.prototype.onLoadErr = function (err) {
            console.log("video load error happened", err);
        };
        CatpionPlayerCom.prototype.onLoadCaption = function () {
            // this.kGrpControl.visible = this.canPlay;
            this.kGrpControl.visible = true;
        };
        CatpionPlayerCom.prototype.onLoadCaptionErr = function (err) {
            console.log("caption video load error happened", err);
        };
        /** 调整性播放进度 */
        CatpionPlayerCom.prototype.adjustPlay = function (e) {
            egret.log(e);
            if (this.mLength == 0) {
                console.log("视频尚未加载完成");
            }
            else {
                this.mVideo.play(e.data * this.mVideo.length);
                // this.mCaptionsVideo.play(e.data * this.mVideo.length);
                this.kComPro.updateProPos(this.mVideo.length - e.data * this.mVideo.length);
            }
        };
        /** ----- 右下角三个控制按钮 ----- */
        /** 继续播放 */
        CatpionPlayerCom.prototype.onStart = function () {
            if (this.mVideo) {
                this.mVideo.play(this.kComPro.schedule * this.mVideo.length);
                // this.mCaptionsVideo.play(this.kComPro.schedule * this.mVideo.length);
                this.kComPro.updateProPos(this.mVideo.length - this.kComPro.schedule * this.mVideo.length);
                XDFSoundManager.play("sound_bg_mp3", this.kComPro.schedule * this.mVideo.length, 1, 1);
            }
        };
        /** 暂停 */
        CatpionPlayerCom.prototype.onPause = function () {
            this.mVideo.pause();
            // this.mCaptionsVideo.pause();
            this.kComPro.pause();
            XDFSoundManager.stop("sound_bg_mp3");
        };
        /** 重新开始 */
        CatpionPlayerCom.prototype.onRestart = function () {
            this.mVideo.play(0, false);
            // this.mCaptionsVideo.play(0, false);
            this.kComPro.reset(this.mVideo.length);
            XDFSoundManager.play("sound_bg_mp3", 0, 1, 1);
        };
        CatpionPlayerCom.prototype.onMoveOverPlay = function () { this.kImgPlay.source = "img_btn_play_p_png"; };
        CatpionPlayerCom.prototype.onMoveOutplay = function () { this.kImgPlay.source = "img_btn_play_n_png"; };
        CatpionPlayerCom.prototype.onMoveOverPause = function () { this.kImgPause.source = "img_btn_pause_p_png"; };
        CatpionPlayerCom.prototype.onMoveOutPause = function () { this.kImgPause.source = "img_btn_pause_n_png"; };
        CatpionPlayerCom.prototype.onMoveOverReplay = function () { this.kImgRePlay.source = "img_btn_rePlay_p_png"; };
        CatpionPlayerCom.prototype.onMoveOutReplay = function () { this.kImgRePlay.source = "img_btn_rePlay_n_png"; };
        /** 切换显示字幕视频 */
        CatpionPlayerCom.prototype.onChangeCaptionShowState = function () {
            this.kGrpCaptionVideo.visible = !this.kGrpCaptionVideo.visible;
        };
        return CatpionPlayerCom;
    }(eui.Component));
    game.CatpionPlayerCom = CatpionPlayerCom;
    __reflect(CatpionPlayerCom.prototype, "game.CatpionPlayerCom", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=VideoPlayerCom.js.map