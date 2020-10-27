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
    var FollowSayView = (function (_super) {
        __extends(FollowSayView, _super);
        function FollowSayView() {
            var _this = _super.call(this) || this;
            _this.mHintWords = [
                "swimming",
                "sledding",
                "snow",
                "plants"
            ];
            _this.mOptionCount = 4;
            _this.mHintArr = [];
            _this.mCurHint = 0;
            _this.mLock_sound_select = false; // 操作锁 - 是否正在播放选中的声音
            _this.mLock_startGame = true; // 操作锁 - 是否开始了游戏
            _this.mLock_isFinish = false; // 操作锁 - 是否已经完成了一局
            _this.skinName = "FollowSayViewSkin";
            return _this;
        }
        Object.defineProperty(FollowSayView.prototype, "isLock", {
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
        FollowSayView.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            for (var i = 0; i < this.mOptionCount; i++) {
                this["kGrpOption" + i].mIdx = i;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.target.name == "option") {
                    _this.onMatch(e.target.mIdx);
                }
            }, this);
            // 初始化动画
            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("db_role_0", 8);
            this.mAnimRole0.setProtery({ x: 129, y: 102, parent: this.kGrpRoleAnim0, scaleX: 0.6, scaleY: 0.6 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("db_role_1");
            this.mAnimRole1.setProtery({ x: 129, y: 102, parent: this.kGrpRoleAnim1, scaleX: 0.6, scaleY: 0.6 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("db_role_2", 8);
            this.mAnimRole2.setProtery({ x: 129, y: 102, parent: this.kGrpRoleAnim2, scaleX: 0.6, scaleY: 0.6 });
            this.mAnimRole3 = XDFFrame.DBFactory.createAnim("db_role_3", 8);
            this.mAnimRole3.setProtery({ x: 129, y: 102, parent: this.kGrpRoleAnim3, scaleX: 0.6, scaleY: 0.6 });
            this.mAnimLine0 = XDFFrame.DBFactory.createAnim("db_line_0", 3);
            this.mAnimLine0.setProtery({ x: 960, y: 660, parent: this.kGrpAnimLine, scaleX: 0.9, scaleY: 1 });
            this.mAnimLine1 = XDFFrame.DBFactory.createAnim("db_line_1", 4);
            this.mAnimLine1.setProtery({ x: 810, y: 650, parent: this.kGrpAnimLine, scaleX: 0.9, scaleY: 1 });
            this.mAnimLine2 = XDFFrame.DBFactory.createAnim("db_line_2", 4);
            this.mAnimLine2.setProtery({ x: 960, y: 655, parent: this.kGrpAnimLine, scaleX: 0.9, scaleY: 1 });
            this.mAnimLine3 = XDFFrame.DBFactory.createAnim("db_line_3", 4);
            this.mAnimLine3.setProtery({ x: 1100, y: 650, parent: this.kGrpAnimLine, scaleX: 0.9, scaleY: 1 });
            this.init();
        };
        FollowSayView.prototype.init = function () {
            this.reset();
            this.kComReplay.visible = true;
            this.kComAnswer.visible = false;
            this.kComReplay.showStart();
        };
        /** 重置到初始化状态 */
        FollowSayView.prototype.reset = function () {
            for (var i = 0; i < this.mOptionCount; i++) {
                // 选项按钮相关
                egret.Tween.removeTweens(this["kGrpOption" + i]);
                this["kImgWordsBg" + i].source = "img_fs_bg4_png";
                this["kGrpOption" + i].scaleX = this["kGrpOption" + i].scaleY = 1;
                // 动画相关
                this["mAnimLine" + i].visible = false;
                // 顶部示意动画显示状态
                egret.Tween.removeTweens(this["kGrpRoleAnim" + i]);
                this["kGrpRoleAnim" + i].alpha = 1;
            }
            // 填词区域
            this.kLabel0.text = this.kLabel1.text = "";
            this.kImgFrameLine0.alpha = this.kImgFrameLine1.alpha = 0;
            egret.Tween.removeTweens(this.kImgFrameLine0);
            egret.Tween.removeTweens(this.kImgFrameLine1);
            this.mHintArr = this.calShowOrder(4);
        };
        /** 开始游戏 */
        FollowSayView.prototype.onStart = function () {
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.next();
        };
        /** 提示下一个 */
        FollowSayView.prototype.next = function () {
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
        FollowSayView.prototype.hint = function () {
            // sound
            XDFSoundManager.play("sound_desc_" + this.mCurHint + "_mp3");
            // 文字区域
            this.kLabel0.text = this.kLabel1.text = "";
            this.kImgFrameLine0.alpha = this.kImgFrameLine1.alpha = 0;
            egret.Tween.removeTweens(this.kImgFrameLine0);
            egret.Tween.removeTweens(this.kImgFrameLine1);
            if (this.mCurHint > 1) {
                egret.Tween.get(this.kImgFrameLine1, { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
            }
            else {
                egret.Tween.get(this.kImgFrameLine0, { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
            }
            for (var i = 0; i < this.mOptionCount; i++) {
                // 轨迹动画隐藏
                this["mAnimLine" + i].visible = false;
                this["mAnimRole" + i].stop();
                // 选项闪烁示意选择
                this["kImgWordsBg" + i].source = "img_fs_bg4_png";
                egret.Tween.removeTweens(this["kGrpOption" + i]);
                this["kGrpOption" + i].scaleX = this["kGrpOption" + i].scaleY = 1;
                this["kGrpRoleAnim" + this.mCurHint].alpha = 1;
                egret.Tween.get(this["kGrpOption" + i], { loop: true })
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 500, egret.Ease.cubicInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicInOut)
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 500, egret.Ease.cubicInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicInOut);
            }
            // 图像示意
            egret.Tween.removeTweens(this["kGrpRoleAnim" + this.mCurHint]);
            egret.Tween.get(this["kGrpRoleAnim" + this.mCurHint], { loop: true })
                .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut);
        };
        FollowSayView.prototype.onChoise0 = function () {
            this.onMatch(0);
        };
        FollowSayView.prototype.onChoise1 = function () {
            this.onMatch(1);
        };
        FollowSayView.prototype.onChoise2 = function () {
            this.onMatch(2);
        };
        FollowSayView.prototype.onChoise3 = function () {
            this.onMatch(3);
        };
        FollowSayView.prototype.onMatch = function (touch) {
            var _this = this;
            if (this.isLock)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 正确
                // stop picture anim
                this["mAnimRole" + this.mCurHint].play(null, 4);
                // 播声音
                XDFSoundManager.play("sound_stick_right_mp3");
                // 显示字
                if (this.mCurHint < 2) {
                    this.kLabel0.text = "" + this.mHintWords[this.mCurHint];
                    this.kLabel0.visible = true;
                }
                else {
                    this.kLabel1.text = "" + this.mHintWords[this.mCurHint];
                    this.kLabel1.visible = true;
                }
                this["kImgWordsBg" + this.mCurHint].source = "img_fs_bg6_png";
                // play mAnim
                this["mAnimLine" + this.mCurHint].visible = true;
                this["mAnimLine" + this.mCurHint].play(null, 1, function () {
                    XDFSoundManager.play("sound_desc_" + _this.mCurHint + "_mp3", 0, 1, 1, "sound_desc_" + _this.mCurHint + "_mp3", function () {
                        _this.mLock_sound_select = false;
                        _this.next();
                    });
                }, this);
                // 文字选项提示去除
                for (var i = 0; i < this.mOptionCount; i++) {
                    egret.Tween.removeTweens(this["kGrpOption" + i]);
                    this["kGrpOption" + i].scaleX = this["kGrpOption" + i].scaleY = 0.8;
                    egret.Tween.removeTweens(this["kGrpRoleAnim" + i]);
                    this["kGrpRoleAnim" + i].alpha = 1;
                }
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
        FollowSayView.prototype.onReStart = function () {
            this.mLock_isFinish = false;
            this.reset();
            this.next();
        };
        /**
         *  初始化播放顺序
         * @param tarCount: 目标生成的数量
         */
        FollowSayView.prototype.calShowOrder = function (tarCount) {
            var arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        };
        /** 生产随机队列 */
        FollowSayView.prototype.produceOrderArr = function (arr, tarCount) {
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
        return FollowSayView;
    }(eui.Component));
    game.FollowSayView = FollowSayView;
    __reflect(FollowSayView.prototype, "game.FollowSayView");
})(game || (game = {}));
//# sourceMappingURL=FollowSayView.js.map