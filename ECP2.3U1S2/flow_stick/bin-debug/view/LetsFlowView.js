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
    var LetsFlowView = (function (_super) {
        __extends(LetsFlowView, _super);
        function LetsFlowView() {
            var _this = _super.call(this) || this;
            _this.currentIndex = 0;
            _this.mStatus1 = 0;
            _this.mStatus3 = 0;
            _this.mStatus2 = 0;
            _this.isOpen = 0;
            _this.mImgArr = [];
            _this.mArr = [1, 2, 3];
            _this.sounds = ["Cows_mp3", "Chickens_mp3", "Sheep_mp3"];
            _this.skinName = "LetsFlowViewSkin";
            return _this;
        }
        LetsFlowView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.mImgArr = [this.kImg1, this.kImg2, this.kImg3];
            this.init();
        };
        LetsFlowView.prototype.init = function () {
            this.kReplay.showStart();
            this.kImg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick1, this);
            this.kImg2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick2, this);
            this.kImg3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick3, this);
            this.kGoods1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect1, this);
            this.kGoods2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect2, this);
            this.kGoods3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect3, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReplay, this);
            this.purple_road = XDFFrame.DBFactory.createAnim("purple_road");
            this.purple_road.setProtery({ x: -55, y: -40, parent: this.kRoadGp, scaleX: 1.06, scaleY: 1 });
            this.yellow_road = XDFFrame.DBFactory.createAnim("yellow_road");
            this.yellow_road.setProtery({ x: -30, y: 50, parent: this.kRoadGp, scaleX: 1.15, scaleY: 1 });
            this.blue_road = XDFFrame.DBFactory.createAnim("blue_road");
            this.blue_road.setProtery({ x: 45, y: -120, parent: this.kRoadGp, scaleX: 1.55, scaleY: 1.3 });
            // this.purple_road.play("normal", 1, () => { }, this);
            // this.yellow_road.play("normal", 1, () => { }, this);
            // this.blue_road.play("normal", 1, () => { }, this);
            this.purple_road.gotoAndStopByFrame("purple_road", 0);
            this.yellow_road.gotoAndStopByFrame("yellow_road", 0);
            this.blue_road.gotoAndStopByFrame("blue_road", 0);
        };
        LetsFlowView.prototype.onStart = function () {
            var _this = this;
            this.kReplay.visible = false;
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
            this.playSound(this.currentIndex, function () {
                _this.initImgTween();
            });
        };
        LetsFlowView.prototype.onReplay = function () {
            var _this = this;
            this.kGoods1.visible = this.kGoods2.visible = this.kGoods3.visible = true;
            this.kAnswer.visible = false;
            this.kReplay.visible = false;
            this.purple_road.gotoAndStopByFrame("purple_road", 0);
            this.yellow_road.gotoAndStopByFrame("yellow_road", 0);
            this.blue_road.gotoAndStopByFrame("blue_road", 0);
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
            this.playSound(this.currentIndex, function () {
                _this.initImgTween();
            });
        };
        LetsFlowView.prototype.onClick1 = function () {
            var _this = this;
            if (this.mStatus1)
                return;
            if (this.currentIndex != 1) {
                this.playErr();
            }
            else {
                this.mStatus1 = 1;
                this.isOpen = 1;
                this.removeAllImgTween();
                this.onRight();
                this.purple_road.play(null, 1, function () {
                    _this.kItem1.init(1);
                }, this);
            }
        };
        LetsFlowView.prototype.onClick2 = function () {
            var _this = this;
            if (this.mStatus2)
                return;
            if (this.currentIndex != 2) {
                this.playErr();
            }
            else {
                this.isOpen = 1;
                this.mStatus2 = 1;
                this.removeAllImgTween();
                this.yellow_road.play(null, 1, function () {
                    _this.kItem2.init(2);
                }, this);
                this.onRight();
            }
        };
        LetsFlowView.prototype.onClick3 = function () {
            var _this = this;
            if (this.mStatus3)
                return;
            if (this.currentIndex != 3) {
                this.playErr();
            }
            else {
                this.mStatus3 = 1;
                this.isOpen = 1;
                this.removeAllImgTween();
                this.onRight();
                this.blue_road.play(null, 1, function () {
                    _this.kItem3.init(3);
                }, this);
            }
        };
        LetsFlowView.prototype.onSelect1 = function () {
            if (this.mStatus1 && this.currentIndex == 1) {
                //处理动画
            }
            if (this.checkGoods(1)) {
                this.kGoods1.visible = false;
                this.kItem1.over(1);
            }
        };
        LetsFlowView.prototype.onSelect2 = function () {
            if (this.mStatus2 && this.currentIndex == 2) {
                //处理动画
            }
            if (this.checkGoods(2)) {
                this.kGoods2.visible = false;
                this.kItem2.over(2);
            }
        };
        LetsFlowView.prototype.onSelect3 = function () {
            if (this.mStatus3 && this.currentIndex == 3) {
                //处理动画
            }
            if (this.checkGoods(3)) {
                this.kGoods3.visible = false;
                this.kItem3.over(3);
            }
        };
        LetsFlowView.prototype.checkGoods = function (index) {
            var _this = this;
            if (this.isOpen) {
                if (this.currentIndex == index) {
                    //飞行动画
                    this.kGp.touchChildren = false;
                    XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                        _this.kGp.touchChildren = true;
                        if (_this.mArr.length == 0) {
                            _this.kAnswer.visible = true;
                            _this.kAnswer.playGood(function () {
                                _this.over();
                                _this.kGp.touchChildren = true;
                            });
                            return true;
                        }
                        _this.isOpen = 0;
                        var idx = Util.limitInteger(0, _this.mArr.length - 1);
                        var arr = _this.mArr.splice(idx, 1);
                        _this.currentIndex = arr[0];
                        _this.playSound(_this.currentIndex, function () {
                            _this.kGp.touchChildren = true;
                            _this.initImgTween();
                        });
                    });
                    return true;
                }
                else {
                    this.playErr();
                }
                return false;
            }
        };
        LetsFlowView.prototype.playErr = function () {
            var _this = this;
            this.kAnswer.visible = true;
            this.kGp.touchEnabled = false;
            this.kGp.touchChildren = false;
            this.removeAllImgTween();
            this.kAnswer.playErr(function () {
                _this.kAnswer.visible = false;
                var self = _this;
                if (!self.isOpen) {
                    _this.playSound(_this.currentIndex, function () {
                        _this.initImgTween();
                    });
                }
                var t = setTimeout(function () {
                    clearTimeout(t);
                    self.kGp.touchChildren = true;
                }, 1000);
            });
        };
        LetsFlowView.prototype.initImgTween = function () {
            for (var i = 0; i < this.mArr.length; i++) {
                this.playTween(this.mImgArr[this.mArr[i] - 1]);
            }
            this.playTween(this.mImgArr[this.currentIndex - 1]);
        };
        LetsFlowView.prototype.onRight = function () {
            var _this = this;
            this.kGp.touchChildren = false;
            XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                _this.kGp.touchChildren = true;
            });
        };
        LetsFlowView.prototype.playSound = function (index, callBack) {
            switch (index) {
                case 1:
                    XDFSoundManager.play("Cows_mp3", 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
                case 2:
                    XDFSoundManager.play("Chickens_mp3", 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
                case 3:
                    XDFSoundManager.play("Sheep_mp3", 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
            }
        };
        LetsFlowView.prototype.removeAllImgTween = function () {
            egret.Tween.removeTweens(this.kImg1);
            egret.Tween.removeTweens(this.kImg2);
            egret.Tween.removeTweens(this.kImg3);
            this.kImg1.scaleX = this.kImg1.scaleY = 1;
            this.kImg2.scaleX = this.kImg2.scaleY = 1;
            this.kImg3.scaleX = this.kImg3.scaleY = 1;
        };
        LetsFlowView.prototype.playTween = function (img) {
            egret.Tween.get(img, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut);
        };
        LetsFlowView.prototype.over = function () {
            this.kReplay.visible = true;
            this.kReplay.showReplay();
            this.mArr = [1, 2, 3];
            this.removeAllImgTween();
            this.isOpen = 0;
            this.mStatus1 = this.mStatus2 = this.mStatus3 = 0;
            this.kItem1.reset();
            this.kItem2.reset();
            this.kItem3.reset();
        };
        return LetsFlowView;
    }(eui.Component));
    game.LetsFlowView = LetsFlowView;
    __reflect(LetsFlowView.prototype, "game.LetsFlowView", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
(function (game) {
    var FlowItem = (function (_super) {
        __extends(FlowItem, _super);
        function FlowItem() {
            var _this = _super.call(this) || this;
            _this.mInter = 0;
            _this.skinName = "FlowItemSkin";
            return _this;
        }
        FlowItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        FlowItem.prototype.init = function (index) {
            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGrpSmokeAnim, scaleX: 1, scaleY: 1 });
            this.currentState = index;
            var self = this;
            clearInterval(this.mInter);
            switch (index) {
                case 1:
                    this.mInter = setInterval(function () {
                        self.kSide1.visible = !self.kSide1.visible;
                    }, 150);
                    break;
                case 2:
                    this.mInter = setInterval(function () {
                        self.kSide2.visible = !self.kSide2.visible;
                    }, 150);
                    break;
                case 3:
                    this.mInter = setInterval(function () {
                        self.kSide3.visible = !self.kSide3.visible;
                    }, 150);
                    break;
            }
        };
        FlowItem.prototype.over = function (index) {
            var _this = this;
            this.mAnimSmoke.play(null, 1, function () {
                _this.kGrpSmokeAnim.visible = false;
            }, this);
            this.hideSide();
            switch (index) {
                case 1:
                    this.kGp1.visible = false;
                    this.kImg1.visible = true;
                    break;
                case 2:
                    this.kGp2.visible = false;
                    this.kImg2.visible = true;
                    break;
                case 3:
                    this.kGp3.visible = false;
                    this.kImg3.visible = true;
                    break;
            }
        };
        FlowItem.prototype.hideSide = function () {
            clearInterval(this.mInter);
            this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
        };
        FlowItem.prototype.reset = function () {
            this.hideSide();
            this.kGp1.visible = this.kGp2.visible = this.kGp3.visible = true;
            this.kImg2.visible = this.kImg2.visible = this.kImg3.visible = false;
        };
        return FlowItem;
    }(eui.Component));
    game.FlowItem = FlowItem;
    __reflect(FlowItem.prototype, "game.FlowItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=LetsFlowView.js.map