namespace game {
    /**
     * ReplayComponent
     * 重新开始组件
     */
    export class ReplayComponent extends eui.Component implements eui.UIComponent {

        public kGrpReplay: eui.Group;
        public kImgReplay: eui.Image;
        public kImgStart: eui.Image;

        public constructor() {
            super();
            this.skinName = "ReplayComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.kImgReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRePlay, this);
            this.kImgStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReStart, this);
            this.init();
        }

        private init(): void {
            egret.Tween.removeTweens(this.kGrpReplay);
        }

        /** 重新开始 */
        private onRePlay(): void {
            egret.Tween.removeTweens(this.kImgReplay);
            XDFFrame.EventCenter.sendEvent(EventConst.eventReplay);
        }

        /** 开始 */
        private onReStart(): void {
            egret.Tween.removeTweens(this.kImgStart);
            XDFFrame.EventCenter.sendEvent(EventConst.eventStart);
        }

        public showReplay(): void {
            this.kImgReplay.visible = true;
            this.kImgStart.visible = false;
            egret.Tween.removeTweens(this.kImgReplay);
            this.kImgReplay.scaleX = this.kImgReplay.scaleY = 1;
            egret.Tween.get(this.kImgReplay, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
        }

        /** 显示开始组件 */
        public showStart(): void {
            egret.Tween.removeTweens(this.kImgStart);
            this.kImgReplay.visible = false;
            this.kImgStart.visible = true;
            this.kImgStart.scaleX = this.kImgStart.scaleY = 1;
            egret.Tween.get(this.kImgStart, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
        }
    }

}