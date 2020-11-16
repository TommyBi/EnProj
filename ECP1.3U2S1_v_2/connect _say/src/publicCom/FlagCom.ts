namespace game {
    /**
     * FlagCom
     * 单词旗子
     */
    export class FlagCom extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;

        private mAnim: XDFFrame.DBAnim;
        public constructor() {
            super();
            this.skinName = "FlagComSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.mAnim = XDFFrame.DBFactory.createAnim("db_word_flag");
            this.mAnim.setProtery({ x: 130, y: 90, parent: this.kGrpMain, scaleX: 0.8, scaleY: 0.4 });
            this.mAnim.play(null, 0);
        }

        private onTouch(): void {
            XDFFrame.EventCenter.sendEvent(EventConst.touchFlag);
        }

    }

}