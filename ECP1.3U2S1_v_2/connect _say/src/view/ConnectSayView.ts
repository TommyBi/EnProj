module game {
	export class ConnectSayView extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		kLeft: eui.Group;
		k10_1: eui.Group;
		kLeft1: eui.Group;
		kLeft2: eui.Group;
		kRect1: eui.Rect;
		kRect2: eui.Rect;
		kGirlLine1: eui.Image;
		kGirlLine2: eui.Image;
		kGirlLine3: eui.Image;
		kBoyLine1: eui.Image;
		kBoyLine2: eui.Image;
		kBoyLine3: eui.Image;
		kBoyLine4: eui.Image;
		kBoyLine5: eui.Image;


		kRight: eui.Group;
		k10: eui.Group;
		kTips1: eui.Image;
		k19: eui.Group;
		kSnowGp: eui.Group;
		kSnow: eui.Image;
		kTips2: eui.Image;

		kReplay: ReplayComponent;
		kAnswer: AnswerComponent;
		mClickEff: XDFFrame.DBAnim;
		role1: XDFFrame.DBAnim;
		role2: XDFFrame.DBAnim;
		role3: XDFFrame.DBAnim;
		feng: XDFFrame.DBAnim;
		snow: XDFFrame.DBAnim;
		mDianEffList1: XDFFrame.DBAnim[];
		mDianEffList2: XDFFrame.DBAnim[];
		mDianImgList1: eui.Image[];
		mDianImgList2: eui.Image[];
		mLeftPoints = [{ x: 220, y: 500 }, { x: 260, y: 510 }, { x: 300, y: 495 }, { x: 467, y: 516 },
		{ x: 452, y: 545 }, { x: 495, y: 561 }, { x: 536, y: 563 }, { x: 554, y: 530 }]

		mRightPoints = [{ x: 201, y: 45 }, { x: 220, y: 127 }, { x: 180, y: 194 }, { x: 269, y: 262 },
		{ x: 276, y: 370 }, { x: 222, y: 438 }]


		dianIndex = 0;
		isGame = false;
		protected childrenCreated(): void {
			super.childrenCreated();
			this.init();
		}

		init() {
			this.kReplay.showStart();
			XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
			XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReplay, this);

			this.mClickEff = XDFFrame.DBFactory.createAnim("dianji1");
			this.mClickEff.setProtery({ x: 0, y: 0, parent: this, scaleX: 1, scaleY: 1 });

			this.mDianEffList1 = [];
			this.mDianEffList2 = [];
			this.mDianImgList1 = [];
			this.mDianImgList2 = [];

			this.role1 = XDFFrame.DBFactory.createAnim("role1");
			this.role1.setProtery({ x: 330, y: 500, parent: this.k10, scaleX: 2, scaleY: 2.2 });

			this.role2 = XDFFrame.DBFactory.createAnim("role2");
			this.role2.setProtery({ x: 670, y: 480, parent: this.k10, scaleX: 2, scaleY: 2.2 });

			this.role1.visible = false;
			this.role2.visible = false;
			this.role3 = XDFFrame.DBFactory.createAnim("role3");
			this.role3.setProtery({ x: 600, y: 550, parent: this.k19, scaleX: 2.1, scaleY: 2.2 });

			this.feng = XDFFrame.DBFactory.createAnim("feng");
			this.feng.setProtery({ x: 600, y: 550, parent: this.k10, scaleX: 2.1, scaleY: 2.2 });
			this.feng.visible = false;
			this.snow = XDFFrame.DBFactory.createAnim("snow");
			this.snow.setProtery({ x: 500, y: 400, parent: this.k19, scaleX: 2.1, scaleY: 2.2 });
			this.snow.visible = false;

			for (let i = 0; i < 8; i++) {
				let dian = XDFFrame.DBFactory.createAnim("dian", 1, true);
				dian.setProtery({ x: this.mLeftPoints[i].x, y: this.mLeftPoints[i].y, parent: this.k10_1, scaleX: 2.5, scaleY: 2.5 });
				dian.addEvent(this.onLeftDian.bind(this));
				// dian.armatureDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftDian, this);
				dian.index = i;
				dian.armatureDisplay.touchEnabled = true;
				this.mDianEffList1.push(dian);
				dian.visible = false;

				let img = new eui.Image("dian_1_png");
				img.x = this.mLeftPoints[i].x;
				img.y = this.mLeftPoints[i].y;
				img.anchorOffsetX = 5.5;
				img.anchorOffsetY = 5.5;
				img.scaleX = 2.5;
				img.scaleY = 2.5;
				this.k10_1.addChild(img);
				this.mDianImgList1.push(img);
			}
			for (let i = 0; i < 6; i++) {
				let dian = XDFFrame.DBFactory.createAnim("dian", 1, true);
				dian.setProtery({ x: this.mRightPoints[i].x, y: this.mRightPoints[i].y, parent: this.kSnowGp, scaleX: 2.5, scaleY: 2.5 });
				// dian.armatureDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightDian, this);
				dian.addEvent(this.onRightDian.bind(this));
				dian.armatureDisplay.touchEnabled = true;
				dian.index = i;
				dian.visible = false;
				this.mDianEffList2.push(dian);
				let img = new eui.Image("dian_1_png");
				img.x = this.mRightPoints[i].x;
				img.y = this.mRightPoints[i].y;
				img.anchorOffsetX = 5.5;
				img.anchorOffsetY = 5.5;
				img.scaleX = 2.5;
				img.scaleY = 2.5;
				this.kSnowGp.addChild(img);
				this.mDianImgList2.push(img);
			}


			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}

		/**
		 * 屏幕点击
		 */
		onClick(e: egret.TouchEvent) {
			this.mClickEff.x = e.stageX;
			this.mClickEff.y = e.stageY;
			// this.mClickEff.play(null, 1, () => { }, this);
		}
		/**
		 * 开始按钮点击
		 */
		onStart() {
			this.kReplay.visible = false;
			this.leftAnim();
			XDFSoundManager.play("start_mp3", 0, 1, 1, "", () => { });
			this.kLeft1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeft1, this);
			this.kLeft2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeft2, this);

		}
		/**
		 * 重新开始
		 */
		onReplay() {
			this.isGame=false;
			this.kAnswer.visible = false;
			this.kReplay.visible = false;
			this.k10.visible = false;
			this.k19.visible = false;
			this.role1.stop();
			this.role3.stop();
			this.role2.stop();
			this.feng.stop();
			this.snow.stop();
			this.feng.visible = this.snow.visible = this.role1.visible = this.role2.visible = false;
			this.k10_1.visible = true;
			this.kTips1.visible = false;

			this.kSnow.visible = false;
			this.kSnowGp.visible = true;
			this.kTips2.visible = false;

			for (let i = 0; i < this.mDianImgList1.length; i++) {
				this.mDianImgList1[i].visible = true;
			}
			for (let i = 0; i < this.mDianImgList2.length; i++) {
				this.mDianImgList2[i].visible = true;
			}

			for (let i = 0; i < 3; i++) {
				this["kGirlLine" + (i + 1)].visible = false;
			}
			for (let i = 0; i < 5; i++) {
				this["kBoyLine" + (i + 1)].visible = false;
			}
			for (let i = 0; i < 6; i++) {
				this.kSnowGp.getChildAt(i + 1).visible = false;
			}

			this.leftAnim();
		}

		onLeftDian(e) {
			if (e == this.dianIndex) {
				XDFSoundManager.play("sound_think_choise_mp3", 0, 1, 1, "", () => { });
				if (this.dianIndex < 3) {
					this["kGirlLine" + (this.dianIndex + 1)].visible = true;
				} else {

					this["kBoyLine" + (this.dianIndex - 2)].visible = true;
				}
				this.mDianEffList1[this.dianIndex].stop();
				this.mDianEffList1[this.dianIndex].visible = false;
				this.dianIndex++;
				if (this.dianIndex < 8) {
					this.mDianImgList1[this.dianIndex].visible = false;
					this.mDianEffList1[this.dianIndex].visible = true;
					this.mDianEffList1[this.dianIndex].play("dian", 0);
				}
				if (this.dianIndex == 8) {
					this.touchChildren = false;
					this.k10_1.visible = false;
					this.kTips1.visible = true;

					this.role1.visible = true;
					this.role2.visible = true;
					this.feng.visible = true;
					this.role1.play(null, 0);
					this.role2.play(null, 0);
					this.feng.play(null, 0);
					XDFSoundManager.play("sound1_1_mp3", 0, 1, 1, "", () => {
						XDFSoundManager.play("sound1_2_mp3", 0, 1, 1, "", () => {

							this.kAnswer.visible = true;
							this.kAnswer.playGood(() => {
								this.touchChildren = true;
								this.over();
							});
						});
					});
				}
			}

		}
		onRightDian(e) {
			if (e == this.dianIndex) {
				XDFSoundManager.play("sound_think_choise_mp3", 0, 1, 1, "", () => { });

				this.kSnowGp.getChildAt(this.dianIndex + 1).visible = true;
				this.mDianEffList2[this.dianIndex].stop();
				this.mDianEffList2[this.dianIndex].visible = false;
				this.dianIndex++;
				if (this.dianIndex < 6) {
					this.mDianImgList2[this.dianIndex].visible = false;
					this.mDianEffList2[this.dianIndex].visible = true;
					this.mDianEffList2[this.dianIndex].play("dian", 0);
				}
				if (this.dianIndex == 6) {
					this.touchChildren = false;
					this.kSnow.visible = true;
					this.kSnowGp.visible = false;
					this.kTips2.visible = true;

					this.role3.play(null, 0);
					this.snow.visible = true;
					this.snow.play(null, 0);

					XDFSoundManager.play("sound2_1_mp3", 0, 1, 1, "", () => {
						XDFSoundManager.play("sound2_2_mp3", 0, 1, 1, "", () => {

							this.kAnswer.visible = true;
							this.kAnswer.playGood(() => {
								this.touchChildren = true;
								this.over();
							});
						});
					});
				}
			}

		}

		leftAnim() {
			this.kRect1.visible = true;
			this.kRect2.visible = true;
			egret.Tween.removeTweens(this.kRect1)
			egret.Tween.removeTweens(this.kRect2)
			this.kRect1.alpha = 1;
			this.kRect2.alpha = 1;
			egret.Tween.get(this.kRect1, { loop: true }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200)
			egret.Tween.get(this.kRect2, { loop: true }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200)
		}

		onLeft1() {
			if(this.isGame)return;
			this.selectLeft(1);
			this.isGame=true;
			this.k10.visible = true;
			this.mDianImgList1[0].visible = false;
			this.mDianEffList1[0].visible = true;
			this.mDianEffList1[0].play("dian", 0);
		}
		onLeft2() {
			if(this.isGame)return;
			this.isGame=true;
			this.selectLeft(2);
			this.role3.visible = true;
			this.k19.visible = true;
			this.mDianImgList2[0].visible = false;
			this.mDianEffList2[0].visible = true;
			this.mDianEffList2[0].play(null, 0);
		}
		selectLeft(indx) {
			egret.Tween.removeTweens(this.kRect1)
			egret.Tween.removeTweens(this.kRect2)
			if (indx == 1) {
				this.kRect1.alpha = 1;
				this.kRect2.visible = false;
			} else {
				this.kRect2.alpha = 1;

				this.kRect1.visible = false;
			}
		}
		over() {
			this.kReplay.visible = true;
			this.kReplay.showReplay();
			this.dianIndex = 0;
		}
	}
}