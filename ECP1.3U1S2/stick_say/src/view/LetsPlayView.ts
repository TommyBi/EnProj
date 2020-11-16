namespace game {
    export class LetsPlayView extends eui.Component {
        public kComTimeBar: game.TimeBarComponent;
        public kGrpRole: eui.Group;
        public kComRestart: game.ReStartComponent;
        public kGrpOption0: eui.Group;
        public kGrpOption1: eui.Group;
        public kGrpOption2: eui.Group;

        private mAnimOptionErr0: XDFFrame.DBAnim;
        private mAnimOptionDrop0: XDFFrame.DBAnim;
        private mAnimOptionErr1: XDFFrame.DBAnim;
        private mAnimOptionDrop1: XDFFrame.DBAnim;
        private mAnimOptionErr2: XDFFrame.DBAnim;
        private mAnimOptionDrop2: XDFFrame.DBAnim;
        private mAnimRoleRight: XDFFrame.DBAnim;
        private mAnimRoleErr: XDFFrame.DBAnim;
        private mAnimRoleIdle: XDFFrame.DBAnim;

        private mHintIdx: number = -1;
        private mHintArr: number[] = [];
        private mPosArr: number[] = [];
        private readonly pos: any[] = [{ x: 435, y: 317 }, { x: 860, y: 217 }, { x: 1300, y: 317 }];


        private mLock_sound: boolean = false;
        private mLock_action: boolean = false;
        private get isLock(): boolean {
            return this.mLock_sound || this.mLock_action;
        }


        constructor() {
            super();
            this.skinName = "LetsPlaySkin";
        };

        protected createChildren() {
            super.createChildren();
            // 注册界面事件
            for (let i = 0; i < 3; i++) {
                this[`kGrpOption${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onChoise${i}`], this);
            }
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);

            // 初始选项动画
            for (let i = 0; i < 3; i++) {
                this[`mAnimOptionErr${i}`] = XDFFrame.DBFactory.createAnim(`db_${i}_err`);
                this[`mAnimOptionErr${i}`].setProtery({ x: 100, y: 100, parent: this[`kGrpOption${i}`], scaleX: 2, scaleY: 2 });
                this[`mAnimOptionDrop${i}`] = XDFFrame.DBFactory.createAnim(`db_${i}_drop`);
                this[`mAnimOptionDrop${i}`].setProtery({ x: 105, y: 150, parent: this[`kGrpOption${i}`], scaleX: 2, scaleY: 2 });
            }

            // 初始化角色动画
            this.mAnimRoleErr = XDFFrame.DBFactory.createAnim(`db_role_err`);
            this.mAnimRoleErr.setProtery({ x: 120, y: 20, parent: this.kGrpRole, scaleX: 2, scaleY: 2 });
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim(`db_role_idle`);
            this.mAnimRoleIdle.setProtery({ x: 100, y: 100, parent: this.kGrpRole, scaleX: 2, scaleY: 2 });
            this.mAnimRoleRight = XDFFrame.DBFactory.createAnim(`db_role_right`);
            this.mAnimRoleRight.setProtery({ x: 120, y: 20, parent: this.kGrpRole, scaleX: 2, scaleY: 2 });

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
            this.kGrpOption0.visible = this.kGrpOption1.visible = this.kGrpOption2.visible = this.kGrpRole.visible = false;
        }

        /** 开始游戏 */
        private onStart(): void {
            this.kGrpOption0.visible = this.kGrpOption1.visible = this.kGrpOption2.visible = this.kGrpRole.visible = true;
            this.kComRestart.visible = false;
            this.mHintArr = Util.calShowOrder(3);
            this.kComTimeBar.play();
            this.next();
        }

        /** 切换角色动画显示 */
        private playRoleAnim(type: string, cb?: Function): void {
            switch (type) {
                case "idle":
                    this.mAnimRoleIdle.visible = this.mAnimRoleErr.visible = this.mAnimRoleRight.visible = false;
                    this.mAnimRoleIdle.visible = true;
                    this.mAnimRoleIdle.play(null, 0);
                    break;
                case "right":
                    this.mAnimRoleIdle.visible = this.mAnimRoleErr.visible = this.mAnimRoleRight.visible = false;
                    this.mAnimRoleRight.visible = true;
                    XDFSoundManager.play("sound_lp_choise_right_mp3");
                    this.mAnimRoleRight.play(null, 1, cb, this);
                    break;
                case "err":
                    this.mAnimRoleIdle.visible = this.mAnimRoleErr.visible = this.mAnimRoleRight.visible = false;
                    this.mAnimRoleErr.visible = true;
                    XDFSoundManager.play("sound_lp_choise_err_mp3");
                    this.mAnimRoleErr.play(null, 1, cb, this);
                    break;
            }
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
            if (this.isLock) return;
            this.playSelectAnim(num, () => { });
            this.kGrpRole.x = this[`kGrpOption${num}`].x;
            if (num == this.mHintIdx) {
                // TODO: correct
                this.onSelectRight();
            } else {
                // TODO: err
                this.onSelectErr();
            }
        }

        /** 进行下一个操作 */
        private next(): void {
            console.log("next");
            if (this.mHintArr.length <= 0) {
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                this.reset();
                return;
            }
            this.mHintIdx = this.mHintArr.shift();
            this.mPosArr = Util.calShowOrder(3);
            // 格式化摆放的位置
            for (let i = 0; i < 3; i++) {
                this[`kGrpOption${i}`].x = this.pos[this.mPosArr[`${i}`]].x;
                this[`kGrpOption${i}`].y = this.pos[this.mPosArr[`${i}`]].y;
                this[`mAnimOptionErr${i}`].visible = true;
                this[`mAnimOptionDrop${i}`].visible = false;
            }
            this.mLock_sound = true;
            XDFSoundManager.play(`sound_${this.mHintIdx}_mp3`, 0, 1, 1, `sound_${this.mHintIdx}_mp3`, () => {
                this.mLock_sound = false;
            });
            this.playRoleAnim("idle");
            this.kComTimeBar.play();
        }

        /** 选择正确 */
        private onSelectRight(): void {
            this.kComTimeBar.stop();
            this.playRoleAnim("right", () => {
                this.playRoleAnim("idle");
            });
        }

        /** 选择错误 */
        private onSelectErr(): void {
            this.playRoleAnim("err", () => {
                this.playRoleAnim("idle");
                this.mLock_sound = true;
                XDFSoundManager.play(`sound_${this.mHintIdx}_mp3`, 0, 1, 1, `sound_${this.mHintIdx}_mp3`, () => {
                    this.mLock_sound = false;
                });
            });
        }

        private playSelectAnim(num, cb: Function): void {
            if (num == this.mHintIdx) {
                // 选择正确
                XDFSoundManager.play("sound_ding_mp3");
                this[`mAnimOptionErr${num}`].visible = false;
                this[`mAnimOptionDrop${num}`].visible = true;
                this.mLock_action = true;
                this[`mAnimOptionDrop${num}`].play(null, 1, () => {
                    this.mLock_action = false;
                    this.next();
                }, this);
            } else {
                // 选择错误
                this[`mAnimOptionDrop${num}`].visible = false
                this[`mAnimOptionErr${num}`].visible = true;
                this.mLock_action = true;
                this[`mAnimOptionErr${num}`].play(null, 1, () => {
                    this.mLock_action = false;
                }, this);
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