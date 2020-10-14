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
            this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverReplayBtn, this);
            this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutReplayBtn, this);
            mouse.enable(this.stage);
            this.init();
        };
        ReplayComponent.prototype.init = function () {
            egret.Tween.removeTweens(this.kGrpReplay);
            this.kImgReplay.y = 0;
        };
        /** 重新开始 */
        ReplayComponent.prototype.onRePlay = function () {
            egret.Tween.removeTweens(this.kImgReplay);
            // TODO: sentEevent to replay
            XDFFrame.EventCenter.sendEvent(game.EventConst.eventReplay);
        };
        ReplayComponent.prototype.showReplay = function () {
            egret.Tween.removeTweens(this.kImgReplay);
            this.kImgReplay.scaleX = this.kImgReplay.scaleY = 0.3;
            this.kImgReplay.source = "img_replay_j_png";
            this.kImgReplay.visible = true;
            egret.Tween.get(this.kImgReplay, { loop: true })
                .to({ scaleX: 0.32, scaleY: 0.32 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 0.3, scaleY: 0.3 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 0.32, scaleY: 0.32 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 0.3, scaleY: 0.3 }, 300, egret.Ease.cubicInOut);
        };
        /** 鼠标移到重放按钮 */
        ReplayComponent.prototype.onMoveOverReplayBtn = function () {
            if (this.kImgReplay.source != "img_replay_d_png") {
                this.kImgReplay.source = "img_replay_d_png";
                egret.Tween.removeTweens(this.kImgReplay);
                egret.Tween.removeTweens(this.kGrpReplay);
                this.kGrpReplay.y = 0;
                egret.Tween.get(this.kGrpReplay, { loop: true })
                    .to({ y: 10 }, 300, egret.Ease.cubicInOut)
                    .to({ y: -10 }, 300, egret.Ease.cubicInOut)
                    .to({ y: 10 }, 300, egret.Ease.cubicInOut)
                    .to({ y: -10 }, 300, egret.Ease.cubicInOut);
            }
        };
        /** 鼠标移出重放按钮 */
        ReplayComponent.prototype.onMoveOutReplayBtn = function () {
            if (this.kImgReplay.source != "img_replay_j_png")
                this.kImgReplay.source = "img_replay_j_png";
            egret.Tween.removeTweens(this.kGrpReplay);
            this.kGrpReplay.y = 0;
            this.showReplay();
        };
        return ReplayComponent;
    }(eui.Component));
    game.ReplayComponent = ReplayComponent;
    __reflect(ReplayComponent.prototype, "game.ReplayComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=ReplayComponent.js.map