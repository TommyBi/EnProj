var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var ACTION_TYPE;
    (function (ACTION_TYPE) {
        ACTION_TYPE[ACTION_TYPE["PUTON_SHIRT"] = 0] = "PUTON_SHIRT";
        ACTION_TYPE[ACTION_TYPE["PUTON_PANTS"] = 1] = "PUTON_PANTS";
        ACTION_TYPE[ACTION_TYPE["TAKEOFF_SHIRT"] = 2] = "TAKEOFF_SHIRT";
        ACTION_TYPE[ACTION_TYPE["TAKEOFF_PANTS"] = 3] = "TAKEOFF_PANTS";
    })(ACTION_TYPE || (ACTION_TYPE = {}));
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this.mCurPlayMode = -1; // 游戏模式 0:putOn  1:takeOff  -1:啥也没干
            _this.mIsFinishPutOn = false; // 是否完成了穿衣模式
            _this.mIsFinishTakeOff = false; // 是否完成了脱衣模式
            _this.mActionQueue = []; // 当前队列
            _this.mCurHintActionType = -1;
            _this.skinName = "MainViewSkin";
            return _this;
        }
        ;
        MainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
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
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.init, this);
            mouse.enable(this.stage);
            this.init();
        };
        MainView.prototype.init = function () {
            this.showHintMode();
            this.initMode();
        };
        MainView.prototype.initMode = function () {
            this.kGrpUpGray0.visible =
                this.kGrpUpGray1.visible =
                    this.kGrpUpLight0.visible =
                        this.kGrpUpLight1.visible = false;
            this.kImgShirtDown0.visible = this.kImgShirtDown1.visible = this.kImgPantsDown0.visible = this.kImgPantsDown1.visible = false;
            this.mCurPlayMode = -1;
            this.kComAnswer.visible = this.kComReplay.visible = false;
            this.mIsFinishPutOn = this.mIsFinishTakeOff = false;
        };
        MainView.prototype.showHintMode = function () {
            egret.Tween.removeTweens(this.kImgPutOn);
            egret.Tween.removeTweens(this.kImgTakeOff);
            this.kImgPutOn.scaleX = this.kImgPutOn.scaleY = this.kImgTakeOff.scaleX = this.kImgTakeOff.scaleY = 0.95;
            egret.Tween.get(this.kImgPutOn, { loop: true })
                .to({ scaleX: 1.05, scaleY: 1.05 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 0.95, scaleY: 0.95 }, 800, egret.Ease.cubicInOut);
            egret.Tween.get(this.kImgTakeOff, { loop: true })
                .to({ scaleX: 1.05, scaleY: 1.05 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 0.95, scaleY: 0.95 }, 800, egret.Ease.cubicInOut);
        };
        /** 停止模式提示效果 */
        MainView.prototype.stopModeHintAction = function () {
            egret.Tween.removeTweens(this.kImgPutOn);
            egret.Tween.removeTweens(this.kImgTakeOff);
            this.kImgPutOn.scaleX = this.kImgPutOn.scaleY = this.kImgTakeOff.scaleX = this.kImgTakeOff.scaleY = 1;
        };
        /** 开启PutOn模式 */
        MainView.prototype.onStartPutOn = function () {
            var _this = this;
            if (this.mCurPlayMode != -1)
                return;
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
            XDFSoundManager.play("sound_put_on_mp3", 0, 1, 1, "sound_put_on_mp3", function () {
                _this.goNextStep();
            });
        };
        /** 开启TakeOff模式 */
        MainView.prototype.onStartTakeOff = function () {
            var _this = this;
            if (this.mCurPlayMode != -1)
                return;
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
            XDFSoundManager.play("sound_take_off_mp3", 0, 1, 1, "sound_take_off_mp3", function () {
                _this.goNextStep();
            });
        };
        /** 穿衣服0 */
        MainView.prototype.onPutOnShirt0 = function () {
            var _this = this;
            if (this.mCurHintActionType != ACTION_TYPE.PUTON_SHIRT) {
                // TODO:OOPS
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.playHintSound();
                });
                return;
            }
            this.kImgShirtDown0.visible = false;
            this.kImgShirtUp_0_l.visible = true;
            this.playSoundDing(function () {
                _this.goNextStep();
            });
        };
        /** 穿衣服1 */
        MainView.prototype.onPutOnShirt1 = function () {
            var _this = this;
            if (this.mCurHintActionType != ACTION_TYPE.PUTON_SHIRT) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.playHintSound();
                });
                return;
            }
            this.kImgShirtDown1.visible = false;
            this.kImgShirtUp_1_l.visible = true;
            this.playSoundDing(function () {
                _this.goNextStep();
            });
        };
        /** 穿裤子0 */
        MainView.prototype.onPutOnPants0 = function () {
            var _this = this;
            if (this.mCurHintActionType != ACTION_TYPE.PUTON_PANTS) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.playHintSound();
                });
                return;
            }
            this.kImgPantsDown0.visible = false;
            this.kImgPantsUp_0_l.visible = true;
            this.playSoundDing(function () {
                _this.goNextStep();
            });
        };
        /** 穿裤子1 */
        MainView.prototype.onPutOnPants1 = function () {
            var _this = this;
            if (this.mCurHintActionType != ACTION_TYPE.PUTON_PANTS) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.playHintSound();
                });
                return;
            }
            this.kImgPantsDown1.visible = false;
            this.kImgPantsUp_1_l.visible = true;
            this.playSoundDing(function () {
                _this.goNextStep();
            });
        };
        /** ---------- */
        /** 脱上衣0 */
        MainView.prototype.onTakeOffShirt0 = function () {
            var _this = this;
            if (this.mCurHintActionType != ACTION_TYPE.TAKEOFF_SHIRT) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.playHintSound();
                });
                return;
            }
            this.kImgShirtUp_0_g.visible = false;
            this.kImgShirtDown0.visible = true;
            this.playSoundDing(function () {
                _this.goNextStep();
            });
        };
        /** 脱上衣1 */
        MainView.prototype.onTakeOffShirt1 = function () {
            var _this = this;
            if (this.mCurHintActionType != ACTION_TYPE.TAKEOFF_SHIRT) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.playHintSound();
                });
                return;
            }
            this.kImgShirtUp_1_g.visible = false;
            this.kImgShirtDown1.visible = true;
            this.playSoundDing(function () {
                _this.goNextStep();
            });
        };
        /** 脱裤子0 */
        MainView.prototype.onTakeOffPants0 = function () {
            var _this = this;
            if (this.mCurHintActionType != ACTION_TYPE.TAKEOFF_PANTS) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.playHintSound();
                });
                return;
            }
            this.kImgPantsUp_0_g.visible = false;
            this.kImgPantsDown0.visible = true;
            this.playSoundDing(function () {
                _this.goNextStep();
            });
        };
        /** 脱裤子1 */
        MainView.prototype.onTakeOffPants1 = function () {
            var _this = this;
            if (this.mCurHintActionType != ACTION_TYPE.TAKEOFF_PANTS) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.playHintSound();
                });
                return;
            }
            this.kImgPantsUp_1_g.visible = false;
            this.kImgPantsDown1.visible = true;
            this.playSoundDing(function () {
                _this.goNextStep();
            });
        };
        /** 提示操作下一步 */
        MainView.prototype.goNextStep = function () {
            var _this = this;
            if (this.mActionQueue.length <= 0) {
                if (this.mCurPlayMode == 0) {
                    this.mIsFinishPutOn = true;
                }
                else if (this.mCurPlayMode == 1) {
                    this.mIsFinishTakeOff = true;
                }
                if (this.mIsFinishPutOn && this.mIsFinishTakeOff) {
                    this.kComAnswer.visible = true;
                    this.kComAnswer.playGood(function () {
                        _this.kComReplay.visible = true;
                        _this.kComReplay.showReplay();
                    });
                    return;
                }
                else {
                    this.mCurPlayMode = -1;
                    this.showHintMode();
                    // if (this.mCurPlayMode == 0) {
                    //     this.mCurPlayMode = 1;
                    //     this.mCurHintActionType = -1;
                    //     this.mActionQueue = [2, 2, 3, 3];
                    // } else if (this.mCurPlayMode == 1) {
                    //     this.mCurPlayMode = 0;
                    //     this.mCurHintActionType = -1;
                    //     this.mActionQueue = [0, 0, 1, 1];
                    // }
                }
            }
            this.mCurHintActionType = this.mActionQueue.shift();
            this.playHintSound();
        };
        MainView.prototype.playHintSound = function () {
            switch (this.mCurHintActionType) {
                case ACTION_TYPE.PUTON_SHIRT:
                    XDFSoundManager.play("sound_put_on_shirt_mp3");
                    break;
                case ACTION_TYPE.PUTON_PANTS:
                    XDFSoundManager.play("sound_put_on_pants_mp3");
                    break;
                case ACTION_TYPE.TAKEOFF_SHIRT:
                    XDFSoundManager.play("sound_take_off_shirt_mp3");
                    break;
                case ACTION_TYPE.TAKEOFF_PANTS:
                    XDFSoundManager.play("sound_take_off_pants_mp3");
                    break;
            }
        };
        MainView.prototype.playSoundDing = function (cb) {
            XDFSoundManager.play("sound_ding_mp3", 0, 1, 1, "sound_ding_mp3", function () {
                cb && cb();
            });
        };
        return MainView;
    }(eui.Component));
    game.MainView = MainView;
    __reflect(MainView.prototype, "game.MainView");
})(game || (game = {}));
//# sourceMappingURL=MainView.js.map