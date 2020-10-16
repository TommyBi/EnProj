namespace game {
    /**
     * CaptionPlayerCom
     * 卡拉ok模式播放器
     */
    export class CaptionPlayerCom extends eui.Component implements eui.UIComponent {
        public kGrpVideo: eui.Group;
        public kComPro: game.VideoProBarComponent;
        public kGrpControl: eui.Group;
        public kImgCaption: eui.Image;
        public kImgPlay: eui.Image;
        public kImgRePlay: eui.Image;

        private mVideo: egret.Video;
        private mLength: number = 0;// 当前视频长度
        private _mIsPlayCaption: boolean = false;// 是否开启麦克风
        private get mIsPlayCaption(): boolean { return this._mIsPlayCaption; }
        private set mIsPlayCaption(b: boolean) {
            this._mIsPlayCaption = b;
            this.kImgCaption.source = b ? "img_micro_enable_png" : "img_micro_forbid_png";
        }

        private _mIsPlaying: boolean = false;// 是否正在播放
        private get mIsPlaying(): boolean { return this._mIsPlaying; }
        private set mIsPlaying(b: boolean) {
            this._mIsPlaying = b;
            this.kImgPlay.source = b ? "img_pause_png" : "img_play_png";
        }

        public constructor() {
            super();
            this.skinName = "CaptionPlayerComSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.register();
        }

        private register(): void {
            this.mVideo = new egret.Video();
            this.mVideo.x = 0;                       //设置视频坐标x
            this.mVideo.y = 0;                       //设置视频坐标y
            this.mVideo.width = 1920;                 //设置视频宽
            this.mVideo.height = 1080;                //设置视频高
            this.mVideo.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
            this.mVideo.volume = 0.1;
            this.kGrpVideo.addChild(this.mVideo);

            this.kGrpControl.visible = false;

            this.kImgPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
            this.kImgRePlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);

            this.kImgCaption.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeCaptionShowState, this);

            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showControl, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideControl, this);

            XDFFrame.EventCenter.addEventListenr(EventConst.eventFinishVideoProgress, this.adjustPlay, this);
        }

        /** 播放的视频索引 */
        public load(name: string): void {
            this.mVideo.load(`resource/assets/video/${name}.mp4`);
            this.mVideo.once(egret.Event.COMPLETE, this.onLoad, this);
            this.mVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        }

        /** 加载成功 */
        private onLoad(): void {
            this.mLength = this.mVideo.length;
            this.kGrpControl.visible = true;
            this.mIsPlayCaption = false;
            this.mIsPlaying = false;
            this.mVideo.play(1);
            egret.Tween.get(this).wait(200).call(() => {
                this.mVideo.pause();
            })
        }

        /** 加载失败 */
        private onLoadErr(err: any): void {
            console.log("video load error happened", err);
        }

        /** 调整性播放进度 */
        private adjustPlay(e: any): void {
            egret.log(e);
            if (this.mLength == 0) {
                console.log("视频尚未加载完成");
            } else {
                this.mVideo.play(e.data * this.mVideo.length);
                if (this.mIsPlayCaption) XDFSoundManager.play("sound_bg_mp3", e.data * this.mVideo.length, 1, 1);
                this.kComPro.updateProPos(this.mVideo.length - e.data * this.mVideo.length);
            }
        }

        /** ----- 右下角三个控制按钮 ----- */
        /** 继续播放 */
        private onStart(): void {
            if (!this.mIsPlaying) {
                if (this.mVideo) {
                    this.mIsPlaying = true;
                    this.mVideo.play(this.kComPro.schedule * this.mVideo.length);
                    this.kComPro.updateProPos(this.mVideo.length - this.kComPro.schedule * this.mVideo.length);
                    if (this.mIsPlayCaption) XDFSoundManager.play("sound_bg_mp3", this.kComPro.schedule * this.mVideo.length, 1, 1);
                } else {
                    this.mIsPlaying = false;
                }
            } else {
                this.onPause();
            }
        }

        /** 暂停 */
        private onPause(): void {
            this.mVideo.pause();
            this.kComPro.pause();
            this.mIsPlaying = false;
            XDFSoundManager.stop("sound_bg_mp3");
        }

        /** 重新开始 */
        private onRestart(): void {
            this.mVideo.play(0, false);
            this.kComPro.reset(this.mVideo.length);
            if (this.mIsPlayCaption) XDFSoundManager.play("sound_bg_mp3", 0, 1, 1);
        }

        /** 切换显示字幕视频 */
        private onChangeCaptionShowState(): void {
            if (this.mVideo.length = 0) return;
            if (!this.mIsPlayCaption) {
                this.mIsPlayCaption = true;
                XDFSoundManager.play("sound_bg_mp3", this.kComPro.schedule * this.mVideo.length, 1, 1);
            } else {
                this.mIsPlayCaption = false;
                XDFSoundManager.stop("sound_bg_mp3");
            }
        }

        private showControl(): void {
            egret.Tween.removeTweens(this.kGrpControl);
            this.kGrpControl.alpha = 0.4;
            egret.Tween.get(this.kGrpControl).to({ alpha: 1 }, 1000, egret.Ease.cubicInOut);
            egret.Tween.removeTweens(this.kComPro);
            this.kComPro.alpha = 0.4;
            egret.Tween.get(this.kComPro).to({ alpha: 1 }, 1000, egret.Ease.cubicInOut);
        }

        private hideControl(): void {
            egret.Tween.removeTweens(this.kGrpControl);
            this.kGrpControl.alpha = 1;
            egret.Tween.get(this.kGrpControl).to({ alpha: 0.4 }, 1000, egret.Ease.cubicInOut);
            egret.Tween.removeTweens(this.kComPro);
            this.kComPro.alpha = 1;
            egret.Tween.get(this.kComPro).to({ alpha: 0.4 }, 1000, egret.Ease.cubicInOut);
        }
    }
}
