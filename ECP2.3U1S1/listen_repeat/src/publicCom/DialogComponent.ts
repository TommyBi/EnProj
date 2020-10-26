namespace game {
    /**
     * DialogComponent
     */
    export class DialogComponent extends eui.Component implements eui.UIComponent {

        public klbl: eui.Label;

        private mIdx: number;
        private mArr: string[] = [
            "I have a dog.",
            "I have a cat.",
            "They don't like each other.",
            "I don't like that dog.",
            "I don't like that cat.",
            "Good job, you guys!",
            "I like this dog.",
            "I like this cat."
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