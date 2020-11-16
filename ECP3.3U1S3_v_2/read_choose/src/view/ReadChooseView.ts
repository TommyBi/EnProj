module game {
	export class ReadChooseView extends ChooseBaseView {
		public constructor() {
			super();
			this.skinName = "ReadChooseViewSkin";
		}
		kYes1: eui.Image;
		kSide1: eui.Image;
		kRight1: eui.Group;
		kLost1: eui.Group;
		kRight2: eui.Group;
		kLost2: eui.Group;
		kRight3: eui.Group;
		kLost3: eui.Group;
		kAnswer1: eui.Label;
		kAnswerAnim1: eui.Label;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		onStart() {
			super.onStart();
			this.onNext();
			this.playSound(this.currentIndex, () => {
			})
		}
		onReplay() {
			for (let i = 1; i < 4; i++) {
				this["kAnswerAnim" + i].visible = false;
				this["kSide" + i].visible = false;
				this["kYes" + i].visible = false;
			}
			super.onReplay();
		}

		onNext() {
			this["kAnswer" + this.currentIndex].visible = false;
			this["kAnswerAnim" + this.currentIndex].visible = true;
			this["kSide" + this.currentIndex].visible = true;
			this.txtAnim();
			if (this.currentIndex > 1) {
				this["kRight" + (this.currentIndex - 1)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
				this["kLost" + (this.currentIndex - 1)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
			}

			switch (this.currentIndex) {
				case 1:
					this.kRight1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
					this.kLost1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
					break;
				case 2:
					this.kRight2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
					this.kLost2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
					break;
				case 3:
					this.kRight3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
					this.kLost3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);
					break;
			}
		}
		onRight() {

			this["kYes" + this.currentIndex].visible = true;
			this["kAnswer" + this.currentIndex].visible = true;
			this.removeAnim();
			this.playSuccess();
		}
		onLost() {
			this.playErr();
		}

		txtAnim() {
			this["kAnswerAnim" + this.currentIndex].scaleX = this["kAnswerAnim" + this.currentIndex].scaleY = 1;
			egret.Tween.get(this["kAnswerAnim" + this.currentIndex], { loop: true })
				.to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
		}
		removeAnim() {
			egret.Tween.removeTweens(this["kAnswerAnim" + this.currentIndex]);
			this["kSide" + this.currentIndex].visible = false;
			this["kAnswerAnim" + this.currentIndex].visible = false;
		}
		over() {
			super.over();
			this["kRight" + (this.currentIndex)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
			this["kLost" + (this.currentIndex)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLost, this);

		}
	}
}