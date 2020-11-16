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
    var FindWayItem = (function (_super) {
        __extends(FindWayItem, _super);
        function FindWayItem() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            _this.txt = [
                "He is Korean.",
                "She is Vietnamese.",
                "She is Vietnamese.",
                "He is Korean.",
                "We speak Korean and English.",
                "We speak Korean and Vietnamese.",
            ];
            _this.mInter = 0;
            return _this;
        }
        FindWayItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.touchEnabled = true;
            this.touchChildren = false;
            this.validateNow();
        };
        FindWayItem.prototype.onClick = function (e) {
            XDFFrame.EventCenter.sendEvent(game.EventConst.eventBtn, this.id);
        };
        FindWayItem.prototype.setData = function (id) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.id = id;
            this.kLb.text = this.txt[id];
            // switch (id) {
            // 	case 1:
            // 		break;
            // 	case 2:
            // 		this.kLb.text = this.txt[id - 1];
            // 		break;
            // 	case 3:
            // 		this.kLb.text = this.txt[id - 1];
            // 		break;
            // 	case 4:
            // 		this.kLb.text = this.txt[id - 1];
            // 		break;
            // 	case 5:
            // 		this.kLb.text = this.txt[id - 1];
            // 		break;
            // 	case 5:
            // 		this.kLb.text = this.txt[id - 1];
            // 		break;
            // }
        };
        FindWayItem.prototype.sildeAnim = function () {
            var self = this;
            this.kSide.visible = true;
            this.mInter = setInterval(function () {
                self.kSide.visible = !self.kSide.visible;
            }, 150);
        };
        FindWayItem.prototype.hideSide = function () {
            clearInterval(this.mInter);
            this.kSide.visible = false;
        };
        return FindWayItem;
    }(eui.Component));
    game.FindWayItem = FindWayItem;
    __reflect(FindWayItem.prototype, "game.FindWayItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=FindWayItem.js.map