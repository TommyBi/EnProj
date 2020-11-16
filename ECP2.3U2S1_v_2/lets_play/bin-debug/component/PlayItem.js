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
    var PlayItem = (function (_super) {
        __extends(PlayItem, _super);
        function PlayItem() {
            var _this = _super.call(this) || this;
            _this.isAnswer = 0;
            _this.skinName = "PlayItemSkin";
            return _this;
        }
        PlayItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        PlayItem.prototype.setData = function (img, isAnswer) {
            this.isAnswer = isAnswer;
            this.kImg.source = img;
        };
        PlayItem.prototype.onClick = function () {
            XDFFrame.EventCenter.sendEvent(game.EventConst.btnSelect, { target: this.isAnswer, index: this.name });
        };
        return PlayItem;
    }(eui.Component));
    game.PlayItem = PlayItem;
    __reflect(PlayItem.prototype, "game.PlayItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=PlayItem.js.map