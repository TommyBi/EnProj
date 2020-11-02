namespace game {
    /**
     * LookCheckPreCom
     */
    export class LookCheckPreCom extends eui.Component implements eui.UIComponent {

        public kImg: eui.Image;
        public kGrp0: eui.Group;
        public kLabel0: eui.Label;
        public kImgCheck0: eui.Image;
        public kGrp1: eui.Group;
        public kImgCheck1: eui.Image;
        public kLabel1: eui.Label;
        public kGrpAnim: eui.Group;
        public kImgLine: eui.Image;

        public mIdx: number;
        private mAnimRole: XDFFrame.DBAnim;
        private mIsActive: Boolean = false;

        private mCfg = [
            {
                desc0: "I always go sledding.",
                desc1: "I always go swimming.",
                correct: 1
            }, {
                desc0: "My house is made of snow.",
                desc1: "My house is made of plants.",
                correct: 0
            }, {
                desc0: "I always go sledding.",
                desc1: "I always go swimming.",
                correct: 0
            }, {
                desc0: "My house is made of snow.",
                desc1: "My house is made of plants.",
                correct: 1
            }
        ]

        public constructor() {
            super();
            this.skinName = "LookCheckPreComSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.kGrp0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch0, this);
            this.kGrp1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch1, this);
        }

        public init(idx: number): void {
            this.mIdx = idx;
            this.kImg.source = `img_lc_panel_${idx}_png`;
            this.kImgLine.visible = false;
            let animIdx = idx;
            if (animIdx == 1) animIdx = 2;
            if (animIdx == 2) animIdx = 1;
            this.mAnimRole = XDFFrame.DBFactory.createAnim(`db_role_${animIdx}`);
            this.mAnimRole.setProtery({ x: 230, y: 180, parent: this.kGrpAnim, scaleX: 2.5, scaleY: 2.5 });
            this.reset();
        }

        /** 选择了第一个 */
        public onTouch0(): void {
            this.onMatch(0);
        }

        /** 选择了第二个 */
        public onTouch1(): void {
            this.onMatch(1);
        }

        public onMatch(idx: number): void {
            if (!this.mIsActive) return;
            let cfg = this.mCfg[this.mIdx];
            if (cfg.correct == idx) {
                // 正确   
                XDFFrame.EventCenter.sendEvent(EventConst.lookCheckSelectResult, true);
                this[`kImgCheck${idx}`].visible = true;
                this.kImgLine.visible = false;
            } else {
                // 错误
                XDFFrame.EventCenter.sendEvent(EventConst.lookCheckSelectResult, false);
            }
        }

        public showAction(): void {
            this.kImgLine.visible = true;
            this.mIsActive = true;
            XDFSoundManager.play(`sound_${this.mIdx}_mp3`);
            this.mAnimRole.play(null, 3)
        }

        public reset(): void {
            this.kImgCheck0.visible = this.kImgCheck1.visible = false;
            this.kImgLine.visible = false;
            this.mIsActive = false;
            this.kLabel0.text = this.mCfg[this.mIdx].desc0;
            this.kLabel1.text = this.mCfg[this.mIdx].desc1;
        }
    }

}