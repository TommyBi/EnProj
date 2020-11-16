namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        public mIdx: number;
        private mArr: string[] = [
            "It’s cold outside.",
            "It’s fun outside.",
            "It’s snowy outside.",
            "It’s fun in the winter.",
            "We like winter.",
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