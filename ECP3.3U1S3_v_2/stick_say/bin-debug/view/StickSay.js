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
    var StickSay = (function (_super) {
        __extends(StickSay, _super);
        function StickSay() {
            var _this = _super.call(this) || this;
            _this.sideList = [];
            _this.answerList = [];
            _this.mSmokeAnimPos = [
                {
                    x: 600,
                    y: 650,
                }, {
                    x: 1025,
                    y: 160,
                }, {
                    x: 1404,
                    y: 486,
                }
            ];
            _this.mInter = 0;
            _this.skinName = "StickSaySkin";
            return _this;
        }
        StickSay.prototype.init = function () {
            _super.prototype.init.call(this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.touchFlag, this.onChangeWordsPanelAction, this);
            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("girl");
            this.mAnimRole0.setProtery({ x: 0, y: 0, parent: this.kAnim1, scaleX: 2, scaleY: 2 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("boy");
            this.mAnimRole1.setProtery({ x: 0, y: 0, parent: this.kAnim2, scaleX: 2, scaleY: 2 });
            XDFFrame.EventCenter.addEventListenr(game.EventConst.btnSelect, this.onSelect, this);
            this.sideList = [this.kSide1, this.kSide2, this.kSide3];
            // this.answerList = [this.kAnswer1, this.kAnswer2, this.kAnswer3];
            // 单词
            this.kComWordsPanel.setData([
                {
                    words: "Vietnamese",
                    imgSrc: "stick_6_png",
                    soundSrc: "vietnamese_mp3",
                    scaleX: .9,
                    scaleY: .9
                }, {
                    words: "Korean",
                    imgSrc: "stick_16_png",
                    soundSrc: "korean_mp3",
                    scaleX: .9,
                    scaleY: .9
                }
            ]);
        };
        StickSay.prototype.onStart = function () {
            _super.prototype.onStart.call(this);
            // this.sildeAnim(this.sideList[this.currentIndex - 1]);
            this.onNext();
            this.playSound(this.currentIndex, function () {
                // this.initImgTween();
            });
        };
        StickSay.prototype.onSelect = function (e) {
            if (!this.isStart)
                return;
            if (e.data == this.currentIndex) {
                this.kBtn.hide(this.currentIndex);
                this.playSuccess();
                this.hideSide();
                this.hideHui();
            }
            else {
                this.playErr();
            }
        };
        StickSay.prototype.onNext = function () {
            this.mAnimRole0.stop();
            this.mAnimRole1.stop();
            this.sildeAnim(this.sideList[this.currentIndex - 1]);
            if (this.currentIndex == 3) {
                var self_1 = this;
                var t_1 = setTimeout(function () {
                    clearTimeout(t_1);
                    self_1.hideSide();
                    self_1.hideHui();
                    self_1.playSuccess(false);
                }, 4000);
            }
            else if (this.currentIndex == 1) {
                this.mAnimRole0.play(null, 0);
            }
            else {
                this.mAnimRole1.play(null, 0);
            }
        };
        StickSay.prototype.onReplay = function () {
            _super.prototype.onReplay.call(this);
            this.kBtn.reset();
            this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
            this["kGp1"].visible = true;
            this["kGp2"].visible = true;
            this["kGp3"].visible = true;
            this.touchChildren = true;
            this.isStart = true;
            // this.kGp1.visible = this.kAnswer3.visible = this.kAnswer2.visible = false;
            this.onNext();
        };
        /** 是否开始显示单词 */
        StickSay.prototype.onChangeWordsPanelAction = function () {
            this.kComWordsPanel.playAction();
        };
        StickSay.prototype.onClick = function (e) {
            _super.prototype.onClick.call(this, e);
            this.kComWordsPanel.hide();
        };
        StickSay.prototype.sildeAnim = function (side) {
            var self = this;
            side.visible = true;
            this.mInter = setInterval(function () {
                side.visible = !side.visible;
            }, 150);
        };
        StickSay.prototype.hideSide = function () {
            clearInterval(this.mInter);
            this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
        };
        StickSay.prototype.hideHui = function () {
            switch (this.currentIndex) {
                case 1:
                    this["kGp1"].visible = false;
                    break;
                case 2:
                    this["kGp2"].visible = false;
                    break;
                case 3:
                    this["kGp3"].visible = false;
                    break;
            }
        };
        StickSay.prototype.over = function () {
            _super.prototype.over.call(this);
        };
        return StickSay;
    }(game.BaseView));
    game.StickSay = StickSay;
    __reflect(StickSay.prototype, "game.StickSay");
})(game || (game = {}));
//# sourceMappingURL=StickSay.js.map