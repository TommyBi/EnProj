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
     * DialogComponent
     */
    var DialogComponent = (function (_super) {
        __extends(DialogComponent, _super);
        function DialogComponent() {
            var _this = _super.call(this) || this;
            _this.mArr = [
                "Mom! This shirt is too small.",
                "Take off your shirt, Tony.",
                "These pants are too small.",
                "Take off your pants.",
                "I need new clothes.",
                "Put on your shirt.",
                "Put on your pants.",
                "These are for you."
            ];
            _this.skinName = "DialogComponentSkin";
            return _this;
        }
        DialogComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        DialogComponent.prototype.init = function () {
        };
        DialogComponent.prototype.light = function () {
            this.klbl.textColor = 0xe66b27;
        };
        DialogComponent.prototype.normal = function () {
            this.klbl.textColor = 0x561108;
        };
        DialogComponent.prototype.setData = function (idx) {
            this.mIdx = idx;
            this.klbl.text = this.mArr[idx];
        };
        return DialogComponent;
    }(eui.Component));
    game.DialogComponent = DialogComponent;
    __reflect(DialogComponent.prototype, "game.DialogComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=DialogComponent.js.map