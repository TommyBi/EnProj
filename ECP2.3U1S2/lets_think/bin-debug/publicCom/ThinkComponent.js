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
    /**
     * ThinkComponent
     * think 翻卡牌环节 中 每一个翻动的组件
     */
    var ThinkComponent = (function (_super) {
        __extends(ThinkComponent, _super);
        function ThinkComponent(idx, word, skinType) {
            var _this = _super.call(this) || this;
            _this.mIsRolling = false; // 是否正在翻滚
            _this.mIsMoving = false; // 是否正在移动过程中
            _this.mIdx = 0;
            _this.mWord = "";
            _this._show = false; // 当前是否正在显示think组件
            _this.mIsBack = true; // 当前卡牌是否是背面
            _this.mSkinType = 0;
            _this.skinName = "ThinkComponentSkin";
            _this.mIdx = idx;
            _this.mWord = word;
            _this.mSkinType = skinType;
            return _this;
        }
        Object.defineProperty(ThinkComponent.prototype, "isShow", {
            get: function () {
                return this._show;
            },
            set: function (b) {
                var _this = this;
                if (this.mIsMoving)
                    return;
                egret.Tween.removeTweens(this.kGrpWord);
                if (b) {
                    // 显示
                    this.kGrpWord.x = -330;
                    this.mIsMoving = true;
                    this._show = true;
                    this.kImgArrow.scaleX = -1;
                    this.kGrpWordStatic.visible = false;
                    this.kGrpWord.visible = true;
                    egret.Tween.get(this.kGrpWord).to({ x: 13 }, 500, egret.Ease.cubicInOut).call(function () {
                        _this.mIsMoving = false;
                    });
                }
                else {
                    // 隐藏
                    this.kGrpWord.x = 13;
                    this.mIsMoving = true;
                    this._show = false;
                    this.kImgArrow.scaleX = 1;
                    egret.Tween.get(this.kGrpWord).to({ x: -330 }, 500, egret.Ease.cubicInOut).call(function () {
                        _this.mIsMoving = false;
                        _this.kGrpWord.visible = false;
                        _this.kGrpWordStatic.visible = true;
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        ThinkComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.kImgArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowWord, this);
            this.kImgArrow0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowWord, this);
            this.kImgSound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlaySound, this);
            this.kGrpBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchToll, this);
            this.kGrpWord.mask = this.kImgMask;
            this.init();
        };
        ThinkComponent.prototype.init = function () {
            this.kGrpWord.x = -330;
            this.mIsMoving = false;
            this._show = false;
            this.kImgArrow.scaleX = 1;
            this.mIsBack = true;
            this.kImgSound.visible = this.kGrpWord.visible = false;
            this.kImgCard.source = "img_think_bg" + this.mSkinType + "_png";
            ;
            this.kLabelWord.text = this.mWord;
            this.kGrpWordStatic.visible = false;
            this.kGrpWord.visible = false;
        };
        /** 显示字体 */
        ThinkComponent.prototype.onShowWord = function () {
            if (this.isShow) {
                this.isShow = false;
            }
            else {
                this.isShow = true;
            }
        };
        /** 播放声音 */
        ThinkComponent.prototype.onPlaySound = function () {
            XDFSoundManager.play("sound_thinkCard_" + this.mIdx + "_mp3");
        };
        /** 翻滚 */
        ThinkComponent.prototype.onTouchToll = function () {
            var _this = this;
            if (this.mIsRolling)
                return;
            XDFSoundManager.play("sound_think_choise_mp3");
            egret.Tween.removeTweens(this.kGrpMain);
            egret.Tween.get(this.kGrpMain).to({ scaleX: 0 }, 200).call(function () {
                if (_this.mIsBack) {
                    _this.mIsBack = false;
                    _this.kImgSound.visible = true;
                    _this.kGrpWord.visible = _this.isShow;
                    _this.kGrpWordStatic.visible = !_this.isShow;
                    _this.kImgCard.source = "img_think_pic" + _this.mIdx + "_png";
                }
                else {
                    _this.mIsBack = true;
                    _this.kImgSound.visible = _this.kGrpWord.visible = _this.kGrpWordStatic.visible = false;
                    _this.kImgCard.source = "img_think_bg" + _this.mSkinType + "_png";
                }
                egret.Tween.get(_this.kGrpMain).to({ scaleX: 1 }, 200);
            });
        };
        return ThinkComponent;
    }(eui.Component));
    game.ThinkComponent = ThinkComponent;
    __reflect(ThinkComponent.prototype, "game.ThinkComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=ThinkComponent.js.map