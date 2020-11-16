/**
 * 基础面板
 */
module game {
	export class playBaseView extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}
		kAnimGp: eui.Group;
		kTimeBar: TimeBarComponent;
		kRestart: ReStartComponent;

		mClickEff: XDFFrame.DBAnim;

		currentIndex = 0;
		private mArr = [1, 2, 3];
		sound1 = "sound1_mp3";
		sound2 = "sound2_mp3";
		sound3 = "sound3_mp3";

		isStart: boolean;//是否开始
		isRight = false;
		isTmeOut = false;
		protected createChildren() {
			super.createChildren();
			this.init();
		}
		init() {
			this.mClickEff = XDFFrame.DBFactory.createAnim("dianji1");
			this.mClickEff.setProtery({ x: 0, y: 0, parent: this, scaleX: 1, scaleY: 1 });

			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

			let self = this;
			let t = setTimeout(function () {
				clearTimeout(t);
				self.kRestart.visible = true;
				self.kRestart.playActionStart();
			}, 300);

			this.kTimeBar.reset();

			// 注册界面事件
			XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
			XDFFrame.EventCenter.addEventListenr(EventConst.timeBarOut, this.onTimeOut, this);
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
			// 隐藏结束组件
			this.kRestart.visible = false;
			this.isStart = true;
			let index = Util.limitInteger(0, this.mArr.length - 1);
			this.currentIndex = this.mArr.splice(index, 1)[0];
		}
		/**
		 * 重新开始
		 */
		onReplay() {
			let index = Util.limitInteger(0, this.mArr.length - 1);
			this.currentIndex = this.mArr.splice(index, 1)[0];
			this.playSound(this.currentIndex, () => {
			})
		}
		/**
		 * 成功选择答案，然后随机下一个
		 */
		playSuccess(callBack?) {
			this.touchChildren = false;
			let self = this;
			this.kTimeBar.stop();
			// XDFSoundManager.play("sound_lp_choise_right_mp3", 0, 1, 1, "", () => {

			if (self.mArr.length == 0) {
				self.touchChildren = true;
				self.over();
				if (callBack) callBack();
				return true;
			}
			let idx = Util.limitInteger(0, this.mArr.length - 1)
			let arr = this.mArr.splice(idx, 1);
			this.currentIndex = arr[0];
			this.onNext();
			this.playSound(this.currentIndex, () => {
				this.touchChildren = true;
			})
			if (callBack) callBack();
			// })
		}
		/**
		 * 随机下一个问题处理
		 */
		onNext() {
			this.kTimeBar.play();
		}
		/**
		 * 选择错误
		 */
		playErr(index) {
			// this.touchChildren = false;
			// this.kAnswer.visible = true;
			// this.kAnswer.playErr(() => {
			// 	this.playSound(this.currentIndex, () => {
			// 	}, false)
			// 	this.kAnswer.visible = false;
			// 	this.touchChildren = true;
			// 	// this.touchChildren = true;
			// })
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
		public onTimeOut(): void {
			if (this.isRight) return;
			this.reset();
			this.isTmeOut = true;
			this.kRestart.visible = true;
			this.kRestart.playActionTimeOut();
			this.isStart = false;
			this.mArr = [1, 2, 3];
		}

		/** 重置到初始化状态 */
		private reset(): void {
			this.kTimeBar.reset();
		}
		/**
		 * 结束处理
		 */
		over() {
			this.reset();
			this.kRestart.visible = true;
			this.kRestart.playActionGoodJob();
			this.isStart = false;
			this.mArr = [1, 2, 3];
		}
	}
}