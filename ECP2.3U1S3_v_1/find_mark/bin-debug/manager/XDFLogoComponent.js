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
/**
 * XDF Logo 组件
 * @description 为什么要封装成组件？ ——如果以后还有其他需求，可以更方便添加，直接替换ts文件和图片资源即可。
 * @description 为什么资源名称这么奇怪？ ——为了避免可能发生的命名冲突。
 * @description 一定要使用方法中的addToParent吗？ ——addToParent中包含了设置UIlayer的大小与触摸，如果要添加的Layer已进行设置，那么直接把本组件实例化用addChild添加是一样的。
 * @warning Logo 图片资源应放置在Loading页面的独立资源组中，确保实例化时图像资源已加载。
 */
var XDFLogoComponent = (function (_super) {
    __extends(XDFLogoComponent, _super);
    function XDFLogoComponent() {
        var _this = _super.call(this) || this;
        _this.percentHeight = 100;
        _this.percentWidth = 100;
        _this.touchChildren = false;
        _this.touchEnabled = false;
        _this.addLogoImage();
        return _this;
    }
    /**
     * 添加Logo图标
     */
    XDFLogoComponent.prototype.addLogoImage = function () {
        var img = new eui.Image();
        img.source = "_xdf_logo__png";
        img.anchorOffsetX = img.width;
        img.anchorOffsetY = img.height;
        img.bottom = 0;
        img.right = 0;
        this.addChild(img);
    };
    /**
     * 添加到父级Layer上（已自动设置触摸）
     * @param parent 父级Layer
     */
    XDFLogoComponent.prototype.addToParent = function (parent) {
        parent.percentHeight = 100;
        parent.percentWidth = 100;
        parent.touchChildren = false;
        parent.touchEnabled = false;
        parent.touchThrough = true;
        parent.addChild(this);
    };
    return XDFLogoComponent;
}(eui.Component));
__reflect(XDFLogoComponent.prototype, "XDFLogoComponent");
//# sourceMappingURL=XDFLogoComponent.js.map