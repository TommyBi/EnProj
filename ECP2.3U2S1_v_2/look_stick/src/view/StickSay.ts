module game {
	export class StickSay extends BaseView {
		public constructor() {
			super();
			this.skinName = "StickSaySkin";
		}
		public kComReplay: game.ReplayComponent;
		public kComAnswer: game.AnswerComponent;
		public kAnswer1: eui.Group;
		public kAnswer2: eui.Group;
		public kAnswer3: eui.Group;

		public mRole1: XDFFrame.DBAnim;
		public mRole2: XDFFrame.DBAnim;
		public mRole3: XDFFrame.DBAnim;
		public mRole4: XDFFrame.DBAnim;
		public mRole5: XDFFrame.DBAnim;
		public mRole6: XDFFrame.DBAnim;
		public mRole7: XDFFrame.DBAnim;
		public mRole8: XDFFrame.DBAnim;
		kBtn: game.BtnSelect;
		kAnimGp: eui.Group;
		kSide1: eui.Image;
		kSide2: eui.Image;
		kSide3: eui.Image;

		sideList = [];
		answerList = [];
		private mSmokeAnimPos: any[] = [
			{
				x: 1283,
				y: 376,
			}, {
				x: 1128,
				y: 596,
			}, {
				x: 1207,
				y: 857,
			}
		];

		init() {
			super.init();

			this.mRole1 = XDFFrame.DBFactory.createAnim("anim1");
			this.mRole1.setProtery({ x: 300, y: 250, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.mRole2 = XDFFrame.DBFactory.createAnim("anim2");
			this.mRole2.setProtery({ x: 200, y: 480, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.mRole3 = XDFFrame.DBFactory.createAnim("anim3");
			this.mRole3.setProtery({ x: 300, y: 800, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.mRole4 = XDFFrame.DBFactory.createAnim("anim4");
			this.mRole4.setProtery({ x: 550, y: 400, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.mRole5 = XDFFrame.DBFactory.createAnim("anim5");
			this.mRole5.setProtery({ x: 650, y: 600, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.mRole6 = XDFFrame.DBFactory.createAnim("anim6");
			this.mRole6.setProtery({ x: 850, y: 300, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.mRole7 = XDFFrame.DBFactory.createAnim("anim7");
			this.mRole7.setProtery({ x: 850, y: 500, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.mRole8 = XDFFrame.DBFactory.createAnim("anim8");
			this.mRole8.setProtery({ x: 800, y: 800, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });

			this.mRole1.play(null,0);
			this.mRole2.play(null,0);
			this.mRole3.play(null,0);
			this.mRole4.play(null,0);
			this.mRole5.play(null,0);
			this.mRole6.play(null,0);
			this.mRole7.play(null,0);
			this.mRole8.play(null,0);

			XDFFrame.EventCenter.addEventListenr(EventConst.btnSelect, this.onSelect, this);
			this.sideList = [this.kSide1, this.kSide2, this.kSide3];
			this.answerList = [this.kAnswer1, this.kAnswer2, this.kAnswer3];
			this.kBtn.random();
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
			// this.playAnim(this.answerList[this.currentIndex - 1]);
			this.sildeAnim(this.sideList[this.currentIndex - 1], this.answerList[this.currentIndex - 1]);
		}
		onReplay() {
			super.onReplay();
			this.kBtn.reset();
			this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
			this["kGp1"].visible = true;
			this["kGp2"].visible = true;
			this["kGp3"].visible = true;
			this["kTarget1"].visible = this["kTarget2"].visible = this["kTarget3"].visible = false;
			this.kAnswer1.visible = this.kAnswer3.visible = this.kAnswer2.visible = false;
			this.isStart = true;
			this.kBtn.random();
			this.onNext();
		}

		onClick(e: egret.TouchEvent) {
			super.onClick(e);
		}

		playAnim(awswer: eui.Group) {
			// awswer.scaleX = awswer.scaleY = 0;
			// awswer.visible = true;
			// egret.Tween.get(awswer).to({ scaleX: 1, scaleY: 1 }, 500).call(() => {
			// 	egret.Tween.removeTweens(awswer);
			// });
		}

		mInter = 0;
		mInter1 = 0;
		private sildeAnim(side, awser) {
			let self = this;
			side.visible = true;
			awser.visible = true;
			this.mInter = setInterval(() => {
				side.visible = !side.visible;
			}, 150)
			this.mInter1 = setInterval(() => {
				awser.visible = !awser.visible;
			}, 300)
		}

		hideSide() {
			clearInterval(this.mInter);
			clearInterval(this.mInter1);
			this.kSide1.visible = this.kSide2.visible = this.kSide3.visible = false;
			this.kAnswer1.visible = this.kAnswer2.visible = this.kAnswer3.visible = false;

		}
		hideHui() {
			switch (this.currentIndex) {
				case 1:
					this["kGp1"].visible = false;
					this["kTarget1"].visible = true;
					break;
				case 2:
					this["kTarget2"].visible = true;
					this["kGp2"].visible = false;
					break;
				case 3:
					this["kTarget3"].visible = true;
					this["kGp3"].visible = false;

					break;
			}
		}
		over() {
			super.over();
		}
	}
}