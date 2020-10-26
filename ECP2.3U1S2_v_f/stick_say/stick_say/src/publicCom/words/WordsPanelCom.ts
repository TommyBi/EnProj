namespace game {
    /**
     * WordsPanelCom
     * 左侧滑动出来的单词组件
     */
    export class WordsPanelCom extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;
        public kGrpWords: eui.Group;

        private mIsMoving: boolean = false;
        public constructor() {
            super();
            this.skinName = "WordsPanelComSkin";
        }

        protected createChildren() {
            super.createChildren();
            egret.Tween.removeTweens(this.kGrpMain);
            this.kGrpMain.x = -310;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
        }

        public setData(cfg: { words: string, imgSrc: string, soundSrc: string, scaleX, scaleY }[] = []): void {
            this.kGrpWords.removeChildren();
            for (let i = 0; i < cfg.length; i++) {
                let wordsCom = new PreWordsCom();
                this.kGrpWords.addChild(wordsCom);
                wordsCom.setData(cfg[i]);
            }
        }
        onClick() {
            this.hide();
        }
        hide(cb?) {
            if (this.kGrpMain.x > 0) {
                // 收
                this.kGrpMain.x = 0;
                egret.Tween.get(this.kGrpMain).to({ x: -310 }, 800, egret.Ease.cubicInOut).call(() => {
                    this.mIsMoving = false;
                    if(cb)cb();
                })
            }
        }

        public playAction(cb?: Function): void {
            if (this.mIsMoving) return;
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
            } else {
                // 展开
                this.kGrpMain.x = -310;
                egret.Tween.get(this.kGrpMain).to({ x: 3 }, 800, egret.Ease.cubicInOut).call(() => {
                    this.mIsMoving = false;
                    cb && cb();
                })
            }
        }
    }

}