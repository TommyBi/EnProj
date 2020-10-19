namespace game {
    /**
     * ReStartComponent
     * 重新开始组件
     */
    export class ReStartComponent extends eui.Component implements eui.UIComponent {

        public kGrpResult: eui.Group;
        public kGrpGoodJob: eui.Group;
        public kGrpTimeOut: eui.Group;
        public kGrpStart: eui.Group;

        private mAnimGoodJob: XDFFrame.DBAnim;
        private mAnimStart: XDFFrame.DBAnim;
        private mAnimTimeOut: XDFFrame.DBAnim;

        public constructor() {
            super();
            this.skinName = "ReStartComponentSkin";
        }

        protected createChildren() {
            super.createChildren();
            this.init();
        }

        private init(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNotifyStart, this);
        }

        public playActionStart(): void {
            this.hideAll();
            if (!this.mAnimStart) {
                this.mAnimStart = XDFFrame.DBFactory.createAnim("db_start");
                this.mAnimStart.setProtery({ parent: this.kGrpStart, scaleX: 2, scaleY: 2 });
            }
            this.kGrpStart.visible = true;
            XDFSoundManager.play("sound_start_mp3");
            this.mAnimStart.play(null, 1);
        }

        public playActionTimeOut(): void {
            this.hideAll();
            if (!this.mAnimTimeOut) {
                this.mAnimTimeOut = XDFFrame.DBFactory.createAnim("db_timeOut");
                this.mAnimTimeOut.setProtery({ parent: this.kGrpTimeOut, scaleX: 2, scaleY: 2 });
            }
            this.kGrpTimeOut.visible = true;
            XDFSoundManager.play("sound_die_mp3");
            this.mAnimTimeOut.play(null, 1);
        }

        public playActionGoodJob(): void {
            this.hideAll();
            if (!this.mAnimGoodJob) {
                this.mAnimGoodJob = XDFFrame.DBFactory.createAnim("db_goodJob", 4);
                this.mAnimGoodJob.setProtery({ parent: this.kGrpGoodJob, scaleX: 0.7, scaleY: 0.7 });
            }
            this.kGrpGoodJob.visible = true;
            XDFSoundManager.play("sound_start_mp3");
            this.mAnimGoodJob.play(null, 1);
        }

        private onNotifyStart(): void {
            XDFFrame.EventCenter.sendEvent(EventConst.startComPlayGame);
        }

        private hideAll(): void {
            this.kGrpStart.visible = this.kGrpGoodJob.visible = this.kGrpTimeOut.visible = false;
        }
    }

}