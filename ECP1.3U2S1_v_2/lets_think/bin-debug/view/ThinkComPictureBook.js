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
     * ThinkComPictureBook
     * think 翻卡牌环节 中 每一个翻动的组件
     */
    var ThinkComPictureBook = (function (_super) {
        __extends(ThinkComPictureBook, _super);
        function ThinkComPictureBook(idx, skinType) {
            var _this = _super.call(this) || this;
            _this.mIsRolling = false;
            _this.mIsBack = true;
            _this.mIdx = 0;
            _this.mSkinType = 0;
            _this.skinName = "ThinkComPictureBookSkin";
            _this.mIdx = idx;
            _this.mSkinType = skinType;
            return _this;
        }
        ThinkComPictureBook.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.kGrpBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchToll, this);
            this.init();
        };
        ThinkComPictureBook.prototype.init = function () {
            this.mIsRolling = false;
            this.mIsBack = true;
            this.kImgCard.source = "img_think_bg" + this.mSkinType + "_png";
        };
        /** 翻滚 */
        ThinkComPictureBook.prototype.onTouchToll = function () {
            var _this = this;
            if (this.mIsRolling)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            egret.Tween.removeTweens(this.kGrpMain);
            egret.Tween.get(this.kGrpMain).to({ scaleX: 0 }, 200).call(function () {
                if (_this.mIsBack) {
                    _this.mIsBack = false;
                    _this.kImgCard.source = "img_think_pic" + _this.mIdx + "_png";
                }
                else {
                    _this.mIsBack = true;
                    _this.kImgCard.source = "img_think_bg" + _this.mSkinType + "_png";
                }
                egret.Tween.get(_this.kGrpMain).to({ scaleX: 1 }, 200);
            });
        };
        return ThinkComPictureBook;
    }(eui.Component));
    game.ThinkComPictureBook = ThinkComPictureBook;
    __reflect(ThinkComPictureBook.prototype, "game.ThinkComPictureBook", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=ThinkComPictureBook.js.map