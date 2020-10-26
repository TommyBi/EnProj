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
     * DDSComponent
     */
    var DDSComponent = (function (_super) {
        __extends(DDSComponent, _super);
        function DDSComponent() {
            var _this = _super.call(this) || this;
            _this.skinName = "DDSComponentSkin";
            return _this;
        }
        DDSComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // 初始化动画
            this.mAnimMouseDown = XDFFrame.DBFactory.createAnim("db_mouse_down");
            this.mAnimMouseDown.setProtery({ x: 0, y: -20, parent: this.kGrpAnim, scaleX: 0.45, scaleY: 0.45 });
            this.mAnimMouseUp = XDFFrame.DBFactory.createAnim("db_mouse_up");
            this.mAnimMouseUp.setProtery({ x: 0, y: 0, parent: this.kGrpAnim, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimMouseHit = XDFFrame.DBFactory.createAnim("db_mouse_hit");
            this.mAnimMouseHit.setProtery({ x: 0, y: -50, parent: this.kGrpAnim, scaleX: 0.45, scaleY: 0.45 });
            this.kGrpAnim.mask = this.kGrpAnimMask;
            this.init();
        };
        DDSComponent.prototype.init = function () {
            this.kGrpAnim.visible = this.mAnimMouseUp.visible = this.mAnimMouseDown.visible = this.mAnimMouseHit.visible = false;
            this.kImg.scaleX = this.kImg.scaleY = 0;
        };
        /** 是否显示老鼠动画 */
        DDSComponent.prototype.setMouseShowState = function (state) {
            this.kGrpAnim.visible = state;
        };
        /** 设置图片 */
        DDSComponent.prototype.formateImg = function (idx) {
            this.kImg.source = "img_lp_option" + idx + "_png";
        };
        /** 老鼠动画 */
        DDSComponent.prototype.playMouseAnim = function (type, cb, thisOBj) {
            var _this = this;
            switch (type) {
                case "down":
                    this.kGrpAnim.visible = this.mAnimMouseDown.visible = true;
                    this.mAnimMouseUp.visible = this.mAnimMouseHit.visible = false;
                    this.mAnimMouseDown.play(null, 1, cb, thisOBj);
                    this.showImg(false);
                    this.kGrpAnim.visible = false;
                    break;
                case "up":
                    this.kGrpAnim.visible = this.mAnimMouseUp.visible = true;
                    this.mAnimMouseDown.visible = this.mAnimMouseHit.visible = false;
                    this.mAnimMouseUp.play(null, 1, function () {
                        _this.showImg(true);
                        cb && cb.call(thisOBj);
                    }, this);
                    break;
                case "hit":
                    console.log("播放打击动画");
                    this.kGrpAnim.visible = this.mAnimMouseHit.visible = true;
                    this.mAnimMouseDown.visible = this.mAnimMouseUp.visible = false;
                    this.mAnimMouseHit.play(null, 3, function () {
                        cb && cb.call(thisOBj);
                    }, this);
                    break;
            }
        };
        /** 是否是要去显示 */
        DDSComponent.prototype.showImg = function (showAction) {
            egret.Tween.removeTweens(this.kImg);
            if (showAction) {
                this.kImg.scaleX = this.kImg.scaleY = 0;
                egret.Tween.get(this.kImg).to({ scaleX: 0.5, scaleY: 0.5 }, 200, egret.Ease.cubicInOut);
            }
            else {
                this.kImg.scaleX = this.kImg.scaleY = 0.5;
                egret.Tween.get(this.kImg).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.cubicInOut);
            }
        };
        return DDSComponent;
    }(eui.Component));
    game.DDSComponent = DDSComponent;
    __reflect(DDSComponent.prototype, "game.DDSComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=DDSComponent.js.map