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
    var LetsWatchView = (function (_super) {
        __extends(LetsWatchView, _super);
        function LetsWatchView() {
            var _this = _super.call(this) || this;
            _this.skinName = "LetsWatchSkin";
            return _this;
        }
        ;
        LetsWatchView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        LetsWatchView.prototype.init = function () {
            this.kComVideo.setSkinType(1);
            this.kComVideo.play("video");
        };
        return LetsWatchView;
    }(eui.Component));
    game.LetsWatchView = LetsWatchView;
    __reflect(LetsWatchView.prototype, "game.LetsWatchView");
})(game || (game = {}));
