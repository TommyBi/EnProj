var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var EventConst = (function () {
        function EventConst() {
        }
        EventConst.eventFinishVideoProgress = "eventFinishVideoProgress";
        EventConst.eventReplay = "eventReplay";
        return EventConst;
    }());
    game.EventConst = EventConst;
    __reflect(EventConst.prototype, "game.EventConst");
})(game || (game = {}));
//# sourceMappingURL=EventConst.js.map