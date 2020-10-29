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
            _this.mSkinType = 1; // 表示 背景类型
            _this.mShowModel = 1; // 表示 翻卡的模式 0：常规发音版翻卡游戏 1：绘本故事版翻卡游戏
            _this.mWords = ["shirt", "pants"];
            _this.mPictureCount = 2;
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
            if (this.mShowModel == 0) {
                // 需要发音的翻卡游戏
                for (var i = 0; i < this.mWords.length; i++) {
                    var com = new game.ThinkComponent(i, this.mWords[i]);
                    com.scaleX = com.scaleY = this.mWords.length >= 3 ? 0.8 : 1;
                    com.width = this.mWords.length >= 3 ? 569 : 769;
                    this.kGrpCom.addChild(com);
                }
            }
            else {
                // 不需要发音的翻卡游戏
                for (var i = 0; i < this.mPictureCount; i++) {
                    var com = new game.ThinkComPictureBook(i);
                    com.scaleX = com.scaleY = this.mPictureCount >= 3 ? 0.8 : 1;
                    com.width = this.mPictureCount >= 3 ? 569 : 769;
                    this.kGrpCom.addChild(com);
                }
            }
        };
        return LetsThinkView;
    }(eui.Component));
    game.LetsThinkView = LetsThinkView;
    __reflect(LetsThinkView.prototype, "game.LetsThinkView");
})(game || (game = {}));
//# sourceMappingURL=LetsThinkView.js.map