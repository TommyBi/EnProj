namespace game {
    export class DDSView extends eui.Component {
        public kLabelDesc: eui.Label;
        public kComBar: game.TimeBarComponent;
        public kCom0: game.DDSComponent;
        public kCom1: game.DDSComponent;
        public kCom2: game.DDSComponent;
        public kComRestart: game.ReStartComponent;
        public kGrpAnimHummer: eui.Group;

        private mOptionCount: number = 3;
        private mCurShowArr: number[] = []; // 当前显示的序列
        private mHintWords: string[] = [    // 目标提示文本
            "sandals",
            "sunglasses",
            "raincoat",
        ]
        private mHintQueue: number[] = [];  // 当前已经提示过得队列
        private mCurHintIdx: number = 0;    // 当前正在提示的队列索引
        private _canSelect: boolean = false;
        private get canSelect(): boolean { return this._canSelect; }
        private set canSelect(b: boolean) {
            this._canSelect = b;
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kCom${i}`].touchEnabled = b;
            }
        }
        private mAnimHammerRight: XDFFrame.DBAnim;
        private mAnimHammerErr: XDFFrame.DBAnim;
        private mPosHammer: any[] = [{
            x: 590,
            y: 300,
        }, {
            x: 1300,
            y: 300,
        }, {
            x: 950,
            y: 600,
        }]

        private mLock_desc_sound: boolean = false;  // 提示音播放锁
        private mLock_anim_mouse: boolean = false;  // 老鼠动画播放时的锁
        private mLock_anim_hammer: boolean = false; // 锤子动画播放时的锁
        private mLock_start: boolean = false;       // 是否开始了的锁
        private get mIsLock(): boolean {
            return this.mLock_desc_sound || this.mLock_anim_mouse || this.mLock_anim_hammer || this.mLock_start;
        }

        constructor() {
            super();
            this.skinName = "DDSViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kCom${i}`].touchChildren = false;
                this[`kCom${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onChoise${i}`], this);
            }

            this.mAnimHammerErr = XDFFrame.DBFactory.createAnim("db_hammer_err", 2);
            this.mAnimHammerErr.setProtery({ x: 0, y: 0, parent: this.kGrpAnimHummer, scaleX: 0.4, scaleY: 0.4 });
            this.mAnimHammerRight = XDFFrame.DBFactory.createAnim("db_hammer_right");
            this.mAnimHammerRight.setProtery({ x: 0, y: 0, parent: this.kGrpAnimHummer, scaleX: 0.9, scaleY: 0.9 });
            this.mAnimHammerErr.visible = this.mAnimHammerRight.visible = false;
            this.kGrpAnimHummer.visible = false;

            this.init();
        }

        private init(): void {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            // 默认不显示待选的选项
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kCom${i}`].setMouseShowState(false);
            }
            this.kLabelDesc.text = "";
        }

        /** 重置到初始化状态 */
        private reset(): void {
            // 默认不显示待选的选项`
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kCom${i}`].setMouseShowState(false);
            }
            this.kLabelDesc.text = "";
            this.kComBar.reset();
        }

        /** 开始游戏 */
        private onStart(): void {
            // 提示队列
            for (let i = 0; i < this.mOptionCount; i++) {
                this.mHintQueue.push(i);
            }

            // 隐藏结束组件
            this.kComRestart.visible = false;

            // 开始
            this.mLock_start = false;
            this.canSelect = false;
            this.next();
        }

        /** 初始化播放顺序 */
        private calShowOrder(): void {
            this.mCurShowArr = [];
            this.produceOrderArr();
            for (let i = 0; i < this.mCurShowArr.length; i++) {
                // format img
                this[`kCom${i}`].name = this.mCurShowArr[i];
                this[`kCom${i}`].formateImg(this.mCurShowArr[i]);
                this.mLock_anim_mouse = true;
                this[`kCom${i}`].playMouseAnim("up", () => {
                    this.mLock_anim_mouse = false;
                }, this);
            }
        }
        /** 生产随机队列 */
        private produceOrderArr(): void {
            if (this.mCurShowArr.length < 3) {
                let idx = Util.randomNum(0, 2);
                if (this.mCurShowArr.indexOf(idx) == -1) {
                    this.mCurShowArr.push(idx);
                    if (this.mCurShowArr.length < 3) {
                        this.produceOrderArr();
                    }
                } else {
                    this.produceOrderArr();
                }
            }
        }

        /** 下一步 */
        private next(): void {
            if (this.mHintQueue.length <= 0) {
                // 完成
                this.reset();
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                return;
            };
            // 随机显示的位置
            this.canSelect = true;
            this.mCurHintIdx = this.mHintQueue.shift();
            this.playHintAction(() => {
                this.calShowOrder();
                this.kComBar.play();
            });
        }

        /** 重新提示 */
        private repeatHint(): void {
            let finishDownCount = 0;
            for (let i = 0; i < this.mOptionCount; i++) {
                this.mLock_anim_mouse = true;
                this[`kCom${i}`].playMouseAnim("down", () => {
                    finishDownCount++;
                    if (finishDownCount >= this.mOptionCount) {
                        this.mLock_anim_mouse = false;
                        this.playHintAction(() => {
                            this.calShowOrder();
                            this.canSelect = true;
                        });
                    }
                }, this);
            }
        }

        private playHintAction(cb: Function): void {
            this.mLock_desc_sound = true;
            XDFSoundManager.play(`sound_lp_dds_option${this.mCurHintIdx}_mp3`, 0, 1, 1, `sound_lp_dds_option${this.mCurHintIdx}_mp3`, () => {
                this.canSelect = true;
                this.mLock_desc_sound = false;
                cb && cb();
            });
            this.kLabelDesc.text = this.mHintWords[this.mCurHintIdx];
        }

        private onChoise0(e: egret.TouchEvent): void {
            this.judge(0, e);
        }
        private onChoise1(e: egret.TouchEvent): void {
            this.judge(1, e);
        }
        private onChoise2(e: egret.TouchEvent): void {
            this.judge(2, e);
        }

        private judge(num: number, e: egret.TouchEvent): void {
            if (this.mIsLock) return;
            if (this[`kCom${num}`].name == String(this.mCurHintIdx)) {
                this.mLock_anim_mouse = true;
                this[`kCom${num}`].playMouseAnim("hit", () => {
                    for (let i = 0; i < this.mOptionCount; i++) {
                        this[`kCom${i}`].playMouseAnim("down", () => {
                            this.mLock_anim_mouse = false;
                        }, this);
                    }
                }, this);
                this.kGrpAnimHummer.x = this.mPosHammer[num].x;
                this.kGrpAnimHummer.y = this.mPosHammer[num].y;
                this.onSelectRight(e);
            } else {
                this.mLock_anim_mouse = true;
                this[`kCom${num}`].playMouseAnim("hit", () => {
                    this.mLock_anim_mouse = false;
                }, this);
                this.kGrpAnimHummer.x = this.mPosHammer[num].x;
                this.kGrpAnimHummer.y = this.mPosHammer[num].y;
                this.onSelectErr(e);
            }
        }

        /** 选择正确 */
        private onSelectRight(e: egret.TouchEvent): void {
            this.kComBar.stop();
            this.canSelect = false;
            XDFSoundManager.play("sound_ding_mp3");
            this.mLock_anim_hammer = true;
            this.playHammerAnim("right", () => {
                this.mLock_anim_hammer = false;
                this.next();
            }, e);
        }

        /** 选择错误 */
        private onSelectErr(e: egret.TouchEvent): void {
            this.canSelect = false;
            XDFSoundManager.play("sound_lp_dds_err_mp3");
            this.canSelect = true;
            this.mLock_anim_hammer = true;
            this.playHammerAnim("err", () => {
                this.mLock_anim_hammer = false;
                this.repeatHint();
            }, e)
        }

        /** 时间终止 */
        private onTimeOut(): void {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
            this.mLock_start = true;
            let finishDownCount = 0;
            this.mLock_anim_mouse = true;
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kCom${i}`].playMouseAnim("down", () => {
                    finishDownCount++;
                    if (finishDownCount >= this.mOptionCount) {
                        this.mLock_anim_mouse = false;
                    }
                }, this);
            }
        }

        private playHammerAnim(type: string, cb: Function, e?: egret.TouchEvent): void {
            this.kGrpAnimHummer.visible = true;
            switch (type) {
                case "right":
                    this.mAnimHammerRight.visible = true;
                    this.mAnimHammerErr.visible = false;
                    this.mAnimHammerRight.play(null, 1, () => {
                        this.kGrpAnimHummer.visible = false;
                        let downFinishCount = 0;
                        cb && cb();
                    }, this);
                    break;
                case "err":
                    this.mAnimHammerErr.visible = true;
                    this.mAnimHammerRight.visible = false;
                    this.mAnimHammerErr.play(null, 1, () => {
                        this.kGrpAnimHummer.visible = false;
                        cb && cb();
                    }, this);
                    break;
            }
        }
    }
} 