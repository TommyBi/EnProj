namespace game {
    export class LetsThinkView extends eui.Component {

        public kImgBg: eui.Image;
        public kGrpCom: eui.Group;

        private mSkinType: number = 0;
        private mWords: string[] = ["aaa", "bbb", "ccc", "ddd"];
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
            for (let i = 0; i < this.mWords.length; i++) {
                let com = new ThinkComponent(i, this.mWords[i]);
                com.scaleX = com.scaleY = this.mWords.length > 3 ? 0.7 : 1;
                this.kGrpCom.addChild(com);
            }
        }
    }
} 