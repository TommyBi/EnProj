var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var XDFFrame;
(function (XDFFrame) {
    /**
     * 事件处理中心
     */
    var EventCenter = (function () {
        function EventCenter() {
        }
        Object.defineProperty(EventCenter, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new egret.EventDispatcher();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EventCenter.dispatch = function (type, data, bubbles, cancelable) {
            return this.instance.dispatchEventWith(type, bubbles, data, cancelable);
        };
        EventCenter.addEventListenr = function (type, listener, thisObj, useCapture, priority) {
            this.instance.addEventListener(type, listener, thisObj, useCapture, priority);
        };
        EventCenter.removeEventListener = function (type, listener, thisObject, useCapture) {
            this.instance.removeEventListener(type, listener, thisObject, useCapture);
        };
        EventCenter.sendEvent = function (e, data) {
            var eve = new egret.Event(e);
            eve.data = data;
            this.instance.dispatchEvent(eve);
        };
        return EventCenter;
    }());
    XDFFrame.EventCenter = EventCenter;
    __reflect(EventCenter.prototype, "XDFFrame.EventCenter");
})(XDFFrame || (XDFFrame = {}));
//# sourceMappingURL=EventCenter.js.map