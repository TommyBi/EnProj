namespace game {
    export class MainView extends eui.Component {

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
            this.skinName = "MainViewSkin";
        };

        protected createChildren() {
            super.createChildren();

            for (let i = 0; i < 8; i++) {
                // this[`kCom${i}`].addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverCom, this);
                // this[`kCom${i}`].addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutCom, this);
                this[`kCom${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                this[`kCom${i}`].setData(i);
            }

            // mouse.enable(this.stage);

            this.init();

        }

        private init(): void {
            this.mCurPlayIdx = -1;
        }

        // /** 鼠标移到重放按钮 */
        // private onMoveOverCom(e: egret.TouchEvent): void {
        //     this[`kCom${e.target.name}`].light();
        // }

        // /** 鼠标移出重放按钮 */
        // private onMoveOutCom(e: egret.TouchEvent): void {
        //     if (Number(e.target.name) != this.mCurPlayIdx) {
        //         this[`kCom${e.target.name}`].normal();
        //     }
        // }

        private onTouch(e: egret.TouchEvent): void {
            this.mCurPlayIdx = Number(e.target.name);
            for (let i = 0; i < 8; i++) {
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