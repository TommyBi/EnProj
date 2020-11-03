module game {
	export class FindMarkView extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "FindMarkViewSkin";
		}

		kReplay: ReplayComponent;

		kAnswer: AnswerComponent;
		currentIndex = 1;
		private mArr = [1, 2, 3];
		anim1: XDFFrame.DBAnim;
		anim3: XDFFrame.DBAnim;
		anim2: XDFFrame.DBAnim;
		animList = [];
		protected childrenCreated(): void {
			super.childrenCreated();
			this.init();
		}

		private init() {
			this.kReplay.showStart();
			XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
			XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReplay, this);


			for (let i = 1; i < 4; i++) {
				this["kItem" + i].setData(i)
			}
			this.anim1 = XDFFrame.DBFactory.createAnim("find_yx", 1, false);
			this.anim1.setProtery({ x: 0, y: 0, parent: this["kAnimGp1"], scaleX: 0.4, scaleY: 0.4 });
			this.anim2 = XDFFrame.DBFactory.createAnim("find_sjx", 1, false);
			this.anim2.setProtery({ x: 0, y: 0, parent: this["kAnimGp2"], scaleX: 0.4, scaleY: 0.4 });
			this.anim3 = XDFFrame.DBFactory.createAnim("find_zfx", 1, false);
			this.anim3.setProtery({ x: 0, y: 0, parent: this["kAnimGp3"], scaleX: 0.4, scaleY: 0.4 });
			this.anim1.visible = this.anim2.visible = this.anim3.visible = false;
			this.animList = [this.anim1, this.anim2, this.anim3];
		}

		private onSelect(e: egret.TouchEvent) {
			console.log(e.currentTarget.name);
			if (e.currentTarget.name == this.currentIndex) {
				this.playSuccess();
			} else {
				this.playErr();
			}

		}
		playSuccess() {
			this.touchChildren = false;
			let self = this;
			self.animList[self.currentIndex - 1].visible = true;
			self.animList[self.currentIndex - 1].play(null, 1)
			XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
				if (self.mArr.length == 0) {
					self.kAnswer.visible = true;
					self.kAnswer.playGood(() => {
						self.touchChildren = true;
						self.over();
					});
					return true;
				}
				let idx = Util.limitInteger(0, this.mArr.length - 1)
				let arr = this.mArr.splice(idx, 1);
				this.currentIndex = arr[0];
				this.playSound(this.currentIndex, () => {
					this.touchChildren = true;
				})
			})
		}
		playErr() {
			this.touchChildren = false;
			this.kAnswer.visible = true;
			this.kAnswer.playErr(() => {
				this.playSound(this.currentIndex, () => {
				}, false)
				this.kAnswer.visible = false;
				this.touchChildren = true;
				// this.touchChildren = true;
			})
		}

		onStart() {
			this.kReplay.visible = false;
			let index = Util.limitInteger(0, this.mArr.length - 1);
			this.currentIndex = this.mArr.splice(index, 1)[0];
			this.playSound(this.currentIndex, () => {
				// this.initImgTween();

				for (let i = 1; i < 4; i++) {
					this["kImg" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
				}
				for (let i = 0; i < 4; i++) {
					this["kGp" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.playErr, this);
				}
			})
		}
		onReplay() {
			this.anim1.visible = this.anim2.visible = this.anim3.visible = false;
			for (let i = 1; i < 4; i++) {
				this["kItem" + i].reset()
			}
			this.kAnswer.visible = false;
			this.kReplay.visible = false;
			let index = Util.limitInteger(0, this.mArr.length - 1);
			this.currentIndex = this.mArr.splice(index, 1)[0];
			this.playSound(this.currentIndex, () => {
			})
		}

		playSound(index, callBack, isAnim = true) {
			if (isAnim) this["kItem" + this.currentIndex].play();
			switch (index) {
				case 1:
					XDFSoundManager.play("giraffe_mp3", 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
				case 2:
					XDFSoundManager.play("elephant_mp3", 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
				case 3:
					XDFSoundManager.play("monkey_mp3", 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
			}
		}
		over() {
			this.kReplay.visible = true;
			this.kReplay.showReplay();
			this.mArr = [1, 2, 3];
		}
	}
}