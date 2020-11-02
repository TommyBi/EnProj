namespace game {
    export class LookCheckView extends eui.Component {
        public kGrpCom: eui.Group;
        public kComReplay: game.ReplayComponent;
        public kComAnswer: game.AnswerComponent;

        private mHintTimes: number = 0;
        public mCurShow: number[];
        public mCurHintIdx: number = 0;
        public get mIsLock(): boolean {
            return false;
        }
        public set mIsLock(b: boolean) {
            this.kGrpCom.touchChildren = !b;
        }

        constructor() {
            super();
            this.skinName = "LookCheckViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.lookCheckSelectResult, this.onGetSelectResult, this);
            this.init();
        }

        private onGetSelectResult(e): void {
            console.log(e.data);
            if (e.data) {
                this.kComAnswer.visible = true;
                this.mIsLock = true;
                this.kComAnswer.playGood(() => {
                    this.kComAnswer.visible = false;
                    this.mIsLock = false;
                    this.next();
                })
            } else {
                this.kComAnswer.visible = true;
                this.mIsLock = true;
                this.kComAnswer.playErr(() => {
                    this.mIsLock = false;
                    this.kComAnswer.visible = false;
                    this.hintComByIdx(this.mCurHintIdx);
                })
            }
        }

        private onReStart(): void {
            this.kComAnswer.visible = false;
            this.kComReplay.visible = false;
            this.onStart();
        }

        private onStart(): void {
            this.kComReplay.visible = false;
            for (let i = 0; i < 4; i++) {
                let precom = this.kGrpCom.getChildAt(i) as LookCheckPreCom;
                precom.reset();
                precom.visible = precom.includeInLayout = precom.mIdx == 0 || precom.mIdx == 1;
            }
            this.mHintTimes = 0;
            this.mCurShow = [0, 1];
            this.setComVisible(this.mCurShow);
            this.next();
        }

        private setComVisible(arr: number[]): void {
            for (let i = 0; i < 4; i++) {
                let precom = this.kGrpCom.getChildAt(i) as LookCheckPreCom;
                precom.visible = precom.includeInLayout = arr.indexOf(i) != -1;
            }
        }

        /** 开始提示环节 */
        private next(): void {
            if (this.mCurShow.length == 0) {
                // 下一组
                if (this.mHintTimes >= 4) {
                    this.kComAnswer.visible = this.kComReplay.visible = true;
                    this.kComReplay.showReplay();
                } else {
                    this.mCurShow = [2, 3];
                    this.setComVisible(this.mCurShow);
                    this.mCurHintIdx = this.mCurShow.shift();
                    this.hintComByIdx(this.mCurHintIdx);
                    this.mHintTimes++;
                }
            } else {
                this.mCurHintIdx = this.mCurShow.shift();
                this.hintComByIdx(this.mCurHintIdx);
                this.mHintTimes++;
            }
        }

        /** 通过id控制显示该提示哪组 */
        private hintComByIdx(idx: number): void {
            for (let i = 0; i < 4; i++) {
                let precom = this.kGrpCom.getChildAt(i) as LookCheckPreCom;
                if (precom.mIdx == idx) {
                    precom.showAction();
                    break;
                }
            }
        }

        private init(): void {
            this.kComAnswer.visible = false;
            this.kComReplay.visible = true;
            this.kGrpCom.removeChildren();
            for (let i = 0; i < 4; i++) {
                let preCom = new LookCheckPreCom();
                this.kGrpCom.addChild(preCom);
                preCom.init(i);
                preCom.visible = preCom.includeInLayout = i < 2;
            }
            this.kComReplay.showStart();
        }
    }
} 