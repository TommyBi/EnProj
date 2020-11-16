module game {
	export class StickSay extends BaseView {
		public constructor() {
			super();
			this.skinName = "StickSaySkin";
		}
		public kComWordsPanel: game.WordsPanelCom;
		public kGrpSmokeAnim: eui.Group;
		public kAnim1: eui.Group;
		public kAnim2: eui.Group;
		public kGp1: eui.Group;
		public kGp2: eui.Group;
		public kGp3: eui.Group;

		public mAnimRole0: XDFFrame.DBAnim;
		public mAnimRole1: XDFFrame.DBAnim;
		kBtn: game.BtnSelect;

		kSide1: eui.Image;
		kSide2: eui.Image;
		kSide3: eui.Image;

		sideList = [];
		answerList = [];
		private mSmokeAnimPos: any[] = [
			{
				x: 600,
				y: 650,
			}, {
				x: 1025,
				y: 160,
			}, {
				x: 1404,
				y: 486,
			}
		];

		init() {
			super.init();
			XDFFrame.EventCenter.addEventListenr(EventConst.touchFlag, this.onChangeWordsPanelAction, this);

			this.mAnimRole0 = XDFFrame.DBFactory.createAnim("girl");
			this.mAnimRole0.setProtery({ x: 0, y: 0, parent: this.kAnim1, scaleX: 2, scaleY: 2 });
			this.mAnimRole1 = XDFFrame.DBFactory.createAnim("boy");
			this.mAnimRole1.setProtery({ x: 0, y: 0, parent: this.kAnim2, scaleX: 2, scaleY: 2 });

			XDFFrame.EventCenter.addEventListenr(EventConst.btnSelect, this.onSelect, this);

			this.sideList = [this.kSide1, this.kSide2, this.kSide3];
			// this.answerList = [this.kAnswer1, this.kAnswer2, this.kAnswer3];
			// 单词
			this.kComWordsPanel.setData([
				{
					words: "Vietnamese",
					imgSrc: "stick_6_png",
					soundSrc: "vietnamese_mp3",
					scaleX: 1.6,
					scaleY: 1.6
				}, {
					words: "Korean",
					imgSrc: "stick_16_png",
					soundSrc: "korean_mp3",
					scaleX: 1.6,
					scaleY: 1.6
				}
			])
		}

		onStart() {
			super.onStart();
			// this.sildeAnim(this.sideList[this.currentIndex - 1]);
			this.onNext();
			this.playSound(this.currentIndex, () => {
				// this.initImgTween();
			})
		}

		onSelect(e: egret.Event) {
			if (!this.isStart) return;
			if (e.data == this.currentIndex) {
				this.kBtn.hide(this.currentIndex);
				this.playSuccess();
				this.hideSide();
				this.hideHui()
			} else {
				this.playErr();
			}
		}
		onNext() {
			this.mAnimRole0.stop();
			this.mAnimRole1.stop();
			this.sildeAnim(this.sideList[this.currentIndex - 1]);
			if (this.currentIndex == 3) {
				let self = this;
				let t = setTimeout(function () {
					clearTimeout(t);
					self.hideSide();
					self.hideHui()
					self.playSuccess(false);
				}, 4000);
			} else if (this.currentIndex == 1) {
				this.mAnimRole0.play(null, 0);
			} else {
				this.mAnimRole1.play(null, 0);
			}
		}
		onReplay() {
			super.onReplay();
			this.kBtn.reset();
			this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
			this["kGp1"].visible = true;
			this["kGp2"].visible = true;
			this["kGp3"].visible = true;
			this.touchChildren = true;
			this.isStart = true;
			// this.kGp1.visible = this.kAnswer3.visible = this.kAnswer2.visible = false;
			this.onNext();
		}
		/** 是否开始显示单词 */
		private onChangeWordsPanelAction(): void {
			this.kComWordsPanel.playAction();
		}

		onClick(e: egret.TouchEvent) {
			super.onClick(e);
			this.kComWordsPanel.hide();
		}

		mInter = 0;
		private sildeAnim(side) {
			let self = this;
			side.visible = true;
			this.mInter = setInterval(() => {
				side.visible = !side.visible;
			}, 150)
		}

		hideSide() {
			clearInterval(this.mInter);
			this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;

		}
		hideHui() {
			switch (this.currentIndex) {
				case 1:
					this["kGp1"].visible = false;
					break;
				case 2:
					this["kGp2"].visible = false;
					break;
				case 3:
					this["kGp3"].visible = false;

					break;
			}
		}
		kImg1: eui.Image;
		kImg2: eui.Image;
		over() {
			super.over();
		}
	}
}