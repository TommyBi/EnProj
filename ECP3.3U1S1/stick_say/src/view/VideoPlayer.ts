namespace game {
    export class VideoPlayer extends eui.Component {
        public kComCaption: game.CaptionPlayerCom;

        constructor() {
            super();
            this.skinName = "VideoPlayerSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            this.kComCaption.load("video");
        }
    }
} 