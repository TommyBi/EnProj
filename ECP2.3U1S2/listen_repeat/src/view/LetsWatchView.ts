namespace game {
    export class LetsWatchView extends eui.Component {
        public kComVideo: game.VideoControlComponent;

        constructor() {
            super();
            this.skinName = "LetsWatchSkin";
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