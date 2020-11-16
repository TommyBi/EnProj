namespace game {
    export class StickSayNewView extends eui.Component {
        public kImgFrame0: eui.Image;
        public kImgFrame1: eui.Image;
        public kImgFrame2: eui.Image;
        public kImgFrame3: eui.Image;
        public kImgBodyBtn0: eui.Image;
        public kImgBodyBtn1: eui.Image;
        public kImgBodyBtn2: eui.Image;
        public kImgBodyBtn3: eui.Image;
        public kImgBody0: eui.Image;
        public kImgBody1: eui.Image;
        public kImgBody2: eui.Image;
        public kImgBody3: eui.Image;
        public kImgCoat0: eui.Image;
        public kImgCoat1: eui.Image;
        public kImgCoat2: eui.Image;
        public kImgCoat3: eui.Image;
        public kImgPanel: eui.Image;
        public kComAnswer: game.AnswerComponent;
        public kComReplay: game.ReplayComponent;

        private mHintArr: number[] = [];
        private mLock_sound_select: boolean = false;// 操作锁 - 是否正在播放选中的声音
        private mLock_startGame: boolean = true;    // 操作锁 - 是否开始了游戏
        private mLock_isFinish: boolean = false;    // 操作锁 - 是否已经完成了一局
        private mSelectIdx: number = -1;
        private get isLock(): boolean {
            return this.mLock_sound_select ||
                this.mLock_startGame ||
                this.mLock_isFinish ||
                this.kComAnswer.visible;
        }
        private readonly mSmokeAnimPos: { x: number, y: number }[] = [{ x: 875, y: 320 }, { x: 1535, y: 300 }, { x: 650, y: 750 }, { x: 1263, y: 780 }]

        constructor() {
            super();
            this.skinName = "StickSayViewNewSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            for (let i = 0; i < 4; i++) {
                this[`kImgBodyBtn${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onSelect${i}`], this);
                this[`kImgFrame${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onSelectCloth${i}`], this);
            }

            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);

            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        }

        private reset(): void {
            for (let i = 0; i < 4; i++) {
                this[`kImgBody${i}`].visible = false;
                this[`kImgCoat${i}`].visible = false;
                egret.Tween.removeTweens(this[`kImgBodyBtn${i}`]);
                this[`kImgBodyBtn${i}`].alpha = 1;
                egret.Tween.removeTweens(this[`kImgFrame${i}`]);
                this[`kImgFrame${i}`].alpha = 0;
            }

            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;
            this.kImgPanel.source = "";
            this.mHintArr = [];
            this.mSelectIdx = -1;
            // this.mHintArr = this.calShowOrder(4);
        }

        /** 开始游戏 */
        private onStart(): void {
            this.kComReplay.visible = false;
            this.kComAnswer.visible = false;
            this.mLock_startGame = false;
            this.hint();
        }

        /** 提示 */
        private hint(): void {
            // show desc
            for (let i = 0; i < 4; i++) {
                egret.Tween.get(this[`kImgBodyBtn${i}`], { loop: true })
                    .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
            }
        }

        private onSelect0(): void { this.onSelect(0); }
        private onSelect1(): void { this.onSelect(1); }
        private onSelect2(): void { this.onSelect(2); }
        private onSelect3(): void { this.onSelect(3); }

        private onSelect(n: number): void {
            if (this.mSelectIdx != -1) return;
            this.mSelectIdx = n;
            for (let i = 0; i < 4; i++) {
                egret.Tween.removeTweens(this[`kImgBodyBtn${i}`]);
                this[`kImgBodyBtn${i}`].alpha = i == this.mSelectIdx ? 1 : 0.5;
                this[`kImgFrame${i}`].alpha = 1;
                egret.Tween.get(this[`kImgFrame${i}`], { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
            }
            this[`kImgBody${this.mSelectIdx}`].visible = true;
        }

        private onSelectCloth0(): void { this.onSelectCloth(0); }
        private onSelectCloth1(): void { this.onSelectCloth(1); }
        private onSelectCloth2(): void { this.onSelectCloth(2); }
        private onSelectCloth3(): void { this.onSelectCloth(3); }
        private onSelectCloth(n: number): void {
            if (this.mSelectIdx == -1) return;
            if (this.isLock) return;
            this[`kImgCoat${n}`].visible = true;
            if (n == 3) this.kImgCoat1.visible = false;
            if (n == 1) this.kImgCoat3.visible = false;
            this.kImgPanel.source = `img_hint_panel_${n}_png`;
            if (this.mHintArr.indexOf(n) == -1) this.mHintArr.push(n);
            if (this.mHintArr.length >= 4) {
                // 结束
                this.mLock_sound_select = true;
                XDFSoundManager.play(`sound_desc_${n}_mp3`, 0, 1, 1, `sound_desc_${n}_mp3`, () => {
                    this.mLock_sound_select = false;
                    this.kComAnswer.visible = true;
                    this.kComAnswer.playGood(null);
                    this.kComReplay.visible = true;
                    this.kComReplay.showReplay();
                });
            } else {
                // 继续游戏
                this.mLock_sound_select = true;
                XDFSoundManager.play(`sound_desc_${n}_mp3`, 0, 1, 1, `sound_desc_${n}_mp3`, () => {
                    this.mLock_sound_select = false;
                });
            }
        }

        /** 重新开始 */
        private onReStart(): void {
            this.mLock_isFinish = false;
            this.reset();
            this.onStart();
        }

        /**
         *  初始化播放顺序
         * @param tarCount: 目标生成的数量
         */
        private calShowOrder(tarCount: number): number[] {
            let arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        }
        /** 生产随机队列 */
        private produceOrderArr(arr, tarCount): void {
            if (arr.length < tarCount) {
                let idx = Util.randomNum(0, tarCount - 1);
                if (arr.indexOf(idx) == -1) {
                    arr.push(idx);
                    if (arr.length < tarCount) {
                        this.produceOrderArr(arr, tarCount);
                    }
                } else {
                    this.produceOrderArr(arr, tarCount);
                }
            }
        }
    }
} 