namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        private mIdx: number;
        private mArr: string[] = [
            "Cows do nothing.",
            "That's not true.",
            "Cows give us milk.",
            "Chickens do nothing.",
            "Chickens give us eggs.",
            "Sheep do nothing.",
            "Sheep give us eggs.",
            "All the animals work very hard."
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
            this.klbl.text = this.mArr[idx];
        }
    }

}