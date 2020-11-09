namespace game {
    /**
     * VideoProBarComponent
     * 视频进度调节组件
     */
    export class VideoProBarComponent extends eui.Component implements eui.UIComponent {
        public kGrpBar: eui.Group;
        public kImgBar: eui.Image;
        public kImgProBtn: eui.Image;

        private mTouchSrcX = 0;
        private mTmpX = 0;
        private mIsAdjust: boolean = false;

        public constructor() {
            super();
            this.skinName = "VideoProBarSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.kImgProBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.init();
        }

        public setSkinType(type: number): void {
            if (type > 0) this.kImgProBtn.source = `img_pro_icon${type}_png`;
        }

        public reset(time: number): void {
            this.kImgProBtn.x = 0;
            this.kImgBar.width = this.kImgProBtn.x;
            this.updateProPos(time);
        }

        public backToStart(): void {
            egret.Tween.removeTweens(this.kImgProBtn);
        }

        public updateProPos(remainTime): void {
            egret.Tween.removeTweens(this.kImgProBtn);
            egret.Tween.get(this.kImgProBtn).to({ x: this.kGrpBar.width }, remainTime * 1000).call(() => {
                this.kImgProBtn.x = 0;
                XDFFrame.EventCenter.sendEvent(EventConst.videoPlayFinish);
            });
            egret.Tween.removeTweens(this.kImgBar);
            egret.Tween.get(this.kImgBar).to({ width: this.kGrpBar.width }, remainTime * 1000).call(() => {
                this.kImgBar.width = 0;
            });
        }

        private init(): void {
            this.kImgProBtn.x = 0;
            this.kImgBar.width = this.kImgProBtn.x;
            this.mIsAdjust = false;
        }

        private onTouchBegin(e: egret.TouchEvent): void {
            this.mTouchSrcX = e.stageX;
            this.mTmpX = this.kImgProBtn.x;
            this.mIsAdjust = true;
            egret.Tween.removeTweens(this.kImgProBtn);
            egret.Tween.removeTweens(this.kImgBar);
        }

        private onTouchEnd(e: egret.TouchEvent): void {
            if (this.mIsAdjust) {
                XDFFrame.EventCenter.sendEvent(EventConst.eventFinishVideoProgress, this.kImgProBtn.x / this.kGrpBar.width)
            }
            this.mIsAdjust = false;
        }

        private onTouchMove(e: egret.TouchEvent): void {
            if (!this.mIsAdjust) return;
            let offSet = e.stageX - this.mTouchSrcX;
            if (this.mTmpX + offSet >= this.kGrpBar.width) {
                // 结束播放
                this.kImgProBtn.x = this.kGrpBar.width;
                this.kImgBar.width = this.kImgProBtn.x;
            } else if (this.mTmpX + offSet <= 0) {
                // 回到起点 
                this.kImgProBtn.x = 0;
                this.kImgBar.width = this.kImgProBtn.x;
            } else {
                this.kImgProBtn.x = this.mTmpX + offSet;
                this.kImgBar.width = this.kImgProBtn.x;
            }
        }

        /** 获取当前播放进度 */
        public get schedule(): number {
            return this.kImgProBtn.x / this.kGrpBar.width;
        }

        public pause(): void {
            egret.Tween.removeTweens(this.kImgProBtn);
            egret.Tween.removeTweens(this.kImgBar);
        }
    }

}