namespace game {
    export class LetsThinkView extends eui.Component {

        public kGrpCom: eui.Group;
        public kComThink: game.ThinkComponent;

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
            for (let i = 0; i < this.mWords.length; i++) {
                let com = new ThinkComponent(i, this.mWords[i]);
                com.scaleX = com.scaleY = this.mWords.length > 3 ? 0.7 : 1;
                this.kGrpCom.addChild(com);
            }
        }
    }
} 