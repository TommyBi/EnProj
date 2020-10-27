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
    var LookMatchView = (function (_super) {
        __extends(LookMatchView, _super);
        function LookMatchView() {
            var _this = _super.call(this) || this;
            _this.skinName = "LookMatchViewSkin";
            return _this;
        }
        ;
        LookMatchView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        LookMatchView.prototype.init = function () {
        };
        LookMatchView.prototype.reset = function () {
        };
        return LookMatchView;
    }(eui.Component));
    game.LookMatchView = LookMatchView;
    __reflect(LookMatchView.prototype, "game.LookMatchView");
})(game || (game = {}));
//# sourceMappingURL=LookMatchView.js.map