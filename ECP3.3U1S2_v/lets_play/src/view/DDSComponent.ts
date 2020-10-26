namespace game {
    /**
     * DDSComponent
     */
    export class DDSComponent extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;
        public kGrpAnim: eui.Group;
        public kImg: eui.Image;
        public kGrpAnimMask: eui.Group;
        public kImgMask: eui.Image;

        private mAnimMouseDown: XDFFrame.DBAnim;    // 田鼠藏起来
        private mAnimMouseUp: XDFFrame.DBAnim;      // 田鼠出来
        private mAnimMouseHit: XDFFrame.DBAnim;     // 被敲 

        public constructor() {
            super();
            this.skinName = "DDSComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            // 初始化动画
            this.mAnimMouseDown = XDFFrame.DBFactory.createAnim("db_mouse_down");
            this.mAnimMouseDown.setProtery({ x: 0, y: -20, parent: this.kGrpAnim, scaleX: 0.45, scaleY: 0.45 });
            this.mAnimMouseUp = XDFFrame.DBFactory.createAnim("db_mouse_up");
            this.mAnimMouseUp.setProtery({ x: 0, y: 0, parent: this.kGrpAnim, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimMouseHit = XDFFrame.DBFactory.createAnim("db_mouse_hit");
            this.mAnimMouseHit.setProtery({ x: 0, y: -50, parent: this.kGrpAnim, scaleX: 0.45, scaleY: 0.45 })
            this.kGrpAnim.mask = this.kGrpAnimMask;
            this.init();
        }

        private init(): void {
            this.kGrpAnim.visible = this.mAnimMouseUp.visible = this.mAnimMouseDown.visible = this.mAnimMouseHit.visible = false;
            this.kImg.scaleX = this.kImg.scaleY = 0;
        }

        /** 是否显示老鼠动画 */
        private setMouseShowState(state: boolean): void {
            this.kGrpAnim.visible = state;
        }

        /** 设置图片 */
        public formateImg(idx: number): void {
            this.kImg.source = `img_lp_option${idx}_png`;
        }

        /** 老鼠动画 */
        public playMouseAnim(type, cb: Function, thisOBj: any): void {
            switch (type) {
                case "down":
                    this.kGrpAnim.visible = this.mAnimMouseDown.visible = true;
                    this.mAnimMouseUp.visible = this.mAnimMouseHit.visible = false;
                    this.mAnimMouseDown.play(null, 1, cb, thisOBj);
                    this.showImg(false);
                    this.kGrpAnim.visible = false;
                    break;
                case "up":
                    this.kGrpAnim.visible = this.mAnimMouseUp.visible = true;
                    this.mAnimMouseDown.visible = this.mAnimMouseHit.visible = false;
                    this.mAnimMouseUp.play(null, 1, () => {
                        this.showImg(true);
                        cb && cb.call(thisOBj);
                    }, this);
                    break;
                case "hit":
                    console.log("播放打击动画")
                    this.kGrpAnim.visible = this.mAnimMouseHit.visible = true;
                    this.mAnimMouseDown.visible = this.mAnimMouseUp.visible = false;
                    this.mAnimMouseHit.play(null, 3, () => {
                        cb && cb.call(thisOBj);
                    }, this);
                    break;
            }
        }

        /** 是否是要去显示 */
        public showImg(showAction: boolean): void {
            egret.Tween.removeTweens(this.kImg);
            if (showAction) {
                this.kImg.scaleX = this.kImg.scaleY = 0;
                egret.Tween.get(this.kImg).to({ scaleX: 0.5, scaleY: 0.5 }, 200, egret.Ease.cubicInOut);
            } else {
                this.kImg.scaleX = this.kImg.scaleY = 0.5;
                egret.Tween.get(this.kImg).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.cubicInOut);
            }
        }
    }

}