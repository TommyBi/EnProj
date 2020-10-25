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
    var ListenRepeatView = (function (_super) {
        __extends(ListenRepeatView, _super);
        function ListenRepeatView() {
            var _this = _super.call(this) || this;
            _this.skinName = "ListenRepeatViewSkin";
            return _this;
        }
        ;
        ListenRepeatView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            for (var i = 0; i < 8; i++) {
                this["kCom" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                this["kCom" + i].setData(i);
            }
            this.init();
        };
        ListenRepeatView.prototype.init = function () {
            this.kComVideo.setSkinType(1);
            this.mCurPlayIdx = -1;
        };
        ListenRepeatView.prototype.onTouch = function (e) {
            this.mCurPlayIdx = Number(e.target.name);
            for (var i = 0; i < 8; i++) {
                if (this.mCurPlayIdx == i) {
                    egret.log("选中:", e.target.name);
                    this["kCom" + i].light();
                    this.kComVideo.play(i);
                }
                else {
                    this["kCom" + i].normal();
                }
            }
        };
        return ListenRepeatView;
    }(eui.Component));
    game.ListenRepeatView = ListenRepeatView;
    __reflect(ListenRepeatView.prototype, "game.ListenRepeatView");
})(game || (game = {}));
//# sourceMappingURL=ListenRepeatView.js.map