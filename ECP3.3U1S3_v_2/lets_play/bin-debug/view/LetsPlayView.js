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
            _this.pointList = [180, 515, 850];
            _this.mOptionCount = 3;
            _this.mCurShowArr = []; // 当前显示的序列
            _this.mHintWords = [
                "She is Vietnamese.",
                "He is Korean.",
                "We speak Korean and Vietnamese.",
            ];
            _this.mHintQueue = []; // 当前已经提示过得队列
            _this.mCurHintIdx = 0; // 当前正在提示的队列索引
            _this._canSelect = false;
            _this.skinName = "LetsPlaySkin";
            return _this;
        }
        Object.defineProperty(LetsPlayView.prototype, "canSelect", {
            get: function () { return this._canSelect; },
            set: function (b) {
                this._canSelect = b;
                for (var i = 0; i < this.mOptionCount; i++) {
                    this["kImgOption" + i].touchEnabled = b;
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        LetsPlayView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(game.EventConst.startComPlayGame, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kImgOption" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onChoise" + i], this);
            }
            // 初始化动画
            this.mAnimRoleRight = XDFFrame.DBFactory.createAnim("db_right", 2);
            this.mAnimRoleRight.setProtery({ x: 60, y: -20, parent: this.kGrpRoleAnim, scaleX: 0.7, scaleY: 0.7 });
            this.mAnimRoleErr = XDFFrame.DBFactory.createAnim("db_wrong", 9);
            this.mAnimRoleErr.setProtery({ x: 50, y: 0, parent: this.kGrpRoleAnim, scaleX: 0.8, scaleY: 0.8 });
            this.mAnimRoleIdle = XDFFrame.DBFactory.createAnim("db_idle", 2);
            this.mAnimRoleIdle.setProtery({ x: 50, y: 20, parent: this.kGrpRoleAnim, scaleX: 0.4, scaleY: 0.4 });
            this.mAnimRoleErr.visible = this.mAnimRoleIdle.visible = this.mAnimRoleRight.visible = false;
            this.init();
        };
        LetsPlayView.prototype.init = function () {
            this.kComBar.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
            // 默认不显示待选的选项
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kImgOption" + i].visible = false;
            }
            this.kGrpRoleAnim.visible = false;
            this.kLabelDesc.text = "";
        };
        /** 重置到初始化状态 */
        LetsPlayView.prototype.reset = function () {
            // 默认不显示待选的选项
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kImgOption" + i].visible = false;
            }
            this.kGrpRoleAnim.visible = false;
            this.kLabelDesc.text = "";
            this.kComBar.reset();
        };
        /** 开始游戏 */
        LetsPlayView.prototype.onStart = function () {
            // 提示队列
            // for (let i = 0; i < this.mOptionCount; i++) {
            //     this.mHintQueue.push(i);
            // }
            this.mHintQueue = [0, 1, 2];
            this.mHintQueue = Util.getArrRandomly(this.mHintQueue);
            // 隐藏结束组件
            this.kComRestart.visible = false;
            // 随机显示的位置
            this.calShowOrder();
            // 显示npc动画
            this.kGrpRoleAnim.visible = true;
            this.palyRoleAnim("idle");
            // 开始
            this.canSelect = false;
            this.next();
        };
        /** 切换角色动画显示 */
        LetsPlayView.prototype.palyRoleAnim = function (type, cb) {
            switch (type) {
                case "idle":
                    this.mAnimRoleIdle.visible = true;
                    this.mAnimRoleErr.visible = this.mAnimRoleRight.visible = false;
                    this.mAnimRoleIdle.play(null, 0);
                    break;
                case "right":
                    this.mAnimRoleRight.visible = true;
                    this.mAnimRoleErr.visible = this.mAnimRoleIdle.visible = false;
                    this.mAnimRoleRight.play(null, 1, cb, this);
                    break;
                case "err":
                    this.mAnimRoleErr.visible = true;
                    this.mAnimRoleRight.visible = this.mAnimRoleIdle.visible = false;
                    this.mAnimRoleErr.play(null, 1, cb, this);
                    break;
            }
        };
        /** 初始化播放顺序 */
        LetsPlayView.prototype.calShowOrder = function () {
            this.mCurShowArr = [];
            this.produceOrderArr();
            for (var i = 0; i < this.mCurShowArr.length; i++) {
                // format img
                this["kImgOption" + i].visible = true;
                this["kImgOption" + i].source = "img_lp_option" + this.mCurShowArr[i] + "_png";
                this["kImgOption" + i].name = this.mCurShowArr[i];
            }
        };
        /** 生产随机队列 */
        LetsPlayView.prototype.produceOrderArr = function () {
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
        LetsPlayView.prototype.next = function () {
            if (this.mHintQueue.length <= 0) {
                // 完成
                this.reset();
                this.kComRestart.visible = true;
                this.kComRestart.playActionGoodJob();
                return;
            }
            ;
            this.mCurHintIdx = this.mHintQueue.shift();
            this.pointList = Util.getArrRandomly(this.pointList);
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kImgOption" + i].x = this.pointList[i];
            }
            this.playHintAction();
            this.kComBar.play();
        };
        LetsPlayView.prototype.playHintAction = function () {
            var _this = this;
            XDFSoundManager.play("sound_lp_option" + this.mCurHintIdx + "_mp3", 0, 1, 1, "sound_lp_option" + this.mCurHintIdx + "_mp3", function () {
                _this.canSelect = true;
            });
            this.kLabelDesc.text = this.mHintWords[this.mCurHintIdx];
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
        LetsPlayView.prototype.onChoise3 = function () {
            this.judge(3);
        };
        LetsPlayView.prototype.judge = function (num) {
            if (this["kImgOption" + num].name == String(this.mCurHintIdx)) {
                // TODO: correct
                this.onSelectRight();
            }
            else {
                // TODO: err
                this.onSelectErr();
            }
        };
        /** 选择正确 */
        LetsPlayView.prototype.onSelectRight = function () {
            var _this = this;
            this.kComBar.reset();
            this.canSelect = false;
            XDFSoundManager.play("sound_ding_mp3");
            XDFSoundManager.play("sound_lp_choise_right_mp3");
            this.palyRoleAnim("right", function () {
                _this.palyRoleAnim("idle");
                _this.next();
            });
        };
        /** 选择错误 */
        LetsPlayView.prototype.onSelectErr = function () {
            var _this = this;
            this.canSelect = false;
            XDFSoundManager.play("deng_mp3");
            XDFSoundManager.play("sound_lp_choise_err_mp3");
            this.palyRoleAnim("err", function () {
                _this.palyRoleAnim("idle");
                _this.playHintAction();
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