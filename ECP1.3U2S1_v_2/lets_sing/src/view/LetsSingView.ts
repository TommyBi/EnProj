namespace game {
    export class LetsSingView extends eui.Component {
        public kImgBg: eui.Image;
        public kComCaption: game.CaptionPlayerCom;

        private mSkinType: number = 0;

        constructor() {
            super();
            this.skinName = "LetsSingViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            this.kImgBg.source = `img_bg_${this.mSkinType}_png`;
            this.kComCaption.setSkinType(this.mSkinType);
            this.kComCaption.load("video");
        }
    }
} 