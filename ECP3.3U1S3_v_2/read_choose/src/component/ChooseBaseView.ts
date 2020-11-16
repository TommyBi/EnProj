/**
 * 基础面板
 */
module game {
	export class ChooseBaseView extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}
		kGp: eui.Group;
		kReplay: ReplayComponent;
		kAnswer: AnswerComponent;

		mClickEff: XDFFrame.DBAnim;

		currentIndex = 0;
		sound1 = "sound1_mp3";
		sound2 = "sound2_mp3";
		sound3 = "sound3_mp3";

		isStart: boolean;//是否开始
		protected createChildren() {
			super.createChildren();
			this.init();
		}
		init() {
			this.kReplay.showStart();
			XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
			XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReplay, this);

			this.mClickEff = XDFFrame.DBFactory.createAnim("dianji1");
			this.mClickEff.setProtery({ x: 0, y: 0, parent: this, scaleX: 1, scaleY: 1 });

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
			this.isStart = true;
			this.kReplay.visible = false;
			this.currentIndex = 1;
			// this.playSound(this.currentIndex, () => {
			// 	// this.initImgTween();
			// })
		}
		/**
		 * 重新开始
		 */
		onReplay() {
			this.kAnswer.visible = false;
			this.kReplay.visible = false;
			this.currentIndex = 1
			this.onNext();
			this.playSound(this.currentIndex, () => {
			})
		}
		/**
		 * 成功选择答案，然后随机下一个
		 */
		playSuccess(isPlaySound = true) {
			this.touchChildren = false;
			let self = this;
			if (isPlaySound) {

				XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "", () => {
					self.randomNext();
				})
			} else {
				this.randomNext();
			}
		}
		randomNext() {
			let self = this;
			if (self.currentIndex == 3) {
				self.kAnswer.visible = true;
				self.kAnswer.playGood(() => {
					self.touchChildren = true;
					self.over();
				});
				return true;
			}
			this.currentIndex++;
			this.onNext();
			this.playSound(this.currentIndex, () => {
				this.touchChildren = true;
			})
		}
		/**
		 * 随机下一个问题处理
		 */
		onNext() {

		}
		/**
		 * 选择错误
		 */
		playErr() {
			this.touchChildren = false;
			this.kAnswer.visible = true;
			this.kAnswer.playErr(() => {
				this.playSound(this.currentIndex, () => {
					this.touchChildren = true;
				}, false)
				this.kAnswer.visible = false;
				// this.touchChildren = true;
			})
		}

		/**
		 * 选中之后播放答案
		 */
		playSound(index, callBack?, isAnim = true) {
			switch (index) {
				case 1:
					XDFSoundManager.play(this.sound1, 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
				case 2:
					XDFSoundManager.play(this.sound2, 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
				case 3:
					XDFSoundManager.play(this.sound3, 0, 1, 1, "", () => {
						if (callBack) callBack();
					});
					break;
			}
		}
		/**
		 * 冒烟动画
		 * data ={x:1,y:1};
		 */
		playSmoke(data?) {
		}
		/**
		 * 结束处理
		 */
		over() {
			this.isStart = false;
			this.kReplay.visible = true;
			this.kReplay.showReplay();
		}
	}
}