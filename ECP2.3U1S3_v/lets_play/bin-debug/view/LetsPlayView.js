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
    var LetsPlayView = (function (_super) {
        __extends(LetsPlayView, _super);
        function LetsPlayView() {
            var _this = _super.call(this) || this;
            _this.itemList = [];
            _this.imgList = ["animal_1_png", "animal_2_png", "animal_3_png"];
            _this.currImgList = [];
            _this.mIndex = 1;
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        LetsPlayView.prototype.init = function () {
            _super.prototype.init.call(this);
            this.itemList = [this.kItem1, this.kItem2, this.kItem3];
            XDFFrame.EventCenter.addEventListenr(game.EventConst.btnSelect, this.onSelect, this);
            this.anim1 = XDFFrame.DBFactory.createAnim("clothes1");
            this.anim1.setProtery({ x: 780, y: 670, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
            this.anim1.play(null, 0);
            this.currentAnim = this.anim1;
            this.anim2 = XDFFrame.DBFactory.createAnim("clothes2");
            this.anim2.setProtery({ x: 930, y: 670, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
            this.anim3 = XDFFrame.DBFactory.createAnim("clothes3");
            this.anim3.setProtery({ x: 990, y: 670, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
            this.anim4 = XDFFrame.DBFactory.createAnim("clothes4");
            this.anim4.setProtery({ x: 990, y: 725, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
            this.anim5 = XDFFrame.DBFactory.createAnim("clothes8", 2);
            this.anim5.setProtery({ x: 690, y: 680, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
            this.anim6 = XDFFrame.DBFactory.createAnim("clothes7", 2);
            this.anim6.setProtery({ x: 840, y: 685, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
            this.anim7 = XDFFrame.DBFactory.createAnim("clothes6");
            this.anim7.setProtery({ x: 990, y: 725, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
            this.anim2.visible = this.anim3.visible = this.anim4.visible = false;
            this.anim5.visible = this.anim6.visible = this.anim7.visible = false;
            this.lostAnim = XDFFrame.DBFactory.createAnim("clothes5", 2);
            this.lostAnim.setProtery({ x: 888, y: 570, parent: this.kAnimGp, scaleX: 3, scaleY: 3 });
            this.lostAnim.visible = false;
            egret.Tween.get(this.kBird1, { loop: true }).to({ scaleX: 1.3 }).to({ x: 576, y: 124 }, 700).to({ x: 944, y: 90 }, 700).to({ x: 1358, y: 178 }, 700).to({
                x: 1700,
                y: 166
            }, 700).wait(1000).to({ scaleX: -1.3 }).to({ x: 1248, y: 68 }, 700).to({ x: 814, y: 142 }, 700).to({ x: 328, y: 64 }, 700).to({ x: 78, y: 124 }, 700).wait(1000);
            egret.Tween.get(this.kBird2, { loop: true }).wait(1000).to({ x: 1355, y: 392 }, 700).to({ x: 1005, y: 300 }, 700).to({ x: 653, y: 364 }, 700).to({
                x: 207,
                y: 478
            }, 700).wait(1000);
        };
        LetsPlayView.prototype.onStart = function () {
            _super.prototype.onStart.call(this);
            this.currentAnim.stop();
            this.currentAnim.visible = false;
            this.onNext();
            this.currentAnim = this.anim1;
            this.currentAnim.play(null, 0);
            this.currentAnim.visible = true;
            this.onNext();
            this.playSound(this.currentIndex, function () {
                // this.initImgTween();
            });
        };
        LetsPlayView.prototype.onSelect = function (e) {
            if (!this.isStart)
                return;
            if (e.data) {
                this.mIndex++;
                XDFSoundManager.play("sound_ding_mp3", 0, 1, 1, "", function () {
                });
                this.touchChildren = false;
                var self_1 = this;
                self_1.getClothes(function () {
                    self_1.playSuccess();
                    // this.touchChildren = true;
                    self_1.switchAnim();
                });
            }
            else {
                this.playErr();
            }
        };
        LetsPlayView.prototype.getClothes = function (call) {
            this.currentAnim.stop();
            this.currentAnim.visible = false;
            SoundManager.ins.playBg("girl_mp3");
            var anim;
            if (this.mIndex == 2) {
                anim = this.anim5;
            }
            else if (this.mIndex == 3) {
                anim = this.anim6;
            }
            else {
                anim = this.anim7;
            }
            anim.visible = true;
            anim.play(null, 1, function () {
                if (call)
                    call();
                anim.visible = false;
            }, this);
        };
        LetsPlayView.prototype.switchAnim = function () {
            if (this.mIndex == 2) {
                this.currentAnim = this.anim2;
            }
            else if (this.mIndex == 3) {
                this.currentAnim = this.anim3;
            }
            else {
                this.currentAnim = this.anim4;
            }
            console.log("=====", this.currentAnim);
            this.currentAnim.visible = true;
            this.currentAnim.play(null, 0);
        };
        LetsPlayView.prototype.playErr = function () {
            var _this = this;
            this.currentAnim.stop();
            this.currentAnim.visible = false;
            this.lostAnim.visible = true;
            this.touchChildren = false;
            XDFSoundManager.play("xiayu_mp3", 0, 1, 1, "", function () { });
            this.lostAnim.play(null, 1, function () {
                _this.touchChildren = true;
                XDFSoundManager.stopAll();
                _this.lostAnim.visible = false;
                _this.currentAnim.visible = true;
                _this.currentAnim.play(null, 0);
                _this.playSound(_this.currentIndex, function () { });
            }, this);
        };
        LetsPlayView.prototype.onNext = function () {
            _super.prototype.onNext.call(this);
            this.currImgList = Util.copyArr(this.imgList);
            this.currImgList = Util.resetArray(this.currImgList);
            for (var i = 0; i < this.itemList.length; i++) {
                var img = this.currImgList.pop();
                if (img == this.imgList[this.currentIndex - 1]) {
                    this.itemList[i].setData(img, true);
                }
                else {
                    this.itemList[i].setData(img);
                }
            }
        };
        LetsPlayView.prototype.onReplay = function () {
            _super.prototype.onReplay.call(this);
            this.currentAnim.stop();
            this.currentAnim.visible = false;
            this.onNext();
            this.currentAnim = this.anim1;
            this.currentAnim.play(null, 0);
            this.currentAnim.visible = true;
        };
        LetsPlayView.prototype.onClick = function (e) {
            _super.prototype.onClick.call(this, e);
        };
        LetsPlayView.prototype.over = function () {
            console.log(this.currentAnim);
            _super.prototype.over.call(this);
            this.mIndex = 1;
        };
        LetsPlayView.prototype.playAnim = function () {
            switch (this.currentIndex) {
                case 1:
                    this.imgAnim1();
                    this.imgAnim2();
                    this.imgAnim3();
                    break;
                case 2:
                    this.imgAnim2();
                    this.imgAnim3();
                    break;
                case 3:
                    this.imgAnim3();
                    break;
            }
        };
        LetsPlayView.prototype.imgAnim1 = function () {
            egret.Tween.get(this.kImg1, { loop: true }).to({ skewX: -2.3 }, 300).to({ skewX: 1 }, 300);
        };
        LetsPlayView.prototype.imgAnim2 = function () {
            egret.Tween.get(this.kImg1, { loop: true }).to({ skewX: -2.3 }, 300).to({ skewX: 1 }, 300);
        };
        LetsPlayView.prototype.imgAnim3 = function () {
            egret.Tween.get(this.kImg1, { loop: true }).to({ skewX: -2.3 }, 300).to({ skewX: 1 }, 300);
        };
        return LetsPlayView;
    }(game.playBaseView));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map