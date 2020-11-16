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
/**
 * 基础面板
 */
var game;
(function (game) {
    var ChooseBaseView = (function (_super) {
        __extends(ChooseBaseView, _super);
        function ChooseBaseView() {
            var _this = _super.call(this) || this;
            _this.currentIndex = 0;
            _this.sound1 = "sound1_mp3";
            _this.sound2 = "sound2_mp3";
            _this.sound3 = "sound3_mp3";
            return _this;
        }
        ChooseBaseView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        ChooseBaseView.prototype.init = function () {
            this.kReplay.showStart();
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReplay, this);
            this.mClickEff = XDFFrame.DBFactory.createAnim("dianji1");
            this.mClickEff.setProtery({ x: 0, y: 0, parent: this, scaleX: 1, scaleY: 1 });
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        /**
         * 屏幕点击
         */
        ChooseBaseView.prototype.onClick = function (e) {
            this.mClickEff.x = e.stageX;
            this.mClickEff.y = e.stageY;
            // this.mClickEff.play(null, 1, () => { }, this);
        };
        /**
         * 开始按钮点击
         */
        ChooseBaseView.prototype.onStart = function () {
            this.isStart = true;
            this.kReplay.visible = false;
            this.currentIndex = 1;
            // this.playSound(this.currentIndex, () => {
            // 	// this.initImgTween();
            // })
        };
        /**
         * 重新开始
         */
        ChooseBaseView.prototype.onReplay = function () {
            this.kAnswer.visible = false;
            this.kReplay.visible = false;
            this.currentIndex = 1;
            this.onNext();
            this.playSound(this.currentIndex, function () {
            });
        };
        /**
         * 成功选择答案，然后随机下一个
         */
        ChooseBaseView.prototype.playSuccess = function (isPlaySound) {
            if (isPlaySound === void 0) { isPlaySound = true; }
            this.touchChildren = false;
            var self = this;
            if (isPlaySound) {
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                    self.randomNext();
                });
            }
            else {
                this.randomNext();
            }
        };
        ChooseBaseView.prototype.randomNext = function () {
            var _this = this;
            var self = this;
            if (self.currentIndex == 3) {
                self.kAnswer.visible = true;
                self.kAnswer.playGood(function () {
                    self.touchChildren = true;
                    self.over();
                });
                return true;
            }
            this.currentIndex++;
            this.onNext();
            this.playSound(this.currentIndex, function () {
                _this.touchChildren = true;
            });
        };
        /**
         * 随机下一个问题处理
         */
        ChooseBaseView.prototype.onNext = function () {
        };
        /**
         * 选择错误
         */
        ChooseBaseView.prototype.playErr = function () {
            var _this = this;
            this.touchChildren = false;
            this.kAnswer.visible = true;
            this.kAnswer.playErr(function () {
                _this.playSound(_this.currentIndex, function () {
                    _this.touchChildren = true;
                }, false);
                _this.kAnswer.visible = false;
                // this.touchChildren = true;
            });
        };
        /**
         * 选中之后播放答案
         */
        ChooseBaseView.prototype.playSound = function (index, callBack, isAnim) {
            if (isAnim === void 0) { isAnim = true; }
            switch (index) {
                case 1:
                    XDFSoundManager.play(this.sound1, 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
                case 2:
                    XDFSoundManager.play(this.sound2, 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
                case 3:
                    XDFSoundManager.play(this.sound3, 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
            }
        };
        /**
         * 冒烟动画
         * data ={x:1,y:1};
         */
        ChooseBaseView.prototype.playSmoke = function (data) {
        };
        /**
         * 结束处理
         */
        ChooseBaseView.prototype.over = function () {
            this.isStart = false;
            this.kReplay.visible = true;
            this.kReplay.showReplay();
        };
        return ChooseBaseView;
    }(eui.Component));
    game.ChooseBaseView = ChooseBaseView;
    __reflect(ChooseBaseView.prototype, "game.ChooseBaseView", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=ChooseBaseView.js.map