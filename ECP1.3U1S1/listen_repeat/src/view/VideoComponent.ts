namespace game {
    /**
     * VideoComponent
     */
    export class VideoComponent extends eui.Component implements eui.UIComponent {
        public kGrpVideo: eui.Group;
        public kRect: eui.Rect;
        public kComPro: game.VideoProBarComponent;
        public kImgMask: eui.Image;

        private mIdx: number;   // 正在播放的idx
        private mVideo: egret.Video;
        private mLength: number = 0;// 当前视频长度

        public constructor() {
            super();
            this.skinName = "VideoComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.register();
        }

        private register(): void {
            this.mVideo = new egret.Video();
            this.mVideo.x = 0;                       //设置视频坐标x
            this.mVideo.y = 0;                       //设置视频坐标y
            this.mVideo.width = 720;                 //设置视频宽
            this.mVideo.height = 540;                //设置视频高
            this.mVideo.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
            this.kGrpVideo.addChild(this.mVideo);
            this.kImgMask.visible = true;
            XDFFrame.EventCenter.addEventListenr(EventConst.eventFinishVideoProgress, this.adjustPlay, this);
        }

        /** 播放的视频索引 */
        public play(idx: number): void {
            this.kRect.alpha = 1;
            egret.Tween.removeTweens(this.kRect);
            let url = window.__math2_res_config__ ? `${window.__math2_res_config__}/assets/video/${idx}.mp4` : `resource/assets/video/${idx}.mp4`;
            this.mVideo.load(url);
            this.mVideo.once(egret.Event.COMPLETE, this.onLoad, this);
            this.mVideo.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        }

        /** 加载成功 */
        private onLoad(): void {
            this.kImgMask.visible = false;
            this.mVideo.play(0, false);
            this.kRect.alpha = 1;
            egret.Tween.get(this.kRect).to({ alpha: 0 }, 500, egret.Ease.cubicOut);
            //获取视频长度
            console.log("获取视频长度: " + this.mVideo.length);
            this.mLength = this.mVideo.length;
            this.kComPro.reset(this.mLength);
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
                console.log("this.mvideo:", this.mVideo);
                this.mVideo.play(e.data * this.mVideo.length);
                this.kComPro.updateProPos(this.mVideo.length - e.data * this.mVideo.length);
            }
        }
    }
}