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
     * FlagCom
     * 单词旗子
     */
    var FlagCom = (function (_super) {
        __extends(FlagCom, _super);
        function FlagCom() {
            var _this = _super.call(this) || this;
            _this.skinName = "FlagComSkin";
            return _this;
        }
        FlagCom.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.mAnim = XDFFrame.DBFactory.createAnim("db_word_flag");
            this.mAnim.setProtery({ x: 130, y: 90, parent: this.kGrpMain, scaleX: 0.8, scaleY: 0.4 });
            this.mAnim.play(null, 0);
        };
        FlagCom.prototype.onTouch = function () {
            XDFFrame.EventCenter.sendEvent(game.EventConst.touchFlag);
        };
        return FlagCom;
    }(eui.Component));
    game.FlagCom = FlagCom;
    __reflect(FlagCom.prototype, "game.FlagCom", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=FlagCom.js.map