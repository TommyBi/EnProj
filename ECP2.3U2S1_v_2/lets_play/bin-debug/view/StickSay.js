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
            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("boy");
            this.mAnimRole0.setProtery({ x: 0, y: 0, parent: this.kAnim1, scaleX: 1.2, scaleY: 1.2 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("girl");
            this.mAnimRole1.setProtery({ x: 0, y: 0, parent: this.kAnim2, scaleX: 1.2, scaleY: 1.2 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("girls");
            this.mAnimRole2.setProtery({ x: 0, y: 0, parent: this.kAnim3, scaleX: 1.2, scaleY: 1.2 });
            this.mAnimRole3 = XDFFrame.DBFactory.createAnim("monkey");
            this.mAnimRole3.setProtery({ x: 0, y: 0, parent: this.kAnim0, scaleX: 1.2, scaleY: 1.2 });
            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 400, y: 480, parent: this.kGrpSmokeAnim, scaleX: 1.5, scaleY: 1.5 });
            XDFFrame.EventCenter.addEventListenr(game.EventConst.btnSelect, this.onSelect, this);
            this.sideList = [this.kSide1, this.kSide2, this.kSide3];
            this.answerList = [this.kAnswer1, this.kAnswer2, this.kAnswer3];
            // 单词
            this.kComWordsPanel.setData([
                {
                    words: "giraffe",
                    imgSrc: "animal_1_png",
                    soundSrc: "giraffe_mp3",
                    scaleX: 0.4,
                    scaleY: 0.4
                }, {
                    words: "elephant",
                    imgSrc: "animal_2_png",
                    soundSrc: "elephant_mp3",
                    scaleX: 0.4,
                    scaleY: 0.4
                }, {
                    words: "monkey",
                    imgSrc: "animal_3_png",
                    soundSrc: "monkey_mp3",
                    scaleX: 0.4,
                    scaleY: 0.4
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
                    this.imgAnim1();
                    this.mAnimRole0.play(null, 1, function () {
                    }, this);
                    break;
                case 2:
                    this.imgAnim2();
                    this.mAnimRole1.play(null, 1, function () {
                    }, this);
                    this["kGp2"].visible = false;
                    break;
                case 3:
                    this.mAnimRole3.play(null, 1, function () {
                    }, this);
                    this.mAnimRole2.play(null, 1, function () {
                    }, this);
                    this["kGp3"].visible = false;
                    break;
            }
        };
        StickSay.prototype.imgAnim1 = function () {
            var _this = this;
            egret.Tween.get(this.kImg1).to({ rotation: 9 }, 500).to({ rotation: 0 }, 500).call(function () {
                egret.Tween.removeTweens(_this.kImg1);
            });
        };
        StickSay.prototype.imgAnim2 = function () {
            var _this = this;
            egret.Tween.get(this.kImg2).to({ rotation: 30 }, 500).to({ rotation: 0 }, 500).call(function () {
                egret.Tween.removeTweens(_this.kImg2);
            });
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