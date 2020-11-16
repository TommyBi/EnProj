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
    var FindMarkItem = (function (_super) {
        __extends(FindMarkItem, _super);
        function FindMarkItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "FindMarkItemSkin";
            return _this;
        }
        FindMarkItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        FindMarkItem.prototype.setData = function (index) {
            switch (index) {
                case 1:
                    this.kImg.source = "find_xjl_png";
                    this.kLb.text = "giraffe";
                    this.anim = XDFFrame.DBFactory.createAnim("find_yx");
                    this.anim.setProtery({ x: 0, y: 0, parent: this.kAnim, scaleX: 0.15, scaleY: 0.15 });
                    break;
                case 2:
                    this.kImg.source = "find_dx_png";
                    this.kLb.text = "elephant";
                    this.anim = XDFFrame.DBFactory.createAnim("find_sjx");
                    this.anim.setProtery({ x: 0, y: 0, parent: this.kAnim, scaleX: 0.2, scaleY: 0.2 });
                    break;
                case 3:
                    this.kImg.source = "find_hz_png";
                    this.kLb.text = "monkey";
                    this.anim = XDFFrame.DBFactory.createAnim("find_zfx");
                    this.anim.setProtery({ x: 0, y: 0, parent: this.kAnim, scaleX: 0.2, scaleY: 0.2 });
                    break;
            }
            this.anim.visible = false;
        };
        FindMarkItem.prototype.play = function (callBack) {
            this.anim.visible = true;
            this.anim.play(null, 1, function () {
                if (callBack)
                    callBack();
            });
        };
        FindMarkItem.prototype.reset = function () {
            this.anim.visible = false;
        };
        return FindMarkItem;
    }(eui.Component));
    game.FindMarkItem = FindMarkItem;
    __reflect(FindMarkItem.prototype, "game.FindMarkItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=FindMarkItem.js.map