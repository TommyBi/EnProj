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
    var ListenRepeatView = (function (_super) {
        __extends(ListenRepeatView, _super);
        function ListenRepeatView() {
            var _this = _super.call(this) || this;
            _this.mSkinType = 2; // 皮肤类型
            _this.mTotalCount = 11; // 总的对话数量
            _this._mCurPage = 0;
            _this.mPageCfg = [[0, 5], [6, 11]]; // 页面配置
            _this.skinName = "ListenRepeatViewSkin";
            return _this;
        }
        Object.defineProperty(ListenRepeatView.prototype, "mCurPage", {
            get: function () { return this._mCurPage; } // 当前页面
            ,
            set: function (n) {
                this._mCurPage = n;
                this.changePage();
            },
            enumerable: true,
            configurable: true
        });
        ;
        ListenRepeatView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.kImgBtnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextPage, this);
            this.kImgBtnPre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrePage, this);
            this.init();
        };
        ListenRepeatView.prototype.init = function () {
            if (this.kGp.numChildren < 8) {
                this.kImgBtnNext.visible = this.kImgBtnPre.visible = false;
            }
            this.kImgBg.source = "img_bg_" + this.mSkinType + "_png";
            this.kComVideo.setSkinType(this.mSkinType);
            this.mCurPlayIdx = -1;
            this.mCurPage = 0;
        };
        /** 切换页签 */
        ListenRepeatView.prototype.changePage = function () {
            var cfg = this.mPageCfg[this.mCurPage];
            for (var i = 0; i < 8; i++) {
                this["kCom" + i].visible = this["kCom" + i].includeInLayout = i < (cfg[1] - cfg[0] + 1);
                this["kCom" + i].normal();
                if (this["kCom" + i].visible) {
                    this["kCom" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                    this["kCom" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                    this["kCom" + i].setData(cfg[0] + i);
                }
                else {
                    this["kCom" + i].setData(-1);
                }
            }
            if (this.mPageCfg.length == 1) {
                this.kImgBtnPre.visible = this.kImgBtnNext.visible = false;
                return;
            }
            if (this.mCurPage >= this.mPageCfg.length - 1) {
                this.kImgBtnNext.visible = false;
            }
            else {
                this.kImgBtnNext.visible = true;
            }
            if (this.mCurPage == 0) {
                this.kImgBtnPre.visible = false;
            }
            else {
                this.kImgBtnPre.visible = true;
            }
        };
        ListenRepeatView.prototype.onNextPage = function () {
            if (this.mCurPage >= this.mPageCfg.length - 1) {
                // 已经是最后一页
                return;
            }
            else {
                this.mCurPage++;
            }
        };
        ListenRepeatView.prototype.onPrePage = function () {
            if (this.mCurPage <= 0)
                return;
            this.mCurPage--;
        };
        ListenRepeatView.prototype.onTouch = function (e) {
            var tar = e.target;
            this.mCurPlayIdx = tar.mIdx;
            for (var i = 0; i < 8; i++) {
                var com = this["kCom" + i];
                if (com.mIdx == this.mCurPlayIdx) {
                    this["kCom" + i].light();
                    this.kComVideo.play(this.mCurPlayIdx);
                }
                else {
                    this["kCom" + i].normal();
                }
            }
        };
        return ListenRepeatView;
    }(eui.Component));
    game.ListenRepeatView = ListenRepeatView;
    __reflect(ListenRepeatView.prototype, "game.ListenRepeatView");
})(game || (game = {}));
//# sourceMappingURL=ListenRepeatView.js.map