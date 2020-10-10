namespace game {
    /**
     * AnswerComponent
     */
    export class AnswerComponent extends eui.Component implements eui.UIComponent {
        public kImgStarBg: eui.Image;
        public kGrpStarLeft: eui.Group;
        public kGrpStarRight: eui.Group;
        public kImgGood: eui.Image;
        public kImgErr: eui.Image;

        public constructor() {
            super();
            this.skinName = "AnswerComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            egret.Tween.removeTweens(this.kImgGood);
            egret.Tween.removeTweens(this.kGrpStarLeft);
            egret.Tween.removeTweens(this.kGrpStarRight);
            egret.Tween.removeTweens(this.kImgErr);
            egret.Tween.removeTweens(this.kImgStarBg);
            this.kImgGood.visible = this.kImgErr.visible = this.kGrpStarLeft.visible = this.kGrpStarRight.visible = this.kImgStarBg.visible = false;
        }

        public playGood(cb: Function): void {
            this.init();
            XDFSoundManager.play("sound_goodjob_mp3");
            this.kImgGood.scaleX = this.kImgGood.scaleY = 5;
            this.kImgGood.visible = true;
            this.kImgGood.rotation = 0;
            egret.Tween.get(this.kImgGood).to({ rotation: 700, scaleX: 1.5, scaleY: 1.5 }, 500, egret.Ease.cubicIn).call(
                () => {
                    this.kGrpStarLeft.visible = this.kGrpStarRight.visible = true;
                    // 散落的星星
                    this.kImgStarBg.visible = true;
                    this.kImgStarBg.alpha = 1;
                    egret.Tween.get(this.kImgStarBg)
                        .to({ alpha: 0.5 }, 250, egret.Ease.cubicInOut)
                        .to({ alpha: 1 }, 250, egret.Ease.cubicInOut)
                        .to({ alpha: 0.5 }, 250, egret.Ease.cubicInOut)
                        .to({ alpha: 1 }, 250, egret.Ease.cubicInOut)
                    // 星星
                    this.kGrpStarLeft.x = 450;
                    this.kGrpStarLeft.y = 543;
                    this.kGrpStarRight.x = 1374;
                    this.kGrpStarRight.y = 250;
                    egret.Tween.get(this.kGrpStarLeft)
                        .to({ x: 470, y: 520 }, 250, egret.Ease.cubicInOut)
                        .to({ x: 450, y: 543 }, 250, egret.Ease.cubicInOut)
                        .to({ x: 470, y: 520 }, 250, egret.Ease.cubicInOut)
                        .to({ x: 450, y: 543 }, 250, egret.Ease.cubicInOut)
                    egret.Tween.get(this.kGrpStarRight)
                        .to({ x: 1354, y: 230 }, 250, egret.Ease.cubicInOut)
                        .to({ x: 1374, y: 250 }, 250, egret.Ease.cubicInOut)
                        .to({ x: 1354, y: 230 }, 250, egret.Ease.cubicInOut)
                        .to({ x: 1374, y: 250 }, 250, egret.Ease.cubicInOut)
                        .call(() => {
                            cb && cb();
                        })
                }
            )
        }

        public playErr(cb: Function): void {
            this.init();
            XDFSoundManager.play("sound_oopstryagain_mp3");
            this.kImgErr.scaleX = this.kImgErr.scaleY = 5;
            this.kImgErr.visible = true;
            egret.Tween.get(this.kImgErr).to({ rotation: 700, scaleX: 1.5, scaleY: 1.5 }, 500, egret.Ease.cubicIn).wait(1000).call(() => {
                cb && cb();
            })
        }
    }

}