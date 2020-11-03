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
var WorldGame = (function (_super) {
    __extends(WorldGame, _super);
    function WorldGame(x, y) {
        var _this = _super.call(this) || this;
        _this.isDebug = true;
        _this.x = x;
        _this.y = y;
        _this.width = 1920;
        _this.height = 1080;
        // this.addWord();
        _this.skinName = "WorldGameSkin";
        return _this;
    }
    WorldGame.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    WorldGame.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return WorldGame;
}(eui.Component));
__reflect(WorldGame.prototype, "WorldGame", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=WorldGame.js.map