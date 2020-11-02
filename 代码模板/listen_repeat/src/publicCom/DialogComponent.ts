namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        public mIdx: number;
        private mArr: string[] = [
            "It's rainy.",
            "I'm wearing a raincoat.",
            "I'm wearing boots.",
            "It's hot.",
            "I'm wearing sunglasses.",
            "I'm wearing sandals.",
            "It's hot and rainy.",
            "What are you wearing today?"
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