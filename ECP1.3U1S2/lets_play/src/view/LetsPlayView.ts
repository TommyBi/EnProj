namespace game {
    export class LetsPlayView extends eui.Component {
        public kComTimeBar: game.TimeBarComponent;
        public kComRestart: game.ReStartComponent;
        public kImgOption0: eui.Image;
        public klbl_m_0: eui.Label;
        public kGrp_b_0: eui.Group;
        public kLbl_b_0: eui.Label;
        public kImgOption1: eui.Image;
        public klbl_m_1: eui.Label;
        public kGrp_b_1: eui.Group;
        public kLbl_b_1: eui.Label;
        public kImgOption2: eui.Image;
        public klbl_m_2: eui.Label;
        public kGrp_b_2: eui.Group;
        public kLbl_b_2: eui.Label;
        public kImgOption3: eui.Image;
        public klbl_m_3: eui.Label;
        public kGrp_b_3: eui.Group;
        public kLbl_b_3: eui.Label;

        private mHintIdx: number = -1;
        private mHintArr: number[] = [];
        private mPosArr: number[] = [];
        private mContent: string[] = ["shoes", "sneakers", "boots", "slippers"];

        private mLock_sound: boolean = false;
        private get isLock(): boolean {
            return this.mLock_sound;
        }
        private mSelectMode: number = 0;// 选择模式 0: 选图片模式 1: 选文字模式
        private mTarLblIdx: number = -1;

        constructor() {
            super();
            this.skinName = "LetsPlaySkin";
        };

        protected createChildren() {
            super.createChildren();
            // 注册界面事件
            for (let i = 0; i < 4; i++) {
                this[`kImgOption${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onChoise${i}`], this);
                this[`kGrp_b_${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onChoiseLabel${i}`], this);
            }
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);
            this.init();
        }

        private init(): void {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
        }

        /** 重置到初始化状态 */
        private reset(): void {
            this.kComTimeBar.reset();
            this.mSelectMode = 0;
            for (let i = 0; i < 4; i++) {
                // 半隐四个选项按钮
                this[`kGrp_b_${i}`].alpha = 0.5;
                this[`kGrp_b_${i}`].visible = true;
                this[`kGrp_b_${i}`].scaleX = this[`kGrp_b_${i}`].scaleY = 1;
                egret.Tween.removeTweens(this[`kGrp_b_${i}`]);
                egret.Tween.removeTweens(this[`kImgOption${i}`]);
                this[`kImgOption${i}`].scaleX = this[`kImgOption${i}`].scaleY = 1;
                this[`klbl_m_${i}`].text = "";
                this[`kLbl_b_${i}`].text = this.mContent[i];
            }
        }

        /** 开始游戏 */
        private onStart(): void {
            this.kComRestart.visible = false;
            this.mHintArr = Util.calShowOrder(4);
            this.mPosArr = Util.calShowOrder(4);
            this.kComTimeBar.play();
            for (let i = 0; i < 4; i++) {
                this[`kImgOption${i}`].source = `img_p_option_${this.mPosArr[i]}_png`;
                this[`kImgOption${i}`].name = this.mPosArr[i];
            }
            this.next();
        }

        private onChoise0(): void { this.judge(Number(this.kImgOption0.name), 0); }
        private onChoise1(): void { this.judge(Number(this.kImgOption1.name), 1); }
        private onChoise2(): void { this.judge(Number(this.kImgOption2.name), 2); }
        private onChoise3(): void { this.judge(Number(this.kImgOption3.name), 3); }
        private onChoiseLabel0(): void { this.judgeLbl(2, 0); }
        private onChoiseLabel1(): void { this.judgeLbl(3, 1); }
        private onChoiseLabel2(): void { this.judgeLbl(0, 2); }
        private onChoiseLabel3(): void { this.judgeLbl(1, 3); }

        private judge(num: number, posIdx: number): void {
            if (this.isLock) return;
            if (this.mSelectMode == 1) return;
            egret.log(`num: ${num}  this.mHintIdx: ${this.mHintIdx}`);
            if (num == this.mHintIdx) {
                // 选择正确
                for (let i = 0; i < 4; i++) {
                    egret.Tween.removeTweens(this[`kImgOption${i}`]);
                    egret.Tween.removeTweens(this[`kGrp_b_${i}`]);
                    this[`kImgOption${i}`].scaleX = this[`kImgOption${i}`].scaleY = 1;
                    this[`kGrp_b_${i}`].scaleX = this[`kGrp_b_${i}`].scaleY = 1;
                    this[`kGrp_b_${i}`].alpha = 1;
                    egret.Tween.get(this[`kGrp_b_${i}`], { loop: true })
                        .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                        .to({ scaleX: 1, scaleY: 1 }, 300)
                        .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                        .to({ scaleX: 1, scaleY: 1 }, 300)
                }
                this.mTarLblIdx = posIdx;
                this.kComTimeBar.stop();

                this.mSelectMode = 1;
                this.mLock_sound = true;
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "sound_stick_right_mp3", () => {
                    XDFSoundManager.play(`sound_${this.mHintIdx}_mp3`, 0, 1, 1, `sound_${this.mHintIdx}_mp3`, () => {
                        this.kComTimeBar.play();
                        this.mLock_sound = false;
                    });
                });

            } else {
                this.mLock_sound = true;
                XDFSoundManager.play("sound_oopstryagain_mp3", 0, 1, 1, "sound_oopstryagain_mp3", () => {
                    this.mLock_sound = false;
                    XDFSoundManager.play(`sound_${this.mHintIdx}_mp3`);
                });
            }
        }

        private judgeLbl(num: number, posIdx: number): void {
            console.log(`onChoiseLabel: ${num}`);
            if (this.isLock) return;
            if (this.mSelectMode == 0) return;
            if (num == this.mHintIdx) {
                // 选择正确
                for (let i = 0; i < 4; i++) {
                    egret.Tween.removeTweens([`this.kGrp_b_${i}`]);
                    this[`kGrp_b_${i}`].alpha = 0.5;
                }
                this.mSelectMode = 0;
                this[`kGrp_b_${posIdx}`].visible = false;
                this[`klbl_m_${this.mTarLblIdx}`].text = this.mContent[posIdx];
                this.kComTimeBar.stop();
                this.mLock_sound = true;
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
                    this.mLock_sound = false;
                    this.next();
                });

            } else {
                // 选择错误
                this.mLock_sound = true;
                XDFSoundManager.play("sound_oopstryagain_mp3", 0, 1, 1, "sound_oopstryagain_mp3", () => {
                    this.mLock_sound = false;
                    XDFSoundManager.play(`sound_${this.mHintIdx}_mp3`);
                });
            }
        }

        /** 进行下一个操作 */
        private next(): void {
            if (this.mHintArr.length <= 0) {
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                this.reset();
                return;
            }
            this.mHintIdx = this.mHintArr.shift();
            this.mSelectMode = 0;
            this.kComTimeBar.play();
            this.mLock_sound = true;
            XDFSoundManager.play(`sound_${this.mHintIdx}_mp3`, 0, 1, 1, `sound_${this.mHintIdx}_mp3`, () => {
                this.mLock_sound = false;
            });
            for (let i = 0; i < 4; i++) {
                egret.Tween.removeTweens(this[`kGrp_b_${i}`]);
                this[`kGrp_b_${i}`].scaleX = this[`kGrp_b_${i}`].scaleY = 1;
                egret.Tween.removeTweens(this[`kImgOption${i}`]);
                this[`kImgOption${i}`].scaleX = this[`kImgOption${i}`].scaleY = 1;
                egret.Tween.get(this[`kImgOption${i}`], { loop: true })
                    .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                    .to({ scaleX: 1, scaleY: 1 }, 300)
                    .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                    .to({ scaleX: 1, scaleY: 1 }, 300)
            }
        }

        /** 时间终止 */
        private onTimeOut(): void {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        }
    }
} 