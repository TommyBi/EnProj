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
     * PreWordsCom
     * 介绍单词的组件
     */
    var PreWordsCom = (function (_super) {
        __extends(PreWordsCom, _super);
        function PreWordsCom() {
            var _this = _super.call(this) || this;
            _this.mSoundSrc = "";
            _this.skinName = "PreWordsComSkin";
            return _this;
        }
        PreWordsCom.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.kImgWords.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlaySound, this);
        };
        PreWordsCom.prototype.setData = function (cfg) {
            this.kImgWords.source = cfg.imgSrc;
            this.kLabelWords.text = cfg.words;
            this.mSoundSrc = cfg.soundSrc;
            this.kImgWords.height = 180 / this.kImgWords.width * this.kImgWords.height;
            this.kImgWords.width = 180;
        };
        PreWordsCom.prototype.onPlaySound = function () {
            XDFSoundManager.play(this.mSoundSrc);
        };
        return PreWordsCom;
    }(eui.Component));
    game.PreWordsCom = PreWordsCom;
    __reflect(PreWordsCom.prototype, "game.PreWordsCom", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=PreWordsCom.js.map