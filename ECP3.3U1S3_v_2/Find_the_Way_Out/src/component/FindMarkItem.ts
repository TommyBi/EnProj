module game {
	export class FindMarkItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "FindMarkItemSkin";
		}

		kAnim: eui.Group;
		kImg: eui.Image;
		kLb: eui.Label;

		anim: XDFFrame.DBAnim;
		protected childrenCreated(): void {
			super.childrenCreated();
		}

		setData(index) {
			switch (index) {
				case 1:
					this.kImg.source = "find_xjl_png";
					this.kLb.text = "giraffe";
					this.anim = XDFFrame.DBFactory.createAnim("find_yx");
					this.anim.setProtery({ x: 0, y: 0, parent: this.kAnim, scaleX: 0.15, scaleY: 0.15 });
					break;
				case 2:
					this.kImg.source = "find_dx_png"
					this.kLb.text = "elephant";
					this.anim = XDFFrame.DBFactory.createAnim("find_sjx");
					this.anim.setProtery({ x: 0, y: 0, parent: this.kAnim, scaleX: 0.2, scaleY: 0.2 });
					break;
				case 3:
					this.kImg.source = "find_hz_png"
					this.kLb.text = "monkey";
					this.anim = XDFFrame.DBFactory.createAnim("find_zfx");
					this.anim.setProtery({ x: 0, y: 0, parent: this.kAnim, scaleX: 0.2, scaleY: 0.2 });
					break;
			}
			this.anim.visible = false;
		}
		play(callBack) {
			this.anim.visible = true;
			this.anim.play(null, 1, () => {
				if (callBack) callBack();
			})
		}
		reset() {
			this.anim.visible = false;
		}
	}
}