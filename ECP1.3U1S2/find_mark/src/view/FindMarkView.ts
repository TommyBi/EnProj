namespace game {
    export class FindMarkView extends eui.Component {
        public kGrp0: eui.Group;
        public kGrp1: eui.Group;
        public kGrp2: eui.Group;
        public kGrp3: eui.Group;
        public kGrp4: eui.Group;
        public kGrp5: eui.Group;
        public kGrp6: eui.Group;
        public kGrp7: eui.Group;
        public kImgOptionSame: eui.Image;
        public kImgOptionDif: eui.Image;
        public kComAnswer: game.AnswerComponent;
        public kComReplay: game.ReplayComponent;

        public mAnimOption0: XDFFrame.DBAnim;
        public mAnimOption1: XDFFrame.DBAnim;
        public mAnimOption2: XDFFrame.DBAnim;
        public mAnimOption3: XDFFrame.DBAnim;
        public mAnimOption4: XDFFrame.DBAnim;
        public mAnimOption5: XDFFrame.DBAnim;
        public mAnimOption6: XDFFrame.DBAnim;
        public mAnimOption7: XDFFrame.DBAnim;

        public mAnimResult0: XDFFrame.DBAnim;
        public mAnimResult1: XDFFrame.DBAnim;
        public mAnimResult2: XDFFrame.DBAnim;
        public mAnimResult3: XDFFrame.DBAnim;
        public mAnimResult4: XDFFrame.DBAnim;
        public mAnimResult5: XDFFrame.DBAnim;
        public mAnimResult6: XDFFrame.DBAnim;
        public mAnimResult7: XDFFrame.DBAnim;

        private mPos: any[] = [
            { x: 400, y: 300 },
            { x: 700, y: 500 },
            { x: 1100, y: 400 },
            { x: 1450, y: 350 },
            { x: 400, y: 700 },
            { x: 700, y: 900 },
            { x: 1100, y: 800 },
            { x: 1500, y: 700 },
        ];
        private mAnimCount: number[] = [1, 1, 2, 1, 1, 1, 1, 1];
        private mIsSame: number[] = [2, 1, 2, 1, 1, 1, 2, 2];   // 1:same   2:dif
        private _mCurState: number = 0;// 0：待选择状态    1：选择了same    2：选择了dif
        private get mCurState(): number {
            return this._mCurState;
        }
        private set mCurState(s: number) {
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
                        .to({ scaleX: 0.3, scaleY: 0.3 }, 300)
                    egret.Tween.get(this.kImgOptionSame, { loop: true })
                        .to({ scaleX: 0.35, scaleY: 0.35 }, 300)
                        .to({ scaleX: 0.3, scaleY: 0.3 }, 300)
                        .to({ scaleX: 0.35, scaleY: 0.35 }, 300)
                        .to({ scaleX: 0.3, scaleY: 0.3 }, 300)
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
        }
        private mPlayArr: number[] = [];

        constructor() {
            super();
            this.skinName = "FindMarkViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
            for (let i = 0; i < 8; i++) {
                this[`kGrp${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    this.onSelect(i);
                }, this);
            }

            this.kImgOptionDif.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeModeDif, this);
            this.kImgOptionSame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeModeSame, this);
            // 注册动画
            for (let i = 0; i < 8; i++) {
                this[`kGrp${i}`].x = this.mPos[i].x;
                this[`kGrp${i}`].y = this.mPos[i].y;
                this[`mAnimOption${i}`] = XDFFrame.DBFactory.createAnim(`db_${i}`, this.mAnimCount[i]);
                this[`mAnimOption${i}`].setProtery({ x: 0, y: 0, parent: this[`kGrp${i}`], scaleX: 1, scaleY: 1 });
                this[`mAnimResult${i}`] = XDFFrame.DBFactory.createAnim(this.mIsSame[i] == 1 ? `db_cycle` : `db_x`, 1, false);
                this[`mAnimResult${i}`].setProtery({ x: 0, y: 0, parent: this[`kGrp${i}`], scaleX: 1.2, scaleY: 1.2 });
                this[`mAnimOption${i}`].play();
                this[`mAnimResult${i}`].visible = false;
            }

            this.init();
        }

        private init(): void {
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
            this.mCurState = 0;
            this.mPlayArr = [];
            this.kComAnswer.visible = false;
        }

        /** 开始游戏 */
        private onStart(): void {
            this.kComReplay.visible = false;
        }

        /** 重新开始 */
        private onReStart(): void {
            this.kComReplay.visible = false;
            this.mCurState = 0;
            this.mPlayArr = [];
            this.kComAnswer.visible = false;
            for (let i = 0; i < 8; i++) {
                this[`mAnimResult${i}`].visible = false;
            }
        }

        /** 选择 */
        private onSelect(idx: number): void {
            egret.log("idx:", idx);
            if (this.mCurState == 0) return;
            if (this.mPlayArr.indexOf(idx) != -1) return;
            if (this.mIsSame[idx] == this.mCurState) {
                // 选择正确
                XDFSoundManager.play("sound_ding_mp3");
                let sound_url = this.mCurState == 1 ? "sound_same_mp3" : "sound_dif_mp3";
                XDFSoundManager.play(sound_url, 0, 1, 1, sound_url, () => {
                    this.isFinish();
                });
                this[`mAnimResult${idx}`].visible = true;
                this.mPlayArr.push(idx);
                this[`mAnimResult${idx}`].play(null, 1, () => { }, this);
            } else {
                // 选择错误
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                })
            }
            this.mCurState = 0;
        }

        /** 是否游戏结束 */
        private isFinish(): void {
            if (this.mPlayArr.length >= 8) {
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            }
        }

        /** 选择same */
        private onChangeModeSame(): void {
            XDFSoundManager.play("sound_think_choise_mp3");
            this.mCurState = 1;
        }

        /** 选择dif */
        private onChangeModeDif(): void {
            XDFSoundManager.play("sound_think_choise_mp3");
            this.mCurState = 2;
        }
    }
} 