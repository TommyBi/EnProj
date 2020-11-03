namespace game {
    /**
     * VideoControlComponent
     * 可以操作视频开始暂停的效果
     */
    export class VideoControlComponent extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;
        public kGrpVideo: eui.Group;
        public kComPro: game.VideoProBarComponent;
        public kImgPlay: eui.Image;
        public kImgPause: eui.Image;
        public kImgRePlay: eui.Image;

        private mVideo: egret.Video;
        private mLength: number = 0;// 当前视频长度
        private _mIsPlaying: boolean = false;// 是否正在播放
        private set mIsPlaying(b: boolean) {
            this._mIsPlaying = b;
            this.kImgPlay.source = b ? "img_pause_png" : "img_play_png";
        }
        private get mIsPlaying(): boolean { return this._mIsPlaying; }

        public constructor() {
            super();
            this.skinName = "VideoControlComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.register();
        }

        private register(): void {
            this.mVideo = new egret.Video();
            this.mVideo.x = 0;                       //设置视频坐标x
            this.mVideo.y = 0;                       //设置视频坐标y
            this.mVideo.width = 1440;                //设置视频宽
            this.mVideo.height = 1080;               //设置视频高
            this.mVideo.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
            this.kGrpVideo.addChild(this.mVideo);

            XDFFrame.EventCenter.addEventListenr(EventConst.eventFinishVideoProgress, this.adjustPlay, this);

            this.kImgPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
            this.kImgRePlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        }

        public setSkinType(type: number): void {
            this.kComPro.setSkinType(type);
        }

        /** 播放的视频索引 */
        public play(name: string): void {
            this.mVideo.load(`resource/assets/video/${name}.mp4`);
            this.mVideo.once(egret.Event.COMPLETE, this.onLoad, this);
            this.mVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        }

        /** 加载成功 */
        private onLoad(): void {
            //获取视频长度
            console.log("获取视频长度: " + this.mVideo.length);
            this.mLength = this.mVideo.length;

            //播放视频
            this.mIsPlaying = true;
            this.mVideo.play(0, false);
            this.kComPro.reset(this.mLength);
        }

        /** 加载失败 */
        private onLoadErr(err: any): void {
            console.log("video load error happened", err);
        }

        /** 调整性播放进度 */
        private adjustPlay(e: any): void {
            if (this.mLength == 0) {
                console.log("视频尚未加载完成");
            } else {
                console.log("this.mvideo:", this.mVideo);
                this.mIsPlaying = true;
                this.mVideo.play(e.data * this.mVideo.length);
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
                } else {
                    this.mIsPlaying = false;
                }
            } else {
                this.onPause();
            }

        }

        /** 暂停 */
        private onPause(): void {
            this.mIsPlaying = false;
            this.mVideo.pause();
            this.kComPro.pause();
        }

        /** 重新开始 */
        private onRestart(): void {
            this.mIsPlaying = true;
            this.mVideo.play(0, false);
            this.kComPro.reset(this.mVideo.length);
        }
    }
}