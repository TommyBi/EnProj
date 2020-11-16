namespace game {
    export class LetsPlayView extends eui.Component {
        public kImg0: eui.Image;
        public kImg1: eui.Image;
        public kImg2: eui.Image;
        public kGrpRole: eui.Group;
        public kLabelDesc: eui.Label;
        public kComRestart: game.ReStartComponent;
        public kComTimeBar: game.TimeBarComponent;

        private mAnimRoleWin: XDFFrame.DBAnim;
        private mAnimRoleLose: XDFFrame.DBAnim;
        private mAnimRoleIdle: XDFFrame.DBAnim;

        private mHintIdx: number = -1;
        private mHintArr: number[] = [];
        private mPosArr: number[] = [];

        private mLock_sound: boolean = false;
        private mLock_action: boolean = false;
        private get isLock(): boolean {
            return this.mLock_sound || this.mLock_action;
        }
        private mDescContent: string[] = [
            "Don't walk on a frozen lake.",
            "Don't run on icy roads.",
            "You should be careful around fire.",
        ]

        constructor() {
            super();
            this.skinName = "LetsPlaySkin";
        };

        protected createChildren() {
            super.createChildren();
            // 注册界面事件
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judge, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);

            // 初始化角色动画
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim(`role_idle`);
            this.mAnimRoleIdle.setProtery({ x: 0, y: 50, parent: this.kGrpRole, scaleX: 0.8, scaleY: 0.8 });
            this.mAnimRoleWin = XDFFrame.DBFactory.createAnim(`role_win`, 2);
            this.mAnimRoleWin.setProtery({ x: -335, y: -50, parent: this.kGrpRole, scaleX: 1.3, scaleY: 1.3 });
            this.mAnimRoleLose = XDFFrame.DBFactory.createAnim(`role_lose`, 2);
            this.mAnimRoleLose.setProtery({ x: -250, y: -45, parent: this.kGrpRole, scaleX: 1.3, scaleY: 1.3 });
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
            this.kLabelDesc.text = "";
            this.kImg0.visible = this.kImg1.visible = this.kImg2.visible = this.kGrpRole.visible = false;
        }

        /** 开始游戏 */
        private onStart(): void {
            this.kImg0.visible = this.kImg1.visible = this.kImg2.visible = this.kGrpRole.visible = true;
            this.kComRestart.visible = false;
            this.mHintArr = Util.calShowOrder(3);
            this.next();
        }

        /** 切换角色动画显示 */
        private playRoleAnim(type: string, cb?: Function): void {
            switch (type) {
                case "idle":
                    this.mAnimRoleIdle.visible = this.mAnimRoleLose.visible = this.mAnimRoleWin.visible = false;
                    this.mAnimRoleIdle.visible = true;
                    this.mAnimRoleIdle.play(null, 0);
                    break;
                case "win":
                    this.mAnimRoleIdle.visible = this.mAnimRoleLose.visible = this.mAnimRoleWin.visible = false;
                    this.mAnimRoleWin.visible = true;
                    this.mAnimRoleWin.play(null, 1, cb, this);
                    break;
                case "lose":
                    this.mAnimRoleIdle.visible = this.mAnimRoleLose.visible = this.mAnimRoleWin.visible = false;
                    this.mAnimRoleLose.visible = true;
                    this.mAnimRoleLose.play(null, 1, cb, this);
                    break;
            }
        }


        private judge(e: egret.TouchEvent): void {
            if (this.isLock) return;
            if (e.target.name == "") return;
            let num = Number(e.target.name);
            if (num == this.mHintIdx) {
                this.onSelectRight();
            } else {
                this.onSelectErr();
            }
        }

        /** 进行下一个操作 */
        private next(): void {
            this.mPosArr = Util.calShowOrder(3);
            for (let i = 0; i < 3; i++) {
                this[`kImg${i}`].source = `img_option_${this.mPosArr[i]}_png`;
                this[`kImg${i}`].name = `${this.mPosArr[i]}`;
            }

            if (this.mHintArr.length <= 0) {
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                this.reset();
                return;
            }
            this.mHintIdx = this.mHintArr.shift();

            this.mLock_sound = true;
            XDFSoundManager.play(`sound_${this.mHintIdx}_mp3`, 0, 1, 1, `sound_${this.mHintIdx}_mp3`, () => {
                this.mLock_sound = false;
            });
            this.playRoleAnim("idle");
            this.kLabelDesc.text = this.mDescContent[this.mHintIdx];
            this.kComTimeBar.play();
        }

        /** 选择正确 */
        private onSelectRight(): void {
            this.kComTimeBar.stop();
            XDFSoundManager.play("sound_football_mp3", 0, 1, 1, "sound_football_mp3", () => {
                XDFSoundManager.play("sound_win_mp3");
            });
            this.mLock_action = true;
            this.playRoleAnim("win", () => {
                this.mLock_action = false;
                this.playRoleAnim("idle");
                this.next();
            });
        }

        /** 选择错误 */
        private onSelectErr(): void {
            XDFSoundManager.play("sound_football_mp3", 0, 1, 1, "sound_football_mp3", () => {
                XDFSoundManager.play("sound_lose_mp3");
            });
            this.mLock_action = true;
            this.playRoleAnim("lose", () => {
                this.mLock_action = false;
                this.playRoleAnim("idle");
                this.mLock_sound = true;
                XDFSoundManager.play(`sound_${this.mHintIdx}_mp3`, 0, 1, 1, `sound_${this.mHintIdx}_mp3`, () => {
                    this.mLock_sound = false;
                });
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