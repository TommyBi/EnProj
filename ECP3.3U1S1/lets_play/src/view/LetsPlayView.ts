namespace game {
    export class LetsPlayView extends eui.Component {
        public kGrpMain: eui.Group;
        public kGrpSheep: eui.Group;
        public kGrpSheepIdle: eui.Group;
        public kGrpSheepCatch: eui.Group;
        public kGrpSheepJump: eui.Group;
        public kImgMask: eui.Rect;
        public kImgHint: eui.Image;
        public kGrpOption: eui.Group;
        public kGrpOption0: eui.Group;
        public kImgOption0: eui.Image;
        public kGrpOption1: eui.Group;
        public kImgOption1: eui.Image;
        public kGrpOption2: eui.Group;
        public kImgOption2: eui.Image;
        public kGrpOption3: eui.Group;
        public kImgOption3: eui.Image;
        public kGrpGame: eui.Group;
        public kComRestart: game.ReStartComponent;
        public kLabelHint: eui.Label;
        public kComBar: game.TimeBarComponent;

        private mAnimSheepCatch: XDFFrame.DBAnim;
        private mAnimSheepIdle: XDFFrame.DBAnim;
        private mAnimSheepJump: XDFFrame.DBAnim;

        private mHintArr: string[] = ["snow", "plant", "sled", "swim"];
        private mCurrentHint: string = "";
        private mOrder: number[] = [];
        private mCurHintIdx: number = 0;
        private mShowOrder: number[] = [];

        private mLock_playAnim: boolean = false;
        private mLock_sound: boolean = false;
        private get mIsLock(): boolean {
            return this.mLock_sound || this.mLock_playAnim;
        }

        constructor() {
            super();
            this.skinName = "LetsPlaySkin";
        };

        protected createChildren() {
            super.createChildren();
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);
            this.kGrpOption0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJudge0, this);
            this.kGrpOption1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJudge1, this);
            this.kGrpOption2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJudge2, this);
            this.kGrpOption3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJudge3, this);
            this.init();
        }

        private init(): void {
            this.kComRestart.visible = true;
            this.kGrpOption.visible = false;
            this.kComRestart.playActionStart();
            this.kImgHint.mask = this.kImgMask;

            // init DBAnim
            this.mAnimSheepIdle = XDFFrame.DBFactory.createAnim("db_sheep_idle", 3);
            this.mAnimSheepIdle.setProtery({ parent: this.kGrpSheepIdle, scaleX: 1.5, scaleY: 1.5 });
            this.mAnimSheepCatch = XDFFrame.DBFactory.createAnim("db_sheep_catch", 2);
            this.mAnimSheepCatch.setProtery({ parent: this.kGrpSheepCatch, scaleX: 1.5, scaleY: 1.5 });
            this.mAnimSheepJump = XDFFrame.DBFactory.createAnim("db_sheep_jump", 3);
            this.mAnimSheepJump.setProtery({ parent: this.kGrpSheepJump, scaleX: 1.5, scaleY: 1.5 });
            this.kGrpSheepCatch.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepIdle.visible = true;
            this.mAnimSheepIdle.play(null, 0);
        }

        private onStart(): void {
            this.kComRestart.visible = false;
            this.mOrder = this.calShowOrder(4);
            this.kGrpOption.visible = true;
            this.hint();
        }

        private hint(): void {
            if (this.mOrder.length <= 0) {
                // 完成 游戏结束
                this.kComBar.reset();
                this.kComRestart.visible = true;
                this.kGrpOption.visible = false;
                this.kComRestart.playActionGoodJob();
            } else {
                // 刷新显示界面中对应图片  
                this.mShowOrder = this.calShowOrder(4);
                this.formatPicInfo();

                this.mCurHintIdx = this.mOrder.shift();
                this.mCurrentHint = this.mHintArr[this.mCurHintIdx];
                this.mLock_sound = true;
                XDFSoundManager.play(`sound_words_${this.mCurrentHint}_mp3`, 0, 1, 1, `sound_words_${this.mCurrentHint}_mp3`, () => {
                    this.mLock_sound = false;
                });
                this.kLabelHint.text = `${this.mCurrentHint}`;
                this.kComBar.play();
            }
        }

        private formatPicInfo(): void {
            for (let i = 0; i < this.mShowOrder.length; i++) {
                let picIdx = this.mShowOrder[i];
                this[`kImgOption${i}`].source = `img_lp_option${picIdx}_png`;
                this[`kGrpOption${i}`].name = this.mHintArr[picIdx];
            }
        }

        private playSheepCatch(cb?: Function): void {
            this.kGrpSheepIdle.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepCatch.visible = true;
            this.mLock_playAnim = true;
            this.mAnimSheepCatch.play(null, 1, () => {
                this.mLock_playAnim = false;
                this.kGrpSheepCatch.visible = false;
                this.playSheepIdle();
                cb && cb();
            }, this);
        }

        private playSheepIdle(): void {
            this.kGrpSheepCatch.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepIdle.visible = true;
            this.mAnimSheepIdle.play(null, 0);
        }

        private playSheepJump(cb: Function): void {
            this.kGrpSheepCatch.visible = this.kGrpSheepIdle.visible = false;
            this.kGrpSheepJump.visible = true;
            this.mLock_playAnim = true;
            this.mAnimSheepJump.play(null, 1, () => {
                this.mLock_playAnim = false;
                this.playSheepIdle();
                cb && cb();
            }, this);
        }

        /** 判断结果 */
        private onJudge0(): void { this.onJudge(0); }
        private onJudge1(): void { this.onJudge(1); }
        private onJudge2(): void { this.onJudge(2); }
        private onJudge3(): void { this.onJudge(3); }

        /** 点击 */
        private onJudge(idx: number): void {
            if (this.mIsLock) return;
            XDFSoundManager.play("sound_choise_mp3");
            this.onPlayTouchEffect(this[`kImgOption${idx}`]);
            if (this[`kGrpOption${idx}`].name == this.mCurrentHint) {
                this.kComBar.stop();
                this.showCorrect(() => {
                    if (this.mHintArr.length == 0) {
                        // finish
                        this.kComRestart.visible = true;
                        this.kComRestart.playActionGoodJob();
                    } else {
                        // next
                        this.hint();
                    }
                })
            } else {
                this.showErr();
            }
        }

        /** 播放点击效果 */
        private onPlayTouchEffect(com: any): void {
            egret.Tween.removeTweens(com);
            let sScaleX = com.scaleX;
            let sScaleY = com.scaleY;
            egret.Tween.get(com)
                .to({ scaleX: sScaleX * 0.95, scaleY: sScaleX * 0.95 }, 70)
                .to({ scaleX: sScaleX * 1.05, scaleY: sScaleX * 1.05 }, 140)
                .to({ scaleX: sScaleX, scaleY: sScaleX }, 70)
        }

        private showCorrect(cb: Function): void {
            XDFSoundManager.play("sound_start_mp3");
            this.mLock_playAnim = true;
            this.playSheepCatch(() => {
                this.mLock_playAnim = false;
                cb && cb();
            })
        }

        private showErr(): void {
            XDFSoundManager.play("sound_die_mp3");
            this.playSheepJump(() => {
                XDFSoundManager.play(`sound_words_${this.mCurrentHint}_mp3`);
            })
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

        private onTimeOut(): void {
            this.kComBar.reset();
            this.kGrpOption.visible = false;
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        }

    }
} 