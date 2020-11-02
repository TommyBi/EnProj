namespace game {
    export class StickSay2View extends eui.Component {

        public kImgMask0: eui.Image;
        public kImgMaskLine0: eui.Image;
        public kImgMask1: eui.Image;
        public kImgMaskLine1: eui.Image;
        public kImgMask2: eui.Image;
        public kImgMaskLine2: eui.Image;
        public kImgOption0: eui.Image;
        public kImgOption1: eui.Image;
        public kImgOption2: eui.Image;
        public kGrpAnim: eui.Group;
        public kComAnswer: game.AnswerComponent;
        public kComReplay: game.ReplayComponent;
        public kGrpDesc0: eui.Group;
        public kGrpDesc1: eui.Group;
        public kGrpDesc2: eui.Group;

        public mAnimRole0: XDFFrame.DBAnim;
        public mAnimRole1: XDFFrame.DBAnim;
        public mAnimRole2: XDFFrame.DBAnim;

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

        constructor() {
            super();
            this.skinName = "StickSay2ViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            for (let i = 0; i < 3; i++) {
                this[`kImgOption${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onSelect${i}`], this);
            }

            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);

            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("db_role_0", 3);
            this.mAnimRole0.setProtery({ x: 1190, y: 330, parent: this.kGrpAnim, scaleX: 0.79, scaleY: 0.79 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("db_role_1", 5);
            this.mAnimRole1.setProtery({ x: 830, y: 200, parent: this.kGrpAnim, scaleX: 0.8, scaleY: 0.8 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("db_role_2", 3);
            this.mAnimRole2.setProtery({ x: 980, y: 760, parent: this.kGrpAnim, scaleX: 1.35, scaleY: 1.35 });


            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        }

        private reset(): void {
            for (let i = 0; i < 3; i++) {
                this[`kGrpDesc${i}`].visible = false;
                this[`kImgMask${i}`].visible = true;
                this[`kImgMaskLine${i}`].visible = true;
                this[`kImgOption${i}`].visible = true;
                egret.Tween.removeTweens(this[`kImgMaskLine${i}`]);
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
            // mask line
            this[`kImgMask${this.mCurHint}`].visible = this[`kImgMaskLine${this.mCurHint}`].visible = true;
            egret.Tween.removeTweens(this[`kImgMaskLine${this.mCurHint}`]);
            this[`kImgMaskLine${this.mCurHint}`].alpha = 1;
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

        private onMatch(touch: number): void {
            if (this.isLock) return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 正确
                // play anim
                this[`mAnimRole${this.mCurHint}`].play(null, 4);
                // show desc
                this[`kGrpDesc${this.mCurHint}`].visible = true;
                // hide mask
                this[`kImgMask${this.mCurHint}`].visible = this[`kImgMaskLine${this.mCurHint}`].visible = false;
                // hide option
                this[`kImgOption${this.mCurHint}`].visible = false;
                egret.Tween.removeTweens(this[`kImgMaskLine${this.mCurHint}`]);
                this.mLock_sound_select = true;
                XDFSoundManager.play(`sound_ss_option${this.mCurHint}_mp3`);
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
                    this.mLock_sound_select = false;
                    this.next();
                });
            } else {
                // 错误
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
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
    }
} 