namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        public mIdx: number;
        private mArr: string[] = [
            "It's La Tomatina in Spain.",
            "People throw tomatoes at each other.",
            "it's Halloween in the U.S.",
            "Kids in costumes get lots of candy.",
            "It's the Carnival of Venice in Italy.",
            "Everyone wears a mask and a costume."
        ];
        // [690, 47]
        private mSizeCfg: any[] = [
            [690, 94],
            [600, 94],
            [690, 94],
            [490, 94],
            [420, 94],
            [560, 94],
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
                this.klbl.width = this.mSizeCfg[idx][0];
                this.klbl.height = this.mSizeCfg[idx][1];
            }
        }
    }

}