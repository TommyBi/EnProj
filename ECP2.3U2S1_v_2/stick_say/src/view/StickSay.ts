module game {
	export class StickSay extends BaseView {
		public constructor() {
			super();
			this.skinName = "StickSaySkin";
		}
		public kComReplay: game.ReplayComponent;
		public kComAnswer: game.AnswerComponent;
		public kComWordsPanel: game.WordsPanelCom;
		public kAnswer1: eui.Group;
		public kAnswer2: eui.Group;
		public kAnswer3: eui.Group;

		public mRole1: XDFFrame.DBAnim;
		public mRole2: XDFFrame.DBAnim;
		public mRole3: XDFFrame.DBAnim;
		public mRole4: XDFFrame.DBAnim;
		public mRole5: XDFFrame.DBAnim;
		public mRole6: XDFFrame.DBAnim;
		kBtn: game.BtnSelect;
		kAnimGp: eui.Group;
		kSide1: eui.Image;
		kSide2: eui.Image;
		kSide3: eui.Image;

		sideList = [];
		answerList = [];
		private mSmokeAnimPos: any[] = [
			{
				x: 296,
				y: 695,
			}, {
				x: 897,
				y: 666,
			}, {
				x: 1212,
				y: 530,
			}
		];

		init() {
			super.init();
			XDFFrame.EventCenter.addEventListenr(EventConst.touchFlag, this.onChangeWordsPanelAction, this);

			this.mRole1 = XDFFrame.DBFactory.createAnim("role1");
			this.mRole1.setProtery({ x: 500, y: 300, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.mRole2 = XDFFrame.DBFactory.createAnim("role2");
			this.mRole2.setProtery({ x: 900, y: 300, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.mRole3 = XDFFrame.DBFactory.createAnim("role3");
			this.mRole3.setProtery({ x: 1300, y: 400, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.mRole4 = XDFFrame.DBFactory.createAnim("role4");
			this.mRole4.setProtery({ x: 300, y: 700, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.mRole5 = XDFFrame.DBFactory.createAnim("role5");
			this.mRole5.setProtery({ x: 1200, y: 550, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.mRole6 = XDFFrame.DBFactory.createAnim("role6");
			this.mRole6.setProtery({ x: 880, y: 650, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });

			XDFFrame.EventCenter.addEventListenr(EventConst.btnSelect, this.onSelect, this);
			this.mRole4.visible = this.mRole5.visible = this.mRole6.visible = false;
			this.sideList = [this.kSide1, this.kSide2, this.kSide3];
			this.answerList = [this.kAnswer1, this.kAnswer2, this.kAnswer3];

			// 单词
			this.kComWordsPanel.setData([
				{
					words: "ski",
					imgSrc: "stick_11_png",
					soundSrc: "ski_mp3",
					scaleX: 1,
					scaleY: 1
				}, {
					words: "sled",
					imgSrc: "stick_12_png",
					soundSrc: "sled_mp3",
					scaleX: 1,
					scaleY: 1
				}, {
					words: "skate",
					imgSrc: "stick_13_png",
					soundSrc: "skat_mp3",
					scaleX: 1,
					scaleY: 1
				}
			])
		}

		onStart() {
			super.onStart();
			// this.sildeAnim(this.sideList[this.currentIndex - 1]);
			this.mRole3.play(null, 0);
			this.mRole2.play(null, 0);
			this.mRole1.play(null, 0);
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
			this.isStart = true;
			this.mRole4.visible = this.mRole5.visible = this.mRole6.visible = false;
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
					this.mRole4.visible = true;
					this.mRole4.play(null, 1, () => {
					}, this);
					break;
				case 2:
					this.mRole6.visible = true;
					this.mRole6.play(null, 1, () => {
					}, this);
					this["kGp2"].visible = false;
					break;
				case 3:
					this.mRole5.visible = true;
					this.mRole5.play(null, 1, () => {
					}, this);
					this["kGp3"].visible = false;

					break;
			}
		}
		over() {
			super.over();
		}
	}
}