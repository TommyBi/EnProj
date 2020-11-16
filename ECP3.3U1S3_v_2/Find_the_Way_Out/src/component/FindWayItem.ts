module game {
	export class FindWayItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		kLb: eui.Label;
		kSide: eui.Image;

		id: number = 0;
		protected childrenCreated(): void {
			super.childrenCreated();
			this.touchEnabled = true;
			this.touchChildren = false;
			this.validateNow();
		}
		private txt = [
			"He is Korean.",
			"She is Vietnamese.",
			"She is Vietnamese.",
			"He is Korean.",
			"We speak Korean and English.",
			"We speak Korean and Vietnamese.",
		]

		onClick(e) {
			XDFFrame.EventCenter.sendEvent(EventConst.eventBtn, this.id);
		}
		setData(id) {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.id = id;
			this.kLb.text = this.txt[id];
			// switch (id) {
			// 	case 1:
			// 		break;
			// 	case 2:
			// 		this.kLb.text = this.txt[id - 1];
			// 		break;
			// 	case 3:
			// 		this.kLb.text = this.txt[id - 1];
			// 		break;
			// 	case 4:
			// 		this.kLb.text = this.txt[id - 1];
			// 		break;
			// 	case 5:
			// 		this.kLb.text = this.txt[id - 1];
			// 		break;
			// 	case 5:
			// 		this.kLb.text = this.txt[id - 1];
			// 		break;
			// }
		}
		mInter = 0;
		sildeAnim() {
			let self = this;
			this.kSide.visible = true;
			this.mInter = setInterval(() => {
				self.kSide.visible = !self.kSide.visible;
			}, 150)
		}

		hideSide() {
			clearInterval(this.mInter);
			this.kSide.visible = false;

		}
	}
}