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
    var LetsThinkView = (function (_super) {
        __extends(LetsThinkView, _super);
        function LetsThinkView() {
            var _this = _super.call(this) || this;
            _this.mSkinType = 1;
            _this.mWords = ["aaa", "bbb", "ccc", "ddd"];
            _this.skinName = "LetsThinkSkin";
            return _this;
        }
        ;
        LetsThinkView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        LetsThinkView.prototype.init = function () {
            this.kImgBg.source = "img_bg_" + this.mSkinType + "_png";
            for (var i = 0; i < this.mWords.length; i++) {
                var com = new game.ThinkComponent(i, this.mWords[i]);
                com.scaleX = com.scaleY = this.mWords.length > 3 ? 0.7 : 1;
                this.kGrpCom.addChild(com);
            }
        };
        return LetsThinkView;
    }(eui.Component));
    game.LetsThinkView = LetsThinkView;
    __reflect(LetsThinkView.prototype, "game.LetsThinkView");
})(game || (game = {}));
//# sourceMappingURL=LetsThinkView.js.map