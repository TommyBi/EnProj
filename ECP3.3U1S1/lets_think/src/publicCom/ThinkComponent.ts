namespace game {
    /**
     * ThinkComponent
     * think 翻卡牌环节 中 每一个翻动的组件
     */
    export class ThinkComponent extends eui.Component implements eui.UIComponent {
        public kGrpMain: eui.Group;
        public kGrpBg: eui.Group;
        public kImgShadow: eui.Image;
        public kImgCard: eui.Image;
        public kGrpWord: eui.Group;
        public kImgNameBg: eui.Image;
        public kImgArrow: eui.Image;
        public kLabelWord: eui.Label;
        public kImgMask: eui.Image;
        public kImgSound: eui.Image;
        public kGrpWordStatic: eui.Group;// 也是没脾气了，因为自动对齐，下面的组件会压住上面的组件，哎无奈之举
        public kImgNameBg0: eui.Image;
        public kImgArrow0: eui.Image;

        private mIsRolling: boolean = false;// 是否正在翻滚
        private mIsMoving: boolean = false; // 是否正在移动过程中

        private mIdx: number = 0;
        private mWord: string = "";
        private _show: boolean = false;     // 当前是否正在显示think组件
        private mIsBack: boolean = true;    // 当前卡牌是否是背面
        private get isShow(): boolean {
            return this._show;
        }

        private set isShow(b: boolean) {
            if (this.mIsMoving) return;
            egret.Tween.removeTweens(this.kGrpWord);
            if (b) {
                // 显示
                this.kGrpWord.x = -330;
                this.mIsMoving = true;
                this._show = true;
                this.kImgArrow.scaleX = -1;
                this.kGrpWordStatic.visible = false;
                this.kGrpWord.visible = true;
                egret.Tween.get(this.kGrpWord).to({ x: 13 }, 500, egret.Ease.cubicInOut).call(() => {
                    this.mIsMoving = false;
                });
            } else {
                // 隐藏
                this.kGrpWord.x = 13;
                this.mIsMoving = true;
                this._show = false;
                this.kImgArrow.scaleX = 1;
                egret.Tween.get(this.kGrpWord).to({ x: -330 }, 500, egret.Ease.cubicInOut).call(() => {
                    this.mIsMoving = false;
                    this.kGrpWord.visible = false;
                    this.kGrpWordStatic.visible = true;
                });
            }
        }
        private mSkinType: number = 0;

        public constructor(idx: number, word: string, skinType: number) {
            super();
            this.skinName = "ThinkComponentSkin";
            this.mIdx = idx;
            this.mWord = word;
            this.mSkinType = skinType;
        }

        protected createChildren() {
            super.createChildren();
            this.kImgArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowWord, this);
            this.kImgArrow0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowWord, this);
            this.kImgSound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlaySound, this);
            this.kGrpBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchToll, this);
            this.kGrpWord.mask = this.kImgMask;
            this.init();
        }

        private init(): void {
            this.kGrpWord.x = -330;
            this.mIsMoving = false;
            this._show = false;
            this.kImgArrow.scaleX = 1;

            this.mIsBack = true;
            this.kImgSound.visible = this.kGrpWord.visible = false;
            this.kImgCard.source = `img_think_bg${this.mSkinType}_png`;
            this.kLabelWord.text = this.mWord;
            this.kGrpWordStatic.visible = false;
            this.kGrpWord.visible = false;
        }

        /** 显示字体 */
        private onShowWord(): void {
            if (this.isShow) {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
        }

        /** 播放声音 */
        private onPlaySound(): void {
            XDFSoundManager.play(`sound_thinkCard_${this.mIdx}_mp3`);
        }

        /** 翻滚 */
        private onTouchToll(): void {
            if (this.mIsRolling) return;
            XDFSoundManager.play("sound_think_choise_mp3");
            egret.Tween.removeTweens(this.kGrpMain);
            egret.Tween.get(this.kGrpMain).to({ scaleX: 0 }, 200).call(() => {
                if (this.mIsBack) {
                    this.mIsBack = false;
                    this.kImgSound.visible = true;
                    this.kGrpWord.visible = this.isShow;
                    this.kGrpWordStatic.visible = !this.isShow;
                    this.kImgCard.source = `img_think_pic${this.mIdx}_png`;
                } else {
                    this.mIsBack = true;
                    this.kImgSound.visible = this.kGrpWord.visible = this.kGrpWordStatic.visible = false;
                    this.kImgCard.source = `img_think_bg${this.mSkinType}_png`;
                }

                egret.Tween.get(this.kGrpMain).to({ scaleX: 1 }, 200);
            })
        }
    }

}