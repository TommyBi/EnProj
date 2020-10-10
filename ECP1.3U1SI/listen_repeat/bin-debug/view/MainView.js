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
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this.skinName = "MainViewSkin";
            return _this;
        }
        ;
        MainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            for (var i = 0; i < 8; i++) {
                this["kCom" + i].addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverCom, this);
                this["kCom" + i].addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutCom, this);
                this["kCom" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                this["kCom" + i].setData(i);
            }
            mouse.enable(this.stage);
            this.init();
        };
        MainView.prototype.init = function () {
            this.mCurPlayIdx = -1;
        };
        /** 鼠标移到重放按钮 */
        MainView.prototype.onMoveOverCom = function (e) {
            this["kCom" + e.target.name].light();
        };
        /** 鼠标移出重放按钮 */
        MainView.prototype.onMoveOutCom = function (e) {
            if (Number(e.target.name) != this.mCurPlayIdx) {
                this["kCom" + e.target.name].normal();
            }
        };
        MainView.prototype.onTouch = function (e) {
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
        return MainView;
    }(eui.Component));
    game.MainView = MainView;
    __reflect(MainView.prototype, "game.MainView");
})(game || (game = {}));
//# sourceMappingURL=MainView.js.map