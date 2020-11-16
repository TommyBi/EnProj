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
            _this.mHintIdx = -1;
            _this.mHintArr = [];
            _this.mPosArr = [];
            _this.mLock_sound = false;
            _this.mLock_action = false;
            _this.mDescContent = [
                "Don't walk on a frozen lake.",
                "Don't run on icy roads.",
                "You should be careful around fire.",
            ];
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        Object.defineProperty(LetsPlayView.prototype, "isLock", {
            get: function () {
                return this.mLock_sound || this.mLock_action;
            },
            enumerable: true,
            configurable: true
        });
        ;
        LetsPlayView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // 注册界面事件
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judge, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
            // 初始化角色动画
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim("role_idle");
            this.mAnimRoleIdle.setProtery({ x: 0, y: 50, parent: this.kGrpRole, scaleX: 0.8, scaleY: 0.8 });
            this.mAnimRoleWin = XDFFrame.DBFactory.createAnim("role_win", 2);
            this.mAnimRoleWin.setProtery({ x: -335, y: -50, parent: this.kGrpRole, scaleX: 1.3, scaleY: 1.3 });
            this.mAnimRoleLose = XDFFrame.DBFactory.createAnim("role_lose", 2);
            this.mAnimRoleLose.setProtery({ x: -250, y: -45, parent: this.kGrpRole, scaleX: 1.3, scaleY: 1.3 });
            this.init();
        };
        LetsPlayView.prototype.init = function () {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
        };
        /** 重置到初始化状态 */
        LetsPlayView.prototype.reset = function () {
            this.kComTimeBar.reset();
            this.kLabelDesc.text = "";
            this.kImg0.visible = this.kImg1.visible = this.kImg2.visible = this.kGrpRole.visible = false;
        };
        /** 开始游戏 */
        LetsPlayView.prototype.onStart = function () {
            this.kImg0.visible = this.kImg1.visible = this.kImg2.visible = this.kGrpRole.visible = true;
            this.kComRestart.visible = false;
            this.mHintArr = Util.calShowOrder(3);
            this.next();
        };
        /** 切换角色动画显示 */
        LetsPlayView.prototype.playRoleAnim = function (type, cb) {
            switch (type) {
                case "idle":
                    this.mAnimRoleIdle.visible = this.mAnimRoleLose.visible = this.mAnimRoleWin.visible = false;
                    this.mAnimRoleIdle.visible = true;
                    this.mAnimRoleIdle.play(null, 0);
                    break;
                case "win":
                    this.mAnimRoleIdle.visible = this.mAnimRoleLose.visible = this.mAnimRoleWin.visible = false;
                    this.mAnimRoleWin.visible = true;
                    this.mAnimRoleWin.play(null, 1, cb, this);
                    break;
                case "lose":
                    this.mAnimRoleIdle.visible = this.mAnimRoleLose.visible = this.mAnimRoleWin.visible = false;
                    this.mAnimRoleLose.visible = true;
                    this.mAnimRoleLose.play(null, 1, cb, this);
                    break;
            }
        };
        LetsPlayView.prototype.judge = function (e) {
            if (this.isLock)
                return;
            if (e.target.name == "")
                return;
            var num = Number(e.target.name);
            if (num == this.mHintIdx) {
                this.onSelectRight();
            }
            else {
                this.onSelectErr();
            }
        };
        /** 进行下一个操作 */
        LetsPlayView.prototype.next = function () {
            var _this = this;
            this.mPosArr = Util.calShowOrder(3);
            for (var i = 0; i < 3; i++) {
                this["kImg" + i].source = "img_option_" + this.mPosArr[i] + "_png";
                this["kImg" + i].name = "" + this.mPosArr[i];
            }
            if (this.mHintArr.length <= 0) {
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                this.reset();
                return;
            }
            this.mHintIdx = this.mHintArr.shift();
            this.mLock_sound = true;
            XDFSoundManager.play("sound_" + this.mHintIdx + "_mp3", 0, 1, 1, "sound_" + this.mHintIdx + "_mp3", function () {
                _this.mLock_sound = false;
            });
            this.playRoleAnim("idle");
            this.kLabelDesc.text = this.mDescContent[this.mHintIdx];
            this.kComTimeBar.play();
        };
        /** 选择正确 */
        LetsPlayView.prototype.onSelectRight = function () {
            var _this = this;
            this.kComTimeBar.stop();
            XDFSoundManager.play("sound_football_mp3", 0, 1, 1, "sound_football_mp3", function () {
                XDFSoundManager.play("sound_win_mp3");
            });
            this.mLock_action = true;
            this.playRoleAnim("win", function () {
                _this.mLock_action = false;
                _this.playRoleAnim("idle");
                _this.next();
            });
        };
        /** 选择错误 */
        LetsPlayView.prototype.onSelectErr = function () {
            var _this = this;
            XDFSoundManager.play("sound_football_mp3", 0, 1, 1, "sound_football_mp3", function () {
                XDFSoundManager.play("sound_lose_mp3");
            });
            this.mLock_action = true;
            this.playRoleAnim("lose", function () {
                _this.mLock_action = false;
                _this.playRoleAnim("idle");
                _this.mLock_sound = true;
                XDFSoundManager.play("sound_" + _this.mHintIdx + "_mp3", 0, 1, 1, "sound_" + _this.mHintIdx + "_mp3", function () {
                    _this.mLock_sound = false;
                });
            });
        };
        /** 时间终止 */
        LetsPlayView.prototype.onTimeOut = function () {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        };
        return LetsPlayView;
    }(eui.Component));
    game.LetsPlayView = LetsPlayView;
    __reflect(LetsPlayView.prototype, "game.LetsPlayView");
})(game || (game = {}));
//# sourceMappingURL=LetsPlayView.js.map