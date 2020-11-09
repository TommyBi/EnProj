namespace game {
    export class LetsChantView extends eui.Component {
        public kImgBg: eui.Image;
        public kComVideo: game.VideoControlComponent;
        private mSkinType: number = 2;
        constructor() {
            super();
            this.skinName = "LetsChantSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            this.kComVideo.setSkinType(this.mSkinType);
            this.kImgBg.source = `img_bg_${this.mSkinType}_png`;
            this.kComVideo.play("video");
        }
    }
} 