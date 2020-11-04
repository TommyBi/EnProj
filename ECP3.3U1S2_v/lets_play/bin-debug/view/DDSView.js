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
    var DDSView = (function (_super) {
        __extends(DDSView, _super);
        function DDSView() {
            var _this = _super.call(this) || this;
            _this.mOptionCount = 3;
            _this.mCurShowArr = []; // 当前显示的序列
            _this.mHintWords = [
                "People throw tomatoes at each other.",
                "Kids in costumes get lots of candy.",
                "Everyone wears a mask and a costume.",
            ];
            _this.mHintQueue = []; // 当前已经提示过得队列
            _this.mCurHintIdx = 0; // 当前正在提示的队列索引
            _this._canSelect = false;
            _this.mPosHammer = [{
                    x: 590,
                    y: 300,
                }, {
                    x: 1300,
                    y: 300,
                }, {
                    x: 950,
                    y: 600,
                }];
            _this.mLock_desc_sound = false; // 提示音播放锁
            _this.mLock_anim_mouse = false; // 老鼠动画播放时的锁
            _this.mLock_anim_hammer = false; // 锤子动画播放时的锁
            _this.mLock_start = false; // 是否开始了的锁
            _this.skinName = "DDSViewSkin";
            return _this;
        }
        Object.defineProperty(DDSView.prototype, "canSelect", {
            get: function () { return this._canSelect; },
            set: function (b) {
                this._canSelect = b;
                for (var i = 0; i < this.mOptionCount; i++) {
                    this["kCom" + i].touchEnabled = b;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DDSView.prototype, "mIsLock", {
            get: function () {
                return this.mLock_desc_sound || this.mLock_anim_mouse || this.mLock_anim_hammer || this.mLock_start;
            },
            enumerable: true,
            configurable: true
        });
        ;
        DDSView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].touchChildren = false;
                this["kCom" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onChoise" + i], this);
            }
            this.mAnimHammerErr = XDFFrame.DBFactory.createAnim("db_hammer_err", 2);
            this.mAnimHammerErr.setProtery({ x: 0, y: 0, parent: this.kGrpAnimHummer, scaleX: 0.4, scaleY: 0.4 });
            this.mAnimHammerRight = XDFFrame.DBFactory.createAnim("db_hammer_right");
            this.mAnimHammerRight.setProtery({ x: 0, y: 0, parent: this.kGrpAnimHummer, scaleX: 0.9, scaleY: 0.9 });
            this.mAnimHammerErr.visible = this.mAnimHammerRight.visible = false;
            this.kGrpAnimHummer.visible = false;
            this.init();
        };
        DDSView.prototype.init = function () {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            // 默认不显示待选的选项
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].setMouseShowState(false);
            }
            this.kLabelDesc.text = "";
        };
        /** 重置到初始化状态 */
        DDSView.prototype.reset = function () {
            // 默认不显示待选的选项`
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].setMouseShowState(false);
            }
            this.kLabelDesc.text = "";
            this.kComBar.reset();
        };
        /** 开始游戏 */
        DDSView.prototype.onStart = function () {
            // 提示队列
            for (var i = 0; i < this.mOptionCount; i++) {
                this.mHintQueue.push(i);
            }
            // 隐藏结束组件
            this.kComRestart.visible = false;
            // 开始
            this.mLock_start = false;
            this.canSelect = false;
            this.next();
        };
        /** 初始化播放顺序 */
        DDSView.prototype.calShowOrder = function () {
            var _this = this;
            this.mCurShowArr = [];
            this.produceOrderArr();
            for (var i = 0; i < this.mCurShowArr.length; i++) {
                // format img
                this["kCom" + i].name = this.mCurShowArr[i];
                this["kCom" + i].formateImg(this.mCurShowArr[i]);
                this.mLock_anim_mouse = true;
                this["kCom" + i].playMouseAnim("up", function () {
                    _this.mLock_anim_mouse = false;
                }, this);
            }
        };
        /** 生产随机队列 */
        DDSView.prototype.produceOrderArr = function () {
            if (this.mCurShowArr.length < 3) {
                var idx = Util.randomNum(0, 2);
                if (this.mCurShowArr.indexOf(idx) == -1) {
                    this.mCurShowArr.push(idx);
                    if (this.mCurShowArr.length < 3) {
                        this.produceOrderArr();
                    }
                }
                else {
                    this.produceOrderArr();
                }
            }
        };
        /** 下一步 */
        DDSView.prototype.next = function () {
            var _this = this;
            if (this.mHintQueue.length <= 0) {
                // 完成
                this.reset();
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                return;
            }
            ;
            // 随机显示的位置
            this.canSelect = true;
            this.mCurHintIdx = this.mHintQueue.shift();
            this.playHintAction(function () {
                _this.calShowOrder();
                _this.kComBar.play();
            });
        };
        /** 重新提示 */
        DDSView.prototype.repeatHint = function () {
            var _this = this;
            var finishDownCount = 0;
            for (var i = 0; i < this.mOptionCount; i++) {
                this.mLock_anim_mouse = true;
                this["kCom" + i].playMouseAnim("down", function () {
                    finishDownCount++;
                    if (finishDownCount >= _this.mOptionCount) {
                        _this.mLock_anim_mouse = false;
                        _this.playHintAction(function () {
                            _this.calShowOrder();
                            _this.canSelect = true;
                        });
                    }
                }, this);
            }
        };
        DDSView.prototype.playHintAction = function (cb) {
            var _this = this;
            this.mLock_desc_sound = true;
            XDFSoundManager.play("sound_lp_dds_option" + this.mCurHintIdx + "_mp3", 0, 1, 1, "sound_lp_dds_option" + this.mCurHintIdx + "_mp3", function () {
                _this.canSelect = true;
                _this.mLock_desc_sound = false;
                cb && cb();
            });
            this.kLabelDesc.text = this.mHintWords[this.mCurHintIdx];
        };
        DDSView.prototype.onChoise0 = function (e) {
            this.judge(0, e);
        };
        DDSView.prototype.onChoise1 = function (e) {
            this.judge(1, e);
        };
        DDSView.prototype.onChoise2 = function (e) {
            this.judge(2, e);
        };
        DDSView.prototype.judge = function (num, e) {
            var _this = this;
            if (this.mIsLock)
                return;
            if (this["kCom" + num].name == String(this.mCurHintIdx)) {
                this.mLock_anim_mouse = true;
                this["kCom" + num].playMouseAnim("hit", function () {
                    for (var i = 0; i < _this.mOptionCount; i++) {
                        _this["kCom" + i].playMouseAnim("down", function () {
                            _this.mLock_anim_mouse = false;
                        }, _this);
                    }
                }, this);
                this.kGrpAnimHummer.x = this.mPosHammer[num].x;
                this.kGrpAnimHummer.y = this.mPosHammer[num].y;
                this.onSelectRight(e);
            }
            else {
                this.mLock_anim_mouse = true;
                this["kCom" + num].playMouseAnim("hit", function () {
                    _this.mLock_anim_mouse = false;
                }, this);
                this.kGrpAnimHummer.x = this.mPosHammer[num].x;
                this.kGrpAnimHummer.y = this.mPosHammer[num].y;
                this.onSelectErr(e);
            }
        };
        /** 选择正确 */
        DDSView.prototype.onSelectRight = function (e) {
            var _this = this;
            this.kComBar.stop();
            this.canSelect = false;
            XDFSoundManager.play("sound_ding_mp3");
            this.mLock_anim_hammer = true;
            this.playHammerAnim("right", function () {
                _this.mLock_anim_hammer = false;
                _this.next();
            }, e);
        };
        /** 选择错误 */
        DDSView.prototype.onSelectErr = function (e) {
            var _this = this;
            this.canSelect = false;
            XDFSoundManager.play("sound_lp_dds_err_mp3");
            this.canSelect = true;
            this.mLock_anim_hammer = true;
            this.playHammerAnim("err", function () {
                _this.mLock_anim_hammer = false;
                _this.repeatHint();
            }, e);
        };
        /** 时间终止 */
        DDSView.prototype.onTimeOut = function () {
            var _this = this;
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
            this.mLock_start = true;
            var finishDownCount = 0;
            this.mLock_anim_mouse = true;
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].playMouseAnim("down", function () {
                    finishDownCount++;
                    if (finishDownCount >= _this.mOptionCount) {
                        _this.mLock_anim_mouse = false;
                    }
                }, this);
            }
        };
        DDSView.prototype.playHammerAnim = function (type, cb, e) {
            var _this = this;
            this.kGrpAnimHummer.visible = true;
            switch (type) {
                case "right":
                    this.mAnimHammerRight.visible = true;
                    this.mAnimHammerErr.visible = false;
                    this.mAnimHammerRight.play(null, 1, function () {
                        _this.kGrpAnimHummer.visible = false;
                        var downFinishCount = 0;
                        cb && cb();
                    }, this);
                    break;
                case "err":
                    this.mAnimHammerErr.visible = true;
                    this.mAnimHammerRight.visible = false;
                    this.mAnimHammerErr.play(null, 1, function () {
                        _this.kGrpAnimHummer.visible = false;
                        cb && cb();
                    }, this);
                    break;
            }
        };
        return DDSView;
    }(eui.Component));
    game.DDSView = DDSView;
    __reflect(DDSView.prototype, "game.DDSView");
})(game || (game = {}));
//# sourceMappingURL=DDSView.js.map