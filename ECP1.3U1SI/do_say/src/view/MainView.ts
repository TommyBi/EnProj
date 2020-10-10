namespace game {
    // 游戏模式
    enum gameType {
        UNKONW,
        PUTON,
        TAKEOFF
    }
    export class MainView extends eui.Component {

        public kImgBody0: eui.Image;
        public kImgBody1: eui.Image;
        public kImgBody1Up: eui.Image;
        public kImgBody1Down: eui.Image;
        public kImgBody0Up: eui.Image;
        public kImgBody0Down: eui.Image;
        public kImgIcon0: eui.Image;
        public kImgIcon1: eui.Image;
        public kImgIcon2: eui.Image;
        public kImgIcon3: eui.Image;
        public kImgPutOn: eui.Image;
        public kImgTakeOff: eui.Image;

        private mStatus: number = gameType.UNKONW;// 1: put on  2: take off  0: unknow
        private mBodyStatus: {
            up: number,
            down: number,
        }[] = [{
            up: -1,
            down: -1,
        }, {
            up: -1,
            down: -1,
        }]
        private mCurSelectClothIdx: number = -1;// 当前选择的衣服

        constructor() {
            super();
            this.skinName = "MainViewSkin";
        };

        protected createChildren() {
            super.createChildren();

            // register
            this.kImgPutOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectPutOn, this);
            this.kImgTakeOff.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectTakeOff, this);
            this.kImgBody0Up.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectBody0Up, this);
            this.kImgBody0Down.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectBody0Down, this);
            this.kImgBody1Up.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectBody1Up, this);
            this.kImgBody1Down.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectBody1Down, this);

            for (let i = 0; i < 4; i++) {
                this[`kImgIcon${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectCloth, this);
            }

            this.init();
        }

        private init(): void {
            for (let i = 0; i < 4; i++) {
                this[`kImgIcon${i}`].scaleX = this[`kImgIcon${i}`].scaleY = 1;
                egret.Tween.removeTweens(this[`kImgIcon${i}`]);
                this[`kImgIcon${i}`].visible = false;
            }
            this.mStatus = gameType.UNKONW;
            egret.Tween.removeTweens(this.kImgPutOn);
            egret.Tween.removeTweens(this.kImgTakeOff);
            this.kImgPutOn.alpha = this.kImgTakeOff.alpha = 1;
            egret.Tween.get(this.kImgPutOn, { loop: true })
                .to({ alpha: 0.5 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 0.5 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 500, egret.Ease.cubicInOut)
            egret.Tween.get(this.kImgTakeOff, { loop: true })
                .to({ alpha: 0.5 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 0.5 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 500, egret.Ease.cubicInOut)

            this.mBodyStatus = [{
                up: -1,
                down: -1,
            }, {
                up: -1,
                down: -1,
            }]

            this.mCurSelectClothIdx = -1;
        }

        /** 选择了穿模式 */
        private onSelectPutOn(): void {
            if (this.mStatus != gameType.UNKONW) return;
            this.changeMode(1);
            for (let i = 0; i < 4; i++) {
                this[`kImgIcon${i}`].visible = true;
            }
        }

        /** 选择了脱模式 */
        private onSelectTakeOff(): void {
            if (this.mStatus != gameType.UNKONW) return;
            this.changeMode(2);
            for (let i = 0; i < 4; i++) {
                this[`kImgIcon${i}`].visible = false;
            }
        }

        private changeMode(status: number): void {
            this.mStatus = status;
            egret.Tween.removeTweens(this.kImgPutOn);
            egret.Tween.removeTweens(this.kImgTakeOff);
        }

        private onSelectCloth(e: egret.TouchEvent): void {
            if (this.mStatus != gameType.PUTON) return;
            egret.Tween.removeTweens(this[`kImgIcon${e.target.name}`]);
            this[`kImgIcon${e.target.name}`].scaleX = this[`kImgIcon${e.target.name}`].scaleY = 1;
            egret.Tween.get(this[`kImgIcon${e.target.name}`], { loop: true })
                .to({ scaleX: 1.3, scaleY: 1.3 }, 500, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicInOut)
                .to({ scaleX: 1.3, scaleY: 1.3 }, 500, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicInOut)
            this.mCurSelectClothIdx = Number(e.target.name);
        }

        /** 当前选择的是否正确 */
        private isSelectCorrect(bodyIdx: number, isUp: boolean): boolean {
            if (this.mStatus == gameType.PUTON) {

                // 当前为穿衣模式
                if (this.mCurSelectClothIdx < 1) {
                    // 目标为衣服
                    if (!isUp) return false;
                    if (this.mBodyStatus[bodyIdx].up != -1) return false;
                    this.mBodyStatus[bodyIdx].up = this.mCurSelectClothIdx;
                } else {
                    // 目标找裤子
                    if (isUp) return false;
                    if (this.mBodyStatus[bodyIdx].down != -1) return false;
                    this.mBodyStatus[bodyIdx].down = this.mCurSelectClothIdx;
                }

            } else if (this.mStatus == gameType.TAKEOFF) {

                // 当前为脱衣模式
                // if ()

            }
            return true;
        }

        /** 左侧选手衣服 */
        private onSelectBody0Up(): void {

        }

        /** 左侧选手裤子 */
        private onSelectBody0Down(): void {

        }

        /** 右侧选手衣服 */
        private onSelectBody1Up(): void {

        }

        /** 右侧选手裤子 */
        private onSelectBody1Down(): void {

        }

    }
} 