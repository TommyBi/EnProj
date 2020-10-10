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
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this.mStatus = 0; // 1: put on  2: take off  0: unknow
            _this.skinName = "MainViewSkin";
            return _this;
        }
        ;
        MainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        MainView.prototype.init = function () {
            for (var i = 0; i < 4; i++) {
                this["kImgIcon" + i].visible = false;
            }
            this.mStatus = 0;
            egret.Tween.removeTweens(this.kImgPutOn);
            egret.Tween.removeTweens(this.kImgTakeOff);
            this.kImgPutOn.alpha = this.kImgTakeOff.alpha = 1;
            egret.Tween.get(this.kImgPutOn, { loop: true })
                .to({ alpha: 0.5 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 0.5 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 500, egret.Ease.cubicInOut);
            egret.Tween.get(this.kImgTakeOff, { loop: true })
                .to({ alpha: 0.5 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 0.5 }, 500, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 500, egret.Ease.cubicInOut);
        };
        return MainView;
    }(eui.Component));
    game.MainView = MainView;
    __reflect(MainView.prototype, "game.MainView");
})(game || (game = {}));
//# sourceMappingURL=MainView.js.map