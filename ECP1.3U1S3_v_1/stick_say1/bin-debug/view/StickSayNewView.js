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
            _this.mCurHint = 0;
            _this.mLock_sound_select = false; // 操作锁 - 是否正在播放选中的声音
            _this.mLock_startGame = true; // 操作锁 - 是否开始了游戏
            _this.mLock_isFinish = false; // 操作锁 - 是否已经完成了一局
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
                this["kGrpBtn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onSelect" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.touchFlag, this.onChangeWordsPanelAction, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("db_role_0", 2);
            this.mAnimRole0.setProtery({ x: 875, y: 320, parent: this.kGrpAnim, scaleX: 0.35, scaleY: 0.35 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("db_role_1", 2);
            this.mAnimRole1.setProtery({ x: 1530, y: 305, parent: this.kGrpAnim, scaleX: 0.3, scaleY: 0.3 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("db_role_2", 2);
            this.mAnimRole2.setProtery({ x: 645, y: 780, parent: this.kGrpAnim, scaleX: 0.4, scaleY: 0.4 });
            this.mAnimRole3 = XDFFrame.DBFactory.createAnim("db_role_3", 2);
            this.mAnimRole3.setProtery({ x: 1250, y: 800, parent: this.kGrpAnim, scaleX: 0.6, scaleY: 0.6 });
            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGrpAnim, scaleX: 1.5, scaleY: 1.5 });
            // 单词
            this.kComWordsPanel.setData([
                {
                    words: "raincoat",
                    imgSrc: "img_words_0_png",
                    soundSrc: "sound_words_0_mp3",
                }, {
                    words: "sunglasses",
                    imgSrc: "img_words_1_png",
                    soundSrc: "sound_words_1_mp3",
                }, {
                    words: "sandals",
                    imgSrc: "img_words_2_png",
                    soundSrc: "sound_words_2_mp3",
                }
            ]);
            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        };
        StickSayNewView.prototype.reset = function () {
            for (var i = 0; i < 4; i++) {
                this["kGrpBtn" + i].visible = this["kGrpBtn" + i].includeInLayout = true;
                this["kImgMask" + i].visible = true;
                this["kImgMaskLine" + i].alpha = 0;
                this["kImgDesc" + i].scaleX = this["kImgDesc" + i].scaleY = 0;
                this["mAnimRole" + i].visible = false;
            }
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;
            this.mHintArr = this.calShowOrder(4);
        };
        /** 开始游戏 */
        StickSayNewView.prototype.onStart = function () {
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.next();
        };
        /** 提示下一个 */
        StickSayNewView.prototype.next = function () {
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
        StickSayNewView.prototype.hint = function () {
            // sound
            XDFSoundManager.play("sound_desc_" + this.mCurHint + "_mp3");
            // show desc
            this["kImgMaskLine" + this.mCurHint].alpha = 0;
            egret.Tween.get(this["kImgMaskLine" + this.mCurHint], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
        };
        StickSayNewView.prototype.onSelect0 = function () {
            this.onMatch(0);
        };
        StickSayNewView.prototype.onSelect1 = function () {
            this.onMatch(1);
        };
        StickSayNewView.prototype.onSelect2 = function () {
            this.onMatch(2);
        };
        StickSayNewView.prototype.onSelect3 = function () {
            this.onMatch(3);
        };
        StickSayNewView.prototype.onMatch = function (touch) {
            var _this = this;
            if (this.isLock)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 正确
                // 显示提示板
                egret.Tween.removeTweens(this["kImgDesc" + this.mCurHint]);
                egret.Tween.get(this["kImgDesc" + this.mCurHint]).to({
                    scaleX: 2, scaleY: 2
                }, 300, egret.Ease.backOut);
                // 播放动画
                this["mAnimRole" + this.mCurHint].visible = true;
                this["mAnimRole" + this.mCurHint].play(null, 1);
                // 清理重置蒙版和蒙版效果
                this["kImgMask" + this.mCurHint].visible = false;
                egret.Tween.removeTweens(this["kImgMaskLine" + this.mCurHint]);
                this["kImgMaskLine" + this.mCurHint].alpha = 0;
                this["kGrpBtn" + this.mCurHint].visible = false;
                // 播放烟雾
                this.mAnimSmoke.x = this.mSmokeAnimPos[this.mCurHint].x;
                this.mAnimSmoke.y = this.mSmokeAnimPos[this.mCurHint].y;
                this.mAnimSmoke.play(null, 1);
                this.mLock_sound_select = true;
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
                    XDFSoundManager.play("sound_desc_" + _this.mCurHint + "_mp3");
                });
            }
        };
        /** 重新开始 */
        StickSayNewView.prototype.onReStart = function () {
            this.mLock_isFinish = false;
            this.reset();
            this.next();
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
        /** 是否开始显示单词 */
        StickSayNewView.prototype.onChangeWordsPanelAction = function () {
            var _this = this;
            this.kComWordsPanel.visible = true;
            this.kComWordsPanel.playAction(function () {
                _this.kComWordsPanel.visible = !_this.kComWordsPanel.isHide;
            });
        };
        /** 点击是否要触发收回 */
        StickSayNewView.prototype.onTouch = function (e) {
            if (e.target.name == "flag")
                return;
            if (this.kComWordsPanel.visible) {
                if (e.stageX > 278)
                    this.onChangeWordsPanelAction();
            }
        };
        return StickSayNewView;
    }(eui.Component));
    game.StickSayNewView = StickSayNewView;
    __reflect(StickSayNewView.prototype, "game.StickSayNewView");
})(game || (game = {}));
//# sourceMappingURL=StickSayNewView.js.map