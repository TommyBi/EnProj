namespace game {
    enum ACTION_TYPE {
        PUTON_SHIRT,
        PUTON_PANTS,
        TAKEOFF_SHIRT,
        TAKEOFF_PANTS,
    }

    export class MainView extends eui.Component {

        public kImgPutOn: eui.Image;
        public kImgTakeOff: eui.Image;
        public kGrpDownLight: eui.Group;
        public kImgShirtDown1: eui.Image;
        public kImgShirtDown0: eui.Image;
        public kImgPantsDown1: eui.Image;
        public kImgPantsDown0: eui.Image;
        public kGrpUpLight0: eui.Group;
        public kImgShirtUp_0_l: eui.Image;
        public kImgPantsUp_0_l: eui.Image;
        public kGrpUpGray0: eui.Group;
        public kImgShirtUp_0_g: eui.Image;
        public kImgPantsUp_0_g: eui.Image;
        public kGrpUpGray1: eui.Group;
        public kImgShirtUp_1_g: eui.Image;
        public kImgPantsUp_1_g: eui.Image;
        public kGrpUpLight1: eui.Group;
        public kImgShirtUp_1_l: eui.Image;
        public kImgPantsUp_1_l: eui.Image;
        public kComReplay: game.ReplayComponent;
        public kComAnswer: game.AnswerComponent;

        private mCurPlayMode = -1;// 游戏模式 0:putOn  1:takeOff  -1:啥也没干
        private mIsFinishPutOn: boolean = false;    // 是否完成了穿衣模式
        private mIsFinishTakeOff: boolean = false;  // 是否完成了脱衣模式
        private mActionQueue: number[] = [];// 当前队列
        private mCurHintActionType: number = -1;
        private mLock: boolean = false;// 同步操作的锁子

        private mLock_sound: boolean = false;
        private get mIsLock(): boolean {
            return this.mLock_sound;
        }

        constructor() {
            super();
            this.skinName = "MainViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.kImgPutOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartPutOn, this);
            this.kImgTakeOff.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTakeOff, this);

            this.kImgPantsDown0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPutOnPants0, this);
            this.kImgPantsDown1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPutOnPants1, this);
            this.kImgShirtDown0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPutOnShirt0, this);
            this.kImgShirtDown1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPutOnShirt1, this);

            this.kImgShirtUp_0_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeOffShirt0, this);
            this.kImgShirtUp_1_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeOffShirt1, this);
            this.kImgPantsUp_0_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeOffPants0, this);
            this.kImgPantsUp_1_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeOffPants1, this);

            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.init, this);

            mouse.enable(this.stage);
            this.init();
        }

        private init(): void {
            this.showHintMode();
            this.initMode();
        }

        private initMode(): void {
            this.kGrpUpGray0.visible =
                this.kGrpUpGray1.visible =
                this.kGrpUpLight0.visible =
                this.kGrpUpLight1.visible = false;
            this.kImgShirtDown0.visible = this.kImgShirtDown1.visible = this.kImgPantsDown0.visible = this.kImgPantsDown1.visible = false;
            this.mCurPlayMode = -1;
            this.kComAnswer.visible = this.kComReplay.visible = false;
            this.mIsFinishPutOn = this.mIsFinishTakeOff = false;
        }

        private showHintMode(): void {
            egret.Tween.removeTweens(this.kImgPutOn);
            egret.Tween.removeTweens(this.kImgTakeOff);
            this.kImgPutOn.scaleX = this.kImgPutOn.scaleY = this.kImgTakeOff.scaleX = this.kImgTakeOff.scaleY = 0.95;
            egret.Tween.get(this.kImgPutOn, { loop: true })
                .to({ scaleX: 1.05, scaleY: 1.05 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 0.95, scaleY: 0.95 }, 800, egret.Ease.cubicInOut);
            egret.Tween.get(this.kImgTakeOff, { loop: true })
                .to({ scaleX: 1.05, scaleY: 1.05 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 0.95, scaleY: 0.95 }, 800, egret.Ease.cubicInOut);
        }

        /** 停止模式提示效果 */
        private stopModeHintAction(): void {
            egret.Tween.removeTweens(this.kImgPutOn);
            egret.Tween.removeTweens(this.kImgTakeOff);
            this.kImgPutOn.scaleX = this.kImgPutOn.scaleY = this.kImgTakeOff.scaleX = this.kImgTakeOff.scaleY = 1;
        }

        /** 开启PutOn模式 */
        private onStartPutOn(): void {
            if (this.mCurPlayMode != -1) return;
            this.mCurPlayMode = 0;
            this.stopModeHintAction();

            // 小人阴影衣服隐藏
            this.kGrpUpGray0.visible = this.kGrpUpGray1.visible = false;
            // 常规衣服组显示
            this.kGrpUpLight0.visible = this.kGrpUpLight1.visible = true;
            // 人身上的衣服隐藏
            this.kImgShirtUp_0_l.visible = this.kImgShirtUp_1_l.visible = this.kImgPantsUp_0_l.visible = this.kImgPantsUp_1_l.visible = false;
            // 待选择的衣服都设置为带阴影的资源
            this.kImgShirtDown0.visible = this.kImgShirtDown1.visible = this.kImgPantsDown0.visible = this.kImgPantsDown1.visible = true;
            this.kImgShirtDown0.source = "img_shirt_0_g_png";
            this.kImgShirtDown1.source = "img_shirt_1_g_png";
            this.kImgPantsDown0.source = "img_pants_0_g_png";
            this.kImgPantsDown1.source = "img_pants_1_g_png";

            this.mCurHintActionType = -1;
            this.mActionQueue = [0, 0, 1, 1];
            this.mLock_sound = true;
            XDFSoundManager.play("sound_put_on_mp3", 0, 1, 1, "sound_put_on_mp3", () => {
                this.mLock_sound = false;
                this.goNextStep();
            });
        }

        /** 开启TakeOff模式 */
        private onStartTakeOff(): void {
            if (this.mCurPlayMode != -1) return;
            this.mCurPlayMode = 1;
            this.stopModeHintAction();
            XDFSoundManager.play("sound_take_off_mp3");

            // 底部
            this.kImgShirtDown0.visible = this.kImgShirtDown1.visible = this.kImgPantsDown0.visible = this.kImgPantsDown1.visible = false;
            this.kImgShirtDown0.source = "img_shirt_0_l_png";
            this.kImgShirtDown1.source = "img_shirt_1_l_png";
            this.kImgPantsDown0.source = "img_pants_0_l_png";
            this.kImgPantsDown1.source = "img_pants_1_l_png";
            // 小人身上带阴影的资源显示
            this.kGrpUpGray0.visible = this.kGrpUpGray1.visible = true;
            this.kGrpUpLight0.visible = this.kGrpUpLight1.visible = false;
            this.kImgShirtUp_0_g.visible = this.kImgShirtUp_1_g.visible = this.kImgPantsUp_0_g.visible = this.kImgPantsUp_1_g.visible = true;

            this.mCurHintActionType = -1;
            this.mActionQueue = [2, 2, 3, 3];
            this.mLock_sound = true;
            XDFSoundManager.play("sound_take_off_mp3", 0, 1, 1, "sound_take_off_mp3", () => {
                this.mLock_sound = false;
                this.goNextStep();
            });
        }

        /** 穿衣服0 */
        private onPutOnShirt0(): void {
            if (this.mLock) return;
            if (this.mIsLock) return;
            if (this.mCurHintActionType != ACTION_TYPE.PUTON_SHIRT) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    this.playHintSound();
                })
                return;
            }
            this.kImgShirtDown0.visible = false;
            this.kImgShirtUp_0_l.visible = true;
            this.playSoundDing(() => {
                this.goNextStep();
            })
        }
        /** 穿衣服1 */
        private onPutOnShirt1(): void {
            if (this.mLock) return;
            if (this.mIsLock) return;
            if (this.mCurHintActionType != ACTION_TYPE.PUTON_SHIRT) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    this.playHintSound();
                })
                return;
            }
            this.kImgShirtDown1.visible = false;
            this.kImgShirtUp_1_l.visible = true;
            this.playSoundDing(() => {
                this.goNextStep();
            })
        }

        /** 穿裤子0 */
        private onPutOnPants0(): void {
            if (this.mLock) return;
            if (this.mIsLock) return;
            if (this.mCurHintActionType != ACTION_TYPE.PUTON_PANTS) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    this.playHintSound();
                })
                return;
            }
            this.kImgPantsDown0.visible = false;
            this.kImgPantsUp_0_l.visible = true;
            this.playSoundDing(() => {
                this.goNextStep();
            })
        }
        /** 穿裤子1 */
        private onPutOnPants1(): void {
            if (this.mLock) return;
            if (this.mIsLock) return;
            if (this.mCurHintActionType != ACTION_TYPE.PUTON_PANTS) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    this.playHintSound();
                })
                return;
            }
            this.kImgPantsDown1.visible = false;
            this.kImgPantsUp_1_l.visible = true;
            this.playSoundDing(() => {
                this.goNextStep();
            })
        }

        /** ---------- */

        /** 脱上衣0 */
        private onTakeOffShirt0(): void {
            if (this.mLock) return;
            if (this.mIsLock) return;
            if (this.mCurHintActionType != ACTION_TYPE.TAKEOFF_SHIRT) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    this.playHintSound();
                })
                return;
            }
            this.kImgShirtUp_0_g.visible = false;
            this.kImgShirtDown0.visible = true;
            this.playSoundDing(() => {
                this.goNextStep();
            })
        }
        /** 脱上衣1 */
        private onTakeOffShirt1(): void {
            if (this.mLock) return;
            if (this.mIsLock) return;
            if (this.mCurHintActionType != ACTION_TYPE.TAKEOFF_SHIRT) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    this.playHintSound();
                })
                return;
            }
            this.kImgShirtUp_1_g.visible = false;
            this.kImgShirtDown1.visible = true;
            this.playSoundDing(() => {
                this.goNextStep();
            })
        }
        /** 脱裤子0 */
        private onTakeOffPants0(): void {
            if (this.mLock) return;
            if (this.mIsLock) return;
            if (this.mCurHintActionType != ACTION_TYPE.TAKEOFF_PANTS) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    this.playHintSound();
                })
                return;
            }
            this.kImgPantsUp_0_g.visible = false;
            this.kImgPantsDown0.visible = true;
            this.playSoundDing(() => {
                this.goNextStep();
            })
        }
        /** 脱裤子1 */
        private onTakeOffPants1(): void {
            if (this.mLock) return;
            if (this.mIsLock) return;
            if (this.mCurHintActionType != ACTION_TYPE.TAKEOFF_PANTS) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    this.playHintSound();
                })
                return;
            }
            this.kImgPantsUp_1_g.visible = false;
            this.kImgPantsDown1.visible = true;
            this.playSoundDing(() => {
                this.goNextStep();
            })
        }

        /** 提示操作下一步 */
        private goNextStep(): void {
            if (this.mActionQueue.length <= 0) {
                if (this.mCurPlayMode == 0) {
                    this.mIsFinishPutOn = true;
                } else if (this.mCurPlayMode == 1) {
                    this.mIsFinishTakeOff = true;
                }

                if (this.mIsFinishPutOn && this.mIsFinishTakeOff) {
                    this.kComAnswer.visible = true;
                    this.kComAnswer.playGood(() => {
                        this.kComReplay.visible = true;
                        this.kComReplay.showReplay();
                    })
                    return;
                } else {
                    this.mCurPlayMode = -1;
                    this.showHintMode();
                }
            }

            this.mCurHintActionType = this.mActionQueue.shift();
            this.playHintSound();
        }

        private playHintSound(): void {
            switch (this.mCurHintActionType) {
                case ACTION_TYPE.PUTON_SHIRT:
                    this.mLock_sound = true;
                    XDFSoundManager.play("sound_put_on_shirt_mp3", 0, 1, 1, "sound_put_on_shirt_mp3", () => {
                        this.mLock_sound = false;
                    });
                    break;
                case ACTION_TYPE.PUTON_PANTS:
                    this.mLock_sound = true;
                    XDFSoundManager.play("sound_put_on_pants_mp3", 0, 1, 1, "sound_put_on_pants_mp3", () => {
                        this.mLock_sound = false;
                    });
                    break;
                case ACTION_TYPE.TAKEOFF_SHIRT:
                    this.mLock_sound = true;
                    XDFSoundManager.play("sound_take_off_shirt_mp3", 0, 1, 1, "sound_take_off_shirt_mp3", () => {
                        this.mLock_sound = false;
                    });
                    break;
                case ACTION_TYPE.TAKEOFF_PANTS:
                    this.mLock_sound = true;
                    XDFSoundManager.play("sound_take_off_pants_mp3", 0, 1, 1, "sound_take_off_pants_mp3", () => {
                        this.mLock_sound = false;
                    });
                    break;
            }
        }

        private playSoundDing(cb: Function): void {
            this.mLock = true;
            XDFSoundManager.play("sound_ding_mp3", 0, 1, 1, "sound_ding_mp3", () => {
                this.mLock = false;
                cb && cb();
            })
        }
    }
} 