namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        public mIdx: number;
        private mArr: string[] = [
            "I live in a cold place.",
            "I dress very warmly.",
            "I live in a hot place.",
            "I dress very lightly.",
            "My house is made of snow.",
            "My house is made of plants.",
            "I always go sledding.",
            "I always go swimming.",
            "I have a dream.",
            "Someday i want to swim.",
            "Someday i want to ski."
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