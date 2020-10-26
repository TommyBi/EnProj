namespace game {
    export class LetsPlayView extends eui.Component {
        public kGrpMain: eui.Group;
        public kLabelDesc: eui.Label;
        public kImgOption0: eui.Image;
        public kImgOption1: eui.Image;
        public kImgOption2: eui.Image;
        public kImgOption3: eui.Image;
        public kGrpRoleAnim: eui.Group;
        public kComRestart: game.ReStartComponent;
        public kComBar: game.TimeBarComponent;

        private mAnimRoleRight: XDFFrame.DBAnim;
        private mAnimRoleErr: XDFFrame.DBAnim;
        private mAnimRoleIdle: XDFFrame.DBAnim;

        private mOptionCount: number = 4;
        private mCurShowArr: number[] = []; // 当前显示的序列
        private mHintWords: string[] = [    // 目标提示文本
            "I like dogs.",
            "I don't like dogs.",
            "I like cats.",
            "I don't like cats."
        ]
        private mHintQueue: number[] = [];  // 当前已经提示过得队列
        private mCurHintIdx: number = 0;    // 当前正在提示的队列索引
        private _canSelect: boolean = false;
        private get canSelect(): boolean { return this._canSelect; }
        private set canSelect(b: boolean) {
            this._canSelect = b;
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kImgOption${i}`].touchEnabled = b;
            }
        }

        constructor() {
            super();
            this.skinName = "LetsPlaySkin";
        };

        protected createChildren() {
            super.createChildren();
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kImgOption${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onChoise${i}`], this);
            }
            // 初始化动画
            this.mAnimRoleRight = XDFFrame.DBFactory.createAnim("db_right");
            this.mAnimRoleRight.setProtery({ x: 70, y: 10, parent: this.kGrpRoleAnim, scaleX: 0.76, scaleY: 0.76 });
            this.mAnimRoleErr = XDFFrame.DBFactory.createAnim("db_wrong", 9);
            this.mAnimRoleErr.setProtery({ x: 50, y: 60, parent: this.kGrpRoleAnim, scaleX: 0.76, scaleY: 0.76 });
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim("db_idle");
            this.mAnimRoleIdle.setProtery({ x: 50, y: 80, parent: this.kGrpRoleAnim, scaleX: 0.4, scaleY: 0.4 });
            this.mAnimRoleErr.visible = this.mAnimRoleIdle.visible = this.mAnimRoleRight.visible = false;

            this.init();
        }

        private init(): void {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            // 默认不显示待选的选项
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kImgOption${i}`].visible = false;
            }
            this.kGrpRoleAnim.visible = false;
            this.kLabelDesc.text = "";
        }

        /** 重置到初始化状态 */
        private reset(): void {
            // 默认不显示待选的选项
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kImgOption${i}`].visible = false;
            }
            this.kGrpRoleAnim.visible = false;
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

            // 随机显示的位置
            this.calShowOrder();

            // 显示npc动画
            this.kGrpRoleAnim.visible = true;
            this.palyRoleAnim("idle");

            // 开始
            this.canSelect = false;
            this.next();
        }

        /** 切换角色动画显示 */
        private palyRoleAnim(type: string, cb?: Function): void {
            switch (type) {
                case "idle":
                    this.mAnimRoleIdle.visible = true;
                    this.mAnimRoleErr.visible = this.mAnimRoleRight.visible = false;
                    this.mAnimRoleIdle.play(null, 0);
                    break;
                case "right":
                    this.mAnimRoleRight.visible = true;
                    this.mAnimRoleErr.visible = this.mAnimRoleIdle.visible = false;
                    this.mAnimRoleRight.play(null, 1, cb, this);
                    break;
                case "err":
                    this.mAnimRoleErr.visible = true;
                    this.mAnimRoleRight.visible = this.mAnimRoleIdle.visible = false;
                    this.mAnimRoleErr.play(null, 1, cb, this);
                    break;
            }
        }

        /** 初始化播放顺序 */
        private calShowOrder(): void {
            this.mCurShowArr = [];
            this.produceOrderArr();
            for (let i = 0; i < this.mCurShowArr.length; i++) {
                // format img
                this[`kImgOption${i}`].visible = true;
                this[`kImgOption${i}`].source = `img_lp_option${this.mCurShowArr[i]}_png`;
                this[`kImgOption${i}`].name = this.mCurShowArr[i];
            }
        }
        /** 生产随机队列 */
        private produceOrderArr(): void {
            if (this.mCurShowArr.length < 4) {
                let idx = Util.randomNum(0, 3);
                if (this.mCurShowArr.indexOf(idx) == -1) {
                    this.mCurShowArr.push(idx);
                    if (this.mCurShowArr.length < 4) {
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
            this.mCurHintIdx = this.mHintQueue.shift();
            this.playHintAction();
            this.kComBar.play();
        }

        private playHintAction(): void {
            XDFSoundManager.play(`sound_lp_option${this.mCurHintIdx}_mp3`, 0, 1, 1, `sound_lp_option${this.mCurHintIdx}_mp3`, () => {
                this.canSelect = true;
            });
            this.kLabelDesc.text = this.mHintWords[this.mCurHintIdx];
        }

        private onChoise0(): void {
            this.judge(0);
        }
        private onChoise1(): void {
            this.judge(1);
        }
        private onChoise2(): void {
            this.judge(2);
        }
        private onChoise3(): void {
            this.judge(3);
        }

        private judge(num: number): void {
            if (this[`kImgOption${num}`].name == String(this.mCurHintIdx)) {
                // TODO: correct
                this.onSelectRight();
            } else {
                // TODO: err
                this.onSelectErr();
            }
        }

        /** 选择正确 */
        private onSelectRight(): void {
            this.kComBar.reset();
            this.canSelect = false;
            XDFSoundManager.play("sound_ding_mp3");
            XDFSoundManager.play("sound_lp_choise_right_mp3");
            this.palyRoleAnim("right", () => {
                this.palyRoleAnim("idle");
                this.next();
            })
        }

        /** 选择错误 */
        private onSelectErr(): void {
            this.canSelect = false;
            XDFSoundManager.play("sound_lp_choise_err_mp3");
            this.palyRoleAnim("err", () => {
                this.palyRoleAnim("idle");
                this.canSelect = true;
            });
        }

        /** 时间终止 */
        private onTimeOut(): void {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        }
    }
} 