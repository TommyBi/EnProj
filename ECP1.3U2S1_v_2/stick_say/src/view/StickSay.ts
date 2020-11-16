module game {
	export class StickSay extends BaseView {
		public constructor() {
			super();
			this.skinName = "StickSaySkin";
		}
		public kComAnswer: game.AnswerComponent;
		public kComWordsPanel: game.WordsPanelCom;
		public kGrpSmokeAnim: eui.Group;
		public kAnim: eui.Group;
		public kAnswer1: eui.Group;
		public kAnswer2: eui.Group;
		public kAnswer3: eui.Group;

		public mRole1: XDFFrame.DBAnim;
		public mRole2: XDFFrame.DBAnim;
		public mRole3: XDFFrame.DBAnim;
		public mRole4: XDFFrame.DBAnim;
		public mRole5: XDFFrame.DBAnim;
		public mDog: XDFFrame.DBAnim;
		public mSnow1: XDFFrame.DBAnim;
		public mSnow2: XDFFrame.DBAnim;
		kBtn: game.BtnSelect;

		kSide1: eui.Image;
		kSide2: eui.Image;
		kSide3: eui.Image;
		kImg3: eui.Image;

		sideList = [];
		answerList = [];
		private mSmokeAnimPos: any[] = [
			{
				x: 442,
				y: 773,
			}, {
				x: 542,
				y: 294,
			}, {
				x: 1063,
				y: 312,
			}
		];
		init() {
			super.init();
			XDFFrame.EventCenter.addEventListenr(EventConst.touchFlag, this.onChangeWordsPanelAction, this);

			XDFFrame.EventCenter.addEventListenr(EventConst.btnSelect, this.onSelect, this);

			this.sideList = [this.kSide1, this.kSide2, this.kSide3];
			this.answerList = [this.kAnswer1, this.kAnswer2, this.kAnswer3];

			this.mRole1 = XDFFrame.DBFactory.createAnim("role1");
			this.mRole1.setProtery({ x: 500, y: 550, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });
			this.mRole2 = XDFFrame.DBFactory.createAnim("role2");
			this.mRole2.setProtery({ x: 860, y: 550, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });
			this.mRole3 = XDFFrame.DBFactory.createAnim("role3");
			this.mRole3.setProtery({ x: 930, y: 840, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });
			this.mRole4 = XDFFrame.DBFactory.createAnim("role4");
			this.mRole4.setProtery({ x: 450, y: 850, parent: this.kAnim, scaleX: 1.5, scaleY: 1.5 });
			this.mRole5 = XDFFrame.DBFactory.createAnim("role5");
			this.mRole5.setProtery({ x: 540, y: 300, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });
			this.mSnow1 = XDFFrame.DBFactory.createAnim("snow1");
			this.mSnow1.setProtery({ x: 1000, y: 400, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });
			this.mSnow2 = XDFFrame.DBFactory.createAnim("snow2");
			this.mSnow2.setProtery({ x: 600, y: 400, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });
			this.mDog = XDFFrame.DBFactory.createAnim("dog");
			this.mDog.setProtery({ x: 1000, y: 650, parent: this.kAnim, scaleX: 1.6, scaleY: 1.6 });

			this.mSnow1.visible = false;
			this.mSnow2.visible = false;

			this.mRole1.play(null, 0);
			this.mRole2.play(null, 0);
			this.mRole3.play(null, 0);
			this.mDog.play(null, 0);
			this.mRole1.setSpeed();
			this.mRole2.setSpeed();
			this.mRole3.setSpeed();
			this.mRole4.setSpeed();
			this.mRole5.setSpeed();

			// 单词
			this.kComWordsPanel.setData([
				{
					words: "cold",
					imgSrc: "stick_13_png",
					soundSrc: "cold_mp3",
					scaleX: 0.7,
					scaleY: 0.7
				}, {
					words: "snowy",
					imgSrc: "stick_14_png",
					soundSrc: "snowy_mp3",
					scaleX: 0.7,
					scaleY: 0.7
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
			this.isStart = true;
			this.kBtn.reset();
			this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
			this["kGp1"].visible = true;
			this["kGp2"].visible = true;
			this["kGp3"].visible = true;
			this.kAnswer1.visible = this.kAnswer3.visible = this.kAnswer2.visible = false;
			this.mSnow1.visible = false;
			this.mSnow2.visible = false;
			this.kImg3.visible = false;
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
					this.mRole4.play(null, 2);
					break;
				case 2:
					this.mRole5.play(null, 2);
					this.mSnow2.play(null, 1);
					this.mSnow2.visible = true;
					this["kGp2"].visible = false;
					break;
				case 3:
					this["kGp3"].visible = false;
					this.mSnow1.visible = true;
					this.mSnow1.play(null, 1);
					this.kImg3.visible = true;
					break;
			}
		}
		over() {
			super.over();
		}
	}
}