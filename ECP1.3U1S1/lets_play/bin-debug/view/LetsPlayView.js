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
            _this.mPlayTimes = 0;
            _this.mHintArr = [];
            _this.mCurrentHint = "";
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        ;
        LetsPlayView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            this.kGrpOption0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch0, this);
            this.kGrpOption1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch1, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.init();
        };
        LetsPlayView.prototype.onTouch = function (e) {
        };
        LetsPlayView.prototype.init = function () {
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            this.kImgHint.mask = this.kImgMask;
            // init DBAnim
            this.mAnimSheepIdle = XDFFrame.DBFactory.createAnim("db_sheep_idle", 3);
            this.mAnimSheepIdle.setProtery({ parent: this.kGrpSheepIdle, scaleX: 1.4, scaleY: 1.4 });
            this.mAnimSheepCatch = XDFFrame.DBFactory.createAnim("db_sheep_catch", 2);
            this.mAnimSheepCatch.setProtery({ parent: this.kGrpSheepCatch, scaleX: 1.4, scaleY: 1.4 });
            this.mAnimSheepJump = XDFFrame.DBFactory.createAnim("db_sheep_jump", 3);
            this.mAnimSheepJump.setProtery({ parent: this.kGrpSheepJump, scaleX: 1.4, scaleY: 1.4 });
            this.kGrpSheepCatch.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepIdle.visible = true;
            this.mAnimSheepIdle.play(null, 0);
        };
        LetsPlayView.prototype.onStart = function () {
            this.kComRestart.visible = false;
            this.prepareOder();
            this.hint();
        };
        LetsPlayView.prototype.playCountDown = function () {
            var _this = this;
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            egret.Tween.get(this.kImgBar).to({ width: 0 }, 13000).call(function () {
                _this.kComRestart.visible = true;
                _this.kComRestart.playActionTimeOut();
                XDFSoundManager.play("sound_die_mp3");
            });
        };
        LetsPlayView.prototype.prepareOder = function () {
            if (this.mPlayTimes % 2 == 0) {
                this.mHintArr = ["shirt", "pants"];
            }
            else {
                this.mHintArr = ["pants", "shirt"];
            }
        };
        LetsPlayView.prototype.hint = function () {
            if (this.mPlayTimes % 2 == 0) {
                this.kGrpOption0.name = "shirt";
                this.kImgOption0.source = "img_lp_shirt_png";
                this.kGrpOption1.name = "pants";
                this.kImgOption1.source = "img_lp_pants_png";
            }
            else {
                this.kGrpOption1.name = "shirt";
                this.kImgOption1.source = "img_lp_shirt_png";
                this.kGrpOption0.name = "pants";
                this.kImgOption0.source = "img_lp_pants_png";
            }
            this.mCurrentHint = this.mHintArr.shift();
            XDFSoundManager.play("sound_" + this.mCurrentHint + "_mp3");
            this.kLabelHint.text = "" + this.mCurrentHint;
            this.playCountDown();
        };
        LetsPlayView.prototype.playSheepCatch = function (cb) {
            var _this = this;
            this.kGrpSheepIdle.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepCatch.visible = true;
            this.mAnimSheepCatch.play(null, 1, function () {
                _this.kGrpSheepCatch.visible = false;
                _this.playSheepIdle();
                cb && cb();
            }, this);
        };
        LetsPlayView.prototype.playSheepIdle = function () {
            this.kGrpSheepCatch.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepIdle.visible = true;
            this.mAnimSheepIdle.play(null, 0);
        };
        LetsPlayView.prototype.playSheepJump = function (cb) {
            var _this = this;
            this.kGrpSheepCatch.visible = this.kGrpSheepIdle.visible = false;
            this.kGrpSheepJump.visible = true;
            this.mAnimSheepJump.play(null, 1, function () {
                _this.playSheepIdle();
                cb && cb();
            }, this);
        };
        /** 点击0 */
        LetsPlayView.prototype.onTouch0 = function () {
            var _this = this;
            XDFSoundManager.play("sound_choise_mp3");
            if (this.kGrpOption0.name == this.mCurrentHint) {
                this.mPlayTimes++;
                egret.Tween.removeTweens(this.kImgBar);
                this.showCorrect(function () {
                    if (_this.mHintArr.length == 0) {
                        // finish
                        _this.kComRestart.visible = true;
                        _this.kComRestart.playActionGoodJob();
                    }
                    else {
                        // next
                        _this.hint();
                    }
                });
            }
            else {
                this.showErr();
            }
        };
        /** 点击1 */
        LetsPlayView.prototype.onTouch1 = function () {
            var _this = this;
            XDFSoundManager.play("sound_choise_mp3");
            if (this.kGrpOption1.name == this.mCurrentHint) {
                this.mPlayTimes++;
                egret.Tween.removeTweens(this.kImgBar);
                this.showCorrect(function () {
                    if (_this.mHintArr.length == 0) {
                        // finish
                        _this.kComRestart.visible = true;
                        _this.kComRestart.playActionGoodJob();
                    }
                    else {
                        // next
                        _this.hint();
                    }
                });
            }
            else {
                this.showErr();
            }
        };
        LetsPlayView.prototype.showCorrect = function (cb) {
            XDFSoundManager.play("sound_start_mp3");
            this.playSheepCatch(function () {
                cb && cb();
            });
        };
        LetsPlayView.prototype.showErr = function () {
            var _this = this;
            XDFSoundManager.play("sound_die_mp3");
            this.playSheepJump(function () {
                XDFSoundManager.play("sound_" + _this.mCurrentHint + "_mp3");
            });
        };
        return LetsPlayView;
    }(eui.Component));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map