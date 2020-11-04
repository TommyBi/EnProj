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
var Value = (function (_super) {
    __extends(Value, _super);
    function Value(value) {
        var _this = _super.call(this) || this;
        _this._value = value;
        return _this;
    }
    Object.defineProperty(Value.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value != value) {
                this._value = value;
                var data = new Data(Data.DATA);
                this.dispatchEvent(data);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Value;
}(egret.EventDispatcher));
__reflect(Value.prototype, "Value");
var Data = (function (_super) {
    __extends(Data, _super);
    function Data(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    Data.DATA = "valueChang";
    return Data;
}(egret.Event));
__reflect(Data.prototype, "Data");
//# sourceMappingURL=ChangeNum.js.map