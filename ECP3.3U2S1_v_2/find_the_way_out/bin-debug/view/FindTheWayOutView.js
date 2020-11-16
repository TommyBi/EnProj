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
    var FindTheWayOutView = (function (_super) {
        __extends(FindTheWayOutView, _super);
        function FindTheWayOutView() {
            var _this = _super.call(this) || this;
            _this.mLock_startGame = false;
            _this.mLock_isFinish = false;
            _this.mLock_sound = false;
            _this.mLock_move = false;
            _this.mCurIdx = -1;
            _this.mRightOption = [0, 1, 1];
            _this.mErrPos = [
                { x: 1560, y: 370, scaleX: -1 },
                { x: 353, y: 530, scaleX: 1 },
                { x: 660, y: 960, scaleX: 1 },
            ];
            _this.mRightPos = [
                { x: 353, y: 370, scaleX: 1 },
                { x: 1560, y: 530, scaleX: -1 },
                { x: 1314, y: 980, scaleX: -1 },
            ];
            _this.skinName = "FindTheWayOutSkin";
            return _this;
        }
        Object.defineProperty(FindTheWayOutView.prototype, "isLock", {
            get: function () {
                return this.mLock_isFinish || this.mLock_isFinish || this.mLock_sound || this.mLock_move;
            },
            enumerable: true,
            configurable: true
        });
        ;
        FindTheWayOutView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        FindTheWayOutView.prototype.init = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            this.mAnimErr = XDFFrame.DBFactory.createAnim("db_role_err");
            this.mAnimErr.setProtery({ x: 100, y: 20, parent: this.kGrpAnim, scaleX: 1.7, scaleY: 1.7 });
            this.mAnimIdle = XDFFrame.DBFactory.createAnim("db_role_idle");
            this.mAnimIdle.setProtery({ x: 100, y: 20, parent: this.kGrpAnim, scaleX: 1.7, scaleY: 1.7 });
            this.mAnimPool = XDFFrame.DBFactory.createAnim("db_role_pool");
            this.mAnimPool.setProtery({ x: 100, y: 20, parent: this.kGrpAnim, scaleX: 1.7, scaleY: 1.7 });
            this.mAnimRun = XDFFrame.DBFactory.createAnim("db_role_run");
            this.mAnimRun.setProtery({ x: 100, y: 20, parent: this.kGrpAnim, scaleX: 1.7, scaleY: 1.7 });
            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComAnswer.visible = false;
            this.kComReplay.showStart();
            this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
        };
        FindTheWayOutView.prototype.onSelect = function (e) {
            console.log("e:", e);
            if (!e.target.name)
                return;
            var arr = e.target.name.split("_");
            if (arr < 2)
                return;
            this.onMatch(arr[0], arr[1]);
        };
        FindTheWayOutView.prototype.reset = function () {
            for (var i = 0; i < 3; i++) {
                egret.Tween.removeTweens(this["kGrpFrame" + i]);
                this["kGrpFrame" + i].alpha = 0;
            }
            this.kGrpAnim.x = 625;
            this.kGrpAnim.y = 230;
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mCurIdx = -1;
            this.showAnim(null);
        };
        FindTheWayOutView.prototype.showAnim = function (name, cb) {
            switch (name) {
                case "err":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    this.mAnimErr.visible = true;
                    this.mAnimErr.play(null, 1, function () {
                        cb && cb();
                    }, this);
                    break;
                case "idle":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    this.mAnimIdle.visible = true;
                    this.mAnimIdle.play(null, 0);
                    cb && cb();
                    break;
                case "pool":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    this.mAnimPool.visible = true;
                    this.mAnimPool.play(null, 6, function () {
                        cb && cb();
                    }, this);
                    break;
                case "run":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    this.mAnimRun.visible = true;
                    this.mAnimRun.play(null, 3, function () {
                        cb && cb();
                    }, this);
                    break;
                case "null":
                    this.mAnimErr.visible = this.mAnimIdle.visible = this.mAnimIdle.visible = this.mAnimPool.visible = this.mAnimRun.visible = false;
                    cb && cb();
                    break;
            }
        };
        /** 开始游戏 */
        FindTheWayOutView.prototype.onStart = function () {
            var _this = this;
            this.reset();
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.mLock_isFinish = false;
            this.mLock_move = false;
            this.mLock_sound = false;
            this.kComAnswer.visible = false;
            this.mCurIdx = -1;
            this.showAnim("idle");
            this.kGrpAnim.scaleX = 1;
            egret.Tween.get(this.kGrpAnim).to({ x: 1200, y: 290 }, 1500, egret.Ease.cubicInOut).call(function () { _this.kGrpAnim.scaleX = -1; });
            this.next();
        };
        /** 提示下一个 */
        FindTheWayOutView.prototype.next = function () {
            if (this.mCurIdx >= 2) {
                // 完成
                this.kGrpAnim.x = 1110;
                this.kGrpAnim.y = 970;
                this.showAnim("pool");
                this.mLock_isFinish = true;
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            }
            else {
                // 没完成
                this.mCurIdx++;
                this.hint();
            }
        };
        /** 提示 */
        FindTheWayOutView.prototype.hint = function () {
            var _this = this;
            // sound
            this.mLock_sound = true;
            XDFSoundManager.play("sound_" + this.mCurIdx + "_mp3", 0, 1, 1, "sound_" + this.mCurIdx + "_mp3", function () {
                _this.mLock_sound = false;
            });
            // 中间的按钮
            egret.Tween.removeTweens(this["kIcon" + this.mCurIdx]);
            this["kIcon" + this.mCurIdx].scaleX = this["kIcon" + this.mCurIdx].scaleY = 1.4;
            egret.Tween.get(this["kIcon" + this.mCurIdx])
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 300)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 300);
            // show desc
            for (var i = 0; i < 3; i++) {
                egret.Tween.removeTweens(this["kGrpFrame" + i]);
                this["kGrpFrame" + i].alpha = 0;
            }
            this["kGrpFrame" + this.mCurIdx].visible = true;
            this["kGrpFrame" + this.mCurIdx].alpha = 1;
            egret.Tween.get(this["kGrpFrame" + this.mCurIdx], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
        };
        FindTheWayOutView.prototype.onMatch = function (idx, touch) {
            if (this.isLock)
                return;
            if (idx != this.mCurIdx)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mRightOption[this.mCurIdx]) {
                this.touchRight();
            }
            else {
                this.touchErr();
            }
        };
        /** 选择正确 */
        FindTheWayOutView.prototype.touchRight = function () {
            var _this = this;
            XDFSoundManager.play("sound_stick_right_mp3");
            // 移动到正确的位置去
            egret.Tween.removeTweens(this.kGrpAnim);
            this.mLock_move = true;
            this.showAnim("run");
            egret.Tween.get(this.kGrpAnim).to({ x: this.mRightPos[this.mCurIdx].x, y: this.mRightPos[this.mCurIdx].y }, 1500).call(function () {
                _this.kGrpAnim.scaleX = _this.mRightPos[_this.mCurIdx].scaleX;
                _this.showAnim("idle");
                _this.mLock_move = false;
                _this.next();
            });
        };
        /** 选择错误 */
        FindTheWayOutView.prototype.touchErr = function () {
            var _this = this;
            // 记录原来的位置，重置到原来的位置
            var x = this.kGrpAnim.x;
            var y = this.kGrpAnim.y;
            var scale = this.kGrpAnim.scaleX;
            egret.Tween.removeTweens(this.kGrpAnim);
            this.showAnim("run");
            this.mLock_move = true;
            egret.Tween.get(this.kGrpAnim).to({ x: this.mErrPos[this.mCurIdx].x, y: this.mErrPos[this.mCurIdx].y }, 1500).call(function () {
                _this.kGrpAnim.scaleX = _this.mErrPos[_this.mCurIdx].scaleX;
                XDFSoundManager.play("sound_oopstryagain_mp3", 0, 1, 1, "sound_oopstryagain_mp3", function () {
                    _this.hint();
                });
                _this.showAnim("err", function () {
                    _this.kGrpAnim.x = x;
                    _this.kGrpAnim.y = y;
                    _this.kGrpAnim.scaleX = scale;
                    _this.showAnim("idle");
                    _this.mLock_move = false;
                });
            });
        };
        return FindTheWayOutView;
    }(eui.Component));
    game.FindTheWayOutView = FindTheWayOutView;
    __reflect(FindTheWayOutView.prototype, "game.FindTheWayOutView");
})(game || (game = {}));
//# sourceMappingURL=FindTheWayOutView.js.map