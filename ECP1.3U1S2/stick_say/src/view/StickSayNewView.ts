namespace game {
    export class StickSayNewView extends eui.Component {
        public kGrpBtn0: eui.Group;
        public kGrpBtn1: eui.Group;
        public kGrpBtn2: eui.Group;
        public kGrpBtn3: eui.Group;
        public kImg0: eui.Image;
        public kImgMask0: eui.Image;
        public kImgMaskLine0: eui.Image;
        public kImg1: eui.Image;
        public kImgMask1: eui.Image;
        public kImgMaskLine1: eui.Image;
        public kImg2: eui.Image;
        public kImgMask2: eui.Image;
        public kImgMaskLine2: eui.Image;
        public kImg3: eui.Image;
        public kImgMask3: eui.Image;
        public kImgMaskLine3: eui.Image;
        public kGrpAnim: eui.Group;
        public kComAnswer: game.AnswerComponent;
        public kComReplay: game.ReplayComponent;
        public kComWordsPanel: game.WordsPanelCom;

        public mAnimSmoke: XDFFrame.DBAnim;
        private mHintArr: number[] = [];
        private mCurHint: number = 0;
        private mLock_sound_select: boolean = false;// 操作锁 - 是否正在播放选中的声音
        private mLock_startGame: boolean = true;    // 操作锁 - 是否开始了游戏
        private mLock_isFinish: boolean = false;    // 操作锁 - 是否已经完成了一局
        private get isLock(): boolean {
            return this.mLock_sound_select ||
                this.mLock_startGame ||
                this.mLock_isFinish ||
                this.kComAnswer.visible;
        }
        private readonly mSmokeAnimPos: { x: number, y: number }[] = [{ x: 730, y: 200 }, { x: 1230, y: 200 }, { x: 750, y: 690 }, { x: 1230, y: 700 }]

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
                this[`kGrpBtn${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onSelect${i}`], this);
            }

            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.touchFlag, this.onChangeWordsPanelAction, this);

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGrpAnim, scaleX: 1.5, scaleY: 1.5 });

            // 单词
            this.kComWordsPanel.setData([
                {
                    words: "shoes",
                    imgSrc: "img_ss_0_png",
                    soundSrc: "sound_words_0_mp3",
                }, {
                    words: "boots",
                    imgSrc: "img_ss_1_png",
                    soundSrc: "sound_words_1_mp3",
                }, {
                    words: "sneakers",
                    imgSrc: "img_ss_2_png",
                    soundSrc: "sound_words_2_mp3",
                }, {
                    words: "slippers",
                    imgSrc: "img_ss_3_png",
                    soundSrc: "sound_words_3_mp3",
                },
            ])

            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        }

        private reset(): void {
            for (let i = 0; i < 4; i++) {
                this[`kGrpBtn${i}`].visible = this[`kGrpBtn${i}`].includeInLayout = true;
                this[`kImgMask${i}`].visible = true;
                this[`kImgMaskLine${i}`].alpha = 0;
                this[`kImg${i}`].visible = false;
            }

            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;

            this.mHintArr = this.calShowOrder(4);
        }

        /** 开始游戏 */
        private onStart(): void {
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.next();
            this.mAnimSmoke.play();
        }

        /** 提示下一个 */
        private next(): void {
            if (this.mHintArr.length <= 0) {
                // 完成
                this.mLock_isFinish = true;
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            } else {
                // 没完成
                this.mCurHint = this.mHintArr.shift();
                this.hint();
            }
        }

        /** 提示 */
        private hint(): void {
            // sound
            XDFSoundManager.play(`sound_desc_${this.mCurHint}_mp3`);
            // show desc
            this[`kImgMaskLine${this.mCurHint}`].alpha = 0;
            egret.Tween.get(this[`kImgMaskLine${this.mCurHint}`], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
        }

        private onSelect0(): void {
            this.onMatch(0);
        }
        private onSelect1(): void {
            this.onMatch(1);
        }
        private onSelect2(): void {
            this.onMatch(2);
        }
        private onSelect3(): void {
            this.onMatch(3);
        }

        private onMatch(touch: number): void {
            if (this.isLock) return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 清理重置蒙版和蒙版效果
                this[`kImgMask${this.mCurHint}`].visible = false;
                egret.Tween.removeTweens(this[`kImgMaskLine${this.mCurHint}`]);
                this[`kImgMaskLine${this.mCurHint}`].alpha = 0;
                this[`kGrpBtn${this.mCurHint}`].visible = false;

                // 播放烟雾
                this.mAnimSmoke.x = this.mSmokeAnimPos[this.mCurHint].x;
                this.mAnimSmoke.y = this.mSmokeAnimPos[this.mCurHint].y;
                this.mAnimSmoke.play(null, 1);
                this.mLock_sound_select = true;
                this[`kImg${this.mCurHint}`].scaleX = this[`kImg${this.mCurHint}`].scaleY = 1;
                let sScale = this.mCurHint == 2 ? 1.7 : 2;
                let tScale = this.mCurHint == 2 ? 1.75 : 2.1;
                this[`kImg${this.mCurHint}`].visible = true;
                this[`kImg${this.mCurHint}`].scaleX = this[`kImg${this.mCurHint}`].scaleY = sScale;
                egret.Tween.get(this[`kImg${this.mCurHint}`])
                    .to({ scaleX: tScale, scaleY: tScale }, 300)
                    .to({ scaleX: sScale, scaleY: sScale }, 300)
                    .to({ scaleX: tScale, scaleY: tScale }, 300)
                    .to({ scaleX: sScale, scaleY: sScale }, 300)
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
                    this.mLock_sound_select = false;
                    this.next();
                });
            } else {
                // 错误
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    XDFSoundManager.play(`sound_desc_${this.mCurHint}_mp3`);
                })
            }
        }

        /** 重新开始 */
        private onReStart(): void {
            this.mLock_isFinish = false;
            this.reset();
            this.next();
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

        /** 是否开始显示单词 */
        private onChangeWordsPanelAction(): void {
            this.kComWordsPanel.visible = true;
            this.kComWordsPanel.playAction(() => {
                this.kComWordsPanel.visible = !this.kComWordsPanel.isHide
            });
        }

        /** 点击是否要触发收回 */
        private onTouch(e: egret.TouchEvent): void {
            if (e.target.name == "flag") return;
            if (this.kComWordsPanel.visible) {
                if (e.stageX > 278) this.onChangeWordsPanelAction();
            }
        }
    }
} 