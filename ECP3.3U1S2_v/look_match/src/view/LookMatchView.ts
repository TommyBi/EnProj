namespace game {
    export class LookMatchView extends eui.Component {
        public kImgMask0: eui.Image;
        public kGrpStart0: eui.Group;
        public kImgMask1: eui.Image;
        public kGrpStart1: eui.Group;
        public kImgMask2: eui.Image;
        public kGrpStart2: eui.Group;
        public kGrpTar0: eui.Group;
        public kGrpTar2: eui.Group;
        public kGrpTar1: eui.Group;
        public kGrpPen0: eui.Group;
        public kImgPen0: eui.Image;
        public kGrpPen1: eui.Group;
        public kImgPen1: eui.Image;
        public kGrpPen2: eui.Group;
        public kImgPen2: eui.Image;
        public kGrpPen3: eui.Group;
        public kImgPen3: eui.Image;
        public kImgPen: eui.Image;
        public kComReplay: game.ReplayComponent;
        public kComAnswer: game.AnswerComponent;
        public kImgArrow2: eui.Image;
        public kImgArrow0: eui.Image;
        public kImgArrow1: eui.Image;

        private mIsLock: boolean = false;   // 是否上锁
        private mCurSelectIdx = -1;         // 当前选中的起始位置
        private mHintOrder: number[] = [];  // 提示的顺序
        private mCurHint: number = -1;      // 当前正在提示的内容
        private _mCurPenIdx: number = -1;   // 当前选择的笔
        private set mCurPenIdx(n: number) {
            this._mCurPenIdx = n;
            if (this._mCurPenIdx == -1) {
                // 铅笔组件
                for (let i = 0; i < 4; i++) {
                    egret.Tween.removeTweens(this[`kGrpPen${i}`]);
                    this[`kGrpPen${i}`].alpha = 1;
                    egret.Tween.get(this[`kGrpPen${i}`], { loop: true })
                        .to({ alpha: 0.8 }, 300, egret.Ease.cubicInOut)
                        .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                        .to({ alpha: 0.8 }, 300, egret.Ease.cubicInOut)
                        .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    egret.Tween.removeTweens(this[`kGrpPen${i}`]);
                    this[`kGrpPen${i}`].alpha = i == this._mCurPenIdx ? 1 : 0.5;
                }
            }
        }
        private get mCurPenIdx(): number { return this._mCurPenIdx; }

        constructor() {
            super();
            this.skinName = "LookMatchViewSkin";
        };

        protected createChildren() {
            super.createChildren();

            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);

            for (let i = 0; i < 4; i++) {
                this[`kGrpPen${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`selectPen${i}`], this)
            }

            this.init();
        }

        private init(): void {
            this.onReset();
            this.mCurPenIdx = -1;
            this.kComAnswer.visible = false;
            this.kComReplay.visible = true;
            this.kImgArrow0.visible = this.kImgArrow1.visible = this.kImgArrow2.visible = false;
            this.kComReplay.showStart();
            this.mHintOrder = XDFFrame.utilFunc.calShowOrder(3);
        }

        /* 重置状态 */
        private onReset(): void {
            // 红色遮罩状态
            for (let i = 0; i < 3; i++) {
                egret.Tween.removeTweens(this[`kImgMask${i}`]);
                this[`kImgMask${i}`].alpha = 0;
            }
            this.kImgPen.visible = false;
            this.mCurSelectIdx = -1;
        }

        private onReStart(): void {
            this.kComReplay.visible = false;
            this.kComAnswer.visible = false;
            this.kImgArrow0.visible = this.kImgArrow1.visible = this.kImgArrow2.visible = false;
            this.onReset();
            this.mHintOrder = XDFFrame.utilFunc.calShowOrder(3);
            this.next();
        }

        private onStart(): void {
            this.kComReplay.visible = false;
            this.kComAnswer.visible = false;
            this.next();
        }

        private onTouchBegin(e: egret.TouchEvent): void {
            if (this.mIsLock) return;
            if (this.mCurPenIdx == -1) return;
            if (this.mCurSelectIdx == -1) {
                let idx = this.getTargetPoint(e.stageX, e.stageY);
                if (idx == -1) return;
                if (idx != this.mCurHint) return;
                this.mCurSelectIdx = idx;
            }
        }

        private onMove(e: egret.TouchEvent): void {
            if (this.mIsLock) return;
            if (this.mCurSelectIdx == -1) return;
            this.kImgPen.visible = true;
            this.kImgPen.x = e.stageX;
            this.kImgPen.y = e.stageY;
            this[`kImgArrow${this.mCurSelectIdx}`].visible = true;
            this[`kImgArrow${this.mCurSelectIdx}`].x = this[`kGrpStart${this.mCurSelectIdx}`].x + 50;
            this[`kImgArrow${this.mCurSelectIdx}`].y = this[`kGrpStart${this.mCurSelectIdx}`].y + 50;

            // 计算长度
            let dtX = Math.abs(this.kImgPen.x - this[`kImgArrow${this.mCurSelectIdx}`].x);
            let dtY = Math.abs(this.kImgPen.y - this[`kImgArrow${this.mCurSelectIdx}`].y);
            let length = Math.sqrt(dtX * dtX + dtY * dtY);
            this[`kImgArrow${this.mCurSelectIdx}`].width = length > 150 ? length : 150;
            this[`kImgArrow${this.mCurSelectIdx}`].width += 30
            // 计算夹角
            let angle = 360 * Math.atan(dtY / dtX) / (2 * Math.PI);
            this[`kImgArrow${this.mCurSelectIdx}`].rotation = this.kImgPen.y < this[`kImgArrow${this.mCurSelectIdx}`].y ? -angle : angle;

        }

        private onTouchEnd(e: egret.TouchEvent): void {
            if (this.mIsLock) return;
            if (this.mCurPenIdx == -1) return;
            if (this.mCurSelectIdx == -1) return;
            let idx = this.getTargetPoint(e.stageX, e.stageY);
            if (idx == -1) {
                // 没有匹配项
                this.kImgPen.visible = this[`kImgArrow${this.mCurSelectIdx}`].visible = false;
                this.mCurSelectIdx == -1;
            } else {
                // 判断是不是对应的匹配项
                if (idx == this.mCurSelectIdx) {
                    this.mIsLock = true;
                    this.kImgPen.visible = false;
                    XDFSoundManager.play("sound_stick_right_mp3", 0, 1, 1, "sound_stick_right_mp3", () => {
                        this.next();
                    });
                } else {
                    this.kComAnswer.visible = true;
                    this.kComAnswer.playErr(() => {
                        this.kComAnswer.visible = false;
                        this.kImgPen.visible = this[`kImgArrow${this.mCurSelectIdx}`].visible = false;
                        XDFSoundManager.play(`sound_ss_option${this.mCurHint}_mp3`);
                    });
                }
            }
        }

        public getTargetPoint(x: number, y: number): number {
            if (this.mCurSelectIdx == -1) {
                // 检测起始点
                for (let i = 0; i < 3; i++) {
                    if (x >= this[`kGrpStart${i}`].x && x <= this[`kGrpStart${i}`].x + 100 && y >= this[`kGrpStart${i}`].y && y <= this[`kGrpStart${i}`].y + 100) {
                        return i;
                    }
                }
            } else {
                // 检测的是终点
                for (let i = 0; i < 3; i++) {
                    if (x >= this[`kGrpTar${i}`].x && x <= this[`kGrpTar${i}`].x + 100 && y >= this[`kGrpTar${i}`].y && y <= this[`kGrpTar${i}`].y + 100) {
                        return i;
                    }
                }
            }
            return -1;
        }

        private next(): void {
            if (this.mHintOrder.length <= 0) {
                // 结束游戏
                this.onReset();
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            } else {
                this.mCurHint = this.mHintOrder.shift();
                XDFSoundManager.play(`sound_ss_option${this.mCurHint}_mp3`, 0, 1, 1, `sound_ss_option${this.mCurHint}_mp3`, () => {
                    this.mIsLock = false;
                });
                this.onReset();
                this[`kImgMask${this.mCurHint}`].alpha = 1;
                egret.Tween.get(this[`kImgMask${this.mCurHint}`], { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
            }
        }

        private selectPen(idx: number, e: egret.TouchEvent): void {
            if (this.mIsLock) return;
            this.mCurPenIdx = idx;
            this.kImgPen.source = `img_lm_pencil_${this.mCurPenIdx}_png`;
            this[`kImgArrow${this.mCurHint}`].source = `img_lm_arr${this.mCurPenIdx}_png`;
            this.kImgPen.x = e.stageX;
            this.kImgPen.y = e.stageY;
        }
        private selectPen0(e: egret.TouchEvent): void { this.selectPen(0, e); }
        private selectPen1(e: egret.TouchEvent): void { this.selectPen(1, e); }
        private selectPen2(e: egret.TouchEvent): void { this.selectPen(2, e); }
        private selectPen3(e: egret.TouchEvent): void { this.selectPen(3, e); }
    }
} 
