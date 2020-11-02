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
     * ReplayComponent
     * 重新开始组件
     */
    var ReplayComponent = (function (_super) {
        __extends(ReplayComponent, _super);
        function ReplayComponent() {
            var _this = _super.call(this) || this;
            _this.skinName = "ReplayComponentSkin";
            return _this;
        }
        ReplayComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.kImgReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRePlay, this);
            this.kImgStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReStart, this);
            this.init();
        };
        ReplayComponent.prototype.init = function () {
            egret.Tween.removeTweens(this.kGrpReplay);
        };
        /** 重新开始 */
        ReplayComponent.prototype.onRePlay = function () {
            egret.Tween.removeTweens(this.kImgReplay);
            XDFFrame.EventCenter.sendEvent(game.EventConst.eventReplay);
        };
        /** 开始 */
        ReplayComponent.prototype.onReStart = function () {
            egret.Tween.removeTweens(this.kImgStart);
            XDFFrame.EventCenter.sendEvent(game.EventConst.eventStart);
        };
        ReplayComponent.prototype.showReplay = function () {
            this.kImgReplay.visible = true;
            this.kImgStart.visible = false;
            egret.Tween.removeTweens(this.kImgReplay);
            this.kImgReplay.scaleX = this.kImgReplay.scaleY = 1;
            egret.Tween.get(this.kImgReplay, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut);
        };
        /** 显示开始组件 */
        ReplayComponent.prototype.showStart = function () {
            egret.Tween.removeTweens(this.kImgStart);
            this.kImgReplay.visible = false;
            this.kImgStart.visible = true;
            this.kImgStart.scaleX = this.kImgStart.scaleY = 1;
            egret.Tween.get(this.kImgStart, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut);
        };
        return ReplayComponent;
    }(eui.Component));
    game.ReplayComponent = ReplayComponent;
    __reflect(ReplayComponent.prototype, "game.ReplayComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
