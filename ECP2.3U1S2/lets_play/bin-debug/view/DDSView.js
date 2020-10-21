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
                "I like dogs.",
                "I don't like dogs.",
                "I like cats.",
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
            XDFFrame.EventCenter.addEventListenr(game.EventConst.timeBarOut, this.onTimeOut, this);
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kCom" + i].touchChildren = false;
                this["kCom" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onChoise" + i], this);
            }
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
            // 随机显示的位置
            this.calShowOrder();
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
                // this[`kCom${i}`].source = `img_lp_option${this.mCurShowArr[i]}_png`;
                this["kCom" + i].name = this.mCurShowArr[i];
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
            this.canSelect = true;
            this.mCurHintIdx = this.mHintQueue.shift();
            this.playHintAction();
            this.kComBar.play();
        };
        DDSView.prototype.playHintAction = function () {
            var _this = this;
            XDFSoundManager.play("sound_lp_dds_option" + this.mCurHintIdx + "_mp3", 0, 1, 1, "sound_lp_dds_option" + this.mCurHintIdx + "_mp3", function () {
                _this.canSelect = true;
            });
            this.kLabelDesc.text = this.mHintWords[this.mCurHintIdx];
        };
        DDSView.prototype.onChoise0 = function () {
            this.judge(0);
        };
        DDSView.prototype.onChoise1 = function () {
            this.judge(1);
        };
        DDSView.prototype.onChoise2 = function () {
            this.judge(2);
        };
        DDSView.prototype.judge = function (num) {
            if (this["kCom" + num].name == String(this.mCurHintIdx)) {
                this.onSelectRight();
            }
            else {
                this.onSelectErr();
            }
        };
        /** 选择正确 */
        DDSView.prototype.onSelectRight = function () {
            this.kComBar.reset();
            this.canSelect = false;
            XDFSoundManager.play("sound_ding_mp3");
            XDFSoundManager.play("sound_lp_choise_right_mp3");
            // TODO: com hide
            this.next();
        };
        /** 选择错误 */
        DDSView.prototype.onSelectErr = function () {
            this.canSelect = false;
            XDFSoundManager.play("sound_lp_dds_err_mp3");
            this.canSelect = true;
        };
        /** 时间终止 */
        DDSView.prototype.onTimeOut = function () {
            this.reset();
            this.kComRestart.visible = true;
            this.kComRestart.playActionTimeOut();
        };
        return DDSView;
    }(eui.Component));
    game.DDSView = DDSView;
    __reflect(DDSView.prototype, "game.DDSView");
})(game || (game = {}));
//# sourceMappingURL=DDSView.js.map