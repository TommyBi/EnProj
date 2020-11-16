module game {
	export class BtnSelect extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "BtnSelectSkin";
		}
		kGp: eui.Group;

		mArr = [{ x: 0, y: 0 }, { x: 219, y: 0 }, { x: 438, y: 0 }]

		protected childrenCreated(): void {
			super.childrenCreated();
			this.init()
		}

		private init() {
			for (let i = 0; i < this.kGp.numChildren; i++) {
				this.kGp.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelcet, this);
			}
		}
		random() {
			let arr = Util.cloneArr(this.mArr);
			for (let i = 0; i < this.kGp.numChildren; i++) {
				this.kGp.getChildAt(i).x = arr[i].x;
				this.kGp.getChildAt(i).y = arr[i].y;
			}
		}

		onSelcet(e: egret.TouchEvent) {
			XDFFrame.EventCenter.sendEvent(EventConst.btnSelect, e.target.name);
		}
		hide(index) {
			for (let i = 0; i < this.kGp.numChildren; i++) {
				if (this.kGp.getChildAt(i).name == index) {
					this.kGp.getChildAt(i).visible = false;
				}
			}
		}
		reset() {
			for (let i = 0; i < this.kGp.numChildren; i++) {
				this.kGp.getChildAt(i).visible = true;
			}
		}
	}
}