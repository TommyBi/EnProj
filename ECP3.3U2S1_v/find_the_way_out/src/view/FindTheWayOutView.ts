namespace game {
    export class FindTheWayOutView extends eui.Component {
        public kIcon0: eui.Image;
        public kIcon1: eui.Image;
        public kIcon2: eui.Image;
        public kGrpFrame0: eui.Group;
        public kGrpFrame1: eui.Group;
        public kGrpFrame2: eui.Group;
        public kGrpAnim: eui.Group;
        public kComReplay: game.ReplayComponent;
        public kComAnswer: game.AnswerComponent;

        private mAnimErr: XDFFrame.DBAnim;
        private mAnimIdle: XDFFrame.DBAnim;
        private mAnimPool: XDFFrame.DBAnim;
        private mAnimRun: XDFFrame.DBAnim;

        private mLock_startGame: boolean = false;
        private mLock_isFinish: boolean = false;
        private mLock_sound: boolean = false;
        private mLock_move: boolean = false;
        private get isLock(): boolean {
            return this.mLock_isFinish || this.mLock_isFinish || this.mLock_sound || this.mLock_move;
        }

        private mCurIdx: number = -1;
        private mRightOption: number[] = [0, 1, 1];
        private mErrPos: any[] = [
            { x: 1560, y: 370, scaleX: -1 },
            { x: 353, y: 530, scaleX: 1 },
            { x: 660, y: 960, scaleX: 1 },
        ]
        private mRightPos: any[] = [
            { x: 353, y: 370, scaleX: 1 },
            { x: 1560, y: 530, scaleX: -1 },
            { x: 1314, y: 980, scaleX: -1 },
        ]

        constructor() {
            super();
            this.skinName = "FindTheWayOutSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);

            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);

            this.mAnimErr = XDFFrame.DBFactory.createAnim("db_role_err");
            this.mAnimErr.setProtery({ x: 100, y: 100, parent: this.kGrpAnim, scaleX: 1, scaleY: 1 });
            this.mAnimIdle = XDFFrame.DBFactory.createAnim("db_role_idle");
            this.mAnimIdle.setProtery({ x: 100, y: 100, parent: this.kGrpAnim, scaleX: 1, scaleY: 1 });
            this.mAnimPool = XDFFrame.DBFactory.createAnim("db_role_pool");
            this.mAnimPool.setProtery({ x: 100, y: 100, parent: this.kGrpAnim, scaleX: 1, scaleY: 1 });
            this.mAnimRun = XDFFrame.DBFactory.createAnim("db_role_run");
            this.mAnimRun.setProtery({ x: 100, y: 100, parent: this.kGrpAnim, scaleX: 1, scaleY: 1 });

            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComAnswer.visible = false;
            this.kComReplay.showStart();
        }

        private onSelect(e: egret.TouchEvent): void {
            console.log("e:", e);
            if (!e.target.name) return;
            let arr = e.target.name.split("_");
            if (arr < 2) return;
            this.onMatch(arr[0], arr[1]);
        }

        private reset(): void {
            for (let i = 0; i < 3; i++) {
                egret.Tween.removeTweens(this[`kGrpFrame${i}`]);
                this[`kGrpFrame${i}`].alpha = 0;
            }
            this.kGrpAnim.x = 625;
            this.kGrpAnim.y = 230;
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mCurIdx = -1;
            this.showAnim(null);
        }

        private showAnim(name: string, cb?: Function): void {
            switch (name) {
                case "err":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    this.mAnimErr.visible = true;
                    this.mAnimErr.play(null, 1, () => {
                        cb && cb();
                    }, this);
                    break;
                case "idle":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    this.mAnimIdle.visible = true;
                    this.mAnimIdle.play(null, 0);
                    cb && cb();
                    break;
                case "pool":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    this.mAnimPool.visible = true;
                    this.mAnimPool.play(null, 6, () => {
                        cb && cb();
                    }, this);
                    break;
                case "run":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    this.mAnimRun.visible = true;
                    this.mAnimRun.play(null, 3, () => {
                        cb && cb();
                    }, this);
                    break;
                case "null":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    cb && cb();
                    break;
            }
        }

        /** 开始游戏 */
        private onStart(): void {
            this.reset();
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.mLock_isFinish = false;
            this.mLock_move = false;
            this.mLock_sound = false;
            this.kComAnswer.visible = false;
            this.mCurIdx = -1;
            this.showAnim("idle");
            this.kGrpAnim.scaleX = 1;
            this.next();
        }

        /** 提示下一个 */
        private next(): void {
            if (this.mCurIdx >= 2) {
                // 完成
                this.kGrpAnim.x = 1110;
                this.kGrpAnim.y = 970;
                this.showAnim("pool");
                this.mLock_isFinish = true;
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            } else {
                // 没完成
                this.mCurIdx++;
                this.hint();
            }
        }

        /** 提示 */
        private hint(): void {
            // sound
            this.mLock_sound = true;
            XDFSoundManager.play(`sound_${this.mCurIdx}_mp3`, 0, 1, 1, `sound_${this.mCurIdx}_mp3`, () => {
                this.mLock_sound = false;
            });
            // 中间的按钮
            egret.Tween.removeTweens(this[`kIcon${this.mCurIdx}`]);
            this[`kIcon${this.mCurIdx}`].scaleX = this[`kIcon${this.mCurIdx}`].scaleY = 1.4;
            egret.Tween.get(this[`kIcon${this.mCurIdx}`])
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
            // show desc
            for (let i = 0; i < 3; i++) {
                egret.Tween.removeTweens(this[`kGrpFrame${i}`]);
                this[`kGrpFrame${i}`].alpha = 0;
            }
            this[`kGrpFrame${this.mCurIdx}`].visible = true;
            this[`kGrpFrame${this.mCurIdx}`].alpha = 1;
            egret.Tween.get(this[`kGrpFrame${this.mCurIdx}`], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
        }

        private onMatch(idx: number, touch: number): void {
            if (this.isLock) return;
            if (idx != this.mCurIdx) return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mRightOption[this.mCurIdx]) {
                this.touchRight();
            } else {
                this.touchErr();
            }
        }

        /** 选择正确 */
        private touchRight(): void {
            XDFSoundManager.play("sound_stick_right_mp3");
            // 移动到正确的位置去
            egret.Tween.removeTweens(this.kGrpAnim);
            this.mLock_move = true;
            this.showAnim("run");
            egret.Tween.get(this.kGrpAnim).to({ x: this.mRightPos[this.mCurIdx].x, y: this.mRightPos[this.mCurIdx].y }, 1000).call(() => {
                this.kGrpAnim.scaleX = this.mRightPos[this.mCurIdx].scaleX;
                this.showAnim("idle");
                this.mLock_move = false;
                this.next()
            })
        }

        /** 选择错误 */
        private touchErr(): void {
            // 记录原来的位置，重置到原来的位置
            let x = this.kGrpAnim.x;
            let y = this.kGrpAnim.y;
            let scale = this.kGrpAnim.scaleX;
            egret.Tween.removeTweens(this.kGrpAnim);
            this.showAnim("run");
            this.mLock_move = true;
            egret.Tween.get(this.kGrpAnim).to({ x: this.mErrPos[this.mCurIdx].x, y: this.mErrPos[this.mCurIdx].y }, 1000).call(() => {
                this.kGrpAnim.scaleX = this.mErrPos[this.mCurIdx].scaleX;
                XDFSoundManager.play("sound_oopstryagain_mp3")
                this.showAnim("err", () => {
                    this.kGrpAnim.x = x;
                    this.kGrpAnim.y = y;
                    this.kGrpAnim.scaleX = scale;
                    this.showAnim("idle");
                    this.mLock_move = false;
                });
            })
        }
    }
} 