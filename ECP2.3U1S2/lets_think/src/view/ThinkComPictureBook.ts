namespace game {
    /**
     * ThinkComPictureBook
     * think 翻卡牌环节 中 每一个翻动的组件
     */
    export class ThinkComPictureBook extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;
        public kGrpBg: eui.Group;
        public kImgShadow: eui.Image;
        public kImgCard: eui.Image;

        private mIsRolling: boolean = false;
        private mIsBack: boolean = true;
        private mIdx: number = 0;
        private mSkinType: number = 0;
        public constructor(idx: number, skinType: number) {
            super();
            this.skinName = "ThinkComPictureBookSkin";
            this.mIdx = idx;
            this.mSkinType = skinType;
        }

        protected createChildren() {
            super.createChildren();
            this.kGrpBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchToll, this);
            this.init();
        }

        private init(): void {
            this.mIsRolling = false;
            this.mIsBack = true;
            this.kImgCard.source = `img_think_shadow_png`;
        }

        /** 翻滚 */
        private onTouchToll(): void {
            if (this.mIsRolling) return;
            XDFSoundManager.play("sound_think_choise_mp3");
            egret.Tween.removeTweens(this.kGrpMain);
            egret.Tween.get(this.kGrpMain).to({ scaleX: 0 }, 200).call(() => {
                if (this.mIsBack) {
                    this.mIsBack = false;
                    this.kImgCard.source = `img_think_pic${this.mIdx}_png`;
                } else {
                    this.mIsBack = true;
                    this.kImgCard.source = `img_think_shadow_png`;
                }

                egret.Tween.get(this.kGrpMain).to({ scaleX: 1 }, 200);
            })
        }
    }

}