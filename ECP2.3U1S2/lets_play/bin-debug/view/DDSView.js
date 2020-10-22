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
                "Sheep give us wool.",
                "Chickens give us eggs.",
                "Cows give us milk.",
            ];
            _this.mHintQueue = []; // 当前已经提示过得队列
            _this.mCurHintIdx = 0; // 当前正在提示的队列索引
            _this._canSelect = false;
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
        ;
        DDSView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            //XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].touchChildren = false;
                this["kCom" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onChoise" + i], this);
            }
            this.mAnimHammerErr = XDFFrame.DBFactory.createAnim("db_hammer_err");
            this.mAnimHammerErr.setProtery({ x: 0, y: 0, parent: this.kGrpAnimHummer, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimHammerHit = XDFFrame.DBFactory.createAnim("db_hammer_hit");
            this.mAnimHammerHit.setProtery({ x: 0, y: 0, parent: this.kGrpAnimHummer, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimHammerRight = XDFFrame.DBFactory.createAnim("db_hammer_right");
            this.mAnimHammerRight.setProtery({ x: 0, y: 0, parent: this.kGrpAnimHummer, scaleX: 0.5, scaleY: 0.5 });
            this.mAnimHammerErr.visible = this.mAnimHammerHit.visible = this.mAnimHammerRight.visible = false;
            this.kGrpAnimHummer.visible = false;
            this.init();
        };
        DDSView.prototype.init = function () {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            // 默认不显示待选的选项
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].visible = false;
            }
            this.kLabelDesc.text = "";
        };
        /** 重置到初始化状态 */
        DDSView.prototype.reset = function () {
            // 默认不显示待选的选项`
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].visible = false;
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
            this.canSelect = false;
            this.next();
        };
        /** 初始化播放顺序 */
        DDSView.prototype.calShowOrder = function () {
            this.mCurShowArr = [];
            this.produceOrderArr();
            for (var i = 0; i < this.mCurShowArr.length; i++) {
                // format img
                this["kCom" + i].visible = true;
                this["kCom" + i].name = this.mCurShowArr[i];
                this["kCom" + i].formateImg(this.mCurShowArr[i]);
                this["kCom" + i].playMouseAnim("up", null, null);
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
            this.playHintAction();
            this.calShowOrder();
            this.kComBar.play();
        };
        /** 重新提示 */
        DDSView.prototype.repeatHint = function () {
            var _this = this;
            var finishDownCount = 0;
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].playMouseAnim("down", function () {
                    finishDownCount++;
                    if (finishDownCount >= _this.mOptionCount) {
                        _this.playHintAction();
                        _this.calShowOrder();
                        _this.canSelect = true;
                    }
                }, this);
            }
        };
        DDSView.prototype.playHintAction = function () {
            var _this = this;
            XDFSoundManager.play("sound_lp_dds_option" + this.mCurHintIdx + "_mp3", 0, 1, 1, "sound_lp_dds_option" + this.mCurHintIdx + "_mp3", function () {
                _this.canSelect = true;
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
            if (this["kCom" + num].name == String(this.mCurHintIdx)) {
                this.onSelectRight(e);
            }
            else {
                this["kCom" + num].playMouseAnim("hit", null, null);
                this.onSelectErr(e);
            }
        };
        /** 选择正确 */
        DDSView.prototype.onSelectRight = function (e) {
            var _this = this;
            this.kComBar.reset();
            this.canSelect = false;
            XDFSoundManager.play("sound_ding_mp3");
            XDFSoundManager.play("sound_lp_choise_right_mp3");
            this.playHammerAnim("right", function () {
                _this.next();
            }, e);
        };
        /** 选择错误 */
        DDSView.prototype.onSelectErr = function (e) {
            var _this = this;
            this.canSelect = false;
            XDFSoundManager.play("sound_lp_dds_err_mp3");
            this.canSelect = true;
            this.playHammerAnim("err", function () {
                _this.repeatHint();
            }, e);
        };
        /** 时间终止 */
        DDSView.prototype.onTimeOut = function () {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        };
        DDSView.prototype.playHammerAnim = function (type, cb, e) {
            var _this = this;
            switch (type) {
                case "hit":
                    this.kGrpAnimHummer.visible = this.mAnimHammerHit.visible = true;
                    this.mAnimHammerErr.visible = this.mAnimHammerRight.visible = false;
                    this.mAnimHammerHit.play(null, 1, cb, this);
                    break;
                case "right":
                    this.kGrpAnimHummer.x = e.stageX;
                    this.kGrpAnimHummer.y = e.stageY;
                    this.kGrpAnimHummer.visible = this.mAnimHammerHit.visible = true;
                    this.mAnimHammerErr.visible = this.mAnimHammerRight.visible = false;
                    this.mAnimHammerHit.play(null, 1, function () {
                        _this.kGrpAnimHummer.visible = _this.mAnimHammerRight.visible = true;
                        _this.mAnimHammerErr.visible = _this.mAnimHammerHit.visible = false;
                        _this.mAnimHammerRight.play(null, 1, function () {
                            _this.kGrpAnimHummer.visible = false;
                            var downFinishCount = 0;
                            for (var i = 0; i < _this.mCurShowArr.length; i++) {
                                // format img
                                _this["kCom" + i].visible = true;
                                _this["kCom" + i].name = _this.mCurShowArr[i];
                                _this["kCom" + i].formateImg(_this.mCurShowArr[i]);
                                _this["kCom" + i].playMouseAnim("down", function () {
                                    downFinishCount++;
                                    if (downFinishCount == _this.mOptionCount) {
                                        cb && cb();
                                    }
                                }, _this);
                            }
                        }, _this);
                    }, this);
                    break;
                case "err":
                    this.kGrpAnimHummer.x = e.stageX;
                    this.kGrpAnimHummer.y = e.stageY;
                    this.kGrpAnimHummer.visible = this.mAnimHammerHit.visible = true;
                    this.mAnimHammerErr.visible = this.mAnimHammerRight.visible = false;
                    this.mAnimHammerHit.play(null, 1, function () {
                        _this.kGrpAnimHummer.visible = _this.mAnimHammerErr.visible = true;
                        _this.mAnimHammerHit.visible = _this.mAnimHammerRight.visible = false;
                        _this.mAnimHammerErr.play(null, 1, function () {
                            _this.kGrpAnimHummer.visible = false;
                            cb && cb();
                        }, _this);
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