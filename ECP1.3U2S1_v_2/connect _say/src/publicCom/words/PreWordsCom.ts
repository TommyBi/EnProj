namespace game {
    /**
     * PreWordsCom
     * 介绍单词的组件
     */
    export class PreWordsCom extends eui.Component implements eui.UIComponent {
        public kImgWords: eui.Image;
        public kLabelWords: eui.Label;

        private mSoundSrc: string = "";

        public constructor() {
            super();
            this.skinName = "PreWordsComSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.kImgWords.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlaySound, this);
        }

        public setData(cfg: { words: string, imgSrc: string, soundSrc: string,scaleX,scaleY }): void {
            this.kImgWords.source = cfg.imgSrc;
            this.kLabelWords.text = cfg.words;
            this.mSoundSrc = cfg.soundSrc;
            this.kImgWords.scaleX=cfg.scaleX;
            this.kImgWords.scaleY=cfg.scaleY;
        }

        private onPlaySound(e:egret.TouchEvent): void {
            e.stopPropagation();
            XDFSoundManager.play(this.mSoundSrc);
        }

    }

}