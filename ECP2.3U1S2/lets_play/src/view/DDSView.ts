namespace game {
    export class DDSView extends eui.Component {
        public kLabelDesc: eui.Label;
        public kComBar: game.TimeBarComponent;
        public kCom0: game.DDSComponent;
        public kCom1: game.DDSComponent;
        public kCom2: game.DDSComponent;
        public kComRestart: game.ReStartComponent;

        private mOptionCount: number = 3;
        private mCurShowArr: number[] = []; // 当前显示的序列
        private mHintWords: string[] = [    // 目标提示文本
            "I like dogs.",
            "I don't like dogs.",
            "I like cats.",
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

            this.init();
        }

        private init(): void {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            // 默认不显示待选的选项
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kCom${i}`].visible = false;
            }
            this.kLabelDesc.text = "";
        }

        /** 重置到初始化状态 */
        private reset(): void {
            // 默认不显示待选的选项`
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kCom${i}`].visible = false;
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

            // 随机显示的位置
            this.calShowOrder();

            // 开始
            this.canSelect = false;
            this.next();
        }

        /** 初始化播放顺序 */
        private calShowOrder(): void {
            this.mCurShowArr = [];
            this.produceOrderArr();
            for (let i = 0; i < this.mCurShowArr.length; i++) {
                // format img
                this[`kCom${i}`].visible = true;
                // this[`kCom${i}`].source = `img_lp_option${this.mCurShowArr[i]}_png`;
                this[`kCom${i}`].name = this.mCurShowArr[i];
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
            this.canSelect = true;
            this.mCurHintIdx = this.mHintQueue.shift();
            this.playHintAction();
            this.kComBar.play();
        }

        private playHintAction(): void {
            XDFSoundManager.play(`sound_lp_dds_option${this.mCurHintIdx}_mp3`, 0, 1, 1, `sound_lp_dds_option${this.mCurHintIdx}_mp3`, () => {
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

        private judge(num: number): void {
            if (this[`kCom${num}`].name == String(this.mCurHintIdx)) {
                this.onSelectRight();
            } else {
                this.onSelectErr();
            }
        }

        /** 选择正确 */
        private onSelectRight(): void {
            this.kComBar.reset();
            this.canSelect = false;
            XDFSoundManager.play("sound_ding_mp3");
            XDFSoundManager.play("sound_lp_choise_right_mp3");
            // TODO: com hide
            this.next();
        }

        /** 选择错误 */
        private onSelectErr(): void {
            this.canSelect = false;
            XDFSoundManager.play("sound_lp_dds_err_mp3");
            this.canSelect = true;
        }

        /** 时间终止 */
        private onTimeOut(): void {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        }
    }
} 