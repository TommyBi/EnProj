namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        public mIdx: number;
        private mArr: string[] = [
            "I'm on vacation in the desert.",
            "I'm so thirsty.",
            "Mr. Camel, where is an oasis?",
            "I don't know.",
            "We keep water in our bodies.",
            "Mr. Cactus, where is an oasis?",
            "I don't know.",
            "We keep water in our bodies.",
            "I've found it.",
            "This is an oasis."
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