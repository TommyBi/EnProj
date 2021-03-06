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
    var BtnSelect = (function (_super) {
        __extends(BtnSelect, _super);
        function BtnSelect() {
            var _this = _super.call(this) || this;
            _this.skinName = "BtnSelectSkin";
            return _this;
        }
        BtnSelect.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.init();
        };
        BtnSelect.prototype.init = function () {
            for (var i = 0; i < this.kGp.numChildren; i++) {
                this.kGp.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelcet, this);
            }
        };
        BtnSelect.prototype.onSelcet = function (e) {
            XDFFrame.EventCenter.sendEvent(game.EventConst.btnSelect, e.target.name);
        };
        BtnSelect.prototype.hide = function (index) {
            this.kGp.getChildAt(index - 1).visible = false;
        };
        BtnSelect.prototype.reset = function () {
            for (var i = 0; i < this.kGp.numChildren; i++) {
                this.kGp.getChildAt(i).visible = true;
            }
        };
        return BtnSelect;
    }(eui.Component));
    game.BtnSelect = BtnSelect;
    __reflect(BtnSelect.prototype, "game.BtnSelect", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=BtnSelect.js.map