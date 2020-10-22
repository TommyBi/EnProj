namespace game {
    export class LetsChantView extends eui.Component {
        public kComVideo: game.VideoControlComponent;

        constructor() {
            super();
            this.skinName = "LetsChantSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            this.kComVideo.setSkinType(1);
            this.kComVideo.play("video");
        }
    }
} 