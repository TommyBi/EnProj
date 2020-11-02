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
    var StickSayNewView = (function (_super) {
        __extends(StickSayNewView, _super);
        function StickSayNewView() {
            var _this = _super.call(this) || this;
            _this.mHintArr = [];
            _this.mLock_sound_select = false; // 操作锁 - 是否正在播放选中的声音
            _this.mLock_startGame = true; // 操作锁 - 是否开始了游戏
            _this.mLock_isFinish = false; // 操作锁 - 是否已经完成了一局
            _this.mSelectIdx = -1;
            _this.mSmokeAnimPos = [{ x: 875, y: 320 }, { x: 1535, y: 300 }, { x: 650, y: 750 }, { x: 1263, y: 780 }];
            _this.skinName = "StickSayViewNewSkin";
            return _this;
        }
        Object.defineProperty(StickSayNewView.prototype, "isLock", {
            get: function () {
                return this.mLock_sound_select ||
                    this.mLock_startGame ||
                    this.mLock_isFinish ||
                    this.kComAnswer.visible;
            },
            enumerable: true,
            configurable: true
        });
        ;
        StickSayNewView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        StickSayNewView.prototype.init = function () {
            for (var i = 0; i < 4; i++) {
                this["kImgBodyBtn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onSelect" + i], this);
                this["kImgFrame" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onSelectCloth" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        };
        StickSayNewView.prototype.reset = function () {
            for (var i = 0; i < 4; i++) {
                this["kImgBody" + i].visible = false;
                this["kImgCoat" + i].visible = false;
                egret.Tween.removeTweens(this["kImgBodyBtn" + i]);
                this["kImgBodyBtn" + i].alpha = 1;
                egret.Tween.removeTweens(this["kImgFrame" + i]);
                this["kImgFrame" + i].alpha = 0;
            }
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;
            this.kImgPanel.source = "";
            this.mHintArr = [];
            this.mSelectIdx = -1;
            // this.mHintArr = this.calShowOrder(4);
        };
        /** 开始游戏 */
        StickSayNewView.prototype.onStart = function () {
            this.kComReplay.visible = false;
            this.kComAnswer.visible = false;
            this.mLock_startGame = false;
            this.hint();
        };
        /** 提示 */
        StickSayNewView.prototype.hint = function () {
            // show desc
            for (var i = 0; i < 4; i++) {
                egret.Tween.get(this["kImgBodyBtn" + i], { loop: true })
                    .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
            }
        };
        StickSayNewView.prototype.onSelect0 = function () { this.onSelect(0); };
        StickSayNewView.prototype.onSelect1 = function () { this.onSelect(1); };
        StickSayNewView.prototype.onSelect2 = function () { this.onSelect(2); };
        StickSayNewView.prototype.onSelect3 = function () { this.onSelect(3); };
        StickSayNewView.prototype.onSelect = function (n) {
            if (this.mSelectIdx != -1)
                return;
            this.mSelectIdx = n;
            for (var i = 0; i < 4; i++) {
                egret.Tween.removeTweens(this["kImgBodyBtn" + i]);
                this["kImgBodyBtn" + i].alpha = i == this.mSelectIdx ? 1 : 0.5;
                this["kImgFrame" + i].alpha = 1;
                egret.Tween.get(this["kImgFrame" + i], { loop: true })
                    .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
            }
            this["kImgBody" + this.mSelectIdx].visible = true;
        };
        StickSayNewView.prototype.onSelectCloth0 = function () { this.onSelectCloth(0); };
        StickSayNewView.prototype.onSelectCloth1 = function () { this.onSelectCloth(1); };
        StickSayNewView.prototype.onSelectCloth2 = function () { this.onSelectCloth(2); };
        StickSayNewView.prototype.onSelectCloth3 = function () { this.onSelectCloth(3); };
        StickSayNewView.prototype.onSelectCloth = function (n) {
            var _this = this;
            if (this.mSelectIdx == -1)
                return;
            if (this.isLock)
                return;
            this["kImgCoat" + n].visible = true;
            if (n == 3)
                this.kImgCoat1.visible = false;
            if (n == 1)
                this.kImgCoat3.visible = false;
            this.kImgPanel.source = "img_hint_panel_" + n + "_png";
            if (this.mHintArr.indexOf(n) == -1)
                this.mHintArr.push(n);
            if (this.mHintArr.length >= 4) {
                // 结束
                this.mLock_sound_select = true;
                XDFSoundManager.play("sound_desc_" + n + "_mp3", 0, 1, 1, "sound_desc_" + n + "_mp3", function () {
                    _this.mLock_sound_select = false;
                    _this.kComAnswer.visible = true;
                    _this.kComAnswer.playGood(null);
                    _this.kComReplay.visible = true;
                    _this.kComReplay.showReplay();
                });
            }
            else {
                // 继续游戏
                this.mLock_sound_select = true;
                XDFSoundManager.play("sound_desc_" + n + "_mp3", 0, 1, 1, "sound_desc_" + n + "_mp3", function () {
                    _this.mLock_sound_select = false;
                });
            }
        };
        /** 重新开始 */
        StickSayNewView.prototype.onReStart = function () {
            this.mLock_isFinish = false;
            this.reset();
            this.onStart();
        };
        /**
         *  初始化播放顺序
         * @param tarCount: 目标生成的数量
         */
        StickSayNewView.prototype.calShowOrder = function (tarCount) {
            var arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        };
        /** 生产随机队列 */
        StickSayNewView.prototype.produceOrderArr = function (arr, tarCount) {
            if (arr.length < tarCount) {
                var idx = Util.randomNum(0, tarCount - 1);
                if (arr.indexOf(idx) == -1) {
                    arr.push(idx);
                    if (arr.length < tarCount) {
                        this.produceOrderArr(arr, tarCount);
                    }
                }
                else {
                    this.produceOrderArr(arr, tarCount);
                }
            }
        };
        return StickSayNewView;
    }(eui.Component));
    game.StickSayNewView = StickSayNewView;
    __reflect(StickSayNewView.prototype, "game.StickSayNewView");
})(game || (game = {}));
//# sourceMappingURL=StickSayNewView.js.map