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
var XDFEventManager = (function (_super) {
    __extends(XDFEventManager, _super);
    function XDFEventManager(target) {
        if (target === void 0) { target = null; }
        return _super.call(this, target) || this;
    }
    XDFEventManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new XDFEventManager();
        }
        return this._instance;
    };
    XDFEventManager.dispatchEvent = function (event) {
        this.getInstance().dispatchEvent(event);
    };
    XDFEventManager.addEventListener = function (type, listener, content) {
        this.getInstance().addEventListener(type, listener, content);
    };
    XDFEventManager.hasEventListener = function (type) {
        return this.getInstance().hasEventListener(type);
    };
    XDFEventManager.removeEventListener = function (type, listener) {
        this.getInstance().removeEventListener(type, listener, this);
    };
    XDFEventManager.onPasue = function () {
        this.getInstance().dispatchEventWith(XDFEventManager.PAUSE);
    };
    XDFEventManager.onResume = function () {
        this.getInstance().dispatchEventWith(XDFEventManager.RESUME);
    };
    XDFEventManager.PAUSE = "pause_event";
    XDFEventManager.RESUME = "resume_event";
    return XDFEventManager;
}(egret.EventDispatcher));
__reflect(XDFEventManager.prototype, "XDFEventManager");
//# sourceMappingURL=XDFEventManager.js.map