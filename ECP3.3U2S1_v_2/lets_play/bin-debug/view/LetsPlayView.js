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
            _this.pos = [{ x: 535, y: 217 }, { x: 860, y: 117 }, { x: 1200, y: 217 }];
            _this.mLock_sound = false;
            _this.mLock_action = false;
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
            for (var i = 0; i < 3; i++) {
                this["kGrpOption" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onChoise" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
            // 初始选项动画
            for (var i = 0; i < 3; i++) {
                this["mAnimOptionErr" + i] = XDFFrame.DBFactory.createAnim("db_" + i + "_err");
                this["mAnimOptionErr" + i].setProtery({ x: 100, y: 100, parent: this["kGrpOption" + i], scaleX: 0.7, scaleY: 0.7 });
                this["mAnimOptionDrop" + i] = XDFFrame.DBFactory.createAnim("db_" + i + "_drop");
                this["mAnimOptionDrop" + i].setProtery({ x: 105, y: 150, parent: this["kGrpOption" + i], scaleX: 0.7, scaleY: 0.7 });
            }
            // 初始化角色动画
            this.mAnimRoleErr = XDFFrame.DBFactory.createAnim("db_role_err");
            this.mAnimRoleErr.setProtery({ x: 120, y: 20, parent: this.kGrpRole, scaleX: 2, scaleY: 2 });
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim("db_role_idle");
            this.mAnimRoleIdle.setProtery({ x: 100, y: 100, parent: this.kGrpRole, scaleX: 2, scaleY: 2 });
            this.mAnimRoleRight = XDFFrame.DBFactory.createAnim("db_role_right");
            this.mAnimRoleRight.setProtery({ x: 120, y: 20, parent: this.kGrpRole, scaleX: 2, scaleY: 2 });
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
            this.kGrpOption0.visible = this.kGrpOption1.visible = this.kGrpOption2.visible = this.kGrpRole.visible = false;
        };
        /** 开始游戏 */
        LetsPlayView.prototype.onStart = function () {
            this.kGrpOption0.visible = this.kGrpOption1.visible = this.kGrpOption2.visible = this.kGrpRole.visible = true;
            this.kComRestart.visible = false;
            this.mHintArr = Util.calShowOrder(3);
            this.kComTimeBar.play();
            this.mLock_sound = false;
            this.next();
        };
        /** 切换角色动画显示 */
        LetsPlayView.prototype.playRoleAnim = function (type, cb) {
            switch (type) {
                case "idle":
                    this.mAnimRoleIdle.visible = this.mAnimRoleErr.visible = this.mAnimRoleRight.visible = false;
                    this.mAnimRoleIdle.visible = true;
                    this.mAnimRoleIdle.play(null, 0);
                    break;
                case "right":
                    this.mAnimRoleIdle.visible = this.mAnimRoleErr.visible = this.mAnimRoleRight.visible = false;
                    this.mAnimRoleRight.visible = true;
                    XDFSoundManager.play("sound_lp_choise_right_mp3");
                    this.mAnimRoleRight.play(null, 1, cb, this);
                    break;
                case "err":
                    this.mAnimRoleIdle.visible = this.mAnimRoleErr.visible = this.mAnimRoleRight.visible = false;
                    this.mAnimRoleErr.visible = true;
                    XDFSoundManager.play("sound_lp_choise_err_mp3");
                    this.mAnimRoleErr.play(null, 1, cb, this);
                    break;
            }
        };
        LetsPlayView.prototype.onChoise0 = function () {
            this.judge(0);
        };
        LetsPlayView.prototype.onChoise1 = function () {
            this.judge(1);
        };
        LetsPlayView.prototype.onChoise2 = function () {
            this.judge(2);
        };
        LetsPlayView.prototype.judge = function (num) {
            if (this.isLock)
                return;
            this.playSelectAnim(num, function () { });
            this.kGrpRole.x = this["kGrpOption" + num].x;
            if (num == this.mHintIdx) {
                // TODO: correct
                this.onSelectRight();
            }
            else {
                // TODO: err
                this.onSelectErr();
            }
        };
        /** 进行下一个操作 */
        LetsPlayView.prototype.next = function () {
            var _this = this;
            console.log("next");
            if (this.mHintArr.length <= 0) {
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                this.reset();
                return;
            }
            this.mHintIdx = this.mHintArr.shift();
            this.mPosArr = Util.calShowOrder(3);
            // 格式化摆放的位置
            for (var i = 0; i < 3; i++) {
                this["kGrpOption" + i].x = this.pos[this.mPosArr["" + i]].x;
                this["kGrpOption" + i].y = this.pos[this.mPosArr["" + i]].y;
                this["mAnimOptionErr" + i].visible = true;
                this["mAnimOptionDrop" + i].visible = false;
            }
            this.mLock_sound = true;
            console.log("true1");
            XDFSoundManager.play("sound_" + this.mHintIdx + "_mp3", 0, 1, 1, "sound_" + this.mHintIdx + "_mp3", function () {
                console.log("false1");
                _this.mLock_sound = false;
            });
            this.playRoleAnim("idle");
            this.kComTimeBar.play();
        };
        /** 选择正确 */
        LetsPlayView.prototype.onSelectRight = function () {
            var _this = this;
            this.kComTimeBar.stop();
            this.playRoleAnim("right", function () {
                _this.playRoleAnim("idle");
            });
        };
        /** 选择错误 */
        LetsPlayView.prototype.onSelectErr = function () {
            var _this = this;
            this.playRoleAnim("err", function () {
                _this.playRoleAnim("idle");
                _this.mLock_sound = true;
                console.log("true2");
                XDFSoundManager.play("sound_" + _this.mHintIdx + "_mp3", 0, 1, 1, "sound_" + _this.mHintIdx + "_mp3", function () {
                    console.log("false2");
                    _this.mLock_sound = false;
                });
            });
        };
        LetsPlayView.prototype.playSelectAnim = function (num, cb) {
            var _this = this;
            if (num == this.mHintIdx) {
                // 选择正确
                XDFSoundManager.play("sound_ding_mp3");
                this["mAnimOptionErr" + num].visible = false;
                this["mAnimOptionDrop" + num].visible = true;
                this.mLock_action = true;
                this["mAnimOptionDrop" + num].play(null, 1, function () {
                    _this.mLock_action = false;
                    _this.next();
                }, this);
            }
            else {
                // 选择错误
                this["mAnimOptionDrop" + num].visible = false;
                this["mAnimOptionErr" + num].visible = true;
                this.mLock_action = true;
                this["mAnimOptionErr" + num].play(null, 1, function () {
                    _this.mLock_action = false;
                }, this);
            }
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