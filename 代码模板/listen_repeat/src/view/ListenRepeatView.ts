namespace game {
    export class ListenRepeatView extends eui.Component {

        public kCom0: game.DialogComponent;
        public kCom1: game.DialogComponent;
        public kCom2: game.DialogComponent;
        public kCom3: game.DialogComponent;
        public kCom4: game.DialogComponent;
        public kCom5: game.DialogComponent;
        public kCom6: game.DialogComponent;
        public kCom7: game.DialogComponent;
        public kComVideo: game.VideoComponent;
        public kImgBtnNext: eui.Image;
        public kImgBtnPre: eui.Image;

        private mCurPlayIdx: number; // 当前正在播放的索引

        private mSkinType: number = 2;      // 皮肤类型
        private mTotalCount: number = 11;   // 总的对话数量
        private _mCurPage: number = 0;
        private get mCurPage(): number { return this._mCurPage; }// 当前页面
        private set mCurPage(n: number) {
            this._mCurPage = n;
            this.changePage();
        }
        private mPageCfg: any = [[0, 5], [6, 10]];     // 页面配置

        constructor() {
            super();
            this.skinName = "ListenRepeatViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.kImgBtnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextPage, this);
            this.kImgBtnPre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrePage, this);
            this.init();
        }

        private init(): void {
            this.kComVideo.setSkinType(this.mSkinType);
            this.mCurPlayIdx = -1;
            this.mCurPage = 0;
        }

        /** 切换页签 */
        private changePage(): void {
            let cfg = this.mPageCfg[this.mCurPage];
            for (let i = 0; i < 8; i++) {
                this[`kCom${i}`].visible = this[`kCom${i}`].includeInLayout = i < (cfg[1] - cfg[0] + 1);
                if (this[`kCom${i}`].visible) {
                    this[`kCom${i}`].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                    this[`kCom${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                    this[`kCom${i}`].setData(cfg[0] + i);
                } else {
                    this[`kCom${i}`].setData(-1);
                }
            }

            if (this.mCurPage >= this.mPageCfg.length - 1) {
                this.kImgBtnNext.visible = false;
            } else {
                this.kImgBtnNext.visible = true;
            }
            if (this.mCurPage == 0) {
                this.kImgBtnPre.visible = false;
            } else {
                this.kImgBtnPre.visible = true;
            }
        }

        private onNextPage(): void {
            if (this.mCurPage >= this.mPageCfg.length - 1) {
                // 已经是最后一页
                return;
            } else {
                this.mCurPage++;
            }
        }

        private onPrePage(): void {
            if (this.mCurPage <= 0) return;
            this.mCurPage--;
        }

        private onTouch(e: egret.TouchEvent): void {
            let tar = e.target as game.DialogComponent;
            this.mCurPlayIdx = tar.mIdx;
            for (let i = 0; i < 8; i++) {
                let com = this[`kCom${i}`] as game.DialogComponent;
                if (com.mIdx == this.mCurPlayIdx) {
                    this[`kCom${i}`].light();
                    this.kComVideo.play(this.mCurPlayIdx);
                } else {
                    this[`kCom${i}`].normal();
                }
            }
        }
    }
} 