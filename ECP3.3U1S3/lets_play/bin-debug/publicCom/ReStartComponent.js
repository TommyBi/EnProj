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
     * ReStartComponent
     * 重新开始组件
     */
    var ReStartComponent = (function (_super) {
        __extends(ReStartComponent, _super);
        function ReStartComponent() {
            var _this = _super.call(this) || this;
            _this.skinName = "ReStartComponentSkin";
            return _this;
        }
        ReStartComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        ReStartComponent.prototype.init = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNotifyStart, this);
        };
        ReStartComponent.prototype.playActionStart = function () {
            this.hideAll();
            if (!this.mAnimStart) {
                this.mAnimStart = XDFFrame.DBFactory.createAnim("db_start");
                this.mAnimStart.setProtery({ parent: this.kGrpStart, scaleX: 2, scaleY: 2 });
            }
            this.kGrpStart.visible = true;
            XDFSoundManager.play("sound_start_mp3");
            this.mAnimStart.play(null, 1);
        };
        ReStartComponent.prototype.playActionTimeOut = function () {
            this.hideAll();
            if (!this.mAnimTimeOut) {
                this.mAnimTimeOut = XDFFrame.DBFactory.createAnim("db_timeOut");
                this.mAnimTimeOut.setProtery({ parent: this.kGrpTimeOut, scaleX: 2, scaleY: 2 });
            }
            this.kGrpTimeOut.visible = true;
            XDFSoundManager.play("sound_die_mp3");
            this.mAnimTimeOut.play(null, 1);
        };
        ReStartComponent.prototype.playActionGoodJob = function () {
            this.hideAll();
            if (!this.mAnimGoodJob) {
                this.mAnimGoodJob = XDFFrame.DBFactory.createAnim("db_goodJob", 4);
                this.mAnimGoodJob.setProtery({ parent: this.kGrpGoodJob, scaleX: 0.7, scaleY: 0.7 });
            }
            this.kGrpGoodJob.visible = true;
            XDFSoundManager.play("sound_start_mp3");
            this.mAnimGoodJob.play(null, 1);
        };
        ReStartComponent.prototype.onNotifyStart = function () {
            XDFFrame.EventCenter.sendEvent(game.EventConst.startComPlayGame);
        };
        ReStartComponent.prototype.hideAll = function () {
            this.kGrpStart.visible = this.kGrpGoodJob.visible = this.kGrpTimeOut.visible = false;
        };
        return ReStartComponent;
    }(eui.Component));
    game.ReStartComponent = ReStartComponent;
    __reflect(ReStartComponent.prototype, "game.ReStartComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=ReStartComponent.js.map