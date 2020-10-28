namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        private mIdx: number;
        private mArr: string[] = [
            "It’s La Tomatina in Spain.",
            "People throw tomatoes at each other.",
            "It‘s HallowWeen in the U.S",
            "Kits in costumes get lots of candy.",
            "It‘s the Carnival of Venice in Italy.",
            "Everyone wears a mask and a costume."
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