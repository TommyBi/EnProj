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
    var ConnectSayView = (function (_super) {
        __extends(ConnectSayView, _super);
        function ConnectSayView() {
            var _this = _super.call(this) || this;
            _this.mLeftPoints = [{ x: 220, y: 500 }, { x: 260, y: 510 }, { x: 300, y: 495 }, { x: 467, y: 516 },
                { x: 452, y: 545 }, { x: 495, y: 561 }, { x: 536, y: 563 }, { x: 554, y: 530 }];
            _this.mRightPoints = [{ x: 201, y: 45 }, { x: 220, y: 127 }, { x: 180, y: 194 }, { x: 269, y: 262 },
                { x: 276, y: 370 }, { x: 222, y: 438 }];
            _this.dianIndex = 0;
            _this.isGame = false;
            return _this;
        }
        ConnectSayView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.init();
        };
        ConnectSayView.prototype.init = function () {
            this.kReplay.showStart();
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReplay, this);
            this.mClickEff = XDFFrame.DBFactory.createAnim("dianji1");
            this.mClickEff.setProtery({ x: 0, y: 0, parent: this, scaleX: 1, scaleY: 1 });
            this.mDianEffList1 = [];
            this.mDianEffList2 = [];
            this.mDianImgList1 = [];
            this.mDianImgList2 = [];
            this.role1 = XDFFrame.DBFactory.createAnim("role1");
            this.role1.setProtery({ x: 330, y: 500, parent: this.k10, scaleX: 2, scaleY: 2.2 });
            this.role2 = XDFFrame.DBFactory.createAnim("role2");
            this.role2.setProtery({ x: 670, y: 480, parent: this.k10, scaleX: 2, scaleY: 2.2 });
            this.role1.visible = false;
            this.role2.visible = false;
            this.role3 = XDFFrame.DBFactory.createAnim("role3");
            this.role3.setProtery({ x: 600, y: 550, parent: this.k19, scaleX: 2.1, scaleY: 2.2 });
            this.feng = XDFFrame.DBFactory.createAnim("feng");
            this.feng.setProtery({ x: 600, y: 550, parent: this.k10, scaleX: 2.1, scaleY: 2.2 });
            this.feng.visible = false;
            this.snow = XDFFrame.DBFactory.createAnim("snow");
            this.snow.setProtery({ x: 500, y: 400, parent: this.k19, scaleX: 2.1, scaleY: 2.2 });
            this.snow.visible = false;
            for (var i = 0; i < 8; i++) {
                var dian = XDFFrame.DBFactory.createAnim("dian", 1, true);
                dian.setProtery({ x: this.mLeftPoints[i].x, y: this.mLeftPoints[i].y, parent: this.k10_1, scaleX: 2.5, scaleY: 2.5 });
                dian.addEvent(this.onLeftDian.bind(this));
                // dian.armatureDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftDian, this);
                dian.index = i;
                dian.armatureDisplay.touchEnabled = true;
                this.mDianEffList1.push(dian);
                dian.visible = false;
                var img = new eui.Image("dian_1_png");
                img.x = this.mLeftPoints[i].x;
                img.y = this.mLeftPoints[i].y;
                img.anchorOffsetX = 5.5;
                img.anchorOffsetY = 5.5;
                img.scaleX = 2.5;
                img.scaleY = 2.5;
                this.k10_1.addChild(img);
                this.mDianImgList1.push(img);
            }
            for (var i = 0; i < 6; i++) {
                var dian = XDFFrame.DBFactory.createAnim("dian", 1, true);
                dian.setProtery({ x: this.mRightPoints[i].x, y: this.mRightPoints[i].y, parent: this.kSnowGp, scaleX: 2.5, scaleY: 2.5 });
                // dian.armatureDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightDian, this);
                dian.addEvent(this.onRightDian.bind(this));
                dian.armatureDisplay.touchEnabled = true;
                dian.index = i;
                dian.visible = false;
                this.mDianEffList2.push(dian);
                var img = new eui.Image("dian_1_png");
                img.x = this.mRightPoints[i].x;
                img.y = this.mRightPoints[i].y;
                img.anchorOffsetX = 5.5;
                img.anchorOffsetY = 5.5;
                img.scaleX = 2.5;
                img.scaleY = 2.5;
                this.kSnowGp.addChild(img);
                this.mDianImgList2.push(img);
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        /**
         * 屏幕点击
         */
        ConnectSayView.prototype.onClick = function (e) {
            this.mClickEff.x = e.stageX;
            this.mClickEff.y = e.stageY;
            // this.mClickEff.play(null, 1, () => { }, this);
        };
        /**
         * 开始按钮点击
         */
        ConnectSayView.prototype.onStart = function () {
            this.kReplay.visible = false;
            this.leftAnim();
            XDFSoundManager.play("start_mp3", 0, 1, 1, "", function () { });
            this.kLeft1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeft1, this);
            this.kLeft2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeft2, this);
        };
        /**
         * 重新开始
         */
        ConnectSayView.prototype.onReplay = function () {
            this.isGame = false;
            this.kAnswer.visible = false;
            this.kReplay.visible = false;
            this.k10.visible = false;
            this.k19.visible = false;
            this.role1.stop();
            this.role3.stop();
            this.role2.stop();
            this.feng.stop();
            this.snow.stop();
            this.feng.visible = this.snow.visible = this.role1.visible = this.role2.visible = false;
            this.k10_1.visible = true;
            this.kTips1.visible = false;
            this.kSnow.visible = false;
            this.kSnowGp.visible = true;
            this.kTips2.visible = false;
            for (var i = 0; i < this.mDianImgList1.length; i++) {
                this.mDianImgList1[i].visible = true;
            }
            for (var i = 0; i < this.mDianImgList2.length; i++) {
                this.mDianImgList2[i].visible = true;
            }
            for (var i = 0; i < 3; i++) {
                this["kGirlLine" + (i + 1)].visible = false;
            }
            for (var i = 0; i < 5; i++) {
                this["kBoyLine" + (i + 1)].visible = false;
            }
            for (var i = 0; i < 6; i++) {
                this.kSnowGp.getChildAt(i + 1).visible = false;
            }
            this.leftAnim();
        };
        ConnectSayView.prototype.onLeftDian = function (e) {
            var _this = this;
            if (e == this.dianIndex) {
                XDFSoundManager.play("sound_think_choise_mp3", 0, 1, 1, "", function () { });
                if (this.dianIndex < 3) {
                    this["kGirlLine" + (this.dianIndex + 1)].visible = true;
                }
                else {
                    this["kBoyLine" + (this.dianIndex - 2)].visible = true;
                }
                this.mDianEffList1[this.dianIndex].stop();
                this.mDianEffList1[this.dianIndex].visible = false;
                this.dianIndex++;
                if (this.dianIndex < 8) {
                    this.mDianImgList1[this.dianIndex].visible = false;
                    this.mDianEffList1[this.dianIndex].visible = true;
                    this.mDianEffList1[this.dianIndex].play("dian", 0);
                }
                if (this.dianIndex == 8) {
                    this.touchChildren = false;
                    this.k10_1.visible = false;
                    this.kTips1.visible = true;
                    this.role1.visible = true;
                    this.role2.visible = true;
                    this.feng.visible = true;
                    this.role1.play(null, 0);
                    this.role2.play(null, 0);
                    this.feng.play(null, 0);
                    XDFSoundManager.play("sound1_1_mp3", 0, 1, 1, "", function () {
                        XDFSoundManager.play("sound1_2_mp3", 0, 1, 1, "", function () {
                            _this.kAnswer.visible = true;
                            _this.kAnswer.playGood(function () {
                                _this.touchChildren = true;
                                _this.over();
                            });
                        });
                    });
                }
            }
        };
        ConnectSayView.prototype.onRightDian = function (e) {
            var _this = this;
            if (e == this.dianIndex) {
                XDFSoundManager.play("sound_think_choise_mp3", 0, 1, 1, "", function () { });
                this.kSnowGp.getChildAt(this.dianIndex + 1).visible = true;
                this.mDianEffList2[this.dianIndex].stop();
                this.mDianEffList2[this.dianIndex].visible = false;
                this.dianIndex++;
                if (this.dianIndex < 6) {
                    this.mDianImgList2[this.dianIndex].visible = false;
                    this.mDianEffList2[this.dianIndex].visible = true;
                    this.mDianEffList2[this.dianIndex].play("dian", 0);
                }
                if (this.dianIndex == 6) {
                    this.touchChildren = false;
                    this.kSnow.visible = true;
                    this.kSnowGp.visible = false;
                    this.kTips2.visible = true;
                    this.role3.play(null, 0);
                    this.snow.visible = true;
                    this.snow.play(null, 0);
                    XDFSoundManager.play("sound2_1_mp3", 0, 1, 1, "", function () {
                        XDFSoundManager.play("sound2_2_mp3", 0, 1, 1, "", function () {
                            _this.kAnswer.visible = true;
                            _this.kAnswer.playGood(function () {
                                _this.touchChildren = true;
                                _this.over();
                            });
                        });
                    });
                }
            }
        };
        ConnectSayView.prototype.leftAnim = function () {
            this.kRect1.visible = true;
            this.kRect2.visible = true;
            egret.Tween.removeTweens(this.kRect1);
            egret.Tween.removeTweens(this.kRect2);
            this.kRect1.alpha = 1;
            this.kRect2.alpha = 1;
            egret.Tween.get(this.kRect1, { loop: true }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
            egret.Tween.get(this.kRect2, { loop: true }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
        };
        ConnectSayView.prototype.onLeft1 = function () {
            if (this.isGame)
                return;
            this.selectLeft(1);
            this.isGame = true;
            this.k10.visible = true;
            this.mDianImgList1[0].visible = false;
            this.mDianEffList1[0].visible = true;
            this.mDianEffList1[0].play("dian", 0);
        };
        ConnectSayView.prototype.onLeft2 = function () {
            if (this.isGame)
                return;
            this.isGame = true;
            this.selectLeft(2);
            this.role3.visible = true;
            this.k19.visible = true;
            this.mDianImgList2[0].visible = false;
            this.mDianEffList2[0].visible = true;
            this.mDianEffList2[0].play(null, 0);
        };
        ConnectSayView.prototype.selectLeft = function (indx) {
            egret.Tween.removeTweens(this.kRect1);
            egret.Tween.removeTweens(this.kRect2);
            if (indx == 1) {
                this.kRect1.alpha = 1;
                this.kRect2.visible = false;
            }
            else {
                this.kRect2.alpha = 1;
                this.kRect1.visible = false;
            }
        };
        ConnectSayView.prototype.over = function () {
            this.kReplay.visible = true;
            this.kReplay.showReplay();
            this.dianIndex = 0;
        };
        return ConnectSayView;
    }(eui.Component));
    game.ConnectSayView = ConnectSayView;
    __reflect(ConnectSayView.prototype, "game.ConnectSayView", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=ConnectSayView.js.map