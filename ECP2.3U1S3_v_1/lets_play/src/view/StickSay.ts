module game {
	export class StickSay extends BaseView {
		public constructor() {
			super();
			this.skinName = "StickSaySkin";
		}
		public kComReplay: game.ReplayComponent;
		public kComAnswer: game.AnswerComponent;
		public kComWordsPanel: game.WordsPanelCom;
		public kGrpSmokeAnim: eui.Group;
		public kAnim1: eui.Group;
		public kAnim2: eui.Group;
		public kAnim3: eui.Group;
		public kAnim0: eui.Group;
		public kAnswer1: eui.Group;
		public kAnswer2: eui.Group;
		public kAnswer3: eui.Group;

		public mAnimRole0: XDFFrame.DBAnim;
		public mAnimRole1: XDFFrame.DBAnim;
		public mAnimRole2: XDFFrame.DBAnim;
		public mAnimRole3: XDFFrame.DBAnim;
		public mAnimSmoke: XDFFrame.DBAnim;
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

			this.mAnimRole0 = XDFFrame.DBFactory.createAnim("boy");
			this.mAnimRole0.setProtery({ x: 0, y: 0, parent: this.kAnim1, scaleX: 1.2, scaleY: 1.2 });
			this.mAnimRole1 = XDFFrame.DBFactory.createAnim("girl");
			this.mAnimRole1.setProtery({ x: 0, y: 0, parent: this.kAnim2, scaleX: 1.2, scaleY: 1.2 });
			this.mAnimRole2 = XDFFrame.DBFactory.createAnim("girls");
			this.mAnimRole2.setProtery({ x: 0, y: 0, parent: this.kAnim3, scaleX: 1.2, scaleY: 1.2 });
			this.mAnimRole3 = XDFFrame.DBFactory.createAnim("monkey");
			this.mAnimRole3.setProtery({ x: 0, y: 0, parent: this.kAnim0, scaleX: 1.2, scaleY: 1.2 });

			this.mAnimSmoke = XDFFrame.DBFactory.createAnim("db_stick_smoke");
			this.mAnimSmoke.setProtery({ x: 400, y: 480, parent: this.kGrpSmokeAnim, scaleX: 1.5, scaleY: 1.5 });

			XDFFrame.EventCenter.addEventListenr(EventConst.btnSelect, this.onSelect, this);

			this.sideList = [this.kSide1, this.kSide2, this.kSide3];
			this.answerList = [this.kAnswer1, this.kAnswer2, this.kAnswer3];

			// 单词
			this.kComWordsPanel.setData([
				{
					words: "giraffe",
					imgSrc: "animal_1_png",
					soundSrc: "giraffe_mp3",
					scaleX: 0.4,
					scaleY: 0.4
				}, {
					words: "elephant",
					imgSrc: "animal_2_png",
					soundSrc: "elephant_mp3",
					scaleX: 0.4,
					scaleY: 0.4
				}, {
					words: "monkey",
					imgSrc: "animal_3_png",
					soundSrc: "monkey_mp3",
					scaleX: 0.4,
					scaleY: 0.4
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
				this.hideSide();
				this.playSuccess();
				this.playSmoke(this.mSmokeAnimPos[this.currentIndex - 1]);
				this.hideHui()
			} else {
				this.playErr();
			}
		}
		onNext() {
			this.playAnim(this.answerList[this.currentIndex - 1]);
			this.sildeAnim(this.sideList[this.currentIndex - 1]);
		}
		onReplay() {
			super.onReplay();
			this.kBtn.reset();
			this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
			this["kGp1"].visible = true;
			this["kGp2"].visible = true;
			this["kGp3"].visible = true;
			this.kAnswer1.visible = this.kAnswer3.visible = this.kAnswer2.visible = false;
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

		playAnim(awswer: eui.Group) {
			awswer.scaleX = awswer.scaleY = 0;
			awswer.visible = true;
			egret.Tween.get(awswer).to({ scaleX: 1, scaleY: 1 }, 500).call(() => {
				egret.Tween.removeTweens(awswer);
			});
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
					this.imgAnim1();
					this.mAnimRole0.play(null, 1, () => {
					}, this);
					break;
				case 2:
					this.imgAnim2();
					this.mAnimRole1.play(null, 1, () => {
					}, this);
					this["kGp2"].visible = false;
					break;
				case 3:
					this.mAnimRole3.play(null, 1, () => {
					}, this);
					this.mAnimRole2.play(null, 1, () => {
					}, this);
					this["kGp3"].visible = false;

					break;
			}
		}
		kImg1: eui.Image;
		kImg2: eui.Image;
		imgAnim1() {
			egret.Tween.get(this.kImg1).to({ rotation: 9 }, 500).to({ rotation: 0 }, 500).call(() => {
				egret.Tween.removeTweens(this.kImg1);
			})
		}
		imgAnim2() {
			egret.Tween.get(this.kImg2).to({ rotation: 30 }, 500).to({ rotation: 0 }, 500).call(() => {
				egret.Tween.removeTweens(this.kImg2);
			})
		}
		over() {
			super.over();
		}
	}
}