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
    var StickSay2View = (function (_super) {
        __extends(StickSay2View, _super);
        function StickSay2View() {
            var _this = _super.call(this) || this;
            _this.mHintArr = [];
            _this.mCurHint = 0;
            _this.mLock_sound_select = false; // 操作锁 - 是否正在播放选中的声音
            _this.mLock_startGame = true; // 操作锁 - 是否开始了游戏
            _this.mLock_isFinish = false; // 操作锁 - 是否已经完成了一局
            _this.skinName = "StickSay2ViewSkin";
            return _this;
        }
        Object.defineProperty(StickSay2View.prototype, "isLock", {
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
        StickSay2View.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        StickSay2View.prototype.init = function () {
            for (var i = 0; i < 3; i++) {
                this["kImgOption" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onSelect" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("db_role_0", 3);
            this.mAnimRole0.setProtery({ x: 1190, y: 330, parent: this.kGrpAnim, scaleX: 0.79, scaleY: 0.79 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("db_role_1", 5);
            this.mAnimRole1.setProtery({ x: 830, y: 200, parent: this.kGrpAnim, scaleX: 0.8, scaleY: 0.8 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("db_role_2", 3);
            this.mAnimRole2.setProtery({ x: 980, y: 760, parent: this.kGrpAnim, scaleX: 1.35, scaleY: 1.35 });
            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        };
        StickSay2View.prototype.reset = function () {
            for (var i = 0; i < 3; i++) {
                this["kGrpDesc" + i].visible = false;
                this["mAnimRole" + i].visible = false;
                this["kImgMask" + i].visible = true;
                this["kImgMaskLine" + i].visible = true;
                egret.Tween.removeTweens(this["kImgMaskLine" + i]);
            }
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;
            this.mHintArr = this.calShowOrder(3);
        };
        /** 开始游戏 */
        StickSay2View.prototype.onStart = function () {
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.next();
        };
        /** 提示下一个 */
        StickSay2View.prototype.next = function () {
            if (this.mHintArr.length <= 0) {
                // 完成
                this.mLock_isFinish = true;
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            }
            else {
                // 没完成
                this.mCurHint = this.mHintArr.shift();
                this.hint();
            }
        };
        /** 提示 */
        StickSay2View.prototype.hint = function () {
            // mask line
            this["kImgMask" + this.mCurHint].visible = this["kImgMaskLine" + this.mCurHint].visible = true;
            egret.Tween.removeTweens(this["kImgMaskLine" + this.mCurHint]);
            this["kImgMaskLine" + this.mCurHint].alpha = 1;
            egret.Tween.get(this["kImgMaskLine" + this.mCurHint], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
        };
        StickSay2View.prototype.onSelect0 = function () {
            this.onMatch(0);
        };
        StickSay2View.prototype.onSelect1 = function () {
            this.onMatch(1);
        };
        StickSay2View.prototype.onSelect2 = function () {
            this.onMatch(2);
        };
        StickSay2View.prototype.onMatch = function (touch) {
            var _this = this;
            if (this.isLock)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 正确
                // play anim
                this["mAnimRole" + this.mCurHint].visible = true;
                this["mAnimRole" + this.mCurHint].play(null, 4);
                // show desc
                this["kGrpDesc" + this.mCurHint].visible = true;
                // hide mask
                this["kImgMask" + this.mCurHint].visible = this["kImgMaskLine" + this.mCurHint].visible = false;
                egret.Tween.removeTweens(this["kImgMaskLine" + this.mCurHint]);
                this.mLock_sound_select = true;
                XDFSoundManager.play("sound_ss_option" + this.mCurHint + "_mp3");
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                    _this.mLock_sound_select = false;
                    _this.next();
                });
            }
            else {
                // 错误
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                });
            }
        };
        /** 重新开始 */
        StickSay2View.prototype.onReStart = function () {
            this.mLock_isFinish = false;
            this.reset();
            this.next();
        };
        /**
         *  初始化播放顺序
         * @param tarCount: 目标生成的数量
         */
        StickSay2View.prototype.calShowOrder = function (tarCount) {
            var arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        };
        /** 生产随机队列 */
        StickSay2View.prototype.produceOrderArr = function (arr, tarCount) {
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
        return StickSay2View;
    }(eui.Component));
    game.StickSay2View = StickSay2View;
    __reflect(StickSay2View.prototype, "game.StickSay2View");
})(game || (game = {}));
//# sourceMappingURL=StickSay2View.js.map