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
    var LookCheckView = (function (_super) {
        __extends(LookCheckView, _super);
        function LookCheckView() {
            var _this = _super.call(this) || this;
            _this.mHintTimes = 0;
            _this.mCurHintIdx = 0;
            _this.skinName = "LookCheckViewSkin";
            return _this;
        }
        Object.defineProperty(LookCheckView.prototype, "mIsLock", {
            get: function () {
                return false;
            },
            set: function (b) {
                this.kGrpCom.touchChildren = !b;
            },
            enumerable: true,
            configurable: true
        });
        ;
        LookCheckView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.lookCheckSelectResult, this.onGetSelectResult, this);
            this.init();
        };
        LookCheckView.prototype.onGetSelectResult = function (e) {
            var _this = this;
            console.log(e.data);
            if (e.data) {
                this.kComAnswer.visible = true;
                this.mIsLock = true;
                this.kComAnswer.playGood(function () {
                    _this.kComAnswer.visible = false;
                    _this.mIsLock = false;
                    _this.next();
                });
            }
            else {
                this.kComAnswer.visible = true;
                this.mIsLock = true;
                this.kComAnswer.playErr(function () {
                    _this.mIsLock = false;
                    _this.kComAnswer.visible = false;
                    _this.hintComByIdx(_this.mCurHintIdx);
                });
            }
        };
        LookCheckView.prototype.onReStart = function () {
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.onStart();
        };
        LookCheckView.prototype.onStart = function () {
            this.kComReplay.visible = false;
            for (var i = 0; i < 4; i++) {
                var precom = this.kGrpCom.getChildAt(i);
                precom.reset();
                precom.visible = precom.includeInLayout = precom.mIdx == 0 || precom.mIdx == 1;
            }
            this.mHintTimes = 0;
            this.mCurShow = [0, 1];
            this.setComVisible(this.mCurShow);
            this.next();
        };
        LookCheckView.prototype.setComVisible = function (arr) {
            for (var i = 0; i < 4; i++) {
                var precom = this.kGrpCom.getChildAt(i);
                precom.visible = precom.includeInLayout = arr.indexOf(i) != -1;
            }
        };
        /** 开始提示环节 */
        LookCheckView.prototype.next = function () {
            if (this.mCurShow.length == 0) {
                // 下一组
                if (this.mHintTimes >= 4) {
                    this.kComAnswer.visible = this.kComReplay.visible = true;
                    this.kComReplay.showReplay();
                }
                else {
                    this.mCurShow = [2, 3];
                    this.setComVisible(this.mCurShow);
                    this.mCurHintIdx = this.mCurShow.shift();
                    this.hintComByIdx(this.mCurHintIdx);
                    this.mHintTimes++;
                }
            }
            else {
                this.mCurHintIdx = this.mCurShow.shift();
                this.hintComByIdx(this.mCurHintIdx);
                this.mHintTimes++;
            }
        };
        /** 通过id控制显示该提示哪组 */
        LookCheckView.prototype.hintComByIdx = function (idx) {
            for (var i = 0; i < 4; i++) {
                var precom = this.kGrpCom.getChildAt(i);
                if (precom.mIdx == idx) {
                    precom.showAction();
                    break;
                }
            }
        };
        LookCheckView.prototype.init = function () {
            this.kComAnswer.visible = false;
            this.kComReplay.visible = true;
            this.kGrpCom.removeChildren();
            for (var i = 0; i < 4; i++) {
                var preCom = new game.LookCheckPreCom();
                this.kGrpCom.addChild(preCom);
                preCom.init(i);
                preCom.visible = preCom.includeInLayout = i < 2;
            }
            this.kComReplay.showStart();
        };
        return LookCheckView;
    }(eui.Component));
    game.LookCheckView = LookCheckView;
    __reflect(LookCheckView.prototype, "game.LookCheckView");
})(game || (game = {}));
//# sourceMappingURL=LookCheckView.js.map