namespace game {
    /**
     * DDSComponent
     */
    export class DDSComponent extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;
        public kGrpAnim: eui.Group;
        public kImg: eui.Image;

        private mAnimRight: XDFFrame.DBAnim;    // 正确的动画
        private mAnimErr: XDFFrame.DBAnim;      // 错误的表现
        private mAnimRoleIdle: XDFFrame.DBAnim; // 待机效果

        public constructor() {
            super();
            this.skinName = "DDSComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            // 初始化动画
            this.mAnimRight = XDFFrame.DBFactory.createAnim("db_right");
            this.mAnimRight.setProtery({ x: 70, y: -20, parent: this.kGrpAnim, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimErr = XDFFrame.DBFactory.createAnim("db_wrong", 9);
            this.mAnimErr.setProtery({ x: 50, y: 30, parent: this.kGrpAnim, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim("db_idle");
            this.mAnimRoleIdle.setProtery({ x: 50, y: 50, parent: this.kGrpAnim, scaleX: 0.25, scaleY: 0.25 })
            this.init();
        }

        private init(): void {

        }
    }

}