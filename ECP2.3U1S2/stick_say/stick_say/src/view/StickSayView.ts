namespace game {
    export class StickSayView extends eui.Component {
        public kImgMask0: eui.Image;
        public kImgMaskLine0: eui.Image;
        public kGrpAnim0: eui.Group;
        public kGrpAnim1: eui.Group;
        public kImgMask1: eui.Image;
        public kImgMaskLine1: eui.Image;
        public kImgMask2: eui.Image;
        public kImgMaskLine2: eui.Image;
        public kGrpAnim2: eui.Group;
        public kImgDesc0: eui.Image;
        public kImgDesc1: eui.Image;
        public kImgDesc2: eui.Image;
        public kGrpBtn0: eui.Group;
        public kGrpBtn1: eui.Group;
        public kBtn1: eui.Image;
        public kGrpBtn2: eui.Group;
        public kBtn2: eui.Image;
        public kComReplay: game.ReplayComponent;
        public kComAnswer: game.AnswerComponent;
        public kComWordsPanel: game.WordsPanelCom;
        public kGrpSmokeAnim: eui.Group;

        public mAnimRole0: XDFFrame.DBAnim;
        public mAnimRole1: XDFFrame.DBAnim;
        public mAnimRole2: XDFFrame.DBAnim;
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
        private mSmokeAnimPos: any[] = [
            {
                x: 700,
                y: 240,
            }, {
                x: 1380,
                y: 360,
            }, {
                x: 720,
                y: 700,
            }
        ];

        constructor() {
            super();
            this.skinName = "StickSayViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            for (let i = 0; i < 3; i++) {
                this[`kGrpBtn${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onSelect${i}`], this);
            }

            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.touchFlag, this.onChangeWordsPanelAction, this);

            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("db_role_0");
            this.mAnimRole0.setProtery({ x: 320, y: 210, parent: this.kGrpAnim0, scaleX: 0.7, scaleY: 0.7 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("db_role_1");
            this.mAnimRole1.setProtery({ x: 700, y: 220, parent: this.kGrpAnim1, scaleX: 0.6, scaleY: 0.6 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("db_role_2");
            this.mAnimRole2.setProtery({ x: 400, y: 480, parent: this.kGrpAnim2, scaleX: 1, scaleY: 1 });

            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 400, y: 480, parent: this.kGrpSmokeAnim, scaleX: 1, scaleY: 1 });

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // 单词
            this.kComWordsPanel.setData([
                {
                    words: "cow",
                    imgSrc: "img_ss_3_png",
                    soundSrc: "sound_words_2_mp3",
                    scaleX: 1.3,
                    scaleY: 1.3
                }, {
                    words: "sheep",
                    imgSrc: "img_ss_2_png",
                    soundSrc: "sound_words_1_mp3",
                    scaleX: 1.3,
                    scaleY: 1.3
                }, {
                    words: "chicken",
                    imgSrc: "img_ss_1_png",
                    soundSrc: "sound_words_0_mp3",
                    scaleX: 1.3,
                    scaleY: 1.3
                }
            ])

            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        }
        private onClick() {
            this.kComWordsPanel.hide();
        }

        private reset(): void {
            for (let i = 0; i < 3; i++) {
                this[`kGrpBtn${i}`].visible = true;
                this[`kImgMask${i}`].visible = true;
                this[`kImgMaskLine${i}`].visible = false;
                this[`kImgDesc${i}`].visible = false;
                egret.Tween.removeTweens(this[`kImgMaskLine${i}`]);
                egret.Tween.removeTweens(this[`kImgDesc${i}`]);
                this[`kImgMask${this.mCurHint}`].visible = true;
                this[`kImgMaskLine${this.mCurHint}`].visible = false;
            }

            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;
            this.mHintArr = this.calShowOrder(3);
        }

        /** 开始游戏 */
        private onStart(): void {
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.next();
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
            // play anim
            this[`mAnimRole${this.mCurHint}`].play(null, 0);
            // show desc
            this[`kImgDesc${this.mCurHint}`].scaleX = this[`kImgDesc${this.mCurHint}`].scaleY = 0;
            this[`kImgDesc${this.mCurHint}`].visible = true;
            egret.Tween.get(this[`kImgDesc${this.mCurHint}`]).to({ scaleX: 0.5, scaleY: 0.5 }, 500, egret.Ease.backOut)
            // head mask line
            this[`kImgMask${this.mCurHint}`].visible = this[`kImgMaskLine${this.mCurHint}`].visible = true;
            egret.Tween.removeTweens(this[`kImgMaskLine${this.mCurHint}`]);
            this[`kImgMaskLine${this.mCurHint}`].alpha = 1;
            egret.Tween.get(this[`kImgMaskLine${this.mCurHint}`], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
        }

        private onSelect0(e: egret.TouchEvent): void {
            e.stopPropagation();
            this.onMatch(0);
        }
        private onSelect1(e: egret.TouchEvent): void {
            e.stopPropagation();
            this.onMatch(1);
        }
        private onSelect2(e: egret.TouchEvent): void {
            e.stopPropagation();
            this.onMatch(2);
        }

        private onMatch(touch: number): void {
            if (this.isLock) return;
            if (touch == this.mCurHint) {
                // 正确
                // play anim
                this[`mAnimRole${this.mCurHint}`].stop();
                this[`kGrpBtn${this.mCurHint}`].visible = false;
                // hide desc
                this[`kImgDesc${this.mCurHint}`].visible = false;
                // hide head
                this[`kImgMask${this.mCurHint}`].visible = this[`kImgMaskLine${this.mCurHint}`].visible = false;
                egret.Tween.removeTweens(this[`kImgMaskLine${this.mCurHint}`]);
                this.mLock_sound_select = true;
                this.mAnimSmoke.x = this.mSmokeAnimPos[this.mCurHint].x;
                this.mAnimSmoke.y = this.mSmokeAnimPos[this.mCurHint].y;
                this.mAnimSmoke.play(null, 1);
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
            this.kComWordsPanel.playAction();
        }
    }
} 