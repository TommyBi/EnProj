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
            this.kShirt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayShirt, this);
            this.kPants.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayPants, this);
            this.kGrpFlag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelAction, this);
            this.kImgReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRePlay, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            var _loop_1 = function (i) {
                this_1["kImgOption" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.onSelectOption(i);
                }, this_1);
            };
            var this_1 = this;
            // this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverReplayBtn, this);
            // this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutReplayBtn, this);
            for (var i = 0; i < 4; i++) {
                _loop_1(i);
            }
            this.kImgPanel.mask = this.kRectMaskPanel;
            this.kGrpFlag.mask = this.kRectMaskFlag;
            mouse.enable(this.stage);
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
            this.kImgReplay.visible = this.kComAnswer.visible = false;
            this.kComAnswer.visible = false;
        };
        MainView.prototype.initPanelStatus = function () {
            this.kGrpPanel.x = -76;
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
            var _this = this;
            if (this.mCurShowArr.length == 0) {
                // 游戏结束
                egret.setTimeout(function () {
                    _this.finish();
                }, this, 1000);
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
                egret.Tween.get(this.kGrpPanel).to({ x: -76 }, 600, egret.Ease.cubicInOut).call(function () {
                    _this.mIsShowPanel = false;
                    _this.mIsPlayFlodAction = false;
                });
            }
            else {
                // 展开
                egret.Tween.get(this.kGrpPanel).to({ x: 240 }, 600, egret.Ease.cubicInOut).call(function () {
                    _this.mIsShowPanel = true;
                    _this.mIsPlayFlodAction = false;
                });
            }
        };
        /** 点击事件 */
        MainView.prototype.onTouch = function (e) {
            if (e.target.parent && e.target.name != "kGrpPanel" && e.target.parent.name != "kGrpPanel" && this.mIsShowPanel) {
                // 点击空白区域，收起侧面板
                this.onPanelAction();
            }
        };
        /* 播放shirt */
        MainView.prototype.onPlayShirt = function () {
            XDFSoundManager.play("sound_shirt_mp3");
        };
        /* 播放pants */
        MainView.prototype.onPlayPants = function () {
            XDFSoundManager.play("sound_pants_mp3");
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
            }
        };
        MainView.prototype.playCorrectAction = function (cb) {
            XDFSoundManager.play("sound_tip_" + this.mCurHintIdx + "_mp3");
            egret.Tween.get(this["kImgTip" + this.mCurHintIdx]).to({ alpha: 1 }, 300);
            egret.Tween.get(this["kImgTip" + this.mCurHintIdx]).to({ scaleX: 1.5, scaleY: 1.5 }, 300, egret.Ease.backOut);
            this["kGrpMc" + this.mCurHintIdx].removeChildren();
            var mc = MovieClipComponent.produce("mc_action" + this.mCurHintIdx);
            this["kGrpMc" + this.mCurHintIdx].addChild(mc);
            mc.scaleX = mc.scaleY = 1.5;
            mc.bottom = 0;
            mc.horizontalCenter = 0;
            mc.play(2);
            var smokeMc = MovieClipComponent.produce("mc_cloud");
            this["kGrpMc" + this.mCurHintIdx].addChild(smokeMc);
            smokeMc.scaleX = smokeMc.scaleY = 1.5;
            smokeMc.bottom = 0;
            smokeMc.horizontalCenter = 0;
            smokeMc.play(1);
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
            this.kComAnswer.visible = true;
            this.kComAnswer.playGood(function () {
                _this.showReplay();
            });
        };
        /** 选错了 */
        MainView.prototype.oops = function () {
            var _this = this;
            this.kComAnswer.visible = true;
            this.touchEnabled = false;
            this.kComAnswer.playErr(function () {
                _this.touchEnabled = true;
                _this.kComAnswer.visible = false;
            });
        };
        /** 重新开始 */
        MainView.prototype.onRePlay = function () {
            egret.Tween.removeTweens(this.kImgReplay);
            this.init();
        };
        MainView.prototype.showReplay = function () {
            egret.Tween.removeTweens(this.kImgReplay);
            this.kImgReplay.scaleX = this.kImgReplay.scaleY = 1;
            this.kImgReplay.source = "img_replay_j_png";
            this.kImgReplay.visible = true;
            egret.Tween.get(this.kImgReplay, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut);
        };
        return MainView;
    }(eui.Component));
    game.MainView = MainView;
    __reflect(MainView.prototype, "game.MainView");
})(game || (game = {}));
//# sourceMappingURL=MainView.js.map