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
    /**
     * AnswerComponent
     */
    var AnswerComponent = (function (_super) {
        __extends(AnswerComponent, _super);
        function AnswerComponent() {
            var _this = _super.call(this) || this;
            _this.skinName = "AnswerComponentSkin";
            return _this;
        }
        AnswerComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        AnswerComponent.prototype.init = function () {
            egret.Tween.removeTweens(this.kImgGood);
            egret.Tween.removeTweens(this.kGrpStarLeft);
            egret.Tween.removeTweens(this.kGrpStarRight);
            egret.Tween.removeTweens(this.kImgErr);
            egret.Tween.removeTweens(this.kImgStarBg);
            this.kImgGood.visible = this.kImgErr.visible = this.kGrpStarLeft.visible = this.kGrpStarRight.visible = this.kImgStarBg.visible = false;
        };
        AnswerComponent.prototype.playGood = function (cb) {
            var _this = this;
            this.init();
            XDFSoundManager.play("sound_goodjob_mp3", 0, 1, 1);
            this.kImgGood.scaleX = this.kImgGood.scaleY = 5;
            this.kImgGood.visible = true;
            this.kImgGood.rotation = 0;
            egret.Tween.get(this.kImgGood).to({ rotation: 700, scaleX: 1.5, scaleY: 1.5 }, 500, egret.Ease.cubicIn).call(function () {
                _this.kGrpStarLeft.visible = _this.kGrpStarRight.visible = true;
                // 散落的星星
                _this.kImgStarBg.visible = true;
                _this.kImgStarBg.alpha = 1;
                egret.Tween.get(_this.kImgStarBg)
                    .to({ alpha: 0.5 }, 250, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 250, egret.Ease.cubicInOut)
                    .to({ alpha: 0.5 }, 250, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 250, egret.Ease.cubicInOut);
                // 星星
                _this.kGrpStarLeft.x = 450;
                _this.kGrpStarLeft.y = 543;
                _this.kGrpStarRight.x = 1374;
                _this.kGrpStarRight.y = 250;
                egret.Tween.get(_this.kGrpStarLeft)
                    .to({ x: 470, y: 520 }, 250, egret.Ease.cubicInOut)
                    .to({ x: 450, y: 543 }, 250, egret.Ease.cubicInOut)
                    .to({ x: 470, y: 520 }, 250, egret.Ease.cubicInOut)
                    .to({ x: 450, y: 543 }, 250, egret.Ease.cubicInOut);
                egret.Tween.get(_this.kGrpStarRight)
                    .to({ x: 1354, y: 230 }, 250, egret.Ease.cubicInOut)
                    .to({ x: 1374, y: 250 }, 250, egret.Ease.cubicInOut)
                    .to({ x: 1354, y: 230 }, 250, egret.Ease.cubicInOut)
                    .to({ x: 1374, y: 250 }, 250, egret.Ease.cubicInOut)
                    .call(function () {
                    cb && cb();
                });
            });
        };
        AnswerComponent.prototype.playErr = function (cb) {
            this.init();
            XDFSoundManager.play("sound_oopstryagain_mp3", 0, 1, 1);
            this.kImgErr.scaleX = this.kImgErr.scaleY = 5;
            this.kImgErr.visible = true;
            egret.Tween.get(this.kImgErr).to({ rotation: 700, scaleX: 1.5, scaleY: 1.5 }, 500, egret.Ease.cubicIn).wait(1500).call(function () {
                cb && cb();
            });
        };
        return AnswerComponent;
    }(eui.Component));
    game.AnswerComponent = AnswerComponent;
    __reflect(AnswerComponent.prototype, "game.AnswerComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=AnswerComponent.js.map