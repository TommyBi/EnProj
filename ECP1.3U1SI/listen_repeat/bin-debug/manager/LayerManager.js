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
// TypeScript file
var BaseUILayer = (function (_super) {
    __extends(BaseUILayer, _super);
    function BaseUILayer() {
        var _this = _super.call(this) || this;
        _this.percentHeight = 100;
        _this.percentWidth = 100;
        _this.touchEnabled = false;
        return _this;
    }
    return BaseUILayer;
}(eui.UILayer));
__reflect(BaseUILayer.prototype, "BaseUILayer");
// 层级关系
var LayerManager = (function () {
    function LayerManager() {
    }
    Object.defineProperty(LayerManager, "stage", {
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    LayerManager.initLayer = function () {
        this.addLayer(this.Game_Bg, 0);
        this.addLayer(this.Game_Main, 1);
        this.addLayer(this.UI_edge, 2);
        this.addLayer(this.UI_View, 3);
        this.addLayer(this.UI_Tips, 4);
        this.addLayer(this.UI_EffectLayer, 5);
        this.addLayer(this.UI_GUIDE, 6);
        this.addLayer(this.UI_LOGO, 7);
        this.UI_LOGO.addChild(new XDFLogoComponent());
    };
    LayerManager.addLayer = function (type, idx) {
        this.stage.addChildAt(type, idx);
        this.layers.push(type);
    };
    LayerManager.Game_Bg = new BaseUILayer(); /**游戏背景层*/
    LayerManager.Game_Main = new BaseUILayer(); /** 游戏主逻辑层*/
    LayerManager.UI_edge = new BaseUILayer(); /**  边界遮罩层 */
    LayerManager.UI_View = new BaseUILayer(); /**弹出界面层*/
    LayerManager.UI_Tips = new BaseUILayer(); /** 提示层（Alert面板，飘字效果。。。）*/
    LayerManager.UI_EffectLayer = new BaseUILayer(); /** 特效展示层*/
    LayerManager.UI_GUIDE = new BaseUILayer(); /* 引导层*/
    LayerManager.UI_LOGO = new BaseUILayer(); /** Logo层*/
    LayerManager.layers = [];
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map