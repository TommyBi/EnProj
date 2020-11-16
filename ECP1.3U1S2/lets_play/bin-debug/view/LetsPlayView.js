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
    var LetsPlayView = (function (_super) {
        __extends(LetsPlayView, _super);
        function LetsPlayView() {
            var _this = _super.call(this) || this;
            _this.mHintIdx = -1;
            _this.mHintArr = [];
            _this.mPosArr = [];
            _this.mContent = ["shoes", "sneakers", "boots", "slippers"];
            _this.mLock_sound = false;
            _this.mSelectMode = 0; // 选择模式 0: 选图片模式 1: 选文字模式
            _this.mTarLblIdx = -1;
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        Object.defineProperty(LetsPlayView.prototype, "isLock", {
            get: function () {
                return this.mLock_sound;
            },
            enumerable: true,
            configurable: true
        });
        ;
        LetsPlayView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // 注册界面事件
            for (var i = 0; i < 4; i++) {
                this["kImgOption" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onChoise" + i], this);
                this["kGrp_b_" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onChoiseLabel" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
            this.init();
        };
        LetsPlayView.prototype.init = function () {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
        };
        /** 重置到初始化状态 */
        LetsPlayView.prototype.reset = function () {
            this.kComTimeBar.reset();
            this.mSelectMode = 0;
            for (var i = 0; i < 4; i++) {
                // 半隐四个选项按钮
                this["kGrp_b_" + i].alpha = 0.5;
                this["kGrp_b_" + i].visible = true;
                this["kGrp_b_" + i].scaleX = this["kGrp_b_" + i].scaleY = 1;
                egret.Tween.removeTweens(this["kGrp_b_" + i]);
                egret.Tween.removeTweens(this["kImgOption" + i]);
                this["kImgOption" + i].scaleX = this["kImgOption" + i].scaleY = 1;
                this["klbl_m_" + i].text = "";
                this["kLbl_b_" + i].text = this.mContent[i];
            }
        };
        /** 开始游戏 */
        LetsPlayView.prototype.onStart = function () {
            this.kComRestart.visible = false;
            this.mHintArr = Util.calShowOrder(4);
            this.mPosArr = Util.calShowOrder(4);
            this.kComTimeBar.play();
            for (var i = 0; i < 4; i++) {
                this["kImgOption" + i].source = "img_p_option_" + this.mPosArr[i] + "_png";
                this["kImgOption" + i].name = this.mPosArr[i];
            }
            this.next();
        };
        LetsPlayView.prototype.onChoise0 = function () { this.judge(Number(this.kImgOption0.name), 0); };
        LetsPlayView.prototype.onChoise1 = function () { this.judge(Number(this.kImgOption1.name), 1); };
        LetsPlayView.prototype.onChoise2 = function () { this.judge(Number(this.kImgOption2.name), 2); };
        LetsPlayView.prototype.onChoise3 = function () { this.judge(Number(this.kImgOption3.name), 3); };
        LetsPlayView.prototype.onChoiseLabel0 = function () { this.judgeLbl(2, 0); };
        LetsPlayView.prototype.onChoiseLabel1 = function () { this.judgeLbl(3, 1); };
        LetsPlayView.prototype.onChoiseLabel2 = function () { this.judgeLbl(0, 2); };
        LetsPlayView.prototype.onChoiseLabel3 = function () { this.judgeLbl(1, 3); };
        LetsPlayView.prototype.judge = function (num, posIdx) {
            var _this = this;
            if (this.isLock)
                return;
            if (this.mSelectMode == 1)
                return;
            egret.log("num: " + num + "  this.mHintIdx: " + this.mHintIdx);
            if (num == this.mHintIdx) {
                // 选择正确
                for (var i = 0; i < 4; i++) {
                    egret.Tween.removeTweens(this["kImgOption" + i]);
                    egret.Tween.removeTweens(this["kGrp_b_" + i]);
                    this["kImgOption" + i].scaleX = this["kImgOption" + i].scaleY = 1;
                    this["kGrp_b_" + i].scaleX = this["kGrp_b_" + i].scaleY = 1;
                    this["kGrp_b_" + i].alpha = 1;
                    egret.Tween.get(this["kGrp_b_" + i], { loop: true })
                        .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                        .to({ scaleX: 1, scaleY: 1 }, 300)
                        .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                        .to({ scaleX: 1, scaleY: 1 }, 300);
                }
                this.mTarLblIdx = posIdx;
                this.kComTimeBar.stop();
                this.mSelectMode = 1;
                this.mLock_sound = true;
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "sound_stick_right_mp3", function () {
                    XDFSoundManager.play("sound_" + _this.mHintIdx + "_mp3", 0, 1, 1, "sound_" + _this.mHintIdx + "_mp3", function () {
                        _this.kComTimeBar.play();
                        _this.mLock_sound = false;
                    });
                });
            }
            else {
                this.mLock_sound = true;
                XDFSoundManager.play("sound_oopstryagain_mp3", 0, 1, 1, "sound_oopstryagain_mp3", function () {
                    _this.mLock_sound = false;
                    XDFSoundManager.play("sound_" + _this.mHintIdx + "_mp3");
                });
            }
        };
        LetsPlayView.prototype.judgeLbl = function (num, posIdx) {
            var _this = this;
            console.log("onChoiseLabel: " + num);
            if (this.isLock)
                return;
            if (this.mSelectMode == 0)
                return;
            if (num == this.mHintIdx) {
                // 选择正确
                for (var i = 0; i < 4; i++) {
                    egret.Tween.removeTweens(["this.kGrp_b_" + i]);
                    this["kGrp_b_" + i].alpha = 0.5;
                }
                this.mSelectMode = 0;
                this["kGrp_b_" + posIdx].visible = false;
                this["klbl_m_" + this.mTarLblIdx].text = this.mContent[posIdx];
                this.kComTimeBar.stop();
                this.mLock_sound = true;
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                    _this.mLock_sound = false;
                    _this.next();
                });
            }
            else {
                // 选择错误
                this.mLock_sound = true;
                XDFSoundManager.play("sound_oopstryagain_mp3", 0, 1, 1, "sound_oopstryagain_mp3", function () {
                    _this.mLock_sound = false;
                    XDFSoundManager.play("sound_" + _this.mHintIdx + "_mp3");
                });
            }
        };
        /** 进行下一个操作 */
        LetsPlayView.prototype.next = function () {
            var _this = this;
            if (this.mHintArr.length <= 0) {
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                this.reset();
                return;
            }
            this.mHintIdx = this.mHintArr.shift();
            this.mSelectMode = 0;
            this.kComTimeBar.play();
            this.mLock_sound = true;
            XDFSoundManager.play("sound_" + this.mHintIdx + "_mp3", 0, 1, 1, "sound_" + this.mHintIdx + "_mp3", function () {
                _this.mLock_sound = false;
            });
            for (var i = 0; i < 4; i++) {
                egret.Tween.removeTweens(this["kGrp_b_" + i]);
                this["kGrp_b_" + i].scaleX = this["kGrp_b_" + i].scaleY = 1;
                egret.Tween.removeTweens(this["kImgOption" + i]);
                this["kImgOption" + i].scaleX = this["kImgOption" + i].scaleY = 1;
                egret.Tween.get(this["kImgOption" + i], { loop: true })
                    .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                    .to({ scaleX: 1, scaleY: 1 }, 300)
                    .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                    .to({ scaleX: 1, scaleY: 1 }, 300);
            }
        };
        /** 时间终止 */
        LetsPlayView.prototype.onTimeOut = function () {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        };
        return LetsPlayView;
    }(eui.Component));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map