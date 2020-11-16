module game {
	export class LetsPlayView extends playBaseView {
		public constructor() {
			super();
			this.skinName = "LetsPlaySkin";
		}
		kItem1: PlayItem;
		kItem2: PlayItem;
		kItem3: PlayItem;
		kTargetGp: eui.Group;
		kLb: eui.Label;
		itemList = [];

		kImg1: eui.Image;
		kImg2: eui.Image;
		kImg3: eui.Image;
		imgList = ["animal_1_png", "animal_2_png", "animal_3_png"];
		currImgList = [];

		anim1: XDFFrame.DBAnim;
		anim2: XDFFrame.DBAnim;
		anim3: XDFFrame.DBAnim;

		cangyingList: XDFFrame.DBAnim[];
		cangying2: XDFFrame.DBAnim;
		cangying3: XDFFrame.DBAnim;
		pointList = [{ x: 292, y: 106 }, { x: 722, y: 106 }, { x: 1132, y: 106 }];
		successList = [{ x: 274, y: 762 }, { x: 700, y: 762 }, { x: 1142, y: 762 }]
		init() {
			super.init();
			this.itemList = [this.kItem1, this.kItem2, this.kItem3];

			XDFFrame.EventCenter.addEventListenr(EventConst.btnSelect, this.onSelect, this);
			this.cangying2 = XDFFrame.DBFactory.createAnim("cangying2", 1, true);
			this.cangying2.setProtery({ x: this.pointList[0].x, y: this.pointList[0].y, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.cangying3 = XDFFrame.DBFactory.createAnim("cangying3", 1, true);
			this.cangying3.setProtery({ x: this.pointList[1].x, y: this.pointList[1].y, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.cangying2.visible = this.cangying3.visible = false;

			this.anim1 = XDFFrame.DBFactory.createAnim("role1");
			this.anim1.setProtery({ x: 780, y: 700, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.anim1.play(null, 0);
			this.anim2 = XDFFrame.DBFactory.createAnim("role2");
			this.anim2.setProtery({ x: 760, y: 400, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.anim2.visible = false;
			this.anim3 = XDFFrame.DBFactory.createAnim("role3");
			this.anim3.setProtery({ x: 780, y: 600, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
			this.anim3.visible = false;

			this.cangyingList = [];
			for (let i = 0; i < 3; i++) {
				let anim = XDFFrame.DBFactory.createAnim("cangying1", 1, true);
				anim.setProtery({ x: this.pointList[i].x, y: this.pointList[i].y, parent: this.kAnimGp, scaleX: 2, scaleY: 2 });
				this.cangyingList.push(anim);
			}

			// this.cangying2.play(null, 0);
			// this.cangying3.play(null, 0);
		}

		onStart() {
			super.onStart();
			this.kAnimGp.visible = true;
			this.onNext();
			this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = true;
			this.playSound(this.currentIndex, () => {
				// this.initImgTween();
			})

		}

		onSelect(e: egret.Event) {
			if (!this.isStart) return;
			if (e.data.target) {
				let self = this;
				this.isRight = true;
				self.success(Number(e.data.index));
				// XDFSoundManager.play("sound_ding_mp3", 0, 1, 1, "", () => {

				// });
				this.touchChildren = false;
			} else {
				this.playErr(Number(e.data.index));
			}
		}
		success(index) {
			XDFSoundManager.play("pia_mp3", 0, 1, 1, "", () => {

			});
			let t = setTimeout(function () {
				clearTimeout(t);
				XDFSoundManager.play("sound_ding_mp3", 0, 1, 1)
				SoundManager.ins.playBg("sound_lp_choise_right_mp3");
			}, 500);

			this.anim1.stop();
			this.anim1.visible = false;
			this.anim2.visible = true;
			this.anim2.x = this.successList[index - 1].x;
			this.anim2.play(null, 1, () => {

				this.playSuccess(() => {
					this.anim2.visible = false;
					this.anim1.play(null, 0);
					this.anim1.visible = true;
					this.touchChildren = true;

					// this.cangyingList[index - 1].play(null, 0);
					// this.cangyingList[index - 1].visible = true;
				});
			}, this);
			this.cangyingList[index - 1].visible = false;

			this.cangying2.x = this.pointList[index - 1].x;
			this.cangying2.y = this.pointList[index - 1].y + 200;
			this.cangying2.visible = true;
			this.cangying2.play(null, 1, () => {
				this.cangying2.visible = false;
			}, this)



		}
		playErr(index) {
			SoundManager.ins.playBg("deng_mp3");

			this.cangyingList[index - 1].visible = false;

			this.cangying3.x = this.pointList[index - 1].x - 200;
			this.cangying3.y = this.pointList[index - 1].y - 202;
			this.cangying3.visible = true;
			this.cangying3.play(null, 1, () => {
				this.cangying3.visible = false;
				this.cangyingList[index - 1].play(null, 0);
				this.cangyingList[index - 1].visible = true;
			}, this)

			this.touchChildren = false;
			XDFSoundManager.play("sound_lp_choise_err_mp3", 0, 1, 1, "", () => { })
			this.anim1.stop();
			this.anim1.visible = false;
			this.anim3.visible = true;
			this.anim3.play(null, 1, () => {
				this.anim1.play(null, 0);
				this.anim1.visible = true;
				this.anim3.visible = false;

				this.playSound(this.currentIndex, () => {
					this.touchChildren = true;
				})
			}, this)
			// XDFSoundManager.stopAll();
		}
		onNext() {
			super.onNext();
			this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = true;
			for (let i = 0; i < this.cangyingList.length; i++) {
				this.cangyingList[i].visible = true;
				this.cangyingList[i].play(null, 0);
			}
			if (this.currentIndex == 1) {
				this.kLb.text = "ski";
			} else if (this.currentIndex == 2) {
				this.kLb.text = "sled";
			} else if (this.currentIndex == 3) {
				this.kLb.text = "skate";
			}
			this.isRight = false;
			this.kTargetGp.visible = true;
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
			this.anim2.visible = false;
			this.isRight = false;
			this.isTmeOut = false;
			this.kTargetGp.visible = true;
			this.isStart = true;
			this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = true;
			this.onNext();
		}

		onClick(e: egret.TouchEvent) {
			super.onClick(e);
		}
		onTimeOut() {
			if (this.isRight) return;
			super.onTimeOut();
			this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = false;
			this.kAnimGp.visible = false;
			this.kTargetGp.visible = false;
		}
		over() {

			super.over();
			this.kTargetGp.visible = false;
			this.kItem1.visible = this.kItem2.visible = this.kItem3.visible = false;
			this.kAnimGp.visible = false;
		}

	}
}