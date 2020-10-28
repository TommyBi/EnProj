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
     * TimeBarComponent
     */
    var TimeBarComponent = (function (_super) {
        __extends(TimeBarComponent, _super);
        function TimeBarComponent() {
            var _this = _super.call(this) || this;
            _this.skinName = "TimeBarComponentSkin";
            return _this;
        }
        TimeBarComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        TimeBarComponent.prototype.init = function () {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
        };
        /** 重置 */
        TimeBarComponent.prototype.reset = function () {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
        };
        /** 播放缩小 */
        TimeBarComponent.prototype.play = function () {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            egret.Tween.get(this.kImgBar).to({ width: 0 }, 13000).call(function () {
                XDFFrame.EventCenter.sendEvent(game.EventConst.timeBarOut);
            });
        };
        return TimeBarComponent;
    }(eui.Component));
    game.TimeBarComponent = TimeBarComponent;
    __reflect(TimeBarComponent.prototype, "game.TimeBarComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=TimeBarComponent.js.map