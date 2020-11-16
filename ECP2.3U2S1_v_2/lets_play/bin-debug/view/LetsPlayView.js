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
            _this.pointList = [{ x: 292, y: 106 }, { x: 722, y: 106 }, { x: 1132, y: 106 }];
            _this.successList = [{ x: 274, y: 762 }, { x: 700, y: 762 }, { x: 1142, y: 762 }];
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        LetsPlayView.prototype.init = function () {
            _super.prototype.init.call(this);
            this.itemList = [this.kItem1, this.kItem2, this.kItem3];
            XDFFrame.EventCenter.addEventListenr(game.EventConst.btnSelect, this.onSelect, this);
            this.cangying2 = XDFFrame.DBFactory.createAnim("cangying2", 1, true);
            this.cangying2.setProtery({ x: this.pointList[0].x, y: this.pointList[0].y, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.cangying3 = XDFFrame.DBFactory.createAnim("cangying3", 1, true);
            this.cangying3.setProtery({ x: this.pointList[1].x, y: this.pointList[1].y, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.cangying2.visible = this.cangying3.visible = false;
            this.anim1 = XDFFrame.DBFactory.createAnim("role1");
            this.anim1.setProtery({ x: 780, y: 700, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.anim1.play(null, 0);
            this.anim2 = XDFFrame.DBFactory.createAnim("role2");
            this.anim2.setProtery({ x: 760, y: 400, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.anim2.visible = false;
            this.anim3 = XDFFrame.DBFactory.createAnim("role3");
            this.anim3.setProtery({ x: 780, y: 600, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
            this.anim3.visible = false;
            this.cangyingList = [];
            for (var i = 0; i < 3; i++) {
                var anim = XDFFrame.DBFactory.createAnim("cangying1", 1, true);
                anim.setProtery({ x: this.pointList[i].x, y: this.pointList[i].y, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
                this.cangyingList.push(anim);
            }
            // this.cangying2.play(null, 0);
            // this.cangying3.play(null, 0);
        };
        LetsPlayView.prototype.onStart = function () {
            _super.prototype.onStart.call(this);
            this.kAnimGp.visible = true;
            this.onNext();
            this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = true;
            this.playSound(this.currentIndex, function () {
                // this.initImgTween();
            });
        };
        LetsPlayView.prototype.onSelect = function (e) {
            if (!this.isStart)
                return;
            if (e.data.target) {
                var self_1 = this;
                this.isRight = true;
                self_1.success(Number(e.data.index));
                // XDFSoundManager.play("sound_ding_mp3", 0, 1, 1, "", () => {
                // });
                this.touchChildren = false;
            }
            else {
                this.playErr(Number(e.data.index));
            }
        };
        LetsPlayView.prototype.success = function (index) {
            var _this = this;
            XDFSoundManager.play("pia_mp3", 0, 1, 1, "", function () {
            });
            var t = setTimeout(function () {
                clearTimeout(t);
                XDFSoundManager.play("sound_ding_mp3", 0, 1, 1);
                SoundManager.ins.playBg("sound_lp_choise_right_mp3");
            }, 500);
            this.anim1.stop();
            this.anim1.visible = false;
            this.anim2.visible = true;
            this.anim2.x = this.successList[index - 1].x;
            this.anim2.play(null, 1, function () {
                _this.playSuccess(function () {
                    _this.anim2.visible = false;
                    _this.anim1.play(null, 0);
                    _this.anim1.visible = true;
                    _this.touchChildren = true;
                    // this.cangyingList[index - 1].play(null, 0);
                    // this.cangyingList[index - 1].visible = true;
                });
            }, this);
            this.cangyingList[index - 1].visible = false;
            this.cangying2.x = this.pointList[index - 1].x;
            this.cangying2.y = this.pointList[index - 1].y + 200;
            this.cangying2.visible = true;
            this.cangying2.play(null, 1, function () {
                _this.cangying2.visible = false;
            }, this);
        };
        LetsPlayView.prototype.playErr = function (index) {
            var _this = this;
            SoundManager.ins.playBg("deng_mp3");
            this.cangyingList[index - 1].visible = false;
            this.cangying3.x = this.pointList[index - 1].x - 200;
            this.cangying3.y = this.pointList[index - 1].y - 202;
            this.cangying3.visible = true;
            this.cangying3.play(null, 1, function () {
                _this.cangying3.visible = false;
                _this.cangyingList[index - 1].play(null, 0);
                _this.cangyingList[index - 1].visible = true;
            }, this);
            this.touchChildren = false;
            XDFSoundManager.play("sound_lp_choise_err_mp3", 0, 1, 1, "", function () { });
            this.anim1.stop();
            this.anim1.visible = false;
            this.anim3.visible = true;
            this.anim3.play(null, 1, function () {
                _this.anim1.play(null, 0);
                _this.anim1.visible = true;
                _this.anim3.visible = false;
                _this.playSound(_this.currentIndex, function () {
                    _this.touchChildren = true;
                });
            }, this);
            // XDFSoundManager.stopAll();
        };
        LetsPlayView.prototype.onNext = function () {
            _super.prototype.onNext.call(this);
            this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = true;
            for (var i = 0; i < this.cangyingList.length; i++) {
                this.cangyingList[i].visible = true;
                this.cangyingList[i].play(null, 0);
            }
            if (this.currentIndex == 1) {
                this.kLb.text = "ski";
            }
            else if (this.currentIndex == 2) {
                this.kLb.text = "sled";
            }
            else if (this.currentIndex == 3) {
                this.kLb.text = "skate";
            }
            this.isRight = false;
            this.kTargetGp.visible = true;
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
            this.anim2.visible = false;
            this.isRight = false;
            this.isTmeOut = false;
            this.kTargetGp.visible = true;
            this.isStart = true;
            this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = true;
            this.onNext();
        };
        LetsPlayView.prototype.onClick = function (e) {
            _super.prototype.onClick.call(this, e);
        };
        LetsPlayView.prototype.onTimeOut = function () {
            if (this.isRight)
                return;
            _super.prototype.onTimeOut.call(this);
            this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = false;
            this.kAnimGp.visible = false;
            this.kTargetGp.visible = false;
        };
        LetsPlayView.prototype.over = function () {
            _super.prototype.over.call(this);
            this.kTargetGp.visible = false;
            this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = false;
            this.kAnimGp.visible = false;
        };
        return LetsPlayView;
    }(game.playBaseView));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map