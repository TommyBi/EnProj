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
                    x: 296,
                    y: 695,
                }, {
                    x: 897,
                    y: 666,
                }, {
                    x: 1212,
                    y: 530,
                }
            ];
            _this.mInter = 0;
            _this.skinName = "StickSaySkin";
            return _this;
        }
        StickSay.prototype.init = function () {
            _super.prototype.init.call(this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.touchFlag, this.onChangeWordsPanelAction, this);
            this.mRole1 = XDFFrame.DBFactory.createAnim("role1");
            this.mRole1.setProtery({ x: 500, y: 300, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.mRole2 = XDFFrame.DBFactory.createAnim("role2");
            this.mRole2.setProtery({ x: 900, y: 300, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.mRole3 = XDFFrame.DBFactory.createAnim("role3");
            this.mRole3.setProtery({ x: 1300, y: 400, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.mRole4 = XDFFrame.DBFactory.createAnim("role4");
            this.mRole4.setProtery({ x: 300, y: 700, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.mRole5 = XDFFrame.DBFactory.createAnim("role5");
            this.mRole5.setProtery({ x: 1200, y: 550, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.mRole6 = XDFFrame.DBFactory.createAnim("role6");
            this.mRole6.setProtery({ x: 880, y: 650, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            XDFFrame.EventCenter.addEventListenr(game.EventConst.btnSelect, this.onSelect, this);
            this.mRole4.visible = this.mRole5.visible = this.mRole6.visible = false;
            this.sideList = [this.kSide1, this.kSide2, this.kSide3];
            this.answerList = [this.kAnswer1, this.kAnswer2, this.kAnswer3];
            // 单词
            this.kComWordsPanel.setData([
                {
                    words: "ski",
                    imgSrc: "stick_11_png",
                    soundSrc: "ski_mp3",
                    scaleX: 1,
                    scaleY: 1
                }, {
                    words: "sled",
                    imgSrc: "stick_12_png",
                    soundSrc: "sled_mp3",
                    scaleX: 1,
                    scaleY: 1
                }, {
                    words: "skate",
                    imgSrc: "stick_13_png",
                    soundSrc: "skat_mp3",
                    scaleX: 1,
                    scaleY: 1
                }
            ]);
        };
        StickSay.prototype.onStart = function () {
            _super.prototype.onStart.call(this);
            // this.sildeAnim(this.sideList[this.currentIndex - 1]);
            this.mRole3.play(null, 0);
            this.mRole2.play(null, 0);
            this.mRole1.play(null, 0);
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
                this.hideSide();
                this.playSuccess();
                this.playSmoke(this.mSmokeAnimPos[this.currentIndex - 1]);
                this.hideHui();
            }
            else {
                this.playErr();
            }
        };
        StickSay.prototype.onNext = function () {
            this.playAnim(this.answerList[this.currentIndex - 1]);
            this.sildeAnim(this.sideList[this.currentIndex - 1]);
        };
        StickSay.prototype.onReplay = function () {
            _super.prototype.onReplay.call(this);
            this.kBtn.reset();
            this.isStart = true;
            this.mRole4.visible = this.mRole5.visible = this.mRole6.visible = false;
            this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
            this["kGp1"].visible = true;
            this["kGp2"].visible = true;
            this["kGp3"].visible = true;
            this.kAnswer1.visible = this.kAnswer3.visible = this.kAnswer2.visible = false;
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
        StickSay.prototype.playAnim = function (awswer) {
            awswer.scaleX = awswer.scaleY = 0;
            awswer.visible = true;
            egret.Tween.get(awswer).to({ scaleX: 1, scaleY: 1 }, 500).call(function () {
                egret.Tween.removeTweens(awswer);
            });
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
                    this.mRole4.visible = true;
                    this.mRole4.play(null, 1, function () {
                    }, this);
                    break;
                case 2:
                    this.mRole6.visible = true;
                    this.mRole6.play(null, 1, function () {
                    }, this);
                    this["kGp2"].visible = false;
                    break;
                case 3:
                    this.mRole5.visible = true;
                    this.mRole5.play(null, 1, function () {
                    }, this);
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