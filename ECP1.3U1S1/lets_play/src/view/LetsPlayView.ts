namespace game {
    export class LetsPlayView extends eui.Component {
        public kGrpMain: eui.Group;
        public kGrpSheep: eui.Group;
        public kGrpSheepIdle: eui.Group;
        public kGrpSheepCatch: eui.Group;
        public kGrpSheepJump: eui.Group;
        public kImgMask: eui.Rect;
        public kImgHint: eui.Image;
        public kGrpOption0: eui.Group;
        public kImgOption0: eui.Image;
        public kGrpOption1: eui.Group;
        public kImgOption1: eui.Image;
        public kImgBar: eui.Image;
        public kGrpGame: eui.Group;
        public kComRestart: game.ReStartComponent;
        public kLabelHint: eui.Label;

        private mAnimSheepCatch: XDFFrame.DBAnim;
        private mAnimSheepIdle: XDFFrame.DBAnim;
        private mAnimSheepJump: XDFFrame.DBAnim;

        private mPlayTimes: number = 0;
        private mHintArr: string[] = [];
        private mCurrentHint: string = "";

        constructor() {
            super();
            this.skinName = "LetsPlaySkin";
        };

        protected createChildren() {
            super.createChildren();
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            this.kGrpOption0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch0, this);
            this.kGrpOption1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch1, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.init();
        }

        private onTouch(e: egret.TouchEvent): void {
        }

        private init(): void {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            this.kImgHint.mask = this.kImgMask;

            // init DBAnim
            this.mAnimSheepIdle = XDFFrame.DBFactory.createAnim("db_sheep_idle", 3);
            this.mAnimSheepIdle.setProtery({ parent: this.kGrpSheepIdle, scaleX: 1.4, scaleY: 1.4 });
            this.mAnimSheepCatch = XDFFrame.DBFactory.createAnim("db_sheep_catch", 2);
            this.mAnimSheepCatch.setProtery({ parent: this.kGrpSheepCatch, scaleX: 1.4, scaleY: 1.4 });
            this.mAnimSheepJump = XDFFrame.DBFactory.createAnim("db_sheep_jump", 3);
            this.mAnimSheepJump.setProtery({ parent: this.kGrpSheepJump, scaleX: 1.4, scaleY: 1.4 });
            this.kGrpSheepCatch.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepIdle.visible = true;
            this.mAnimSheepIdle.play(null, 0);
        }

        private onStart(): void {
            this.kComRestart.visible = false;
            this.prepareOder();
            this.hint();
        }

        private playCountDown(): void {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            egret.Tween.get(this.kImgBar).to({ width: 0 }, 13000).call(() => {
                this.kComRestart.visible = true;
                this.kComRestart.playActionTimeOut();
                XDFSoundManager.play("sound_die_mp3");
            });
        }

        private prepareOder(): void {
            if (this.mPlayTimes % 2 == 0) {
                this.mHintArr = ["shirt", "pants"];
            } else {
                this.mHintArr = ["pants", "shirt"];
            }
        }

        private hint(): void {
            if (this.mPlayTimes % 2 == 0) {
                this.kGrpOption0.name = "shirt";
                this.kImgOption0.source = "img_lp_shirt_png";
                this.kGrpOption1.name = "pants";
                this.kImgOption1.source = "img_lp_pants_png";
            } else {
                this.kGrpOption1.name = "shirt";
                this.kImgOption1.source = "img_lp_shirt_png";
                this.kGrpOption0.name = "pants";
                this.kImgOption0.source = "img_lp_pants_png";
            }
            this.mCurrentHint = this.mHintArr.shift();
            XDFSoundManager.play(`sound_${this.mCurrentHint}_mp3`);
            this.kLabelHint.text = `${this.mCurrentHint}`;
            this.playCountDown();
        }

        private playSheepCatch(cb?: Function): void {
            this.kGrpSheepIdle.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepCatch.visible = true;
            this.mAnimSheepCatch.play(null, 1, () => {
                this.kGrpSheepCatch.visible = false;
                this.playSheepIdle();
                cb && cb();
            }, this);
        }

        private playSheepIdle(): void {
            this.kGrpSheepCatch.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepIdle.visible = true;
            this.mAnimSheepIdle.play(null, 0);
        }

        private playSheepJump(cb: Function): void {
            this.kGrpSheepCatch.visible = this.kGrpSheepIdle.visible = false;
            this.kGrpSheepJump.visible = true;
            this.mAnimSheepJump.play(null, 1, () => {
                this.playSheepIdle();
                cb && cb();
            }, this);
        }

        /** 点击0 */
        private onTouch0(): void {
            XDFSoundManager.play("sound_choise_mp3");
            if (this.kGrpOption0.name == this.mCurrentHint) {
                this.mPlayTimes++;
                egret.Tween.removeTweens(this.kImgBar);
                this.showCorrect(() => {
                    if (this.mHintArr.length == 0) {
                        // finish
                        this.kComRestart.visible = true;
                        this.kComRestart.playActionGoodJob();
                    } else {
                        // next
                        this.hint();
                    }
                })
            } else {
                this.showErr();
            }
        }

        /** 点击1 */
        private onTouch1(): void {
            XDFSoundManager.play("sound_choise_mp3");
            if (this.kGrpOption1.name == this.mCurrentHint) {
                this.mPlayTimes++;
                egret.Tween.removeTweens(this.kImgBar);
                this.showCorrect(() => {
                    if (this.mHintArr.length == 0) {
                        // finish
                        this.kComRestart.visible = true;
                        this.kComRestart.playActionGoodJob();
                    } else {
                        // next
                        this.hint();
                    }
                })

            } else {
                this.showErr();
            }
        }

        private showCorrect(cb: Function): void {
            XDFSoundManager.play("sound_start_mp3");
            this.playSheepCatch(() => {
                cb && cb();
            })
        }

        private showErr(): void {
            XDFSoundManager.play("sound_die_mp3");
            this.playSheepJump(() => {
                XDFSoundManager.play(`sound_${this.mCurrentHint}_mp3`);
            })
        }
    }
} 