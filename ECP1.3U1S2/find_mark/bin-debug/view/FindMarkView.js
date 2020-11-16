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
    var FindMarkView = (function (_super) {
        __extends(FindMarkView, _super);
        function FindMarkView() {
            var _this = _super.call(this) || this;
            _this.mPos = [
                { x: 400, y: 300 },
                { x: 700, y: 500 },
                { x: 1100, y: 400 },
                { x: 1450, y: 350 },
                { x: 400, y: 700 },
                { x: 700, y: 900 },
                { x: 1100, y: 800 },
                { x: 1500, y: 700 },
            ];
            _this.mAnimCount = [1, 1, 2, 1, 1, 1, 1, 1];
            _this.mIsSame = [2, 1, 2, 1, 1, 1, 2, 2]; // 1:same   2:dif
            _this._mCurState = 0; // 0：待选择状态    1：选择了same    2：选择了dif
            _this.mPlayArr = [];
            _this.skinName = "FindMarkViewSkin";
            return _this;
        }
        Object.defineProperty(FindMarkView.prototype, "mCurState", {
            get: function () {
                return this._mCurState;
            },
            set: function (s) {
                egret.Tween.removeTweens(this.kImgOptionDif);
                egret.Tween.removeTweens(this.kImgOptionSame);
                this._mCurState = s;
                switch (s) {
                    case 0:
                        this.kImgOptionSame.scaleX = this.kImgOptionSame.scaleY = this.kImgOptionDif.scaleX = this.kImgOptionDif.scaleY = 0.3;
                        egret.Tween.get(this.kImgOptionDif, { loop: true })
                            .to({ scaleX: 0.35, scaleY: 0.35 }, 300)
                            .to({ scaleX: 0.3, scaleY: 0.3 }, 300)
                            .to({ scaleX: 0.35, scaleY: 0.35 }, 300)
                            .to({ scaleX: 0.3, scaleY: 0.3 }, 300);
                        egret.Tween.get(this.kImgOptionSame, { loop: true })
                            .to({ scaleX: 0.35, scaleY: 0.35 }, 300)
                            .to({ scaleX: 0.3, scaleY: 0.3 }, 300)
                            .to({ scaleX: 0.35, scaleY: 0.35 }, 300)
                            .to({ scaleX: 0.3, scaleY: 0.3 }, 300);
                        break;
                    case 1:
                        this.kImgOptionSame.scaleX = this.kImgOptionSame.scaleY = 0.35;
                        this.kImgOptionDif.scaleX = this.kImgOptionDif.scaleY = 0.25;
                        break;
                    case 2:
                        this.kImgOptionSame.scaleX = this.kImgOptionSame.scaleY = 0.25;
                        this.kImgOptionDif.scaleX = this.kImgOptionDif.scaleY = 0.35;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        FindMarkView.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(game.EventConst.eventStart, this.onStart, this);
            var _loop_1 = function (i) {
                this_1["kGrp" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.onSelect(i);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < 8; i++) {
                _loop_1(i);
            }
            this.kImgOptionDif.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeModeDif, this);
            this.kImgOptionSame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeModeSame, this);
            // 注册动画
            for (var i = 0; i < 8; i++) {
                this["kGrp" + i].x = this.mPos[i].x;
                this["kGrp" + i].y = this.mPos[i].y;
                this["mAnimOption" + i] = XDFFrame.DBFactory.createAnim("db_" + i, this.mAnimCount[i]);
                this["mAnimOption" + i].setProtery({ x: 0, y: 0, parent: this["kGrp" + i], scaleX: 1, scaleY: 1 });
                this["mAnimResult" + i] = XDFFrame.DBFactory.createAnim(this.mIsSame[i] == 1 ? "db_cycle" : "db_x", 1, false);
                this["mAnimResult" + i].setProtery({ x: 0, y: 0, parent: this["kGrp" + i], scaleX: 1.2, scaleY: 1.2 });
                this["mAnimOption" + i].play();
                this["mAnimResult" + i].visible = false;
            }
            this.init();
        };
        FindMarkView.prototype.init = function () {
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
            this.mCurState = 0;
            this.mPlayArr = [];
            this.kComAnswer.visible = false;
        };
        /** 开始游戏 */
        FindMarkView.prototype.onStart = function () {
            this.kComReplay.visible = false;
        };
        /** 重新开始 */
        FindMarkView.prototype.onReStart = function () {
            this.kComReplay.visible = false;
            this.mCurState = 0;
            this.mPlayArr = [];
            this.kComAnswer.visible = false;
            for (var i = 0; i < 8; i++) {
                this["mAnimResult" + i].visible = false;
            }
        };
        /** 选择 */
        FindMarkView.prototype.onSelect = function (idx) {
            var _this = this;
            egret.log("idx:", idx);
            if (this.mCurState == 0)
                return;
            if (this.mPlayArr.indexOf(idx) != -1)
                return;
            if (this.mIsSame[idx] == this.mCurState) {
                // 选择正确
                XDFSoundManager.play("sound_ding_mp3");
                var sound_url = this.mCurState == 1 ? "sound_same_mp3" : "sound_dif_mp3";
                XDFSoundManager.play(sound_url, 0, 1, 1, sound_url, function () {
                    _this.isFinish();
                });
                this["mAnimResult" + idx].visible = true;
                this.mPlayArr.push(idx);
                this["mAnimResult" + idx].play(null, 1, function () { }, this);
            }
            else {
                // 选择错误
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(function () {
                    _this.kComAnswer.visible = false;
                });
            }
            this.mCurState = 0;
        };
        /** 是否游戏结束 */
        FindMarkView.prototype.isFinish = function () {
            if (this.mPlayArr.length >= 8) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            }
        };
        /** 选择same */
        FindMarkView.prototype.onChangeModeSame = function () {
            XDFSoundManager.play("sound_think_choise_mp3");
            this.mCurState = 1;
        };
        /** 选择dif */
        FindMarkView.prototype.onChangeModeDif = function () {
            XDFSoundManager.play("sound_think_choise_mp3");
            this.mCurState = 2;
        };
        return FindMarkView;
    }(eui.Component));
    game.FindMarkView = FindMarkView;
    __reflect(FindMarkView.prototype, "game.FindMarkView");
})(game || (game = {}));
//# sourceMappingURL=FindMarkView.js.map