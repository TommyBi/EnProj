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
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            // init DBAnim
            this.mAnimRoleRight = XDFFrame.DBFactory.createAnim("db_right");
            this.mAnimRoleRight.setProtery({ parent: this.kGrpRoleAnim, scaleX: 1, scaleY: 1 });
            this.mAnimRoleErr = XDFFrame.DBFactory.createAnim("db_wrong");
            this.mAnimRoleErr.setProtery({ parent: this.kGrpRoleAnim, scaleX: 1, scaleY: 1 });
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim("db_idle");
            this.mAnimRoleIdle.setProtery({ parent: this.kGrpRoleAnim, scaleX: 1, scaleY: 1 });
            this.mAnimRoleIdle.play(null, 0);
            // init state
        };
        /** 开始游戏 */
        LetsPlayView.prototype.onStart = function () {
        };
        return LetsPlayView;
    }(eui.Component));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map