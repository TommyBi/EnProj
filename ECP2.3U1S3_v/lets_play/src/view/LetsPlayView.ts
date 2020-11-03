module game {
	export class LetsPlayView extends playBaseView {
		public constructor() {
			super();
			this.skinName = "LetsPlaySkin";
		}
		kItem1: PlayItem;
		kItem2: PlayItem;
		kItem3: PlayItem;
		itemList = [];

		kBird1: eui.Image;
		kBird2: eui.Image;
		kImg1: eui.Image;
		kImg2: eui.Image;
		kImg3: eui.Image;
		imgList = ["animal_1_png", "animal_2_png", "animal_3_png"];
		currImgList = [];

		anim1: XDFFrame.DBAnim;
		anim2: XDFFrame.DBAnim;
		anim3: XDFFrame.DBAnim;
		anim4: XDFFrame.DBAnim;
		anim5: XDFFrame.DBAnim;
		anim6: XDFFrame.DBAnim;
		anim7: XDFFrame.DBAnim;
		lostAnim: XDFFrame.DBAnim;

		birdAnim: egret.tween.TweenGroup;

		currentAnim: XDFFrame.DBAnim;
		mIndex = 1;
		init() {
			super.init();
			this.itemList = [this.kItem1, this.kItem2, this.kItem3];

			XDFFrame.EventCenter.addEventListenr(EventConst.btnSelect, this.onSelect, this);

			this.anim1 = XDFFrame.DBFactory.createAnim("clothes1");
			this.anim1.setProtery({ x: 780, y: 670, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.anim1.play(null, 0);
			this.currentAnim = this.anim1;
			this.anim2 = XDFFrame.DBFactory.createAnim("clothes2");
			this.anim2.setProtery({ x: 930, y: 670, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });

			this.anim3 = XDFFrame.DBFactory.createAnim("clothes3");
			this.anim3.setProtery({ x: 990, y: 670, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });

			this.anim4 = XDFFrame.DBFactory.createAnim("clothes4");
			this.anim4.setProtery({ x: 990, y: 725, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });

			this.anim5 = XDFFrame.DBFactory.createAnim("clothes8", 2);
			this.anim5.setProtery({ x: 690, y: 680, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.anim6 = XDFFrame.DBFactory.createAnim("clothes7", 2);
			this.anim6.setProtery({ x: 840, y: 685, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.anim7 = XDFFrame.DBFactory.createAnim("clothes6");
			this.anim7.setProtery({ x: 990, y: 725, parent: this.kAnimGp, scaleX: 1.5, scaleY: 1.5 });
			this.anim2.visible = this.anim3.visible = this.anim4.visible = false;
			this.anim5.visible = this.anim6.visible = this.anim7.visible = false;

			this.lostAnim = XDFFrame.DBFactory.createAnim("clothes5", 2);
			this.lostAnim.setProtery({ x: 888, y: 570, parent: this.kAnimGp, scaleX: 3, scaleY: 3 });
			this.lostAnim.visible = false;

			egret.Tween.get(this.kBird1, { loop: true }).to({ scaleX: 1.3 }).to({ x: 576, y: 124 },
				700).to({ x: 944, y: 90 }, 700).to({ x: 1358, y: 178 }, 700).to({
					x: 1700,
					y: 166
				}, 700).wait(1000).to({ scaleX: -1.3 }).to({ x: 1248, y: 68 },
				700).to({ x: 814, y: 142 }, 700).to({ x: 328, y: 64 }, 700).to({ x: 78, y: 124 }, 700).wait(1000);
			egret.Tween.get(this.kBird2, { loop: true }).wait(1000).to({ x: 1355, y: 392 },
				700).to({ x: 1005, y: 300 }, 700).to({ x: 653, y: 364 }, 700).to({
					x: 207,
					y: 478
				}, 700).wait(1000)

		}

		onStart() {
			super.onStart();
			this.currentAnim.stop();
			this.currentAnim.visible = false;

			this.onNext();
			this.currentAnim = this.anim1;
			this.currentAnim.play(null, 0);
			this.currentAnim.visible = true;
			this.onNext();
			this.playSound(this.currentIndex, () => {
				// this.initImgTween();
			})

		}

		onSelect(e: egret.Event) {
			if (!this.isStart) return;
			if (e.data) {
				this.mIndex++;
				XDFSoundManager.play("sound_ding_mp3", 0, 1, 1, "", () => {
				});
				this.touchChildren = false;
				let self = this;
				self.getClothes(() => {
					self.playSuccess();
					// this.touchChildren = true;
					self.switchAnim();
				})
			} else {
				this.playErr();
			}
		}
		getClothes(call) {
			this.currentAnim.stop();
			this.currentAnim.visible = false;
			SoundManager.ins.playBg("girl_mp3");
			let anim: XDFFrame.DBAnim;
			if (this.mIndex == 2) {
				anim = this.anim5;
			} else if (this.mIndex == 3) {
				anim = this.anim6;
			} else {
				anim = this.anim7;
			}
			anim.visible = true;
			anim.play(null, 1, () => {
				if (call) call();
				anim.visible = false;
			}, this);
		}
		switchAnim() {
			if (this.mIndex == 2) {
				this.currentAnim = this.anim2;
			} else if (this.mIndex == 3) {

				this.currentAnim = this.anim3;
			} else {

				this.currentAnim = this.anim4;
			}
			console.log("=====", this.currentAnim);

			this.currentAnim.visible = true;
			this.currentAnim.play(null, 0);
		}
		playErr() {
			this.currentAnim.stop();
			this.currentAnim.visible = false;
			this.lostAnim.visible = true;
			this.touchChildren = false;
			XDFSoundManager.play("xiayu_mp3", 0, 1, 1, "", () => { })
			this.lostAnim.play(null, 1, () => {

				this.touchChildren = true;
				XDFSoundManager.stopAll();
				this.lostAnim.visible = false;
				this.currentAnim.visible = true;
				this.currentAnim.play(null, 0);
			}, this);
		}
		onNext() {
			super.onNext();
			this.currImgList = Util.copyArr(this.imgList);
			this.currImgList = Util.resetArray(this.currImgList);
			for (let i = 0; i < this.itemList.length; i++) {
				let img = this.currImgList.pop();
				if (img == this.imgList[this.currentIndex - 1]) {

					this.itemList[i].setData(img, true)
				} else {
					this.itemList[i].setData(img)

				}
			}
		}
		onReplay() {
			super.onReplay();

			this.currentAnim.stop();
			this.currentAnim.visible = false;

			this.onNext();
			this.currentAnim = this.anim1;
			this.currentAnim.play(null, 0);
			this.currentAnim.visible = true;
		}

		onClick(e: egret.TouchEvent) {
			super.onClick(e);
		}

		over() {
			console.log(this.currentAnim);

			super.over();
			this.mIndex = 1;
		}
		playAnim() {
			switch (this.currentIndex) {
				case 1:
					this.imgAnim1();
					this.imgAnim2();
					this.imgAnim3();
					break;
				case 2:
					this.imgAnim2();
					this.imgAnim3();
					break;
				case 3:
					this.imgAnim3();
					break;
			}
		}

		imgAnim1() {
			egret.Tween.get(this.kImg1, { loop: true }).to({ skewX: -2.3 }, 300).to({ skewX: 1 }, 300)
		}
		imgAnim2() {
			egret.Tween.get(this.kImg1, { loop: true }).to({ skewX: -2.3 }, 300).to({ skewX: 1 }, 300)
		}
		imgAnim3() {
			egret.Tween.get(this.kImg1, { loop: true }).to({ skewX: -2.3 }, 300).to({ skewX: 1 }, 300)
		}
	}
}