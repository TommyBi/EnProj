module game {
	export class PlayItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "PlayItemSkin";
		}

		kImg: eui.Image;

		isAnswer = 0;
		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
		setData(img, isAnswer?) {
			this.isAnswer = isAnswer;
			this.kImg.source = img;
		}

		onClick() {
			XDFFrame.EventCenter.sendEvent(EventConst.btnSelect, { target: this.isAnswer, index: this.name });
		}
	}
}