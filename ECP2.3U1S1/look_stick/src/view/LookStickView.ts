namespace game {
    export class LookStickView extends eui.Component {
        public kGrpTar0: eui.Group;
        public kImgPicHead0: eui.Image;
        public kImgHintTarFrame0: eui.Image;
        public kGrpTar2: eui.Group;
        public kImgPicHead2: eui.Image;
        public kImgHintTarFrame2: eui.Image;
        public kImgHappy: eui.Image;
        public kGrpTar1: eui.Group;
        public kImgPicHead1: eui.Image;
        public kImgHintTarFrame1: eui.Image;
        public kGrpTar3: eui.Group;
        public kImgPicHead3: eui.Image;
        public kImgHintTarFrame3: eui.Image;
        public kImgSad: eui.Image;
        public kGrp0: eui.Group;
        public kGrpOption0: eui.Group;
        public kImgFrame0: eui.Image;
        public kGrp1: eui.Group;
        public kGrpOption1: eui.Group;
        public kImgFrame1: eui.Image;
        public kGrp2: eui.Group;
        public kGrpOption2: eui.Group;
        public kImgFrame2: eui.Image;
        public kGrp3: eui.Group;
        public kGrpOption3: eui.Group;
        public kImgFrame3: eui.Image;
        public kComReplay: game.ReplayComponent;
        public kComAnswer: game.AnswerComponent;
        public kGrpSmokeAnim: eui.Group;

        private mAnimSmoke: XDFFrame.DBAnim;
        private mCurHintIdx: number = 0;
        private mHintArr: number[] = [];
        private mSmokeAnimShowPos = [
            [1274, 400], [1724, 400], [1290, 885], [1724, 885]
        ]

        constructor() {
            super();
            this.skinName = "LookStickViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            for (let i = 0; i < 4; i++) {
                this[`kGrpOption${i}`].visible = this[`kImgHintTarFrame${i}`].visible = true;   // 选项、hint
                egret.Tween.removeTweens(this[`kImgFrame${i}`]);
                egret.Tween.removeTweens(this[`kImgHintTarFrame${i}`]);
                this[`kGrp${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onSelect${i}`], this);
            }
            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReStart, this);

            this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
            this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGrpSmokeAnim, scaleX: 1, scaleY: 1 });

            this.reset();
            this.next();
        }

        private reset(): void {
            for (let i = 0; i < 4; i++) {
                this[`kGrpOption${i}`].visible = this[`kImgHintTarFrame${i}`].visible = true;   // 选项、hint
                egret.Tween.removeTweens(this[`kImgFrame${i}`]);
                egret.Tween.removeTweens(this[`kImgHintTarFrame${i}`]);
            }

            // 娃娃脸呼吸
            egret.Tween.removeTweens(this.kImgHappy);
            egret.Tween.removeTweens(this.kImgSad);

            this.calShowOrder();

            // 遮罩云动画
            this.kGrpSmokeAnim.visible = false;

            // 结果反馈
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
        }

        /** 提示下一个 */
        private next(): void {
            if (this.mHintArr.length <= 0) {
                // 完成
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            } else {
                // 没完成
                console.log("下一个");
                this.mCurHintIdx = this.mHintArr.shift();
                this.hint();
            }
        }

        /** 提示 */
        private hint(): void {
            for (let i = 0; i < 4; i++) {
                egret.Tween.removeTweens(this[`kImgHintTarFrame${i}`]);
                egret.Tween.removeTweens(this[`kImgFrame${i}`]);
                this[`kImgFrame${i}`].alpha = 1;
                this[`kImgHintTarFrame${i}`].visible = false;
                egret.Tween.get(this[`kImgFrame${i}`], { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
            }
            // 笑脸处理
            egret.Tween.removeTweens(this.kImgHappy);
            egret.Tween.removeTweens(this.kImgSad);
            this.kImgHappy.alpha = this.kImgSad.alpha = 1;
            this.kImgHappy.scaleX = this.kImgHappy.scaleY = this.kImgSad.scaleX = this.kImgSad.scaleY = 1;
            let tarCom = this.mCurHintIdx == 0 || this.mCurHintIdx == 2 ? this.kImgHappy : this.kImgSad;
            egret.Tween.get(tarCom, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1, alpha: 0.7 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 1.1, scaleY: 1.1, alpha: 0.7 }, 800, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 800, egret.Ease.cubicInOut)
            XDFSoundManager.play(`sound_lp_option${this.mCurHintIdx}_mp3`);

            // 目标头像边框提示
            this[`kImgHintTarFrame${this.mCurHintIdx}`].visible = true;
            this[`kImgHintTarFrame${this.mCurHintIdx}`].alpha = 1;
            egret.Tween.get(this[`kImgHintTarFrame${this.mCurHintIdx}`], { loop: true })
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
        }

        private onSelect0(): void {
            this.onMatch(0);
        }
        private onSelect1(): void {
            this.onMatch(1);
        }
        private onSelect2(): void {
            this.onMatch(2);
        }
        private onSelect3(): void {
            this.onMatch(3);
        }

        private onMatch(touch: number): void {
            if (touch == this.mCurHintIdx) {
                // 正确
                // play anim
                this[`kGrpOption${this.mCurHintIdx}`].visible = false;
                this.playSmokeAnim(this.mCurHintIdx);
                this.next();
            } else {
                // 错误
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    XDFSoundManager.play(`sound_lp_option${this.mCurHintIdx}_mp3`);
                })
            }
        }

        /** 重新开始 */
        private onReStart(): void {
            this.reset();
            this.next();
        }

        /** 初始化播放顺序 */
        private calShowOrder(): void {
            this.mHintArr = [];
            this.produceOrderArr();
        }
        /** 生产随机队列 */
        private produceOrderArr(): void {
            if (this.mHintArr.length < 4) {
                let idx = Util.randomNum(0, 3);
                if (this.mHintArr.indexOf(idx) == -1) {
                    this.mHintArr.push(idx);
                    if (this.mHintArr.length < 4) {
                        this.produceOrderArr();
                    }
                } else {
                    this.produceOrderArr();
                }
            }
        }

        private playSmokeAnim(posIdx: number): void {
            this.kGrpSmokeAnim.x = this.mSmokeAnimShowPos[posIdx][0];
            this.kGrpSmokeAnim.y = this.mSmokeAnimShowPos[posIdx][1];
            this.kGrpSmokeAnim.visible = true;
            this.mAnimSmoke.play(null, 1, () => {
                this.kGrpSmokeAnim.visible = false;
            }, this);
        }

    }
} 