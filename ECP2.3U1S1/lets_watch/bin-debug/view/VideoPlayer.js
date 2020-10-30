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
    var VideoPlayer = (function (_super) {
        __extends(VideoPlayer, _super);
        function VideoPlayer() {
            var _this = _super.call(this) || this;
            _this.skinName = "VideoPlayerSkin";
            return _this;
        }
        ;
        VideoPlayer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        VideoPlayer.prototype.init = function () {
            this.kComCaption.load("video");
        };
        return VideoPlayer;
    }(eui.Component));
    game.VideoPlayer = VideoPlayer;
    __reflect(VideoPlayer.prototype, "game.VideoPlayer");
})(game || (game = {}));
