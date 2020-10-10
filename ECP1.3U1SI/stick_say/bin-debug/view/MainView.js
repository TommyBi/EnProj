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
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this.mCurShowArr = []; // 当前显示的顺序
            _this.mCurHintIdx = 0; // 当前正在提示的索引
            _this.mIsHintStatus = false; // 当前是否正在为提示状态
            _this.mIsPlayFlodAction = false; // 是否正在播放伸展的动作
            _this.mIsShowPanel = true; // 当前是否正在显示面板
            _this.skinName = "MainViewSkin";
            return _this;
        }
        ;
        MainView.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            this.kGrpShirt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayShirt, this);
            this.kGrpPants.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayPants, this);
            this.kGrpFlag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelAction, this);
            this.kImgReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRePlay, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            var _loop_1 = function (i) {
                this_1["kImgOption" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.onSelectOption(i);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < 4; i++) {
                _loop_1(i);
            }
            this.init();
        };
        MainView.prototype.init = function () {
            this.initView();
            this.initShowOrder();
            this.hint();
            this.playFlagAction();
        };
        MainView.prototype.initView = function () {
            for (var i = 0; i < 4; i++) {
                this["kImgShadow" + i].source = "img_shadow_" + i + "_0_png";
                this["kImgShadow" + i].visible = true;
                this["kImgTip" + i].alpha = 0;
                this["kImgTip" + i].scaleX = this["kImgTip" + i].scaleY = 0;
                this["kImgOption" + i].source = "img_action_" + i + "_png";
                this["kImgOption" + i].visible = true;
                this["kGrpMc" + i].removeChildren();
            }
            this.initPanelStatus();
            this.kImgReplay.visible = this.kImgGood.visible = this.kImgErr.visible = false;
        };
        MainView.prototype.initPanelStatus = function () {
            this.kGrpPanel.x = -330;
            this.mIsShowPanel = false;
            this.mIsPlayFlodAction = false;
        };
        /** 初始化播放顺序 */
        MainView.prototype.initShowOrder = function () {
            this.mCurShowArr = [];
            this.produceOrderArr();
            console.log("队列是：", this.mCurShowArr.toString());
        };
        /** 播放旗帜效果 */
        MainView.prototype.playFlagAction = function () {
            if (this.mMcFlag) {
                this.mMcFlag.play(-1);
            }
            else {
                this.mMcFlag = MovieClipComponent.produce("mc_flag");
                this.kGrpFlag.addChildAt(this.mMcFlag, 0);
                this.mMcFlag.x = 175;
                this.mMcFlag.y = 90;
                this.mMcFlag.play(-1);
            }
        };
        /** 开始逐个提示效果 */
        MainView.prototype.hint = function () {
            if (this.mCurShowArr.length == 0) {
                // 游戏结束
                this.finish();
            }
            else {
                this.mIsHintStatus = true;
                this.mCurHintIdx = this.mCurShowArr.shift();
                this.hintShadow();
            }
        };
        /** 提示当前应该显示的阴影 */
        MainView.prototype.hintShadow = function () {
            this.clearShadowTween();
            this.playHint(1);
        };
        /**
         * 循环提示
         * @param status : number 0||1 表示显示状态的索引标识
         */
        MainView.prototype.playHint = function (status) {
            var _this = this;
            egret.Tween.get(this["kImgShadow" + this.mCurHintIdx]).wait(300).call(function () {
                if (_this.mIsHintStatus) {
                    _this["kImgShadow" + _this.mCurHintIdx].source = "img_shadow_" + _this.mCurHintIdx + "_" + status + "_png";
                    _this["kImgShadow" + _this.mCurHintIdx].visible = true;
                    _this.playHint(status == 1 ? 0 : 1);
                }
            });
        };
        /** 清理提示缓动动画状态 */
        MainView.prototype.clearShadowTween = function () {
            egret.Tween.removeTweens(this.kImgShadow0);
            egret.Tween.removeTweens(this.kImgShadow1);
            egret.Tween.removeTweens(this.kImgShadow2);
            egret.Tween.removeTweens(this.kImgShadow3);
        };
        /** 折叠侧板 */
        MainView.prototype.onPanelAction = function () {
            var _this = this;
            if (this.mIsPlayFlodAction)
                return;
            this.mIsPlayFlodAction = true;
            if (this.mIsShowPanel) {
                // 收
                egret.Tween.get(this.kGrpPanel).to({ x: -330 }, 600, egret.Ease.cubicInOut).call(function () {
                    _this.mIsShowPanel = false;
                    _this.mIsPlayFlodAction = false;
                });
            }
            else {
                // 展开
                egret.Tween.get(this.kGrpPanel).to({ x: -30 }, 600, egret.Ease.cubicInOut).call(function () {
                    _this.mIsShowPanel = true;
                    _this.mIsPlayFlodAction = false;
                });
            }
        };
        /** 点击事件 */
        MainView.prototype.onTouch = function (e) {
            console.log("touch :" + e.target.source);
            if (e.target.name != "kGrpFlag" && e.target.name != "kGrpPanel" && this.mIsShowPanel) {
                // 点击空白区域，收起侧面板
                this.onPanelAction();
            }
        };
        /* 播放shirt */
        MainView.prototype.onPlayShirt = function () {
        };
        /* 播放pants */
        MainView.prototype.onPlayPants = function () {
        };
        /** 生产随机队列 */
        MainView.prototype.produceOrderArr = function () {
            if (this.mCurShowArr.length < 4) {
                var idx = Util.randomNum(0, 3);
                if (this.mCurShowArr.indexOf(idx) == -1) {
                    this.mCurShowArr.push(idx);
                    if (this.mCurShowArr.length < 4) {
                        this.produceOrderArr();
                    }
                }
                else {
                    this.produceOrderArr();
                }
            }
        };
        /** 选择目标选项 */
        MainView.prototype.onSelectOption = function (idx) {
            var _this = this;
            if (idx == this.mCurHintIdx) {
                // hint next
                this.playCorrectAction(function () {
                    _this.hintNext();
                });
            }
            else {
                // choose err
                this.oops();
                XDFSoundManager.play("sound_oopstryagain_mp3");
            }
        };
        MainView.prototype.playCorrectAction = function (cb) {
            XDFSoundManager.play("sound_goodjob_mp3");
            egret.Tween.get(this["kImgTip" + this.mCurHintIdx]).to({ alpha: 1 }, 300);
            egret.Tween.get(this["kImgTip" + this.mCurHintIdx]).to({ scaleX: 2, scaleY: 2 }, 300, egret.Ease.backOut);
            this["kGrpMc" + this.mCurHintIdx].removeChildren();
            var mc = MovieClipComponent.produce("mc_action" + this.mCurHintIdx);
            this["kGrpMc" + this.mCurHintIdx].addChild(mc);
            mc.x = mc.y = 100;
            mc.scaleX = mc.scaleY = 2;
            mc.play(2);
            cb && cb();
        };
        MainView.prototype.hintNext = function () {
            this.clearShadowTween();
            this.mIsHintStatus = false;
            this["kImgOption" + this.mCurHintIdx].visible = false;
            this["kImgShadow" + this.mCurHintIdx].visible = false;
            // this[`kImgShadow${this.mCurHintIdx}`].source = `img_action_color_${this.mCurHintIdx}_png`;
            this.hint();
        };
        /** 完成 */
        MainView.prototype.finish = function () {
            var _this = this;
            egret.Tween.removeTweens(this.kImgGood);
            this.kImgGood.scaleX = this.kImgGood.scaleY = 5;
            this.kImgGood.visible = true;
            this.kImgGood.rotation = 0;
            egret.Tween.get(this.kImgGood).to({ rotation: 700, scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicIn).call(function () {
                _this.showReplay();
            });
        };
        /** 选错了 */
        MainView.prototype.oops = function () {
            var _this = this;
            egret.Tween.removeTweens(this.kImgErr);
            this.kImgErr.scaleX = this.kImgErr.scaleY = 5;
            this.kImgErr.visible = true;
            egret.Tween.get(this.kImgErr).to({ rotation: 700, scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicIn).wait(1000).call(function () {
                _this.kImgErr.visible = false;
            });
        };
        /** 重新开始 */
        MainView.prototype.onRePlay = function () {
            egret.Tween.removeTweens(this.kImgReplay);
            this.init();
        };
        MainView.prototype.showReplay = function () {
            egret.Tween.removeTweens(this.kImgReplay);
            this.kImgReplay.x = this.kImgReplay.y = 100;
            this.kImgReplay.scaleX = this.kImgReplay.scaleY = 4;
            this.kImgReplay.visible = true;
            egret.Tween.get(this.kImgReplay, { loop: true })
                .to({ scaleX: 4.2, scaleY: 4.2 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 4, scaleY: 4 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 4.2, scaleY: 4.2 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 4, scaleY: 4 }, 300, egret.Ease.cubicInOut);
        };
        return MainView;
    }(eui.Component));
    game.MainView = MainView;
    __reflect(MainView.prototype, "game.MainView");
})(game || (game = {}));
//# sourceMappingURL=MainView.js.map