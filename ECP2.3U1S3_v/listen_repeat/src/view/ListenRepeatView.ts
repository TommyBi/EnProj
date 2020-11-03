namespace game {
    export class ListenRepeatView extends eui.Component {

        public kCom0: game.DialogComponent;
        public kCom1: game.DialogComponent;
        public kCom2: game.DialogComponent;
        public kCom3: game.DialogComponent;
        public kCom4: game.DialogComponent;
        public kCom5: game.DialogComponent;
        public kCom6: game.DialogComponent;
        public kCom7: game.DialogComponent;
        public kComVideo: game.VideoComponent;

        private mCurPlayIdx: number; // 当前正在播放的索引

        constructor() {
            super();
            this.skinName = "ListenRepeatViewSkin";
        };

        protected createChildren() {
            super.createChildren();

            for (let i = 0; i < 6; i++) {
                this[`kCom${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                this[`kCom${i}`].setData(i);
            }

            this.init();
        }

        private init(): void {
            this.kComVideo.setSkinType(1);
            this.mCurPlayIdx = -1;
        }

        private onTouch(e: egret.TouchEvent): void {
            this.mCurPlayIdx = Number(e.target.name);
            for (let i = 0; i < 6; i++) {
                if (this.mCurPlayIdx == i) {
                    egret.log("选中:", e.target.name);
                    this[`kCom${i}`].light();
                    this.kComVideo.play(i);
                } else {
                    this[`kCom${i}`].normal();
                }
            }
        }
    }
} 