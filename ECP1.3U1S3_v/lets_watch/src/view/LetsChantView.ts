namespace game {
    export class LetsChantView extends eui.Component {
        public kImgBg: eui.Image;
        public kComVideo: game.VideoControlComponent;

        private mSkinType: number = 0;

        constructor() {
            super();
            this.skinName = "LetsChantSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            this.kImgBg.source = `img_bg_${this.mSkinType}_png`;
            this.kComVideo.setSkinType(this.mSkinType);
            this.kComVideo.play("video");
        }
    }
} 