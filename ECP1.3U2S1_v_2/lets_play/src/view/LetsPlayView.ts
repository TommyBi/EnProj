namespace game {
    export class LetsPlayView extends eui.Component {
        public kGrpMain: eui.Group;
        public kLabelDesc: eui.Label;
        public kAnim: eui.Group;
        public kComRestart: game.ReStartComponent;
        public kComBar: game.TimeBarComponent;

        private mAnimRole1: XDFFrame.DBAnim;
        private mAnimRole2: XDFFrame.DBAnim;
        private mAnimRole3: XDFFrame.DBAnim;
        private mAnimRole4: XDFFrame.DBAnim;
        private mBall1: XDFFrame.DBAnim;
        private mBall2: XDFFrame.DBAnim;
        private mBall3: XDFFrame.DBAnim;

        currentIndex = 0;
        nextIndex = 0;
        kIcon1: eui.Image;
        kIcon2: eui.Image;
        kAnswer1: eui.Image;
        kAnswer2: eui.Image;
        len = 2;
        isLeft = false;
        mArr = [1, 2];
        constructor() {
            super();
            this.skinName = "LetsPlaySkin";
        };

        protected createChildren() {
            super.createChildren();
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);
            // 初始化动画
            this.mBall1 = XDFFrame.DBFactory.createAnim("ball1");
            this.mBall1.setProtery({ x: 400, y: 600, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mBall3 = XDFFrame.DBFactory.createAnim("ball6");
            this.mBall3.setProtery({ x: 1000, y: 600, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });
            this.mBall2 = XDFFrame.DBFactory.createAnim("ball2");
            this.mBall2.setProtery({ x: 400, y: 600, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mBall1.visible = this.mBall2.visible = this.mBall3.visible = false;

            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("role1");
            this.mAnimRole1.setProtery({ x: 740, y: 900, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("role2");
            this.mAnimRole2.setProtery({ x: 740, y: 900, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole3 = XDFFrame.DBFactory.createAnim("role3");
            this.mAnimRole3.setProtery({ x: 750, y: 880, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole4 = XDFFrame.DBFactory.createAnim("role4");
            this.mAnimRole4.setProtery({ x: 750, y: 880, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole1.visible = this.mAnimRole2.visible = this.mAnimRole3.visible = this.mAnimRole4.visible = false;

            this.init();
        }

        private init(): void {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
        }

        /** 重置到初始化状态 */
        private reset(): void {
            // 默认不显示待选的选项
            this.kComBar.reset();
            this.kIcon1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.kIcon2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.mArr = [1, 2];
        }

        /** 开始游戏 */
        private onStart(): void {

            // 隐藏结束组件
            this.kComRestart.visible = false;


            // 显示npc动画
            this.palyRoleAnim("idle");

            this.kIcon1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.kIcon2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // 开始
            // this.playHintAction();
            // this.kComBar.play();
            this.next();
        }
        onClick(e: egret.TouchEvent) {
            this.touchChildren = false;
            if (e.currentTarget.name == this.currentIndex) {
                this.palyRoleAnim("toulan", () => {
                    if (this.isLeft) {
                        this.mBall1.visible = true;
                        this.mBall1.play(null, 1, () => {
                            this.mBall1.visible = false;
                            this.onSelectRight();
                        }, this);
                    } else {
                        this.mBall3.visible = true;
                        this.mBall3.play(null, 1, () => {
                            this.mBall3.visible = false;
                            this.onSelectRight();
                        }, this);
                    }
                })
            } else {
                this.palyRoleAnim("toulan", () => {
                    let scale = 1;
                    if (this.isLeft) {
                        scale = 1;
                        if (this.mBall2.scaleX < 0) this.mBall2.scaleX *= -1;
                    }
                    else {
                        if (this.mBall2.scaleX > 0) this.mBall2.scaleX *= -1;
                        scale = -1;
                    }

                    if (scale == 1) this.mBall2.x = 400;
                    else this.mBall2.x = 1000;
                    this.mBall2.visible = true;
                    XDFSoundManager.play("sou_mp3", 0, 1, 1, "", () => {
                        XDFSoundManager.play("deng_mp3")
                    });
                    this.mBall2.play(null, 1, () => {
                        this.mBall2.visible = false;
                        this.onSelectErr();
                    }, this);
                })
            }
        }
        /** 切换角色动画显示 */
        private palyRoleAnim(type: string, cb?: Function): void {
            this.mAnimRole1.visible = false;
            this.mAnimRole2.visible = false;
            this.mAnimRole3.visible = false;
            this.mAnimRole4.visible = false;
            switch (type) {
                case "idle":
                    this.mAnimRole1.visible = true;
                    this.mAnimRole1.play(null, 0);
                    break;
                case "toulan":
                    this.mAnimRole2.visible = true;
                    this.mAnimRole2.play(null, 1, cb, this);
                    break;
                case "right":
                    XDFSoundManager.play("sound_lp_choise_right_mp3");
                    this.mAnimRole3.visible = true;
                    this.mAnimRole3.play(null, 1, cb, this);
                    break;
                case "err":
                    this.mAnimRole4.visible = true;
                    this.mAnimRole4.play(null, 1, cb, this);
                    break;
            }
        }


        /** 下一步 */
        private next(): void {
            if (this.mArr.length <= 0) {
                // 完成
                this.reset();
                this.touchChildren = true;
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                return;
            };
            // this.currentIndex = this.mArr.pop();
            let index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];

            let random = Math.random() < 0.5 ? 1 : 2;
            this.kIcon1.source = random == 1 ? "play_9_png" : "play_10_png";
            this.kIcon1.name = random.toString();
            this.kIcon2.source = random == 1 ? "play_10_png" : "play_9_png";
            this.kIcon2.name = (random == 1 ? 2 : 1).toString();
            this.kAnswer1.visible = this.currentIndex == 1;
            this.kAnswer2.visible = this.currentIndex == 2;
            if (this.currentIndex.toString() == this.kIcon1.name) {
                this.isLeft = true;
            } else {
                this.isLeft = false;
            }
            this.playHintAction();
            this.kComBar.play();
        }

        private playHintAction(): void {
            XDFSoundManager.play(`sound${this.currentIndex}_1_mp3`, 0, 1, 1, ``, () => {
                this.touchChildren = true;
            });
        }


        /** 选择正确 */
        private onSelectRight(): void {
            this.kComBar.reset();
            XDFSoundManager.play("sound_ding_mp3");
            this.palyRoleAnim("right", () => {
                this.palyRoleAnim("idle");
                this.next();
            })
        }

        /** 选择错误 */
        private onSelectErr(): void {
            XDFSoundManager.play("sound_lp_choise_err_mp3");
            this.palyRoleAnim("err", () => {
                this.palyRoleAnim("idle");
                this.playHintAction();
            });
        }

        /** 时间终止 */
        private onTimeOut(): void {
            this.reset();
            this.touchChildren = true;
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        }
    }
} 