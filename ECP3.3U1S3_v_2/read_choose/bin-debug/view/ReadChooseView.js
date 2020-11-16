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
    var ReadChooseView = (function (_super) {
        __extends(ReadChooseView, _super);
        function ReadChooseView() {
            var _this = _super.call(this) || this;
            _this.skinName = "ReadChooseViewSkin";
            return _this;
        }
        ReadChooseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ReadChooseView.prototype.onStart = function () {
            _super.prototype.onStart.call(this);
            this.onNext();
            this.playSound(this.currentIndex, function () {
            });
        };
        ReadChooseView.prototype.onReplay = function () {
            for (var i = 1; i < 4; i++) {
                this["kAnswerAnim" + i].visible = false;
                this["kSide" + i].visible = false;
                this["kYes" + i].visible = false;
            }
            _super.prototype.onReplay.call(this);
        };
        ReadChooseView.prototype.onNext = function () {
            this["kAnswer" + this.currentIndex].visible = false;
            this["kAnswerAnim" + this.currentIndex].visible = true;
            this["kSide" + this.currentIndex].visible = true;
            this.txtAnim();
            if (this.currentIndex > 1) {
                this["kRight" + (this.currentIndex - 1)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
                this["kLost" + (this.currentIndex - 1)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
            }
            switch (this.currentIndex) {
                case 1:
                    this.kRight1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
                    this.kLost1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
                    break;
                case 2:
                    this.kRight2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
                    this.kLost2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
                    break;
                case 3:
                    this.kRight3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
                    this.kLost3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
                    break;
            }
        };
        ReadChooseView.prototype.onRight = function () {
            this["kYes" + this.currentIndex].visible = true;
            this["kAnswer" + this.currentIndex].visible = true;
            this.removeAnim();
            this.playSuccess();
        };
        ReadChooseView.prototype.onLost = function () {
            this.playErr();
        };
        ReadChooseView.prototype.txtAnim = function () {
            this["kAnswerAnim" + this.currentIndex].scaleX = this["kAnswerAnim" + this.currentIndex].scaleY = 1;
            egret.Tween.get(this["kAnswerAnim" + this.currentIndex], { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut);
        };
        ReadChooseView.prototype.removeAnim = function () {
            egret.Tween.removeTweens(this["kAnswerAnim" + this.currentIndex]);
            this["kSide" + this.currentIndex].visible = false;
            this["kAnswerAnim" + this.currentIndex].visible = false;
        };
        ReadChooseView.prototype.over = function () {
            _super.prototype.over.call(this);
            this["kRight" + (this.currentIndex)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
            this["kLost" + (this.currentIndex)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
        };
        return ReadChooseView;
    }(game.ChooseBaseView));
    game.ReadChooseView = ReadChooseView;
    __reflect(ReadChooseView.prototype, "game.ReadChooseView");
})(game || (game = {}));
//# sourceMappingURL=ReadChooseView.js.map