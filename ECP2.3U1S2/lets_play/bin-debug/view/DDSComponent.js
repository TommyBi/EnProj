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
            this.mAnimRight = XDFFrame.DBFactory.createAnim("db_right");
            this.mAnimRight.setProtery({ x: 70, y: -20, parent: this.kGrpAnim, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimErr = XDFFrame.DBFactory.createAnim("db_wrong", 9);
            this.mAnimErr.setProtery({ x: 50, y: 30, parent: this.kGrpAnim, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim("db_idle");
            this.mAnimRoleIdle.setProtery({ x: 50, y: 50, parent: this.kGrpAnim, scaleX: 0.25, scaleY: 0.25 });
            this.init();
        };
        DDSComponent.prototype.init = function () {
        };
        return DDSComponent;
    }(eui.Component));
    game.DDSComponent = DDSComponent;
    __reflect(DDSComponent.prototype, "game.DDSComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=DDSComponent.js.map