namespace game {
    /**
     * WordsPanelCom
     * 左侧滑动出来的单词组件
     */
    export class WordsPanelCom extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;
        public kGrpWords: eui.Group;

        private mIsMoving: boolean = false;
        public get isHide(): boolean {
            return this.kGrpMain.x < 0;
        }
        public constructor() {
            super();
            this.skinName = "WordsPanelComSkin";
        }

        protected createChildren() {
            super.createChildren();
            egret.Tween.removeTweens(this.kGrpMain);
            this.kGrpMain.x = -278;
        }

        public setData(cfg: { words: string, imgSrc: string, soundSrc: string }[] = []): void {
            this.kGrpWords.removeChildren();
            for (let i = 0; i < cfg.length; i++) {
                let wordsCom = new PreWordsCom();
                this.kGrpWords.addChild(wordsCom);
                wordsCom.setData(cfg[i]);
            }
        }

        public playAction(cb?: Function): void {
            if (this.mIsMoving) return;
            this.mIsMoving = true;
            egret.Tween.removeTweens(this.kGrpMain);
            if (this.kGrpMain.x > 0) {
                // 收
                this.kGrpMain.x = 10;
                egret.Tween.get(this.kGrpMain).to({ x: -278 }, 800, egret.Ease.cubicInOut).call(() => {
                    this.mIsMoving = false;
                    cb && cb();
                })
            } else {
                // 展开
                this.kGrpMain.x = -278;
                egret.Tween.get(this.kGrpMain).to({ x: 10 }, 800, egret.Ease.cubicInOut).call(() => {
                    this.mIsMoving = false;
                    cb && cb();
                })
            }
        }
    }

}