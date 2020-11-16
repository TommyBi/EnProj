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
    var FindWay = (function (_super) {
        __extends(FindWay, _super);
        function FindWay() {
            var _this = _super.call(this) || this;
            _this.currentIndex = 1;
            _this.winList = [[{ x: 545, y: 220 }, { x: 734, y: 183 }, { x: 907, y: 265 }, { x: 776, y: 316 }]];
            _this.lostList = [[{ x: 545, y: 220 }, { x: 600, y: 268 }]];
            _this.initPoint = { x: 540, y: 108 };
            _this.prePoint = { x: 540, y: 108 };
            _this.isStart = false;
            _this.skinName = "FindWaySkin";
            return _this;
        }
        FindWay.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.init();
        };
        FindWay.prototype.init = function () {
            this.kReplay.showStart();
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReplay, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventBtn, this.onSelect, this);
            for (var i = 0; i < 6; i++) {
                var item = this.kItemGp.getChildAt(i);
                item.setData(i);
            }
            this.anim1 = XDFFrame.DBFactory.createAnim("role_1", 1, false);
            this.anim1.setProtery({ x: 400, y: 108, parent: this["kAnimGp"], scaleX: 2, scaleY: 2 });
            this.anim1.play(null, 0);
            this.anim2 = XDFFrame.DBFactory.createAnim("role_lost", 1, false);
            this.anim2.setProtery({ x: 0, y: 0, parent: this["kAnimGp"], scaleX: 2, scaleY: 2 });
            this.anim2.visible = false;
            this.anim3 = XDFFrame.DBFactory.createAnim("role_go", 1, false);
            this.anim3.setProtery({ x: 0, y: 0, parent: this["kAnimGp"], scaleX: 2, scaleY: 2 });
            this.anim3.visible = false;
            this.anim4 = XDFFrame.DBFactory.createAnim("role_win", 1, false);
            this.anim4.setProtery({ x: 720, y: 885, parent: this["kAnimGp"], scaleX: 2, scaleY: 2 });
            this.anim4.visible = false;
        };
        FindWay.prototype.onSelect = function (e) {
            if (!this.isStart)
                return;
            console.log(e.currentTarget.name);
            if (e.data == this.currentIndex * 2 - 1) {
                this.playSuccess();
            }
            else {
                this.playErr();
            }
        };
        FindWay.prototype.playSuccess = function () {
            var _this = this;
            this.touchChildren = false;
            var self = this;
            this.hideAnim();
            this.startGo();
            this.playWin();
            XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                if (_this.currentIndex == 3) {
                    self.kAnswer.visible = true;
                    self.kAnswer.playGood(function () {
                        self.touchChildren = true;
                        self.over();
                    });
                    return true;
                }
                _this.currentIndex++;
                _this.playSound(_this.currentIndex, function () {
                });
            });
        };
        FindWay.prototype.playWin = function () {
            var _this = this;
            switch (this.currentIndex) {
                case 1:
                    egret.Tween.get(this.anim3.armatureDisplay).to({ x: 728 }, 700).to({ x: 905, y: 150 }, 700)
                        .to({ x: 778, y: 214 }, 700).call(function () {
                        _this.prePoint = { x: 778, y: 214 };
                        _this.showWin1();
                        egret.Tween.removeTweens(_this.anim2);
                    });
                    break;
                case 2:
                    egret.Tween.get(this.anim3.armatureDisplay).to({ y: 340 }, 700).to({ x: 505 }, 700)
                        .to({ y: 380 }, 700).call(function () {
                        _this.prePoint = { x: 510, y: 380 };
                        _this.showWin1();
                        egret.Tween.removeTweens(_this.anim2);
                    });
                    break;
                case 3:
                    egret.Tween.get(this.anim3.armatureDisplay).to({ x: 650, y: 564 }, 700).to({ x: 873, y: 600 }, 700)
                        .to({ y: 885 }, 700).to({ x: 720 }, 700).call(function () {
                        _this.prePoint = { x: 510, y: 380 };
                        _this.showWin1();
                        egret.Tween.removeTweens(_this.anim2);
                        _this.anim1.stop();
                        _this.anim1.visible = false;
                        _this.anim4.visible = true;
                        _this.anim4.play(null, 0);
                    });
                    break;
            }
        };
        FindWay.prototype.showWin1 = function () {
            this.anim3.stop();
            this.anim3.visible = false;
            this.anim1.play(null, 0);
            this.anim1.visible = true;
            this.anim1.setPoint(this.prePoint);
        };
        FindWay.prototype.playErr = function () {
            var _this = this;
            this.touchChildren = false;
            this.hideAnim();
            this.startGo();
            switch (this.currentIndex) {
                case 1:
                    egret.Tween.get(this.anim3.armatureDisplay).to({ x: 560, y: 184 }, 700).call(function () {
                        _this.showLost();
                        egret.Tween.removeTweens(_this.anim2);
                    });
                    break;
                case 2:
                    egret.Tween.get(this.anim3.armatureDisplay).to({ y: 340 }, 700).to({ x: 923, y: 350 }, 700).call(function () {
                        _this.showLost();
                        egret.Tween.removeTweens(_this.anim2);
                    });
                    break;
                case 3:
                    egret.Tween.get(this.anim3.armatureDisplay).to({ x: 567, y: 505 }, 700).call(function () {
                        _this.showLost();
                        egret.Tween.removeTweens(_this.anim2);
                    });
                    break;
            }
        };
        FindWay.prototype.startGo = function () {
            this.anim1.stop();
            this.anim1.visible = false;
            this.anim3.visible = true;
            this.anim3.play(null, 0);
            this.anim3.setPoint(this.anim1.getPoint());
        };
        FindWay.prototype.showLost = function () {
            var _this = this;
            XDFSoundManager.play("oops_mp3", 0, 1, 1, "", function () {
            });
            this.anim3.stop();
            this.anim3.visible = false;
            this.anim2.visible = true;
            this.anim2.setPoint(this.anim3.getPoint());
            this.anim2.play(null, 1, function () {
                _this.anim1.play(null, 0);
                _this.anim2.visible = false;
                _this.anim1.visible = true;
                _this.anim1.setPoint(_this.prePoint);
                _this.playSound(_this.currentIndex, function () {
                });
            }, this);
        };
        FindWay.prototype.onStart = function () {
            var _this = this;
            this.isStart = true;
            this.kReplay.visible = false;
            egret.Tween.get(this.anim1.armatureDisplay).to({ x: 540 }, 500).call(function () {
                egret.Tween.removeTweens(_this.anim1);
            });
            this.playSound(this.currentIndex, function () {
            });
        };
        FindWay.prototype.onReplay = function () {
            this.anim4.stop();
            this.anim4.visible = false;
            this.anim1.visible = true;
            this.isStart = true;
            this.anim1.setPoint(this.initPoint);
            this.anim1.play(null, 0);
            // for (let i = 1; i < 7; i++) {
            // 	this["kItem" + i].reset()
            // }
            this.kAnswer.visible = false;
            this.kReplay.visible = false;
            this.currentIndex = 1;
            this.playSound(this.currentIndex, function () {
            });
        };
        FindWay.prototype.playSound = function (index, callBack, isAnim) {
            var _this = this;
            if (isAnim === void 0) { isAnim = true; }
            this.touchChildren = false;
            if (isAnim) {
                this["kItem" + (this.currentIndex * 2 - 1)].sildeAnim();
                this["kItem" + this.currentIndex * 2].sildeAnim();
                this.playImgAnim();
            }
            XDFSoundManager.play("sound_" + this.currentIndex + "_mp3", 0, 1, 1, "", function () {
                _this.touchChildren = true;
                if (callBack)
                    callBack();
            });
        };
        FindWay.prototype.hideAnim = function () {
            this["kItem" + (this.currentIndex * 2 - 1)].hideSide();
            this["kItem" + this.currentIndex * 2].hideSide();
            this.stopImgAnim();
        };
        FindWay.prototype.playImgAnim = function () {
            this["kImg" + this.currentIndex].scaleX = this["kImg" + this.currentIndex].scaleY = 1.5;
            egret.Tween.get(this["kImg" + this.currentIndex], { loop: true })
                .to({ scaleX: 1.6, scaleY: 1.6 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.6, scaleY: 1.6 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 400, egret.Ease.cubicInOut);
        };
        FindWay.prototype.stopImgAnim = function () {
            egret.Tween.removeTweens(this["kImg" + this.currentIndex]);
        };
        FindWay.prototype.over = function () {
            this.isStart = false;
            this.kReplay.visible = true;
            this.kReplay.showReplay();
        };
        return FindWay;
    }(eui.Component));
    game.FindWay = FindWay;
    __reflect(FindWay.prototype, "game.FindWay", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=FindWay.js.map