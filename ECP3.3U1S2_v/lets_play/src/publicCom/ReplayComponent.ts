namespace game {
    /**
     * ReplayComponent
     * 重新开始组件
     */
    export class ReplayComponent extends eui.Component implements eui.UIComponent {

        public kGrpReplay: eui.Group;
        public kImgReplay: eui.Image;

        public constructor() {
            super();
            this.skinName = "ReplayComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.kImgReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRePlay, this);
            // this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverReplayBtn, this);
            // this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutReplayBtn, this);
            // mouse.enable(this.stage);
            this.init();
        }

        private init(): void {
            egret.Tween.removeTweens(this.kGrpReplay);
            this.kImgReplay.y = 0;
        }

        /** 重新开始 */
        private onRePlay(): void {
            egret.Tween.removeTweens(this.kImgReplay);
            XDFFrame.EventCenter.sendEvent(EventConst.eventReplay);
        }

        public showReplay(): void {
            egret.Tween.removeTweens(this.kImgReplay);
            this.kImgReplay.scaleX = this.kImgReplay.scaleY = 1;
            this.kImgReplay.source = "img_replay_j_png";
            this.kImgReplay.visible = true;
            egret.Tween.get(this.kImgReplay, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
        }

    }

}