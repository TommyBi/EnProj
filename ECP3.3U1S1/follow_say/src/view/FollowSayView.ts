namespace game {
    export class FollowSayView extends eui.Component {
        public kGrpAnimLine: eui.Group;
        public kImgFrameLine0: eui.Image;
        public kLabel0: eui.Label;
        public kGrpRoleAnim0: eui.Group;
        public kGrpRoleAnim1: eui.Group;
        public kImgFrameLine1: eui.Image;
        public kLabel1: eui.Label;
        public kGrpRoleAnim2: eui.Group;
        public kGrpRoleAnim3: eui.Group;
        public kGrpOption0: eui.Group;
        public kImgWordsBg0: eui.Image;
        public kLabelDesc0: eui.Label;
        public kGrpOption1: eui.Group;
        public kImgWordsBg1: eui.Image;
        public kLabelDesc1: eui.Label;
        public kGrpOption2: eui.Group;
        public kImgWordsBg2: eui.Image;
        public kLabelDesc2: eui.Label;
        public kGrpOption3: eui.Group;
        public kImgWordsBg3: eui.Image;
        public kLabelDesc3: eui.Label;
        public kComAnswer: game.AnswerComponent;
        public kComReplay: game.ReplayComponent;

        private mAnimRole0: XDFFrame.DBAnim;
        private mAnimRole1: XDFFrame.DBAnim;
        private mAnimRole2: XDFFrame.DBAnim;
        private mAnimRole3: XDFFrame.DBAnim;
        private mAnimLine0: XDFFrame.DBAnim;
        private mAnimLine1: XDFFrame.DBAnim;
        private mAnimLine2: XDFFrame.DBAnim;
        private mAnimLine3: XDFFrame.DBAnim;

        private mHintWords: string[] = [    // 目标提示文本
            "swimming",
            "sledding",
            "snow",
            "plants"
        ]
        private mOptionCount: number = 4;
        private mHintArr: number[] = [];
        private mCurHint: number = 0;
        private mLock_sound_select: boolean = false;// 操作锁 - 是否正在播放选中的声音
        private mLock_startGame: boolean = true;    // 操作锁 - 是否开始了游戏
        private mLock_isFinish: boolean = false;    // 操作锁 - 是否已经完成了一局
        private get isLock(): boolean {
            return this.mLock_sound_select ||
                this.mLock_startGame ||
                this.mLock_isFinish ||
                this.kComAnswer.visible;
        }
        constructor() {
            super();
            this.skinName = "FollowSayViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            // 注册界面事件
            XDFFrame.EventCenter.addEventListenr(EventConst.eventStart, this.onStart, this);
            XDFFrame.EventCenter.addEventListenr(EventConst.eventReplay, this.onReplay, this);
            for (let i = 0; i < this.mOptionCount; i++) {
                this[`kGrpOption${i}`].mIdx = i;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
                if (e.target.name == "option") {
                    this.onMatch(e.target.mIdx);
                }
            }, this);
            // 初始化动画
            this.mAnimRole0 = XDFFrame.DBFactory.createAnim("db_role_0");
            this.mAnimRole0.setProtery({ x: 129, y: 102, parent: this.kGrpRoleAnim0, scaleX: 1.5, scaleY: 1.5 });
            this.mAnimRole1 = XDFFrame.DBFactory.createAnim("db_role_1");
            this.mAnimRole1.setProtery({ x: 129, y: 102, parent: this.kGrpRoleAnim1, scaleX: 1.5, scaleY: 1.5 });
            this.mAnimRole2 = XDFFrame.DBFactory.createAnim("db_role_2");
            this.mAnimRole2.setProtery({ x: 129, y: 102, parent: this.kGrpRoleAnim2, scaleX: 1.5, scaleY: 1.5 });
            this.mAnimRole3 = XDFFrame.DBFactory.createAnim("db_role_3");
            this.mAnimRole3.setProtery({ x: 129, y: 102, parent: this.kGrpRoleAnim3, scaleX: 1.5, scaleY: 1.5 });
            this.mAnimLine0 = XDFFrame.DBFactory.createAnim("db_line_0", 3);
            this.mAnimLine0.setProtery({ x: 960, y: 660, parent: this.kGrpAnimLine, scaleX: 0.9, scaleY: 1 });
            this.mAnimLine1 = XDFFrame.DBFactory.createAnim("db_line_1", 4);
            this.mAnimLine1.setProtery({ x: 810, y: 650, parent: this.kGrpAnimLine, scaleX: 0.9, scaleY: 1 });
            this.mAnimLine2 = XDFFrame.DBFactory.createAnim("db_line_2", 4);
            this.mAnimLine2.setProtery({ x: 960, y: 655, parent: this.kGrpAnimLine, scaleX: 0.9, scaleY: 1 });
            this.mAnimLine3 = XDFFrame.DBFactory.createAnim("db_line_3", 4);
            this.mAnimLine3.setProtery({ x: 1100, y: 650, parent: this.kGrpAnimLine, scaleX: 0.9, scaleY: 1 });

            this.init();
        }

        private init(): void {
            this.reset();
            this.kComReplay.visible = true;
            this.kComReplay.showStart();
        }

        /** 重置到初始化状态 */
        private reset(): void {
            for (let i = 0; i < this.mOptionCount; i++) {
                // 选项按钮相关
                egret.Tween.removeTweens(this[`kGrpOption${i}`]);
                this[`kImgWordsBg${i}`].source = "img_fs_bg4_png";
                this[`kGrpOption${i}`].scaleX = this[`kGrpOption${i}`].scaleY = 1;
                // 动画相关
                this[`mAnimLine${i}`].visible = false;

                // 顶部示意动画显示状态
                egret.Tween.removeTweens(this[`kGrpRoleAnim${i}`]);
                this[`kGrpRoleAnim${i}`].alpha = 1;
            }
            // 填词区域
            this.kLabel0.text = this.kLabel1.text = "";
            this.kImgFrameLine0.alpha = this.kImgFrameLine1.alpha = 0;
            egret.Tween.removeTweens(this.kImgFrameLine0);
            egret.Tween.removeTweens(this.kImgFrameLine1);

            this.kComAnswer.visible = false;
            this.mLock_isFinish = false;

            this.mHintArr = this.calShowOrder(4);
        }

        /** 开始游戏 */
        private onStart(): void {
            this.kComReplay.visible = false;
            this.mLock_startGame = false;
            this.next();
        }

        private onReplay(): void {
            this.reset();
            this.onStart();
        }

        /** 提示下一个 */
        private next(): void {
            if (this.mHintArr.length <= 0) {
                // 完成
                this.mLock_isFinish = true;
                this.kComAnswer.visible = true;
                this.kComAnswer.playGood(null);
                this.kComReplay.visible = true;
                this.kComReplay.showReplay();
            } else {
                // 没完成
                this.mCurHint = this.mHintArr.shift();
                this.hint();
            }
        }

        /** 提示 */
        private hint(): void {
            // sound
            XDFSoundManager.play(`sound_desc_${this.mCurHint}_mp3`);

            // 文字区域
            this.kLabel0.text = this.kLabel1.text = "";
            this.kImgFrameLine0.alpha = this.kImgFrameLine1.alpha = 0;
            egret.Tween.removeTweens(this.kImgFrameLine0);
            egret.Tween.removeTweens(this.kImgFrameLine1);

            if (this.mCurHint > 1) {
                egret.Tween.get(this.kImgFrameLine1, { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
            } else {
                egret.Tween.get(this.kImgFrameLine0, { loop: true })
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 0 }, 300, egret.Ease.cubicInOut)
                    .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
            }

            for (let i = 0; i < this.mOptionCount; i++) {
                // 轨迹动画隐藏
                this[`mAnimLine${i}`].visible = false;
                this[`mAnimRole${i}`].stop();
                // 选项闪烁示意选择
                this[`kImgWordsBg${i}`].source = "img_fs_bg4_png";
                egret.Tween.removeTweens(this[`kGrpOption${i}`]);
                this[`kGrpOption${i}`].scaleX = this[`kGrpOption${i}`].scaleY = 1;
                this[`kGrpRoleAnim${this.mCurHint}`].alpha = 1;
                egret.Tween.get(this[`kGrpOption${i}`], { loop: true })
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 500, egret.Ease.cubicInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicInOut)
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 500, egret.Ease.cubicInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicInOut)
            }
            // 图像示意
            egret.Tween.removeTweens(this[`kGrpRoleAnim${this.mCurHint}`]);
            egret.Tween.get(this[`kGrpRoleAnim${this.mCurHint}`], { loop: true })
                .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 0.5 }, 300, egret.Ease.cubicInOut)
                .to({ alpha: 1 }, 300, egret.Ease.cubicInOut)

        }

        private onChoise0(): void {
            this.onMatch(0);
        }
        private onChoise1(): void {
            this.onMatch(1);
        }
        private onChoise2(): void {
            this.onMatch(2);
        }
        private onChoise3(): void {
            this.onMatch(3);
        }

        private onMatch(touch: number): void {
            if (this.isLock) return;
            XDFSoundManager.play("sound_think_choise_mp3");
            if (touch == this.mCurHint) {
                // 正确
                // stop picture anim
                this[`mAnimRole${this.mCurHint}`].play(null, 4);
                // 播声音
                XDFSoundManager.play("sound_stick_right_mp3");
                // 显示字
                if (this.mCurHint < 2) {
                    this.kLabel0.text = `${this.mHintWords[this.mCurHint]}`;
                    this.kLabel0.visible = true;
                } else {
                    this.kLabel1.text = `${this.mHintWords[this.mCurHint]}`;
                    this.kLabel1.visible = true;
                }

                this[`kImgWordsBg${this.mCurHint}`].source = "img_fs_bg6_png";

                // play mAnim
                this[`mAnimLine${this.mCurHint}`].visible = true;
                this.mLock_sound_select = true;
                this[`mAnimLine${this.mCurHint}`].play(null, 1, () => {
                    XDFSoundManager.play(`sound_desc_${this.mCurHint}_mp3`, 0, 1, 1, `sound_desc_${this.mCurHint}_mp3`, () => {
                        this.mLock_sound_select = false;
                        this.next();
                    });
                }, this)

                // 文字选项提示去除
                for (let i = 0; i < this.mOptionCount; i++) {
                    egret.Tween.removeTweens(this[`kGrpOption${i}`]);
                    this[`kGrpOption${i}`].scaleX = this[`kGrpOption${i}`].scaleY = 1.1;
                    egret.Tween.removeTweens(this[`kGrpRoleAnim${i}`]);
                    this[`kGrpRoleAnim${i}`].alpha = 1;
                }
            } else {
                // 错误
                XDFSoundManager.play("sound_choise_wrong_mp3");
                this.kComAnswer.visible = true;
                this.kComAnswer.playErr(() => {
                    this.kComAnswer.visible = false;
                    XDFSoundManager.play(`sound_desc_${this.mCurHint}_mp3`);
                })
            }
        }

        /** 重新开始 */
        private onReStart(): void {
            this.mLock_isFinish = false;
            this.reset();
            this.next();
        }

        /**
         *  初始化播放顺序
         * @param tarCount: 目标生成的数量
         */
        private calShowOrder(tarCount: number): number[] {
            let arr = [];
            this.produceOrderArr(arr, tarCount);
            return arr;
        }
        /** 生产随机队列 */
        private produceOrderArr(arr, tarCount): void {
            if (arr.length < tarCount) {
                let idx = Util.randomNum(0, tarCount - 1);
                if (arr.indexOf(idx) == -1) {
                    arr.push(idx);
                    if (arr.length < tarCount) {
                        this.produceOrderArr(arr, tarCount);
                    }
                } else {
                    this.produceOrderArr(arr, tarCount);
                }
            }
        }
    }
} 