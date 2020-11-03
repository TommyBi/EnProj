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
     * WordsPanelCom
     * 左侧滑动出来的单词组件
     */
    var WordsPanelCom = (function (_super) {
        __extends(WordsPanelCom, _super);
        function WordsPanelCom() {
            var _this = _super.call(this) || this;
            _this.mIsMoving = false;
            _this.skinName = "WordsPanelComSkin";
            return _this;
        }
        WordsPanelCom.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            egret.Tween.removeTweens(this.kGrpMain);
            this.kGrpMain.x = -310;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        WordsPanelCom.prototype.setData = function (cfg) {
            if (cfg === void 0) { cfg = []; }
            this.kGrpWords.removeChildren();
            for (var i = 0; i < cfg.length; i++) {
                var wordsCom = new game.PreWordsCom();
                this.kGrpWords.addChild(wordsCom);
                wordsCom.setData(cfg[i]);
            }
        };
        WordsPanelCom.prototype.onClick = function () {
            this.hide();
        };
        WordsPanelCom.prototype.hide = function (cb) {
            var _this = this;
            if (this.kGrpMain.x > 0) {
                // 收
                this.kGrpMain.x = 0;
                egret.Tween.get(this.kGrpMain).to({ x: -310 }, 500, egret.Ease.cubicInOut).call(function () {
                    _this.mIsMoving = false;
                    if (cb)
                        cb();
                });
            }
        };
        WordsPanelCom.prototype.playAction = function (cb) {
            var _this = this;
            if (this.mIsMoving)
                return;
            this.mIsMoving = true;
            egret.Tween.removeTweens(this.kGrpMain);
            if (this.kGrpMain.x > 0) {
                // 收
                // this.kGrpMain.x = 0;
                // egret.Tween.get(this.kGrpMain).to({ x: -310 }, 800, egret.Ease.cubicInOut).call(() => {
                //     this.mIsMoving = false;
                //     cb && cb();
                // })
                this.hide();
            }
            else {
                // 展开
                this.kGrpMain.x = -310;
                egret.Tween.get(this.kGrpMain).to({ x: 3 }, 500, egret.Ease.cubicInOut).call(function () {
                    _this.mIsMoving = false;
                    cb && cb();
                });
            }
        };
        return WordsPanelCom;
    }(eui.Component));
    game.WordsPanelCom = WordsPanelCom;
    __reflect(WordsPanelCom.prototype, "game.WordsPanelCom", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
