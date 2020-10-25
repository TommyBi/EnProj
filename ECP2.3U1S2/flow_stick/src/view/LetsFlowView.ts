module game {
	export class LetsFlowView extends eui.Component implements eui.UIComponent {
		private kImg1: eui.Image;
		private kImg2: eui.Image;
		private kImg3: eui.Image;
		private kGoods1: eui.Image;
		private kGoods2: eui.Image;
		private kGoods3: eui.Image;
		private kGp: eui.Group;
		private kRoadGp: eui.Group;

		kItem1: FlowItem;
		kItem2: FlowItem;
		kItem3: FlowItem;

		kReplay: ReplayComponent;

		kAnswer: AnswerComponent;
		private currentIndex = 0;

		private mStatus1 = 0;
		private mStatus3 = 0;
		private mStatus2 = 0;
		private isOpen = 0;
		private mImgArr = [];
		private mArr = [1, 2, 3];
		private sounds = ["Cows_mp3", "Chickens_mp3", "Sheep_mp3"]
		private yellow_road: XDFFrame.DBAnim;
		private blue_road: XDFFrame.DBAnim;
		private purple_road: XDFFrame.DBAnim;
		public constructor() {
			super();
			this.skinName = "LetsFlowViewSkin"
		}


		protected childrenCreated(): void {
			super.childrenCreated();
			this.mImgArr = [this.kImg1, this.kImg2, this.kImg3];
			this.init();
		}
		private init() {

			this.kReplay.showStart();
			this.kImg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick1, this);
			this.kImg2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick2, this);
			this.kImg3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick3, this);
			this.kGoods1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect1, this);
			this.kGoods2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect2, this);
			this.kGoods3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect3, this);

			XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
			XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReplay, this);

			this.purple_road = XDFFrame.DBFactory.createAnim("purple_road");
			this.purple_road.setProtery({ x: -55, y: -40, parent: this.kRoadGp, scaleX: 1.06, scaleY: 1 });
			this.yellow_road = XDFFrame.DBFactory.createAnim("yellow_road");
			this.yellow_road.setProtery({ x: -30, y: 50, parent: this.kRoadGp, scaleX: 1.15, scaleY: 1 });
			this.blue_road = XDFFrame.DBFactory.createAnim("blue_road");
			this.blue_road.setProtery({ x: 45, y: -120, parent: this.kRoadGp, scaleX: 1.55, scaleY: 1.3 });

			// this.purple_road.play("normal", 1, () => { }, this);
			// this.yellow_road.play("normal", 1, () => { }, this);
			// this.blue_road.play("normal", 1, () => { }, this);
			this.purple_road.gotoAndStopByFrame("purple_road", 0);
			this.yellow_road.gotoAndStopByFrame("yellow_road", 0);
			this.blue_road.gotoAndStopByFrame("blue_road", 0);

		}

		onStart() {
			this.kReplay.visible = false;
			let index = Util.limitInteger(0, this.mArr.length - 1);
			this.currentIndex = this.mArr.splice(index, 1)[0];
			this.playSound(this.currentIndex, () => {
				this.initImgTween();
			})
		}
		onReplay() {
			this.kGoods1.visible = this.kGoods2.visible = this.kGoods3.visible = true;
			this.kAnswer.visible = false;
			this.kReplay.visible = false;
			this.purple_road.gotoAndStopByFrame("purple_road", 0);
			this.yellow_road.gotoAndStopByFrame("yellow_road", 0);
			this.blue_road.gotoAndStopByFrame("blue_road", 0);
			let index = Util.limitInteger(0, this.mArr.length - 1);
			this.currentIndex = this.mArr.splice(index, 1)[0];
			this.playSound(this.currentIndex, () => {
				this.initImgTween();
			})
		}

		private onClick1() {

			if (this.mStatus1) return;
			if (this.currentIndex != 1) {
				this.playErr();
			} else {
				this.mStatus1 = 1;
				this.isOpen = 1;
				this.removeAllImgTween();
				this.onRight();
				this.purple_road.play(null, 1, () => {
					this.kItem1.init(1);
				}, this);
			}
		}
		private onClick2() {
			if (this.mStatus2) return;
			if (this.currentIndex != 2) {
				this.playErr();
			} else {
				this.isOpen = 1;
				this.mStatus2 = 1;
				this.removeAllImgTween();
				this.yellow_road.play(null, 1, () => {
					this.kItem2.init(2);
				}, this);
				this.onRight();
			}

		}
		private onClick3() {
			if (this.mStatus3) return;
			if (this.currentIndex != 3) {
				this.playErr();
			} else {
				this.mStatus3 = 1;
				this.isOpen = 1;
				this.removeAllImgTween();
				this.onRight();
				this.blue_road.play(null, 1, () => {
					this.kItem3.init(3);
				}, this);
			}

		}
		private onSelect1() {
			if (this.mStatus1 && this.currentIndex == 1) {
				//处理动画
			}
			if (this.checkGoods(1)) {
				this.kGoods1.visible = false;
				this.kItem1.over(1);
			}
		}
		private onSelect2() {
			if (this.mStatus2 && this.currentIndex == 2) {
				//处理动画
			}
			if (this.checkGoods(2)) {

				this.kGoods2.visible = false;
				this.kItem2.over(2);
			}
		}
		private onSelect3() {
			if (this.mStatus3 && this.currentIndex == 3) {
				//处理动画
			}
			if (this.checkGoods(3)) {
				this.kGoods3.visible = false;
				this.kItem3.over(3);
			}

		}
		checkGoods(index) {
			if (this.isOpen) {
				if (this.currentIndex == index) {
					//飞行动画
					this.kGp.touchChildren = false;
					XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
						this.kGp.touchChildren = true;
						if (this.mArr.length == 0) {
							this.kAnswer.visible = true;
							this.kAnswer.playGood(() => {
								this.over();
								this.kGp.touchChildren = true;
							});
							return true;
						}
						this.isOpen = 0;
						let idx = Util.limitInteger(0, this.mArr.length - 1)
						let arr = this.mArr.splice(idx, 1);
						this.currentIndex = arr[0];
						this.playSound(this.currentIndex, () => {
							this.kGp.touchChildren = true;
							this.initImgTween();
						})
					});
					return true;
				} else {
					this.playErr();
				}
				return false;
			}
		}

		playErr() {
			this.kAnswer.visible = true;
			this.kGp.touchEnabled = false;
			this.kGp.touchChildren = false;
			this.removeAllImgTween();
			this.kAnswer.playErr(() => {
				this.kAnswer.visible = false;
				let self = this;
				if (!self.isOpen) {
					this.playSound(this.currentIndex, () => {
						this.initImgTween();
					})
				}
				let t = setTimeout(function () {
					clearTimeout(t);
					self.kGp.touchChildren = true;
				}, 1000);
			});
		}

		initImgTween() {
			for (let i = 0; i < this.mArr.length; i++) {
				this.playTween(this.mImgArr[this.mArr[i] - 1]);
			}
			this.playTween(this.mImgArr[this.currentIndex - 1]);
		}

		onRight() {
			this.kGp.touchChildren = false;
			XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
				this.kGp.touchChildren = true;
			});
		}
		playSound(index, callBack) {
			switch (index) {
				case 1:
					XDFSoundManager.play("Cows_mp3", 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
				case 2:
					XDFSoundManager.play("Chickens_mp3", 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
				case 3:
					XDFSoundManager.play("Sheep_mp3", 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
			}
		}

		private removeAllImgTween() {

			egret.Tween.removeTweens(this.kImg1);
			egret.Tween.removeTweens(this.kImg2);
			egret.Tween.removeTweens(this.kImg3);
			this.kImg1.scaleX = this.kImg1.scaleY = 1;
			this.kImg2.scaleX = this.kImg2.scaleY = 1;
			this.kImg3.scaleX = this.kImg3.scaleY = 1;
		}

		private playTween(img) {

			egret.Tween.get(img, { loop: true })
				.to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.cubicInOut)
		}

		over() {
			this.kReplay.visible = true;
			this.kReplay.showReplay();
			this.mArr = [1, 2, 3];
			this.removeAllImgTween();
			this.isOpen = 0;
			this.mStatus1 = this.mStatus2 = this.mStatus3 = 0;
			this.kItem1.reset();
			this.kItem2.reset();
			this.kItem3.reset();
		}
	}
}

module game {
	export class FlowItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "FlowItemSkin";
		}

		kGp1: eui.Group;
		kGp2: eui.Group;
		kGp3: eui.Group;
		kGrpSmokeAnim: eui.Group;

		kSide1: eui.Image;
		kSide2: eui.Image;
		kSide3: eui.Image;
		kImg1: eui.Image;
		kImg2: eui.Image;
		kImg3: eui.Image;

		mInter = 0;
		mAnimSmoke: XDFFrame.DBAnim;
		protected childrenCreated(): void {
			super.childrenCreated();
		}

		init(index) {
			this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
			this.mAnimSmoke.setProtery({ x: 0, y: 0, parent: this.kGrpSmokeAnim, scaleX: 1, scaleY: 1 });
			this.currentState = index;
			let self = this;
			clearInterval(this.mInter);
			switch (index) {
				case 1:
					this.mInter = setInterval(() => {
						self.kSide1.visible = !self.kSide1.visible;
					}, 150)
					break;
				case 2:
					this.mInter = setInterval(() => {
						self.kSide2.visible = !self.kSide2.visible;
					}, 150)
					break;
				case 3:
					this.mInter = setInterval(() => {
						self.kSide3.visible = !self.kSide3.visible;
					}, 150)
					break;
			}
		}
		over(index) {
			this.mAnimSmoke.play(null, 1, () => {
				this.kGrpSmokeAnim.visible = false;
			}, this);
			this.hideSide();
			switch (index) {
				case 1:
					this.kGp1.visible = false;
					this.kImg1.visible = true;
					break;
				case 2:
					this.kGp2.visible = false;
					this.kImg2.visible = true;
					break;
				case 3:
					this.kGp3.visible = false;
					this.kImg3.visible = true;
					break;
			}

		}

		hideSide() {
			clearInterval(this.mInter);
			this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;

		}

		reset() {
			this.hideSide();
			this.kGp1.visible = this.kGp2.visible = this.kGp3.visible = true;
			this.kImg2.visible = this.kImg2.visible = this.kImg3.visible = false;

		}

	}
}