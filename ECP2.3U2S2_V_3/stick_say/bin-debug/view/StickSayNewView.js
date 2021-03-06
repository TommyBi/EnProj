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
            _this.mSmokeAnimPos = [{ x: 730, y: 200 }, { x: 1230, y: 200 }, { x: 750, y: 690 }];
            _this.mRolePos = [{ x: 830, y: 230 }, { x: 1150, y: 230 }, { x: 1470, y: 210 }];
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
            for (var i = 0; i < 3; i++) {
                this["kGrpBtn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onSelect" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            this.mAnimTeacher = XDFFrame.DBFactory.createAnim("db_teacher");
            this.mAnimTeacher.setProtery({ x: 550, y: 400, parent: this.kGrpTeacher, scaleX: 2, scaleY: 2 });
            this.mAnimTeacher.play();
            for (var i = 0; i < 3; i++) {
                this["mAnimRole" + i] = XDFFrame.DBFactory.createAnim("db_role_" + i);
                this["mAnimRole" + i].setProtery({ x: this.mRolePos[i].x, y: this.mRolePos[i].y, parent: this.kGrpAnim, scaleX: 1.5, scaleY: 1.5 });
                this["mAnimRole" + i].play();
            }
            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGrpAnim, scaleX: 2, scaleY: 2 });
            this.reset();
            this.mLock_startGame = true;
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        };
        StickSayNewView.prototype.reset = function () {
            for (var i = 0; i < 3; i++) {
                this["kGrpBtn" + i].visible = this["kGrpBtn" + i].includeInLayout = true;
                this["kImgMask" + i].visible = true;
                this["kImgMaskLine" + i].alpha = 0;
            }
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mLock_sound_select = false;
            this.mHintArr = this.calShowOrder(3);
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
        StickSayNewView.prototype.onMatch = function (touch) {
            var _this = this;
            if (this.isLock)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 清理重置蒙版和蒙版效果
                this["kImgMask" + this.mCurHint].visible = false;
                egret.Tween.removeTweens(this["kImgMaskLine" + this.mCurHint]);
                this["kImgMaskLine" + this.mCurHint].alpha = 0;
                this["kGrpBtn" + this.mCurHint].visible = false;
                // 播放烟雾
                this["mAnimRole" + this.mCurHint].play(null, 10);
                this.mAnimSmoke.x = this.mRolePos[this.mCurHint].x;
                this.mAnimSmoke.y = this.mRolePos[this.mCurHint].y;
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
        return StickSayNewView;
    }(eui.Component));
    game.StickSayNewView = StickSayNewView;
    __reflect(StickSayNewView.prototype, "game.StickSayNewView");
})(game || (game = {}));
//# sourceMappingURL=StickSayNewView.js.map