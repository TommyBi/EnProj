namespace game {
    /**
     * LookCheckPreCom
     */
    export class LookCheckPreCom extends eui.Component implements eui.UIComponent {

        public kImg: eui.Image;
        public kGrp0: eui.Group;
        public kLabel0: eui.Label;
        public kGrp1: eui.Group;
        public kLabel1: eui.Label;
        public kGrpAnim: eui.Group;

        private mIdx: number;
        private mAnimRole: XDFFrame.DBAnim;

        public constructor() {
            super();
            this.skinName = "LookCheckPreComSkin";
        }

        protected createChildren() {
            super.createChildren();
        }

        private init(idx: number): void {
            this.mAnimRole = XDFFrame.DBFactory.createAnim(`db_role_${this.mIdx}`);
            this.mAnimRole.setProtery({ x: 129, y: 102, parent: this.kGrpAnim, scaleX: 1.5, scaleY: 1.5 });
        }

        private setData(): void {

        }
    }

}