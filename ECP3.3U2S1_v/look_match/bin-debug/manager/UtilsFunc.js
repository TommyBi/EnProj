var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var XDFFrame;
(function (XDFFrame) {
    var utilFunc = (function () {
        function utilFunc() {
        }
        /**
        *  初始化播放顺序
        * @param tarCount: 目标生成的数量
        */
        utilFunc.calShowOrder = function (tarCount) {
            var arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        };
        /** 生产随机队列 */
        utilFunc.produceOrderArr = function (arr, tarCount) {
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
        return utilFunc;
    }());
    XDFFrame.utilFunc = utilFunc;
    __reflect(utilFunc.prototype, "XDFFrame.utilFunc");
})(XDFFrame || (XDFFrame = {}));
//# sourceMappingURL=UtilsFunc.js.map