namespace game {
    /**
     * CaptionPlayerCom
     * 卡拉ok模式播放器
     */
    export class CaptionPlayerCom extends eui.Component implements eui.UIComponent {
        public kGrpVideo: eui.Group;
        public kComPro: game.VideoProBarComponent;
        public kGrpControl: eui.Group;
        public kImgShowCaption: eui.Image;
        public kImgRePlay: eui.Image;
        public kImgPause: eui.Image;
        public kImgPlay: eui.Image;

        private mVideo: egret.Video;
        // private mCaptionsVideo: egret.Video;
        private mLength: number = 0;// 当前视频长度
        private mIsPlayCaption: boolean = false;// 是否正在播放字幕

        // private get canPlay(): boolean {
        //     return this.mVideo && this.mVideo.length > 0 && this.mCaptionsVideo && this.mCaptionsVideo.length > 0;
        // }

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
            // this.kImgPlay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverPlay, this);
            // this.kImgPlay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutplay, this);
            // this.kImgPause.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverPause, this);
            // this.kImgPause.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutPause, this);
            // this.kImgRePlay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverReplay, this);
            // this.kImgRePlay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutReplay, this);
            // mouse.enable(this.stage);

            this.kImgShowCaption.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeCaptionShowState, this);

            XDFFrame.EventCenter.addEventListenr(EventConst.eventFinishVideoProgress, this.adjustPlay, this);
        }

        /** 播放的视频索引 */
        public load(name: string): void {
            this.mVideo.load(`resource/assets/video/${name}.mp4`);
            // this.mCaptionsVideo.load(`resource/assets/video/${name}_caption.mp4`);
            this.mVideo.once(egret.Event.COMPLETE, this.onLoad, this);
            this.mVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
            // this.mCaptionsVideo.once(egret.Event.COMPLETE, this.onLoadCaption, this);
            // this.mCaptionsVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadCaptionErr, this);
        }

        /** 加载成功 */
        private onLoad(): void {
            console.log("获取视频长度: " + this.mVideo.length);
            this.mLength = this.mVideo.length;
            // this.kGrpControl.visible = this.canPlay;
            this.kGrpControl.visible = true;
        }

        /** 加载失败 */
        private onLoadErr(err: any): void {
            console.log("video load error happened", err);
        }

        private onLoadCaption(): void {
            // this.kGrpControl.visible = this.canPlay;
            this.kGrpControl.visible = true;
        }

        private onLoadCaptionErr(err: any): void {
            console.log("caption video load error happened", err);
        }

        /** 调整性播放进度 */
        private adjustPlay(e: any): void {
            egret.log(e);
            if (this.mLength == 0) {
                console.log("视频尚未加载完成");
            } else {
                this.mVideo.play(e.data * this.mVideo.length);
                if (this.mIsPlayCaption) XDFSoundManager.play("sound_bg_mp3", e.data * this.mVideo.length, 1, 1);
                // this.mCaptionsVideo.play(e.data * this.mVideo.length);
                this.kComPro.updateProPos(this.mVideo.length - e.data * this.mVideo.length);
            }
        }

        /** ----- 右下角三个控制按钮 ----- */
        /** 继续播放 */
        private onStart(): void {
            if (this.mVideo) {
                this.mVideo.play(this.kComPro.schedule * this.mVideo.length);
                // this.mCaptionsVideo.play(this.kComPro.schedule * this.mVideo.length);
                this.kComPro.updateProPos(this.mVideo.length - this.kComPro.schedule * this.mVideo.length);
                if (this.mIsPlayCaption) XDFSoundManager.play("sound_bg_mp3", this.kComPro.schedule * this.mVideo.length, 1, 1);
            }
        }

        /** 暂停 */
        private onPause(): void {
            this.mVideo.pause();
            // this.mCaptionsVideo.pause();
            this.kComPro.pause();
            XDFSoundManager.stop("sound_bg_mp3");
        }

        /** 重新开始 */
        private onRestart(): void {
            this.mVideo.play(0, false);
            // this.mCaptionsVideo.play(0, false);
            this.kComPro.reset(this.mVideo.length);
            if (this.mIsPlayCaption) XDFSoundManager.play("sound_bg_mp3", 0, 1, 1);
        }

        // private onMoveOverPlay(): void { this.kImgPlay.source = "img_btn_play_p_png"; }
        // private onMoveOutplay(): void { this.kImgPlay.source = "img_btn_play_n_png"; }
        // private onMoveOverPause(): void { this.kImgPause.source = "img_btn_pause_p_png"; }
        // private onMoveOutPause(): void { this.kImgPause.source = "img_btn_pause_n_png"; }
        // private onMoveOverReplay(): void { this.kImgRePlay.source = "img_btn_rePlay_p_png"; }
        // private onMoveOutReplay(): void { this.kImgRePlay.source = "img_btn_rePlay_n_png"; }

        /** 切换显示字幕视频 */
        private onChangeCaptionShowState(): void {
            if (this.mVideo.length = 0) return;
            if (!this.mIsPlayCaption) {
                this.mIsPlayCaption = true;
                this.kImgShowCaption.source = "img_micro_enable_png";
                XDFSoundManager.play("sound_bg_mp3", this.kComPro.schedule * this.mVideo.length, 1, 1);
            } else {
                this.mIsPlayCaption = false;
                this.kImgShowCaption.source = "img_micro_forbid_png";
                XDFSoundManager.stop("sound_bg_mp3");
            }
        }
    }
}