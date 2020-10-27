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
    var StickSayView = (function (_super) {
        __extends(StickSayView, _super);
        function StickSayView() {
            var _this = _super.call(this) || this;
            _this.mHintArr = [];
            _this.mCurHint = 0;
            _this.mLock_sound_select = false; // 操作锁 - 是否正在播放选中的声音
            _this.mLock_startGame = true; // 操作锁 - 是否开始了游戏
            _this.mLock_isFinish = false; // 操作锁 - 是否已经完成了一局
            _this.mSmokeAnimPos = [{ x: 1360, y: 690 }, { x: 1380, y: 230 }, { x: 530, y: 220 }, { x: 505, y: 710 }];
            _this.skinName = "StickSayViewSkin";
            return _this;
        }
        Object.defineProperty(StickSayView.prototype, "isLock", {
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
        StickSayView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        StickSayView.prototype.init = function () {
            for (var i = 0; i < 4; i++) {
                this["kGrpBtn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onSelect" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.touchFlag, this.onChangeWordsPanelAction, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("db_role_0", 5);
            this.mAnimRole0.setProtery({ x: 1330, y: 800, parent: this.kGrpAnim0, scaleX: 0.65, scaleY: 0.65 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("db_role_1", 8);
            this.mAnimRole1.setProtery({ x: 1320, y: 320, parent: this.kGrpAnim1, scaleX: 1, scaleY: 1 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("db_role_2", 5);
            this.mAnimRole2.setProtery({ x: 600, y: 300, parent: this.kGrpAnim2, scaleX: 1.8, scaleY: 1.8 });
            this.mAnimRole3 = XDFFrame.DBFactory.createAnim("db_role_3", 8);
            this.mAnimRole3.setProtery({ x: 495, y: 805, parent: this.kGrpAnim3, scaleX: 1, scaleY: 1 });
            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGrpSmokeAnim, scaleX: 1.5, scaleY: 1.5 });
            // 单词
            this.kComWordsPanel.setData([
                {
                    words: "dog",
                    imgSrc: "img_ss_words_0_png",
                    soundSrc: "sound_words_0_mp3",
                }, {
                    words: "cat",
                    imgSrc: "img_ss_words_1_png",
                    soundSrc: "sound_words_1_mp3",
                }
            ]);
            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        };
        StickSayView.prototype.reset = function () {
            for (var i = 0; i < 4; i++) {
                this["kGrpTar" + i].visible = true;
                this["mAnimRole" + i].visible = false;
                this["kGrpBtn" + i].visible = true;
                this["kImgMask" + i].visible = true;
                this["kImgMaskLine" + i].visible = false;
                this["kImgDesc" + i].visible = false;
                egret.Tween.removeTweens(this["kImgMaskLine" + i]);
                egret.Tween.removeTweens(this["kImgDesc" + i]);
                this["kImgMask" + this.mCurHint].visible = true;
                this["kImgMaskLine" + this.mCurHint].visible = false;
            }
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;
            this.mHintArr = this.calShowOrder(4);
        };
        /** 开始游戏 */
        StickSayView.prototype.onStart = function () {
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.next();
        };
        /** 提示下一个 */
        StickSayView.prototype.next = function () {
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
        StickSayView.prototype.hint = function () {
            // sound
            XDFSoundManager.play("sound_desc_" + this.mCurHint + "_mp3");
            // play anim
            this["mAnimRole" + this.mCurHint].play(null, 0);
            // show desc
            this["kImgDesc" + this.mCurHint].scaleX = this["kImgDesc" + this.mCurHint].scaleY = 0;
            this["kImgDesc" + this.mCurHint].visible = true;
            egret.Tween.get(this["kImgDesc" + this.mCurHint]).to({ scaleX: 1.5, scaleY: 1.5 }, 500, egret.Ease.backOut);
            // head mask line
            this["kImgMask" + this.mCurHint].visible = this["kImgMaskLine" + this.mCurHint].visible = true;
            egret.Tween.removeTweens(this["kImgMaskLine" + this.mCurHint]);
            this["kImgMaskLine" + this.mCurHint].alpha = 1;
            egret.Tween.get(this["kImgMaskLine" + this.mCurHint], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
        };
        StickSayView.prototype.onSelect0 = function () {
            this.onMatch(0);
        };
        StickSayView.prototype.onSelect1 = function () {
            this.onMatch(1);
        };
        StickSayView.prototype.onSelect2 = function () {
            this.onMatch(2);
        };
        StickSayView.prototype.onSelect3 = function () {
            this.onMatch(3);
        };
        StickSayView.prototype.onMatch = function (touch) {
            var _this = this;
            if (this.isLock)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 正确
                // play anim
                this["kGrpTar" + this.mCurHint].visible = false;
                this["mAnimRole" + this.mCurHint].visible = true;
                this["mAnimRole" + this.mCurHint].play(null, 1);
                this["kGrpBtn" + this.mCurHint].visible = false;
                // hide desc
                this["kImgDesc" + this.mCurHint].visible = false;
                // hide head
                this["kImgMask" + this.mCurHint].visible = this["kImgMaskLine" + this.mCurHint].visible = false;
                egret.Tween.removeTweens(this["kImgMaskLine" + this.mCurHint]);
                this.mLock_sound_select = true;
                this.mAnimSmoke.x = this.mSmokeAnimPos[this.mCurHint].x;
                this.mAnimSmoke.y = this.mSmokeAnimPos[this.mCurHint].y;
                this.mAnimSmoke.play(null, 1);
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
        StickSayView.prototype.onReStart = function () {
            this.mLock_isFinish = false;
            this.reset();
            this.next();
        };
        /**
         *  初始化播放顺序
         * @param tarCount: 目标生成的数量
         */
        StickSayView.prototype.calShowOrder = function (tarCount) {
            var arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        };
        /** 生产随机队列 */
        StickSayView.prototype.produceOrderArr = function (arr, tarCount) {
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
        StickSayView.prototype.onChangeWordsPanelAction = function () {
            var _this = this;
            this.kComWordsPanel.visible = true;
            this.kComWordsPanel.playAction(function () {
                _this.kComWordsPanel.visible = !_this.kComWordsPanel.isHide;
            });
        };
        /** 点击是否要触发收回 */
        StickSayView.prototype.onTouch = function (e) {
            if (e.target.name == "flag")
                return;
            if (this.kComWordsPanel.visible) {
                if (e.stageX > 278)
                    this.onChangeWordsPanelAction();
            }
        };
        return StickSayView;
    }(eui.Component));
    game.StickSayView = StickSayView;
    __reflect(StickSayView.prototype, "game.StickSayView");
})(game || (game = {}));
//# sourceMappingURL=StickSayView.js.map