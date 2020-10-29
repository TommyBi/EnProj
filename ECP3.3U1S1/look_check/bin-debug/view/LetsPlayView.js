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
            _this.mHintArr = ["snow", "plant", "sled", "swim"];
            _this.mCurrentHint = "";
            _this.mOrder = [];
            _this.mCurHintIdx = 0;
            _this.mShowOrder = [];
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        ;
        LetsPlayView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
            this.kGrpOption0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJudge0, this);
            this.kGrpOption1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJudge1, this);
            this.kGrpOption2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJudge2, this);
            this.kGrpOption3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJudge3, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.init();
        };
        LetsPlayView.prototype.onTouch = function (e) {
            egret.log(e.target);
        };
        LetsPlayView.prototype.init = function () {
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            this.kImgHint.mask = this.kImgMask;
            // init DBAnim
            this.mAnimSheepIdle = XDFFrame.DBFactory.createAnim("db_sheep_idle");
            this.mAnimSheepIdle.setProtery({ parent: this.kGrpSheepIdle, scaleX: 1.4, scaleY: 1.4 });
            this.mAnimSheepCatch = XDFFrame.DBFactory.createAnim("db_sheep_catch");
            this.mAnimSheepCatch.setProtery({ parent: this.kGrpSheepCatch, scaleX: 1.4, scaleY: 1.4 });
            this.mAnimSheepJump = XDFFrame.DBFactory.createAnim("db_sheep_jump");
            this.mAnimSheepJump.setProtery({ parent: this.kGrpSheepJump, scaleX: 1.4, scaleY: 1.4 });
            this.kGrpSheepCatch.visible = this.kGrpSheepJump.visible = false;
            this.kGrpSheepIdle.visible = true;
            this.mAnimSheepIdle.play(null, 0);
        };
        LetsPlayView.prototype.onStart = function () {
            this.kComRestart.visible = false;
            this.mOrder = this.calShowOrder(4);
            this.hint();
        };
        LetsPlayView.prototype.hint = function () {
            if (this.mOrder.length <= 0) {
                // 完成 游戏结束
                this.kComBar.reset();
                this.kComRestart.visible = true;
                this.kComRestart.playActionStart();
            }
            else {
                // 刷新显示界面中对应图片  
                this.mShowOrder = this.calShowOrder(4);
                this.formatPicInfo();
                this.mCurHintIdx = this.mOrder.shift();
                this.mCurrentHint = this.mHintArr[this.mCurHintIdx];
                XDFSoundManager.play("sound_words_" + this.mCurrentHint + "_mp3");
                this.kLabelHint.text = "" + this.mCurrentHint;
                this.kComBar.play();
            }
        };
        LetsPlayView.prototype.formatPicInfo = function () {
            for (var i = 0; i < this.mShowOrder.length; i++) {
                var picIdx = this.mShowOrder[i];
                this["kImgOption" + i].source = "img_lp_option" + picIdx + "_png";
                this["kGrpOption" + i].name = this.mHintArr[picIdx];
            }
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
        /** 判断结果 */
        LetsPlayView.prototype.onJudge0 = function () { this.onJudge(0); };
        LetsPlayView.prototype.onJudge1 = function () { this.onJudge(1); };
        LetsPlayView.prototype.onJudge2 = function () { this.onJudge(2); };
        LetsPlayView.prototype.onJudge3 = function () { this.onJudge(3); };
        /** 点击 */
        LetsPlayView.prototype.onJudge = function (idx) {
            var _this = this;
            XDFSoundManager.play("sound_choise_mp3");
            this.onPlayTouchEffect(this["kImgOption" + idx]);
            if (this["kGrpOption" + idx].name == this.mCurrentHint) {
                this.kComBar.stop();
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
        /** 播放点击效果 */
        LetsPlayView.prototype.onPlayTouchEffect = function (com) {
            egret.Tween.removeTweens(com);
            var sScaleX = com.scaleX;
            var sScaleY = com.scaleY;
            egret.Tween.get(com)
                .to({ scaleX: sScaleX * 0.95, scaleY: sScaleX * 0.95 }, 70)
                .to({ scaleX: sScaleX * 1.05, scaleY: sScaleX * 1.05 }, 140)
                .to({ scaleX: sScaleX, scaleY: sScaleX }, 70);
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
        /**
         *  初始化播放顺序
         * @param tarCount: 目标生成的数量
         */
        LetsPlayView.prototype.calShowOrder = function (tarCount) {
            var arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        };
        /** 生产随机队列 */
        LetsPlayView.prototype.produceOrderArr = function (arr, tarCount) {
            if (arr.length < tarCount) {
                var idx = Util.randomNum(0, tarCount - 1);
                if (arr.indexOf(idx) == -1) {
                    arr.push(idx);
                    if (arr.length < tarCount) {
                        this.produceOrderArr(arr, tarCount);
                    }
                }
                else {
                    this.produceOrderArr(arr, tarCount);
                }
            }
        };
        LetsPlayView.prototype.onTimeOut = function () {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        };
        return LetsPlayView;
    }(eui.Component));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map