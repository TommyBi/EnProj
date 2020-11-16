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
    var FindMarkView = (function (_super) {
        __extends(FindMarkView, _super);
        function FindMarkView() {
            var _this = _super.call(this) || this;
            _this.currentIndex = 1;
            _this.mArr = [1, 2, 3];
            _this.animList = [];
            _this.skinName = "FindMarkViewSkin";
            return _this;
        }
        FindMarkView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.init();
        };
        FindMarkView.prototype.init = function () {
            this.kReplay.showStart();
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReplay, this);
            for (var i = 1; i < 4; i++) {
                this["kItem" + i].setData(i);
            }
            this.anim1 = XDFFrame.DBFactory.createAnim("find_yx", 1, false);
            this.anim1.setProtery({ x: 0, y: 0, parent: this["kAnimGp1"], scaleX: 0.4, scaleY: 0.4 });
            this.anim2 = XDFFrame.DBFactory.createAnim("find_sjx", 1, false);
            this.anim2.setProtery({ x: 0, y: 0, parent: this["kAnimGp2"], scaleX: 0.4, scaleY: 0.4 });
            this.anim3 = XDFFrame.DBFactory.createAnim("find_zfx", 1, false);
            this.anim3.setProtery({ x: 0, y: 0, parent: this["kAnimGp3"], scaleX: 0.4, scaleY: 0.4 });
            this.anim1.visible = this.anim2.visible = this.anim3.visible = false;
            this.animList = [this.anim1, this.anim2, this.anim3];
        };
        FindMarkView.prototype.onSelect = function (e) {
            console.log(e.currentTarget.name);
            if (e.currentTarget.name == this.currentIndex) {
                this.playSuccess();
            }
            else {
                this.playErr();
            }
        };
        FindMarkView.prototype.playSuccess = function () {
            var _this = this;
            this.touchChildren = false;
            var self = this;
            self.animList[self.currentIndex - 1].visible = true;
            self.animList[self.currentIndex - 1].play(null, 1);
            XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                if (self.mArr.length == 0) {
                    self.kAnswer.visible = true;
                    self.kAnswer.playGood(function () {
                        self.touchChildren = true;
                        self.over();
                    });
                    return true;
                }
                var idx = Util.limitInteger(0, _this.mArr.length - 1);
                var arr = _this.mArr.splice(idx, 1);
                _this.currentIndex = arr[0];
                _this.playSound(_this.currentIndex, function () {
                    _this.touchChildren = true;
                });
            });
        };
        FindMarkView.prototype.playErr = function () {
            var _this = this;
            this.touchChildren = false;
            this.kAnswer.visible = true;
            this.kAnswer.playErr(function () {
                _this.playSound(_this.currentIndex, function () {
                }, false);
                _this.kAnswer.visible = false;
                _this.touchChildren = true;
                // this.touchChildren = true;
            });
        };
        FindMarkView.prototype.onStart = function () {
            var _this = this;
            this.kReplay.visible = false;
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
            this.playSound(this.currentIndex, function () {
                // this.initImgTween();
                for (var i = 1; i < 4; i++) {
                    _this["kImg" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSelect, _this);
                }
                for (var i = 0; i < 4; i++) {
                    _this["kGp" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.playErr, _this);
                }
            });
        };
        FindMarkView.prototype.onReplay = function () {
            this.anim1.visible = this.anim2.visible = this.anim3.visible = false;
            for (var i = 1; i < 4; i++) {
                this["kItem" + i].reset();
            }
            this.kAnswer.visible = false;
            this.kReplay.visible = false;
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
            this.playSound(this.currentIndex, function () {
            });
        };
        FindMarkView.prototype.playSound = function (index, callBack, isAnim) {
            if (isAnim === void 0) { isAnim = true; }
            if (isAnim)
                this["kItem" + this.currentIndex].play();
            switch (index) {
                case 1:
                    XDFSoundManager.play("giraffe_mp3", 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
                case 2:
                    XDFSoundManager.play("elephant_mp3", 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
                case 3:
                    XDFSoundManager.play("monkey_mp3", 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
            }
        };
        FindMarkView.prototype.over = function () {
            this.kReplay.visible = true;
            this.kReplay.showReplay();
            this.mArr = [1, 2, 3];
        };
        return FindMarkView;
    }(eui.Component));
    game.FindMarkView = FindMarkView;
    __reflect(FindMarkView.prototype, "game.FindMarkView", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=FindMarkView.js.map