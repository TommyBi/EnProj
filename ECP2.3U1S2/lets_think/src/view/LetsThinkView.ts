namespace game {
    export class LetsThinkView extends eui.Component {

        public kImgBg: eui.Image;
        public kGrpCom: eui.Group;

        private mSkinType: number = 1;  // 表示 背景类型 0、1、2 
        private mShowModel: number = 1; // 表示 翻卡的模式 0：常规发音版翻卡游戏 1：绘本故事版翻卡游戏
        private mWords: string[] = ["chicken", "cow", "sheep"];
        private mPictureCount: number = 3;
        constructor() {
            super();
            this.skinName = "LetsThinkSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            this.kImgBg.source = `img_bg_${this.mSkinType}_png`;
            if (this.mShowModel == 0) {
                // 需要发音的翻卡游戏
                for (let i = 0; i < this.mWords.length; i++) {
                    let com = new ThinkComponent(i, this.mWords[i]);
                    com.scaleX = com.scaleY = this.mWords.length >= 3 ? 0.8 : 1;
                    com.width = this.mWords.length >= 3 ? 569 : 769;
                    this.kGrpCom.addChild(com);
                }
            } else {
                // 不需要发音的翻卡游戏
                for (let i = 0; i < this.mPictureCount; i++) {
                    let com = new ThinkComPictureBook(i);
                    com.scaleX = com.scaleY = this.mPictureCount >= 3 ? 0.8 : 1;
                    com.width = this.mPictureCount >= 3 ? 569 : 769;
                    this.kGrpCom.addChild(com);
                }
            }
        }
    }
} 