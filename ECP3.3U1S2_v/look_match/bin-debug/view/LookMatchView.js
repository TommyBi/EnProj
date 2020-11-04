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
    var LookMatchView = (function (_super) {
        __extends(LookMatchView, _super);
        function LookMatchView() {
            var _this = _super.call(this) || this;
            _this.mIsLock = false; // 是否上锁
            _this.mCurSelectIdx = -1; // 当前选中的起始位置
            _this.mHintOrder = []; // 提示的顺序
            _this.mCurHint = -1; // 当前正在提示的内容
            _this._mCurPenIdx = -1; // 当前选择的笔
            _this.skinName = "LookMatchViewSkin";
            return _this;
        }
        Object.defineProperty(LookMatchView.prototype, "mCurPenIdx", {
            get: function () { return this._mCurPenIdx; },
            set: function (n) {
                this._mCurPenIdx = n;
                if (this._mCurPenIdx == -1) {
                    // 铅笔组件
                    for (var i = 0; i < 4; i++) {
                        egret.Tween.removeTweens(this["kGrpPen" + i]);
                        this["kGrpPen" + i].alpha = 1;
                        egret.Tween.get(this["kGrpPen" + i], { loop: true })
                            .to({ alpha: 0.8 }, 300, egret.Ease.cubicInOut)
                            .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                            .to({ alpha: 0.8 }, 300, egret.Ease.cubicInOut)
                            .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
                    }
                }
                else {
                    for (var i = 0; i < 4; i++) {
                        egret.Tween.removeTweens(this["kGrpPen" + i]);
                        this["kGrpPen" + i].alpha = i == this._mCurPenIdx ? 1 : 0.5;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        LookMatchView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            for (var i = 0; i < 4; i++) {
                this["kGrpPen" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this["selectPen" + i], this);
            }
            this.init();
        };
        LookMatchView.prototype.init = function () {
            this.onReset();
            this.mCurPenIdx = -1;
            this.kComAnswer.visible = false;
            this.kComReplay.visible = true;
            this.kImgArrow0.visible = this.kImgArrow1.visible = this.kImgArrow2.visible = false;
            this.kImgArrowStatic0.visible = this.kImgArrowStatic1.visible = this.kImgArrowStatic2.visible = false;
            this.kComReplay.showStart();
            this.mHintOrder = XDFFrame.utilFunc.calShowOrder(3);
        };
        /* 重置状态 */
        LookMatchView.prototype.onReset = function () {
            // 红色遮罩状态
            for (var i = 0; i < 3; i++) {
                egret.Tween.removeTweens(this["kImgMask" + i]);
                this["kImgMask" + i].alpha = 0;
            }
            this.kImgPen.visible = false;
            this.mCurSelectIdx = -1;
        };
        LookMatchView.prototype.onReStart = function () {
            this.kComReplay.visible = false;
            this.kComAnswer.visible = false;
            this.kImgArrow0.visible = this.kImgArrow1.visible = this.kImgArrow2.visible = false;
            this.kImgArrowStatic0.visible = this.kImgArrowStatic1.visible = this.kImgArrowStatic2.visible = false;
            this.onReset();
            this.mHintOrder = XDFFrame.utilFunc.calShowOrder(3);
            this.next();
        };
        LookMatchView.prototype.onStart = function () {
            this.kComReplay.visible = false;
            this.kComAnswer.visible = false;
            this.next();
        };
        LookMatchView.prototype.onTouchBegin = function (e) {
            if (this.mIsLock)
                return;
            if (this.mCurPenIdx == -1)
                return;
            if (this.mCurSelectIdx == -1) {
                var idx = this.getTargetPoint(e.stageX, e.stageY);
                if (idx == -1)
                    return;
                if (idx != this.mCurHint)
                    return;
                this.mCurSelectIdx = idx;
            }
        };
        LookMatchView.prototype.onMove = function (e) {
            if (this.mIsLock)
                return;
            if (this.mCurSelectIdx == -1)
                return;
            this.kImgPen.visible = true;
            this.kImgPen.x = e.stageX;
            this.kImgPen.y = e.stageY;
            this["kImgArrow" + this.mCurSelectIdx].visible = true;
            this["kImgArrow" + this.mCurSelectIdx].x = this["kGrpStart" + this.mCurSelectIdx].x + 50;
            this["kImgArrow" + this.mCurSelectIdx].y = this["kGrpStart" + this.mCurSelectIdx].y + 50;
            // 计算长度
            var dtX = Math.abs(this.kImgPen.x - this["kImgArrow" + this.mCurSelectIdx].x);
            var dtY = Math.abs(this.kImgPen.y - this["kImgArrow" + this.mCurSelectIdx].y);
            var length = Math.sqrt(dtX * dtX + dtY * dtY);
            this["kImgArrow" + this.mCurSelectIdx].width = length > 150 ? length : 150;
            this["kImgArrow" + this.mCurSelectIdx].width += 30;
            // 计算夹角
            var angle = 360 * Math.atan(dtY / dtX) / (2 * Math.PI);
            this["kImgArrow" + this.mCurSelectIdx].rotation = this.kImgPen.y < this["kImgArrow" + this.mCurSelectIdx].y ? -angle : angle;
        };
        LookMatchView.prototype.onTouchEnd = function (e) {
            var _this = this;
            if (this.mIsLock)
                return;
            if (this.mCurPenIdx == -1)
                return;
            if (this.mCurSelectIdx == -1)
                return;
            var idx = this.getTargetPoint(e.stageX, e.stageY);
            this.kImgPen.visible = this["kImgArrow" + this.mCurSelectIdx].visible = false;
            if (idx == -1) {
                // 没有匹配项
                this.mCurSelectIdx == -1;
            }
            else {
                // 判断是不是对应的匹配项
                if (idx == this.mCurSelectIdx) {
                    this.mIsLock = true;
                    this["kImgArrowStatic" + this.mCurSelectIdx].visible = true;
                    XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "sound_stick_right_mp3", function () {
                        _this.next();
                    });
                }
                else {
                    this.kComAnswer.visible = true;
                    this.kComAnswer.playErr(function () {
                        _this.kComAnswer.visible = false;
                        XDFSoundManager.play("sound_ss_option" + _this.mCurHint + "_mp3");
                    });
                }
            }
        };
        LookMatchView.prototype.getTargetPoint = function (x, y) {
            if (this.mCurSelectIdx == -1) {
                // 检测起始点
                for (var i = 0; i < 3; i++) {
                    if (x >= this["kGrpStart" + i].x && x <= this["kGrpStart" + i].x + 100 && y >= this["kGrpStart" + i].y && y <= this["kGrpStart" + i].y + 100) {
                        return i;
                    }
                }
            }
            else {
                // 检测的是终点
                for (var i = 0; i < 3; i++) {
                    if (x >= this["kGrpTar" + i].x && x <= this["kGrpTar" + i].x + 100 && y >= this["kGrpTar" + i].y && y <= this["kGrpTar" + i].y + 100) {
                        return i;
                    }
                }
            }
            return -1;
        };
        LookMatchView.prototype.next = function () {
            var _this = this;
            if (this.mHintOrder.length <= 0) {
                // 结束游戏
                this.onReset();
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            }
            else {
                this.mCurHint = this.mHintOrder.shift();
                XDFSoundManager.play("sound_ss_option" + this.mCurHint + "_mp3", 0, 1, 1, "sound_ss_option" + this.mCurHint + "_mp3", function () {
                    _this.mIsLock = false;
                });
                this.onReset();
                this["kImgMask" + this.mCurHint].alpha = 1;
                egret.Tween.get(this["kImgMask" + this.mCurHint], { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
            }
        };
        LookMatchView.prototype.selectPen = function (idx, e) {
            if (this.mIsLock)
                return;
            this.mCurPenIdx = idx;
            this.kImgPen.source = "img_lm_pencil_" + this.mCurPenIdx + "_png";
            this["kImgArrow" + this.mCurHint].source = "img_lm_arr" + this.mCurPenIdx + "_png";
            this["kImgArrowStatic" + this.mCurHint].source = "img_lm_arr" + this.mCurPenIdx + "_png";
            this.kImgPen.x = e.stageX;
            this.kImgPen.y = e.stageY;
        };
        LookMatchView.prototype.selectPen0 = function (e) { this.selectPen(0, e); };
        LookMatchView.prototype.selectPen1 = function (e) { this.selectPen(1, e); };
        LookMatchView.prototype.selectPen2 = function (e) { this.selectPen(2, e); };
        LookMatchView.prototype.selectPen3 = function (e) { this.selectPen(3, e); };
        return LookMatchView;
    }(eui.Component));
    game.LookMatchView = LookMatchView;
    __reflect(LookMatchView.prototype, "game.LookMatchView");
})(game || (game = {}));
//# sourceMappingURL=LookMatchView.js.map