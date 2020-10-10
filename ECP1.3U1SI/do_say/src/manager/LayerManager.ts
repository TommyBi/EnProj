// TypeScript file
class BaseUILayer extends eui.UILayer {
    public constructor() {
        super();
        this.percentHeight = 100;
        this.percentWidth = 100;
        this.touchEnabled = false;
    }
}

// 层级关系
class LayerManager {

    public static Game_Bg: BaseUILayer = new BaseUILayer();/**游戏背景层*/
    public static Game_Main: BaseUILayer = new BaseUILayer();/** 游戏主逻辑层*/
    public static UI_edge: BaseUILayer = new BaseUILayer();/**  边界遮罩层 */
    public static UI_View: BaseUILayer = new BaseUILayer();/**弹出界面层*/
    public static UI_Tips: BaseUILayer = new BaseUILayer();/** 提示层（Alert面板，飘字效果。。。）*/
    public static UI_EffectLayer: BaseUILayer = new BaseUILayer();/** 特效展示层*/
    public static UI_GUIDE: BaseUILayer = new BaseUILayer();/* 引导层*/
    public static UI_LOGO: BaseUILayer = new BaseUILayer();/** Logo层*/
    public static layers: BaseUILayer[] = [];

    public static get stage() {
        return egret.MainContext.instance.stage;
    }

    public static initLayer(): void {
        this.addLayer(this.Game_Bg, 0);
        this.addLayer(this.Game_Main, 1);
        this.addLayer(this.UI_edge, 2);
        this.addLayer(this.UI_View, 3);
        this.addLayer(this.UI_Tips, 4);
        this.addLayer(this.UI_EffectLayer, 5);
        this.addLayer(this.UI_GUIDE, 6);
        this.addLayer(this.UI_LOGO, 7);
        this.UI_LOGO.addChild(new XDFLogoComponent());
    }

    public static addLayer(type: BaseUILayer, idx): void {
        this.stage.addChildAt(type, idx);
        this.layers.push(type);
    }
}