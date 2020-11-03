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
    var LookStickView = (function (_super) {
        __extends(LookStickView, _super);
        function LookStickView() {
            var _this = _super.call(this) || this;
            _this.mCurHintIdx = 0;
            _this.mHintArr = [];
            _this.mIsFinish = false;
            _this.mIsStart = false; // 是否开始游戏了
            _this.mSmokeAnimShowPos = [
                [1274, 400], [1724, 400], [1290, 885], [1724, 885]
            ];
            _this._canSelect = false;
            _this.skinName = "LookStickViewSkin";
            return _this;
        }
        Object.defineProperty(LookStickView.prototype, "canSelect", {
            get: function () {
                return this._canSelect;
            },
            set: function (b) {
                this._canSelect = b;
            },
            enumerable: true,
            configurable: true
        });
        ;
        LookStickView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        LookStickView.prototype.init = function () {
            for (var i = 0; i < 4; i++) {
                this["kGrpOption" + i].visible = this["kImgHintTarFrame" + i].visible = true; // 选项、hint
                egret.Tween.removeTweens(this["kImgFrame" + i]);
                egret.Tween.removeTweens(this["kImgHintTarFrame" + i]);
                this["kGrp" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["onSelect" + i], this);
            }
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGrpSmokeAnim, scaleX: 1, scaleY: 1 });
            this.reset();
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        };
        LookStickView.prototype.reset = function () {
            for (var i = 0; i < 4; i++) {
                this["kGrpOption" + i].visible = this["kImgHintTarFrame" + i].visible = true; // 选项、hint
                egret.Tween.removeTweens(this["kImgFrame" + i]);
                egret.Tween.removeTweens(this["kImgHintTarFrame" + i]);
                this["kGrpHead" + i].visible = false;
                this["kGrpTar" + this.mCurHintIdx].visible = true;
            }
            // 娃娃脸呼吸
            egret.Tween.removeTweens(this.kImgHappy);
            egret.Tween.removeTweens(this.kImgSad);
            this.calShowOrder();
            // 遮罩云动画
            this.kGrpSmokeAnim.visible = false;
            // 结果反馈
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.mIsFinish = false;
        };
        /** 提示下一个 */
        LookStickView.prototype.next = function () {
            if (this.mHintArr.length <= 0) {
                // 完成
                this.mIsFinish = true;
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            }
            else {
                // 没完成
                this.mCurHintIdx = this.mHintArr.shift();
                this.hint();
            }
        };
        /** 提示 */
        LookStickView.prototype.hint = function () {
            for (var i = 0; i < 4; i++) {
                egret.Tween.removeTweens(this["kImgHintTarFrame" + i]);
                egret.Tween.removeTweens(this["kImgFrame" + i]);
                this["kImgFrame" + i].alpha = 1;
                this["kImgHintTarFrame" + i].visible = false;
                egret.Tween.get(this["kImgFrame" + i], { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
            }
            // 笑脸处理
            egret.Tween.removeTweens(this.kImgHappy);
            egret.Tween.removeTweens(this.kImgSad);
            this.kImgHappy.alpha = this.kImgSad.alpha = 1;
            this.kImgHappy.scaleX = this.kImgHappy.scaleY = this.kImgSad.scaleX = this.kImgSad.scaleY = 1;
            var tarCom = this.mCurHintIdx == 0 || this.mCurHintIdx == 2 ? this.kImgHappy : this.kImgSad;
            egret.Tween.get(tarCom, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1, alpha: 0.7 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1, alpha: 0.7 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 800, egret.Ease.cubicInOut);
            XDFSoundManager.play("sound_lp_option" + this.mCurHintIdx + "_mp3");
            // 目标头像边框提示
            this["kImgHintTarFrame" + this.mCurHintIdx].visible = true;
            this["kImgHintTarFrame" + this.mCurHintIdx].alpha = 1;
            egret.Tween.get(this["kImgHintTarFrame" + this.mCurHintIdx], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
        };
        LookStickView.prototype.onSelect0 = function () {
            this.onMatch(0);
        };
        LookStickView.prototype.onSelect1 = function () {
            this.onMatch(1);
        };
        LookStickView.prototype.onSelect2 = function () {
            this.onMatch(2);
        };
        LookStickView.prototype.onSelect3 = function () {
            this.onMatch(3);
        };
        LookStickView.prototype.onMatch = function (touch) {
            var _this = this;
            if (!this.mIsStart)
                return;
            if (!this.canSelect)
                return;
            if (this.kComAnswer.visible)
                return;
            if (this.mIsFinish)
                return;
            if (touch == this.mCurHintIdx) {
                // 正确
                // play anim
                this["kGrpOption" + this.mCurHintIdx].visible = false;
                this["kGrpTar" + this.mCurHintIdx].visible = false;
                this["kGrpHead" + this.mCurHintIdx].visible = true;
                this.playSmokeAnim(this.mCurHintIdx);
                this.canSelect = false;
                XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", function () {
                    _this.canSelect = true;
                    _this.next();
                });
            }
            else {
                // 错误
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                    XDFSoundManager.play("sound_lp_option" + _this.mCurHintIdx + "_mp3");
                });
            }
        };
        /** 重新开始 */
        LookStickView.prototype.onReStart = function () {
            this.reset();
            this.next();
        };
        /** 开始游戏 */
        LookStickView.prototype.onStart = function () {
            this.mIsStart = true;
            this.kComReplay.visible = false;
            this.canSelect = true;
            this.next();
        };
        /** 初始化播放顺序 */
        LookStickView.prototype.calShowOrder = function () {
            this.mHintArr = [];
            this.produceOrderArr();
        };
        /** 生产随机队列 */
        LookStickView.prototype.produceOrderArr = function () {
            if (this.mHintArr.length < 4) {
                var idx = Util.randomNum(0, 3);
                if (this.mHintArr.indexOf(idx) == -1) {
                    this.mHintArr.push(idx);
                    if (this.mHintArr.length < 4) {
                        this.produceOrderArr();
                    }
                }
                else {
                    this.produceOrderArr();
                }
            }
        };
        LookStickView.prototype.playSmokeAnim = function (posIdx) {
            var _this = this;
            this.kGrpSmokeAnim.x = this.mSmokeAnimShowPos[posIdx][0];
            this.kGrpSmokeAnim.y = this.mSmokeAnimShowPos[posIdx][1];
            this.kGrpSmokeAnim.visible = true;
            this.mAnimSmoke.play(null, 1, function () {
                _this.kGrpSmokeAnim.visible = false;
            }, this);
        };
        return LookStickView;
    }(eui.Component));
    game.LookStickView = LookStickView;
    __reflect(LookStickView.prototype, "game.LookStickView");
})(game || (game = {}));
