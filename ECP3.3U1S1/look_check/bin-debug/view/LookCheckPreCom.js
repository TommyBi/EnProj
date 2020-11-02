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
     * LookCheckPreCom
     */
    var LookCheckPreCom = (function (_super) {
        __extends(LookCheckPreCom, _super);
        function LookCheckPreCom() {
            var _this = _super.call(this) || this;
            _this.mIsActive = false;
            _this.mCfg = [
                {
                    desc0: "I always go sledding.",
                    desc1: "I always go swimming.",
                    correct: 1
                }, {
                    desc0: "My house is made of snow.",
                    desc1: "My house is made of plants.",
                    correct: 0
                }, {
                    desc0: "I always go sledding.",
                    desc1: "I always go swimming.",
                    correct: 0
                }, {
                    desc0: "My house is made of snow.",
                    desc1: "My house is made of plants.",
                    correct: 1
                }
            ];
            _this.skinName = "LookCheckPreComSkin";
            return _this;
        }
        LookCheckPreCom.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.kGrp0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch0, this);
            this.kGrp1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch1, this);
        };
        LookCheckPreCom.prototype.init = function (idx) {
            this.mIdx = idx;
            this.kImg.source = "img_lc_panel_" + idx + "_png";
            this.kImgLine.visible = false;
            var animIdx = idx;
            if (animIdx == 1)
                animIdx = 2;
            if (animIdx == 2)
                animIdx = 1;
            this.mAnimRole = XDFFrame.DBFactory.createAnim("db_role_" + animIdx);
            this.mAnimRole.setProtery({ x: 230, y: 180, parent: this.kGrpAnim, scaleX: 2.5, scaleY: 2.5 });
            this.reset();
        };
        /** 选择了第一个 */
        LookCheckPreCom.prototype.onTouch0 = function () {
            this.onMatch(0);
        };
        /** 选择了第二个 */
        LookCheckPreCom.prototype.onTouch1 = function () {
            this.onMatch(1);
        };
        LookCheckPreCom.prototype.onMatch = function (idx) {
            if (!this.mIsActive)
                return;
            var cfg = this.mCfg[this.mIdx];
            if (cfg.correct == idx) {
                // 正确   
                XDFFrame.EventCenter.sendEvent(game.EventConst.lookCheckSelectResult, true);
                this["kImgCheck" + idx].visible = true;
                this.kImgLine.visible = false;
            }
            else {
                // 错误
                XDFFrame.EventCenter.sendEvent(game.EventConst.lookCheckSelectResult, false);
            }
        };
        LookCheckPreCom.prototype.showAction = function () {
            this.kImgLine.visible = true;
            this.mIsActive = true;
            XDFSoundManager.play("sound_" + this.mIdx + "_mp3");
            this.mAnimRole.play(null, 3);
        };
        LookCheckPreCom.prototype.reset = function () {
            this.kImgCheck0.visible = this.kImgCheck1.visible = false;
            this.kImgLine.visible = false;
            this.mIsActive = false;
            this.kLabel0.text = this.mCfg[this.mIdx].desc0;
            this.kLabel1.text = this.mCfg[this.mIdx].desc1;
        };
        return LookCheckPreCom;
    }(eui.Component));
    game.LookCheckPreCom = LookCheckPreCom;
    __reflect(LookCheckPreCom.prototype, "game.LookCheckPreCom", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=LookCheckPreCom.js.map