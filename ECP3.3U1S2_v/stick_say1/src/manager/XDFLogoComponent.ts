/**
 * XDF Logo 组件
 * @description 为什么要封装成组件？ ——如果以后还有其他需求，可以更方便添加，直接替换ts文件和图片资源即可。
 * @description 为什么资源名称这么奇怪？ ——为了避免可能发生的命名冲突。
 * @description 一定要使用方法中的addToParent吗？ ——addToParent中包含了设置UIlayer的大小与触摸，如果要添加的Layer已进行设置，那么直接把本组件实例化用addChild添加是一样的。
 * @warning Logo 图片资源应放置在Loading页面的独立资源组中，确保实例化时图像资源已加载。
 */
class XDFLogoComponent extends eui.Component {
    constructor() {
        super();

        this.percentHeight = 100;
        this.percentWidth = 100;
        this.touchChildren = false;
        this.touchEnabled = false;
        this.addLogoImage();
    }

    /**
     * 添加Logo图标
     */
    private addLogoImage(): void {
        const img = new eui.Image();
        img.source = "_xdf_logo__png";
        img.anchorOffsetX = img.width;
        img.anchorOffsetY = img.height;
        img.bottom = 0;
        img.right = 0;
        this.addChild(img);
    }

    /**
     * 添加到父级Layer上（已自动设置触摸）
     * @param parent 父级Layer
     */
    public addToParent(parent: eui.UILayer): void {
        parent.percentHeight = 100;
        parent.percentWidth = 100;

        parent.touchChildren = false;
        parent.touchEnabled = false;
        parent.touchThrough = true;

        parent.addChild(this);
    }
}