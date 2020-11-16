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
     * VideoProBarComponent
     * 视频进度调节组件
     */
    var VideoProBarComponent = (function (_super) {
        __extends(VideoProBarComponent, _super);
        function VideoProBarComponent() {
            var _this = _super.call(this) || this;
            _this.mTouchSrcX = 0;
            _this.mTmpX = 0;
            _this.mIsAdjust = false;
            _this.skinName = "VideoProBarSkin";
            return _this;
        }
        VideoProBarComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.kImgProBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.init();
        };
        VideoProBarComponent.prototype.setSkinType = function (type) {
            if (type > 0)
                this.kImgProBtn.source = "img_pro_icon" + type + "_png";
        };
        VideoProBarComponent.prototype.reset = function (time) {
            this.kImgProBtn.x = 0;
            this.kImgBar.width = this.kImgProBtn.x;
            this.updateProPos(time);
        };
        VideoProBarComponent.prototype.backToStart = function () {
            egret.Tween.removeTweens(this.kImgProBtn);
        };
        VideoProBarComponent.prototype.updateProPos = function (remainTime) {
            var _this = this;
            egret.Tween.removeTweens(this.kImgProBtn);
            egret.Tween.get(this.kImgProBtn).to({ x: this.kGrpBar.width }, remainTime * 1000).call(function () {
                _this.kImgProBtn.x = 0;
                XDFFrame.EventCenter.sendEvent(game.EventConst.videoPlayFinish);
            });
            egret.Tween.removeTweens(this.kImgBar);
            egret.Tween.get(this.kImgBar).to({ width: this.kGrpBar.width }, remainTime * 1000).call(function () {
                _this.kImgBar.width = 0;
            });
        };
        VideoProBarComponent.prototype.init = function () {
            this.kImgProBtn.x = 0;
            this.kImgBar.width = this.kImgProBtn.x;
            this.mIsAdjust = false;
        };
        VideoProBarComponent.prototype.onTouchBegin = function (e) {
            this.mTouchSrcX = e.stageX;
            this.mTmpX = this.kImgProBtn.x;
            this.mIsAdjust = true;
            egret.Tween.removeTweens(this.kImgProBtn);
            egret.Tween.removeTweens(this.kImgBar);
        };
        VideoProBarComponent.prototype.onTouchEnd = function (e) {
            if (this.mIsAdjust) {
                XDFFrame.EventCenter.sendEvent(game.EventConst.eventFinishVideoProgress, this.kImgProBtn.x / this.kGrpBar.width);
            }
            this.mIsAdjust = false;
        };
        VideoProBarComponent.prototype.onTouchMove = function (e) {
            if (!this.mIsAdjust)
                return;
            var offSet = e.stageX - this.mTouchSrcX;
            if (this.mTmpX + offSet >= this.kGrpBar.width) {
                // 结束播放
                this.kImgProBtn.x = this.kGrpBar.width;
                this.kImgBar.width = this.kImgProBtn.x;
            }
            else if (this.mTmpX + offSet <= 0) {
                // 回到起点 
                this.kImgProBtn.x = 0;
                this.kImgBar.width = this.kImgProBtn.x;
            }
            else {
                this.kImgProBtn.x = this.mTmpX + offSet;
                this.kImgBar.width = this.kImgProBtn.x;
            }
        };
        Object.defineProperty(VideoProBarComponent.prototype, "schedule", {
            /** 获取当前播放进度 */
            get: function () {
                return this.kImgProBtn.x / this.kGrpBar.width;
            },
            enumerable: true,
            configurable: true
        });
        VideoProBarComponent.prototype.pause = function () {
            egret.Tween.removeTweens(this.kImgProBtn);
            egret.Tween.removeTweens(this.kImgBar);
        };
        return VideoProBarComponent;
    }(eui.Component));
    game.VideoProBarComponent = VideoProBarComponent;
    __reflect(VideoProBarComponent.prototype, "game.VideoProBarComponent", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=VideoProBarComponent.js.map