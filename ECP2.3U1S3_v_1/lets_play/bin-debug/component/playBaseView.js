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
    var playBaseView = (function (_super) {
        __extends(playBaseView, _super);
        function playBaseView() {
            var _this = _super.call(this) || this;
            _this.currentIndex = 0;
            _this.mArr = [1, 2, 3];
            _this.sound1 = "sound1_mp3";
            _this.sound2 = "sound2_mp3";
            _this.sound3 = "sound3_mp3";
            return _this;
        }
        playBaseView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        playBaseView.prototype.init = function () {
            this.mClickEff = XDFFrame.DBFactory.createAnim("dianji1");
            this.mClickEff.setProtery({ x: 0, y: 0, parent: this, scaleX: 1, scaleY: 1 });
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            var self = this;
            var t = setTimeout(function () {
                clearTimeout(t);
                self.kRestart.visible = true;
                self.kRestart.playActionStart();
            }, 300);
            this.kTimeBar.reset();
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
        };
        /**
         * 屏幕点击
         */
        playBaseView.prototype.onClick = function (e) {
            this.mClickEff.x = e.stageX;
            this.mClickEff.y = e.stageY;
            // this.mClickEff.play(null, 1, () => { }, this);
        };
        /**
         * 开始按钮点击
         */
        playBaseView.prototype.onStart = function () {
            // 隐藏结束组件
            this.kRestart.visible = false;
            this.isStart = true;
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
        };
        /**
         * 重新开始
         */
        playBaseView.prototype.onReplay = function () {
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
            this.playSound(this.currentIndex, function () {
            });
        };
        /**
         * 成功选择答案，然后随机下一个
         */
        playBaseView.prototype.playSuccess = function () {
            var _this = this;
            this.touchChildren = false;
            var self = this;
            this.kTimeBar.stop();
            // XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
            if (self.mArr.length == 0) {
                self.touchChildren = true;
                self.over();
                return true;
            }
            var idx = Util.limitInteger(0, this.mArr.length - 1);
            var arr = this.mArr.splice(idx, 1);
            this.currentIndex = arr[0];
            this.onNext();
            this.playSound(this.currentIndex, function () {
                _this.touchChildren = true;
            });
            // })
        };
        /**
         * 随机下一个问题处理
         */
        playBaseView.prototype.onNext = function () {
            this.kTimeBar.play();
        };
        /**
         * 选择错误
         */
        playBaseView.prototype.playErr = function () {
            // this.touchChildren = false;
            // this.kAnswer.visible = true;
            // this.kAnswer.playErr(() => {
            // 	this.playSound(this.currentIndex, () => {
            // 	}, false)
            // 	this.kAnswer.visible = false;
            // 	this.touchChildren = true;
            // 	// this.touchChildren = true;
            // })
        };
        /**
         * 选中之后播放答案
         */
        playBaseView.prototype.playSound = function (index, callBack, isAnim) {
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
        playBaseView.prototype.onTimeOut = function () {
            this.reset();
            this.isStart = false;
            this.kRestart.visible = true;
            this.kRestart.playActionTimeOut();
        };
        /** 重置到初始化状态 */
        playBaseView.prototype.reset = function () {
            this.kTimeBar.reset();
        };
        /**
         * 结束处理
         */
        playBaseView.prototype.over = function () {
            this.reset();
            this.kRestart.visible = true;
            this.kRestart.playActionGoodJob();
            this.isStart = false;
            this.mArr = [1, 2, 3];
        };
        return playBaseView;
    }(eui.Component));
    game.playBaseView = playBaseView;
    __reflect(playBaseView.prototype, "game.playBaseView", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=playBaseView.js.map