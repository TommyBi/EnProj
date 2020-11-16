module game {
	export class BtnSelect extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "BtnSelectSkin";
		}
		kGp: eui.Group;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.init()
		}

		private init() {
			for (let i = 0; i < this.kGp.numChildren; i++) {
				this.kGp.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelcet, this);
			}
		}

		onSelcet(e: egret.TouchEvent) {
			XDFFrame.EventCenter.sendEvent(EventConst.btnSelect, e.target.name);
		}
		hide(index) {
			this.kGp.getChildAt(index - 1).visible = false;
		}
		reset() {
			for (let i = 0; i < this.kGp.numChildren; i++) {
				this.kGp.getChildAt(i).visible = true;
			}
		}
	}
}