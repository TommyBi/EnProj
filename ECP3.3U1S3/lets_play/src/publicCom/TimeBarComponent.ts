namespace game {
    /**
     * TimeBarComponent
     */
    export class TimeBarComponent extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;
        public kImgBar: eui.Image;

        public constructor() {
            super();
            this.skinName = "TimeBarComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
        }

        /** 重置 */
        public reset(): void {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
        }

        /** 播放缩小 */
        public play(): void {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            egret.Tween.get(this.kImgBar).to({ width: 0 }, 13000).call(() => {
                XDFFrame.EventCenter.sendEvent(EventConst.timeBarOut);
            });
        }
    }
}