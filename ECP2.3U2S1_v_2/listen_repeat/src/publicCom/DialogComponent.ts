namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        public mIdx: number;
        private mArr: string[] = [
            "I’m good at skiing.",
            "Wonderful!",
            "I’m flying!",
            "I’m good at sledding.",
            "You are great.",
            "I’m good at skating.",
            "You are a good skater!",
            "I’m good at everything.",
            "That’s my girl.",
        ];

        public constructor() {
            super();
            this.skinName = "DialogComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {

        }

        private light(): void {
            this.klbl.textColor = 0xe66b27;
        }

        private normal(): void {
            this.klbl.textColor = 0x561108;
        }

        private setData(idx: number): void {
            this.mIdx = idx;
            if (this.mIdx == -1) {
                this.klbl.text = "";
            } else {
                this.klbl.text = this.mArr[idx];
            }
        }
    }

}