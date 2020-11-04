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
/**
 * 基础面板
 */
var game;
(function (game) {
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView() {
            var _this = _super.call(this) || this;
            _this.currentIndex = 0;
            _this.mArr = [1, 2, 3];
            _this.sound1 = "sound1_mp3";
            _this.sound2 = "sound2_mp3";
            _this.sound3 = "sound3_mp3";
            return _this;
        }
        BaseView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        BaseView.prototype.init = function () {
            this.kReplay.showStart();
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReplay, this);
            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGp, scaleX: 1, scaleY: 1 });
            this.mClickEff = XDFFrame.DBFactory.createAnim("dianji1");
            this.mClickEff.setProtery({ x: 0, y: 0, parent: this, scaleX: 1, scaleY: 1 });
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        /**
         * 屏幕点击
         */
        BaseView.prototype.onClick = function (e) {
            this.mClickEff.x = e.stageX;
            this.mClickEff.y = e.stageY;
            this.mClickEff.play(null, 1, function () { }, this);
        };
        /**
         * 开始按钮点击
         */
        BaseView.prototype.onStart = function () {
            this.isStart = true;
            this.kReplay.visible = false;
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
            // this.playSound(this.currentIndex, () => {
            // 	// this.initImgTween();
            // })
        };
        /**
         * 重新开始
         */
        BaseView.prototype.onReplay = function () {
            this.kAnswer.visible = false;
            this.kReplay.visible = false;
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
            this.playSound(this.currentIndex, function () {
            });
        };
        /**
         * 成功选择答案，然后随机下一个
         */
        BaseView.prototype.playSuccess = function () {
            var _this = this;
            this.touchChildren = false;
            var self = this;
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
                _this.onNext();
                _this.playSound(_this.currentIndex, function () {
                    _this.touchChildren = true;
                });
            });
        };
        /**
         * 随机下一个问题处理
         */
        BaseView.prototype.onNext = function () {
        };
        /**
         * 选择错误
         */
        BaseView.prototype.playErr = function () {
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
        /**
         * 选中之后播放答案
         */
        BaseView.prototype.playSound = function (index, callBack, isAnim) {
            if (isAnim === void 0) { isAnim = true; }
            switch (index) {
                case 1:
                    XDFSoundManager.play(this.sound1, 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
                case 2:
                    XDFSoundManager.play(this.sound2, 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
                case 3:
                    XDFSoundManager.play(this.sound3, 0, 1, 1, "", function () {
                        if (callBack)
                            callBack();
                    });
                    break;
            }
        };
        /**
         * 冒烟动画
         * data ={x:1,y:1};
         */
        BaseView.prototype.playSmoke = function (data) {
            if (data) {
                this.mAnimSmoke.x = data.x;
                this.mAnimSmoke.y = data.y;
            }
            this.mAnimSmoke.play(null, 1, function () {
            }, this);
        };
        /**
         * 结束处理
         */
        BaseView.prototype.over = function () {
            this.isStart = false;
            this.kReplay.visible = true;
            this.kReplay.showReplay();
            this.mArr = [1, 2, 3];
        };
        return BaseView;
    }(eui.Component));
    game.BaseView = BaseView;
    __reflect(BaseView.prototype, "game.BaseView", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=BaseView.js.map