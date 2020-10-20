namespace game {
    export class LetsPlayView extends eui.Component {
        public kGrpMain: eui.Group;
        public kImgBar: eui.Image;
        public kComRestart: game.ReStartComponent;
        public kLabelDesc: eui.Label;
        public kGrpRoleAnim: eui.Group;
        public kImgOption0: eui.Image;
        public kImgOption1: eui.Image;
        public kImgOption2: eui.Image;

        private mAnimRoleRight: XDFFrame.DBAnim;
        private mAnimRoleErr: XDFFrame.DBAnim;
        private mAnimRoleIdle: XDFFrame.DBAnim;

        private mOptionCount: number = 3;

        constructor() {
            super();
            this.skinName = "LetsPlaySkin";
        };

        protected createChildren() {
            super.createChildren();
            XDFFrame.EventCenter.addEventListenr(EventConst.startComPlayGame, this.onStart, this);
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kImgOption${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onChoise${i}`], this);
            }
            this.init();
        }

        private init(): void {
            // XDFSoundManager.play("sound_do_say_mp3");
            egret.Tween.removeTweens(this.kImgBar);
            this.kImgBar.width = 520;
            this.kComRestart.visible = true;
            this.kComRestart.playActionStart();
        }

        /** 开始游戏 */
        private onStart(): void {

        }
        private onChoise0(): void {
        }
        private onChoise1(): void {

        }
        private onChoise2(): void {

        }
    }
} 