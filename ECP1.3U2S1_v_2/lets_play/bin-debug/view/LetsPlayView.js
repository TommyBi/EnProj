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
            _this.currentIndex = 0;
            _this.nextIndex = 0;
            _this.len = 2;
            _this.isLeft = false;
            _this.mArr = [1, 2];
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        ;
        LetsPlayView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
            // 初始化动画
            this.mBall1 = XDFFrame.DBFactory.createAnim("ball1");
            this.mBall1.setProtery({ x: 400, y: 600, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mBall3 = XDFFrame.DBFactory.createAnim("ball6");
            this.mBall3.setProtery({ x: 1000, y: 600, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });
            this.mBall2 = XDFFrame.DBFactory.createAnim("ball2");
            this.mBall2.setProtery({ x: 400, y: 600, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mBall1.visible = this.mBall2.visible = this.mBall3.visible = false;
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("role1");
            this.mAnimRole1.setProtery({ x: 740, y: 900, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("role2");
            this.mAnimRole2.setProtery({ x: 740, y: 900, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole3 = XDFFrame.DBFactory.createAnim("role3");
            this.mAnimRole3.setProtery({ x: 750, y: 880, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole4 = XDFFrame.DBFactory.createAnim("role4");
            this.mAnimRole4.setProtery({ x: 750, y: 880, parent: this.kAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole1.visible = this.mAnimRole2.visible = this.mAnimRole3.visible = this.mAnimRole4.visible = false;
            this.init();
        };
        LetsPlayView.prototype.init = function () {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
        };
        /** 重置到初始化状态 */
        LetsPlayView.prototype.reset = function () {
            // 默认不显示待选的选项
            this.kComBar.reset();
            this.kIcon1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.kIcon2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.mArr = [1, 2];
        };
        /** 开始游戏 */
        LetsPlayView.prototype.onStart = function () {
            // 隐藏结束组件
            this.kComRestart.visible = false;
            // 显示npc动画
            this.palyRoleAnim("idle");
            this.kIcon1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.kIcon2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // 开始
            // this.playHintAction();
            // this.kComBar.play();
            this.next();
        };
        LetsPlayView.prototype.onClick = function (e) {
            var _this = this;
            this.touchChildren = false;
            if (e.currentTarget.name == this.currentIndex) {
                this.palyRoleAnim("toulan", function () {
                    if (_this.isLeft) {
                        _this.mBall1.visible = true;
                        _this.mBall1.play(null, 1, function () {
                            _this.mBall1.visible = false;
                            _this.onSelectRight();
                        }, _this);
                    }
                    else {
                        _this.mBall3.visible = true;
                        _this.mBall3.play(null, 1, function () {
                            _this.mBall3.visible = false;
                            _this.onSelectRight();
                        }, _this);
                    }
                });
            }
            else {
                this.palyRoleAnim("toulan", function () {
                    var scale = 1;
                    if (_this.isLeft) {
                        scale = 1;
                        if (_this.mBall2.scaleX < 0)
                            _this.mBall2.scaleX *= -1;
                    }
                    else {
                        if (_this.mBall2.scaleX > 0)
                            _this.mBall2.scaleX *= -1;
                        scale = -1;
                    }
                    if (scale == 1)
                        _this.mBall2.x = 400;
                    else
                        _this.mBall2.x = 1000;
                    _this.mBall2.visible = true;
                    XDFSoundManager.play("sou_mp3", 0, 1, 1, "", function () {
                        XDFSoundManager.play("deng_mp3");
                    });
                    _this.mBall2.play(null, 1, function () {
                        _this.mBall2.visible = false;
                        _this.onSelectErr();
                    }, _this);
                });
            }
        };
        /** 切换角色动画显示 */
        LetsPlayView.prototype.palyRoleAnim = function (type, cb) {
            this.mAnimRole1.visible = false;
            this.mAnimRole2.visible = false;
            this.mAnimRole3.visible = false;
            this.mAnimRole4.visible = false;
            switch (type) {
                case "idle":
                    this.mAnimRole1.visible = true;
                    this.mAnimRole1.play(null, 0);
                    break;
                case "toulan":
                    this.mAnimRole2.visible = true;
                    this.mAnimRole2.play(null, 1, cb, this);
                    break;
                case "right":
                    XDFSoundManager.play("sound_lp_choise_right_mp3");
                    this.mAnimRole3.visible = true;
                    this.mAnimRole3.play(null, 1, cb, this);
                    break;
                case "err":
                    this.mAnimRole4.visible = true;
                    this.mAnimRole4.play(null, 1, cb, this);
                    break;
            }
        };
        /** 下一步 */
        LetsPlayView.prototype.next = function () {
            if (this.mArr.length <= 0) {
                // 完成
                this.reset();
                this.touchChildren = true;
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                return;
            }
            ;
            // this.currentIndex = this.mArr.pop();
            var index = Util.limitInteger(0, this.mArr.length - 1);
            this.currentIndex = this.mArr.splice(index, 1)[0];
            var random = Math.random() < 0.5 ? 1 : 2;
            this.kIcon1.source = random == 1 ? "play_9_png" : "play_10_png";
            this.kIcon1.name = random.toString();
            this.kIcon2.source = random == 1 ? "play_10_png" : "play_9_png";
            this.kIcon2.name = (random == 1 ? 2 : 1).toString();
            this.kAnswer1.visible = this.currentIndex == 1;
            this.kAnswer2.visible = this.currentIndex == 2;
            if (this.currentIndex.toString() == this.kIcon1.name) {
                this.isLeft = true;
            }
            else {
                this.isLeft = false;
            }
            this.playHintAction();
            this.kComBar.play();
        };
        LetsPlayView.prototype.playHintAction = function () {
            var _this = this;
            XDFSoundManager.play("sound" + this.currentIndex + "_1_mp3", 0, 1, 1, "", function () {
                _this.touchChildren = true;
            });
        };
        /** 选择正确 */
        LetsPlayView.prototype.onSelectRight = function () {
            var _this = this;
            this.kComBar.reset();
            XDFSoundManager.play("sound_ding_mp3");
            this.palyRoleAnim("right", function () {
                _this.palyRoleAnim("idle");
                _this.next();
            });
        };
        /** 选择错误 */
        LetsPlayView.prototype.onSelectErr = function () {
            var _this = this;
            XDFSoundManager.play("sound_lp_choise_err_mp3");
            this.palyRoleAnim("err", function () {
                _this.palyRoleAnim("idle");
                _this.playHintAction();
            });
        };
        /** 时间终止 */
        LetsPlayView.prototype.onTimeOut = function () {
            this.reset();
            this.touchChildren = true;
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        };
        return LetsPlayView;
    }(eui.Component));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map