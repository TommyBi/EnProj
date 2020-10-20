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
    var LetsPlayView = (function (_super) {
        __extends(LetsPlayView, _super);
        function LetsPlayView() {
            var _this = _super.call(this) || this;
            _this.mOptionCount = 3;
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        ;
        LetsPlayView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kImgOption" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onChoise" + i], this);
            }
            this.init();
        };
        LetsPlayView.prototype.init = function () {
            // XDFSoundManager.play("sound_do_say_mp3");
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
        };
        /** 开始游戏 */
        LetsPlayView.prototype.onStart = function () {
        };
        LetsPlayView.prototype.onChoise0 = function () {
        };
        LetsPlayView.prototype.onChoise1 = function () {
        };
        LetsPlayView.prototype.onChoise2 = function () {
        };
        return LetsPlayView;
    }(eui.Component));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map