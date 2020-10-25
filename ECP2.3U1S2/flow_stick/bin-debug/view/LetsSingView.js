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
    var LetsSingView = (function (_super) {
        __extends(LetsSingView, _super);
        function LetsSingView() {
            var _this = _super.call(this) || this;
            _this.mSkinType = 1;
            _this.skinName = "LetsSingViewSkin";
            return _this;
        }
        ;
        LetsSingView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        LetsSingView.prototype.init = function () {
            this.kImgBg.source = "img_bg_" + this.mSkinType + "_png";
            this.kComCaption.setSkinType(1);
            this.kComCaption.load("video");
        };
        return LetsSingView;
    }(eui.Component));
    game.LetsSingView = LetsSingView;
    __reflect(LetsSingView.prototype, "game.LetsSingView");
})(game || (game = {}));
//# sourceMappingURL=LetsSingView.js.map