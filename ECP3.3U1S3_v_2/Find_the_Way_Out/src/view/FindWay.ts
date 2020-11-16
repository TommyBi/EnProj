module game {
	export class FindWay extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "FindWaySkin";
		}

		kReplay: ReplayComponent;

		kAnswer: AnswerComponent;
		kItemGp: eui.Group;
		currentIndex = 1;
		winList = [[{ x: 545, y: 220 }, { x: 734, y: 183 }, { x: 907, y: 265 }, { x: 776, y: 316 }]]
		lostList = [[{ x: 545, y: 220 }, { x: 600, y: 268 }]]

		anim1: XDFFrame.DBAnim;
		anim2: XDFFrame.DBAnim;
		anim3: XDFFrame.DBAnim;
		anim4: XDFFrame.DBAnim;
		initPoint = { x: 540, y: 108 }
		prePoint = { x: 540, y: 108 }
		protected childrenCreated(): void {
			super.childrenCreated();
			this.init();
		}

		private init() {
			this.kReplay.showStart();
			XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
			XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReplay, this);

			XDFFrame.EventCenter.addEventListenr(EventConst.eventBtn, this.onSelect, this);

			for (let i = 0; i < 6; i++) {
				let item = this.kItemGp.getChildAt(i) as FindWayItem;
				item.setData(i);
			}

			this.anim1 = XDFFrame.DBFactory.createAnim("role_1", 1, false);
			this.anim1.setProtery({ x: 400, y: 108, parent: this["kAnimGp"], scaleX: 2, scaleY: 2 });
			this.anim1.play(null, 0);
			this.anim2 = XDFFrame.DBFactory.createAnim("role_lost", 1, false);
			this.anim2.setProtery({ x: 0, y: 0, parent: this["kAnimGp"], scaleX: 2, scaleY: 2 });
			this.anim2.visible = false;
			this.anim3 = XDFFrame.DBFactory.createAnim("role_go", 1, false);
			this.anim3.setProtery({ x: 0, y: 0, parent: this["kAnimGp"], scaleX: 2, scaleY: 2 });
			this.anim3.visible = false;
			this.anim4 = XDFFrame.DBFactory.createAnim("role_win", 1, false);
			this.anim4.setProtery({ x: 720, y: 885, parent: this["kAnimGp"], scaleX: 2, scaleY: 2 });
			this.anim4.visible = false;
		}

		private onSelect(e: egret.Event) {
			if (!this.isStart) return;
			console.log(e.currentTarget.name);
			if (e.data == this.currentIndex * 2 - 1) {
				this.playSuccess();
			} else {
				this.playErr();
			}

		}
		playSuccess() {
			this.touchChildren = false;
			let self = this;
			this.hideAnim();
			this.startGo();
			this.playWin();
			XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
				if (this.currentIndex == 3) {
					self.kAnswer.visible = true;
					self.kAnswer.playGood(() => {
						self.touchChildren = true;
						self.over();
					});
					return true;
				}
				this.currentIndex++;
				this.playSound(this.currentIndex, () => {
				})
			})
		}
		playWin() {
			switch (this.currentIndex) {
				case 1:
					egret.Tween.get(this.anim3.armatureDisplay).to({ x: 728 }, 700).to({ x: 905, y: 150 }, 700)
						.to({ x: 778, y: 214 }, 700).call(() => {
							this.prePoint = { x: 778, y: 214 }
							this.showWin1();
							egret.Tween.removeTweens(this.anim2);
						});
					break;
				case 2:
					egret.Tween.get(this.anim3.armatureDisplay).to({ y: 340 }, 700).to({ x: 505 }, 700)
						.to({ y: 380 }, 700).call(() => {
							this.prePoint = { x: 510, y: 380 }
							this.showWin1();
							egret.Tween.removeTweens(this.anim2);
						});
					break;
				case 3:
					egret.Tween.get(this.anim3.armatureDisplay).to({ x: 650, y: 564 }, 700).to({ x: 873, y: 600 }, 700)
						.to({ y: 885 }, 700).to({ x: 720 }, 700).call(() => {
							this.prePoint = { x: 510, y: 380 }
							this.showWin1();
							egret.Tween.removeTweens(this.anim2);
							this.anim1.stop();
							this.anim1.visible = false;
							this.anim4.visible = true;
							this.anim4.play(null, 0);
						});
					break;
			}
		}
		showWin1() {
			this.anim3.stop();
			this.anim3.visible = false;
			this.anim1.play(null, 0);
			this.anim1.visible = true;
			this.anim1.setPoint(this.prePoint);
		}
		playErr() {
			this.touchChildren = false;
			this.hideAnim();
			this.startGo();
			switch (this.currentIndex) {
				case 1:
					egret.Tween.get(this.anim3.armatureDisplay).to({ x: 560, y: 184 }, 700).call(() => {
						this.showLost();
						egret.Tween.removeTweens(this.anim2);
					});
					break;
				case 2:
					egret.Tween.get(this.anim3.armatureDisplay).to({ y: 340 }, 700).to({ x: 923, y: 350 }, 700).call(() => {
						this.showLost();
						egret.Tween.removeTweens(this.anim2);
					});
					break;
				case 3:
					egret.Tween.get(this.anim3.armatureDisplay).to({ x: 567, y: 505 }, 700).call(() => {
						this.showLost();
						egret.Tween.removeTweens(this.anim2);
					});
					break;
			}
		}
		startGo() {
			this.anim1.stop();
			this.anim1.visible = false;
			this.anim3.visible = true;
			this.anim3.play(null, 0);
			this.anim3.setPoint(this.anim1.getPoint());
		}
		showLost() {
			XDFSoundManager.play("oops_mp3", 0, 1, 1, "", () => {
			});
			this.anim3.stop();
			this.anim3.visible = false;
			this.anim2.visible = true;
			this.anim2.setPoint(this.anim3.getPoint())
			this.anim2.play(null, 1, () => {
				this.anim1.play(null, 0);
				this.anim2.visible = false;
				this.anim1.visible = true;
				this.anim1.setPoint(this.prePoint);
				this.playSound(this.currentIndex, () => {
				})
			}, this);
		}
		isStart = false;
		onStart() {
			this.isStart = true;
			this.kReplay.visible = false;
			egret.Tween.get(this.anim1.armatureDisplay).to({ x: 540 }, 500).call(() => {
				egret.Tween.removeTweens(this.anim1);
			});
			this.playSound(this.currentIndex, () => {
			})
		}
		onReplay() {

			this.anim4.stop();
			this.anim4.visible = false;
			this.anim1.visible = true;
			this.isStart = true;
			this.anim1.setPoint(this.initPoint);
			this.anim1.play(null, 0)
			// for (let i = 1; i < 7; i++) {
			// 	this["kItem" + i].reset()
			// }
			this.kAnswer.visible = false;
			this.kReplay.visible = false;
			this.currentIndex = 1;
			this.playSound(this.currentIndex, () => {
			})
		}

		playSound(index, callBack, isAnim = true) {
			this.touchChildren = false;
			if (isAnim) {
				this["kItem" + (this.currentIndex * 2 - 1)].sildeAnim();
				this["kItem" + this.currentIndex * 2].sildeAnim();
				this.playImgAnim();
			}

			XDFSoundManager.play(`sound_${this.currentIndex}_mp3`, 0, 1, 1, "", () => {
				this.touchChildren = true;
				if (callBack) callBack();
			});
		}
		hideAnim() {
			this["kItem" + (this.currentIndex * 2 - 1)].hideSide();
			this["kItem" + this.currentIndex * 2].hideSide();
			this.stopImgAnim();
		}
		playImgAnim() {
			this["kImg" + this.currentIndex].scaleX = this["kImg" + this.currentIndex].scaleY = 1.5;
			egret.Tween.get(this["kImg" + this.currentIndex], { loop: true })
				.to({ scaleX: 1.6, scaleY: 1.6 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1.5, scaleY: 1.5 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1.6, scaleY: 1.6 }, 400, egret.Ease.cubicInOut)
				.to({ scaleX: 1.5, scaleY: 1.5 }, 400, egret.Ease.cubicInOut)
		}
		stopImgAnim() {
			egret.Tween.removeTweens(this["kImg" + this.currentIndex]);
		}
		over() {
			this.isStart = false;
			this.kReplay.visible = true;
			this.kReplay.showReplay();
		}
	}
}