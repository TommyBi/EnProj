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
    var StickSay1View = (function (_super) {
        __extends(StickSay1View, _super);
        function StickSay1View() {
            var _this = _super.call(this) || this;
            _this.mHintArr = [];
            _this.mCurHint = 0;
            _this.mLock_sound_select = false; // 操作锁 - 是否正在播放选中的声音
            _this.mLock_startGame = true; // 操作锁 - 是否开始了游戏
            _this.mLock_isFinish = false; // 操作锁 - 是否已经完成了一局
            _this.mLock_isPlayHintSound = false; // 操作锁 - 是否正在播放提示选项的声音
            _this.skinName = "StickSay1ViewSkin";
            return _this;
        }
        Object.defineProperty(StickSay1View.prototype, "isLock", {
            get: function () {
                return this.mLock_sound_select ||
                    this.mLock_startGame ||
                    this.mLock_isFinish ||
                    this.mLock_isPlayHintSound ||
                    this.kComAnswer.visible;
            },
            enumerable: true,
            configurable: true
        });
        ;
        StickSay1View.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        StickSay1View.prototype.init = function () {
            for (var i = 0; i < 3; i++) {
                this["kGrpOption" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onSelect" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.touchFlag, this.onChangeWordsPanelAction, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("db_role_0");
            this.mAnimRole0.setProtery({ x: 750, y: 450, parent: this.kGrpAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("db_role_1");
            this.mAnimRole1.setProtery({ x: 1300, y: 350, parent: this.kGrpAnim, scaleX: 2, scaleY: 2 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("db_role_2");
            this.mAnimRole2.setProtery({ x: 800, y: 730, parent: this.kGrpAnim, scaleX: 2, scaleY: 2 });
            // 单词
            this.kComWordsPanel.setData([
                {
                    words: "camel",
                    imgSrc: "img_word_0_png",
                    soundSrc: "sound_words_camel_mp3",
                }, {
                    words: "cactus",
                    imgSrc: "img_word_1_png",
                    soundSrc: "sound_words_cactus_mp3",
                }, {
                    words: "oasis",
                    imgSrc: "img_word_2_png",
                    soundSrc: "sound_words_oasis_mp3",
                }
            ]);
            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        };
        StickSay1View.prototype.reset = function () {
            for (var i = 0; i < 3; i++) {
                this["kImgMask" + i].visible = true;
                this["kImgMaskLine" + i].visible = false;
                this["kImgMaskLineBig" + i].visible = false;
                this["kGrpOption" + i].visible = true;
                egret.Tween.removeTweens(this["kImgMaskLine" + i]);
                egret.Tween.removeTweens(this["kImgMaskLineBig" + i]);
            }
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;
            this.mHintArr = this.calShowOrder(3);
        };
        /** 开始游戏 */
        StickSay1View.prototype.onStart = function () {
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.next();
        };
        /** 提示下一个 */
        StickSay1View.prototype.next = function () {
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
        StickSay1View.prototype.hint = function () {
            var _this = this;
            // 提示音
            this.mLock_isPlayHintSound = true;
            XDFSoundManager.play("sound_ss_option" + this.mCurHint + "_mp3", 0, 1, 1, "sound_ss_option" + this.mCurHint + "_mp3", function () {
                _this.mLock_isPlayHintSound = false;
            });
            // 播放提示动画
            this["mAnimRole" + this.mCurHint].play(null, 4);
            // 显示提示效果
            this["kImgMaskLine" + this.mCurHint].visible = this["kImgMaskLineBig" + this.mCurHint].visible = true;
            egret.Tween.removeTweens(this["kImgMaskLine" + this.mCurHint]);
            egret.Tween.removeTweens(this["kImgMaskLineBig" + this.mCurHint]);
            this["kImgMaskLine" + this.mCurHint].alpha = this["kImgMaskLineBig" + this.mCurHint].alpha = 1;
            egret.Tween.get(this["kImgMaskLine" + this.mCurHint], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
            egret.Tween.get(this["kImgMaskLineBig" + this.mCurHint])
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
        };
        StickSay1View.prototype.onSelect0 = function () {
            this.onMatch(0);
        };
        StickSay1View.prototype.onSelect1 = function () {
            this.onMatch(1);
        };
        StickSay1View.prototype.onSelect2 = function () {
            this.onMatch(2);
        };
        StickSay1View.prototype.onMatch = function (touch) {
            var _this = this;
            if (this.isLock)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 正确
                egret.Tween.removeTweens(this["kImgMaskLine" + this.mCurHint]);
                egret.Tween.removeTweens(this["kImgMaskLineBig" + this.mCurHint]);
                this["kImgMaskLine" + this.mCurHint].alpha = 0;
                this["kImgMaskLineBig" + this.mCurHint].alpha = 1;
                this["kImgMask" + this.mCurHint].visible = false;
                this.mLock_sound_select = true;
                this["kGrpOption" + this.mCurHint].visible = false;
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                    _this.mLock_sound_select = false;
                    _this["kImgMaskLineBig" + _this.mCurHint].visible = false;
                    _this.next();
                });
            }
            else {
                // 错误
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    _this.mLock_isPlayHintSound = true;
                    XDFSoundManager.play("sound_ss_option" + _this.mCurHint + "_mp3", 0, 1, 1, "sound_ss_option" + _this.mCurHint + "_mp3", function () {
                        _this.mLock_isPlayHintSound = false;
                    });
                    _this["mAnimRole" + _this.mCurHint].play(null, 4);
                });
            }
        };
        /** 重新开始 */
        StickSay1View.prototype.onReStart = function () {
            this.mLock_isFinish = false;
            this.reset();
            this.next();
        };
        /**
         *  初始化播放顺序
         * @param tarCount: 目标生成的数量
         */
        StickSay1View.prototype.calShowOrder = function (tarCount) {
            var arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        };
        /** 生产随机队列 */
        StickSay1View.prototype.produceOrderArr = function (arr, tarCount) {
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
        /** 是否开始显示单词 */
        StickSay1View.prototype.onChangeWordsPanelAction = function () {
            var _this = this;
            this.kComWordsPanel.visible = true;
            this.kComWordsPanel.playAction(function () {
                _this.kComWordsPanel.visible = !_this.kComWordsPanel.isHide;
            });
        };
        /** 点击是否要触发收回 */
        StickSay1View.prototype.onTouch = function (e) {
            if (e.stageX >= this.kComReplay.x && e.stageX <= this.kComReplay.x + this.kComReplay.width
                && e.stageY >= this.kComReplay.y && e.stageY <= this.kComReplay.y + this.kComReplay.height) {
                return;
            }
            if (e.target.name == "flag")
                return;
            if (this.kComWordsPanel.visible) {
                if (e.stageX > 448)
                    this.onChangeWordsPanelAction();
            }
        };
        return StickSay1View;
    }(eui.Component));
    game.StickSay1View = StickSay1View;
    __reflect(StickSay1View.prototype, "game.StickSay1View");
})(game || (game = {}));
//# sourceMappingURL=StickSay1View.js.map