namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        private mIdx: number;
        private mArr: string[] = [
            "Mom! This shirt is too small.",
            "Take off your shirt, Tony.",
            "These pants are too small.",
            "Take off your pants.",
            "I need new clothes.",
            "Put on your shirt.",
            "Put on your pants.",
            "These are for you."
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