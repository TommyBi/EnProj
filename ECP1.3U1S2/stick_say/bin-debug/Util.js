var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.addMoney = function (nowNum, am, timeNum) {
        var _this = this;
        timeNum = egret.setTimeout(function () {
            var aaa = 1;
            if (am > 100) {
                aaa = 100;
            }
            else if (am > 10) {
                aaa = 10;
            }
            am = am - aaa;
            nowNum.text = Number(nowNum.text) + aaa + "";
            if (am > 0) {
                _this.addMoney(nowNum, am, timeNum);
            }
            else {
                timeNum = -1;
            }
        }, this, 100);
    };
    Util.setColor = function (img, c) {
        //0xff8814 橘色
        // 0xff0000 : 0x79ff56
        var color = c; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 1; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 15; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 15; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 3; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        img.filters = [glowFilter];
    };
    Util.setImageColor = function (image, color) {
        // 将16进制颜色分割成rgb值
        var spliceColor = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        };
        var result = spliceColor(color);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        image.filters = [colorFilter];
    };
    Util.randomNum = function (minNum, maxNum) {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    };
    Util.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Util.setTween = function (tmp, wnum) {
        egret.Tween.get(tmp).to({ scaleX: 0, scaleY: 0 }, 0).wait(wnum).to({ scaleX: 1, scaleY: 1 }, 250).to({ scaleX: 0.9, scaleY: 0.9 }, 120).to({ scaleX: 1, scaleY: 1 }, 120).call(function () {
            egret.Tween.get(tmp, { loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        });
    };
    /**
    *  初始化播放顺序
    * @param tarCount: 目标生成的数量
    */
    Util.calShowOrder = function (tarCount) {
        var arr = [];
        this.produceOrderArr(arr, tarCount);
        return arr;
    };
    /** 生产随机队列 */
    Util.produceOrderArr = function (arr, tarCount) {
        if (arr.length < tarCount) {
            var idx = Util.randomNum(0, tarCount - 1);
            if (arr.indexOf(idx) == -1) {
                arr.push(idx);
                if (arr.length < tarCount) {
                    this.produceOrderArr(arr, tarCount);
                }
            }
            else {
                this.produceOrderArr(arr, tarCount);
            }
        }
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map