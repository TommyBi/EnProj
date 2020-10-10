namespace game {
    export class MainView extends eui.Component {

        public kImgOption0: eui.Image;
        public kImgOption1: eui.Image;
        public kImgOption2: eui.Image;
        public kImgOption3: eui.Image;
        public kGrpPanel: eui.Group;
        public kGrpShirt: eui.Group;
        public kGrpPants: eui.Group;
        public kGrpFlag: eui.Group;
        public kImgShadow1: eui.Image;
        public kImgTip1: eui.Image;
        public kGrpMc1: eui.Group;
        public kImgShadow0: eui.Image;
        public kGrpMc0: eui.Group;
        public kImgTip0: eui.Image;
        public kImgShadow3: eui.Image;
        public kGrpMc3: eui.Group;
        public kImgTip3: eui.Image;
        public kImgShadow2: eui.Image;
        public kGrpMc2: eui.Group;
        public kImgTip2: eui.Image;
        public kGrpReplay: eui.Group;
        public kImgReplay: eui.Image;
        public kComAnswer: game.AnswerComponent;
        public kRectMaskPanel: eui.Rect;
        public kRectMaskFlag: eui.Rect;

        private mCurShowArr: number[] = [];// 当前显示的顺序
        private mCurHintIdx: number = 0;// 当前正在提示的索引
        private mIsHintStatus: boolean = false;// 当前是否正在为提示状态
        private mIsPlayFlodAction: boolean = false;// 是否正在播放伸展的动作
        private mIsShowPanel: boolean = true;// 当前是否正在显示面板
        private mMcFlag: MovieClipComponent;// 红旗序列帧

        constructor() {
            super();
            this.skinName = "MainViewSkin";
        };

        protected createChildren() {
            super.createChildren();
            this.kGrpShirt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayShirt, this);
            this.kGrpPants.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayPants, this);
            this.kGrpFlag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelAction, this);
            this.kImgReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRePlay, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMoveOverReplayBtn, this);
            this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMoveOutReplayBtn, this);
            for (let i = 0; i < 4; i++) {
                this[`kImgOption${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    this.onSelectOption(i);
                }, this);
            }
            this.kGrpPanel.mask = this.kRectMaskPanel;
            this.kGrpFlag.mask = this.kRectMaskFlag;

            mouse.enable(this.stage);

            this.init();

        }

        private init(): void {
            this.initView();
            this.initShowOrder();
            this.hint();
            this.playFlagAction();
        }

        private initView(): void {
            for (let i = 0; i < 4; i++) {
                this[`kImgShadow${i}`].source = `img_shadow_${i}_0_png`;
                this[`kImgShadow${i}`].visible = true;
                this[`kImgTip${i}`].alpha = 0;
                this[`kImgTip${i}`].scaleX = this[`kImgTip${i}`].scaleY = 0;
                this[`kImgOption${i}`].source = `img_action_${i}_png`;
                this[`kImgOption${i}`].visible = true;
                this[`kGrpMc${i}`].removeChildren();
            }
            this.initPanelStatus();
            this.kImgReplay.visible = this.kComAnswer.visible = false;
            this.kComAnswer.visible = false;
        }

        private initPanelStatus(): void {
            this.kGrpPanel.x = -76;
            this.mIsShowPanel = false;
            this.mIsPlayFlodAction = false;
        }

        /** 初始化播放顺序 */
        private initShowOrder(): void {
            this.mCurShowArr = [];
            this.produceOrderArr();
            console.log("队列是：", this.mCurShowArr.toString());
        }

        /** 播放旗帜效果 */
        private playFlagAction(): void {
            if (this.mMcFlag) {
                this.mMcFlag.play(-1);
            } else {
                this.mMcFlag = MovieClipComponent.produce("mc_flag");
                this.kGrpFlag.addChildAt(this.mMcFlag, 0);
                this.mMcFlag.x = 175;
                this.mMcFlag.y = 90;
                this.mMcFlag.play(-1);
            }
        }

        /** 开始逐个提示效果 */
        private hint(): void {
            if (this.mCurShowArr.length == 0) {
                // 游戏结束
                egret.setTimeout(() => {
                    this.finish();
                }, this, 1000)
            } else {
                this.mIsHintStatus = true;
                this.mCurHintIdx = this.mCurShowArr.shift();
                this.hintShadow();
            }
        }

        /** 提示当前应该显示的阴影 */
        private hintShadow(): void {
            this.clearShadowTween();
            this.playHint(1);
        }

        /**
         * 循环提示
         * @param status : number 0||1 表示显示状态的索引标识
         */
        private playHint(status: number): void {
            egret.Tween.get(this[`kImgShadow${this.mCurHintIdx}`]).wait(300).call(
                () => {
                    if (this.mIsHintStatus) {
                        this[`kImgShadow${this.mCurHintIdx}`].source = `img_shadow_${this.mCurHintIdx}_${status}_png`;
                        this[`kImgShadow${this.mCurHintIdx}`].visible = true;
                        this.playHint(status == 1 ? 0 : 1);
                    }
                }
            )
        }

        /** 清理提示缓动动画状态 */
        private clearShadowTween(): void {
            egret.Tween.removeTweens(this.kImgShadow0);
            egret.Tween.removeTweens(this.kImgShadow1);
            egret.Tween.removeTweens(this.kImgShadow2);
            egret.Tween.removeTweens(this.kImgShadow3);
        }

        /** 折叠侧板 */
        private onPanelAction(): void {
            if (this.mIsPlayFlodAction) return;
            this.mIsPlayFlodAction = true;
            if (this.mIsShowPanel) {
                // 收
                egret.Tween.get(this.kGrpPanel).to({ x: -76 }, 600, egret.Ease.cubicInOut).call(() => {
                    this.mIsShowPanel = false;
                    this.mIsPlayFlodAction = false;
                });
            } else {
                // 展开
                egret.Tween.get(this.kGrpPanel).to({ x: 240 }, 600, egret.Ease.cubicInOut).call(() => {
                    this.mIsShowPanel = true;
                    this.mIsPlayFlodAction = false;
                });
            }
        }

        /** 点击事件 */
        private onTouch(e: egret.TouchEvent): void {
            console.log(`touch :${e.target.source}`);
            if (e.target.name != "kGrpFlag" && e.target.name != "kGrpPanel" && this.mIsShowPanel) {
                // 点击空白区域，收起侧面板
                this.onPanelAction();
            }
        }

        /* 播放shirt */
        private onPlayShirt(): void {
            XDFSoundManager.play("sound_shirt_mp3");
        }

        /* 播放pants */
        private onPlayPants(): void {
            XDFSoundManager.play("sound_pants_mp3");
        }

        /** 生产随机队列 */
        private produceOrderArr(): void {
            if (this.mCurShowArr.length < 4) {
                let idx = Util.randomNum(0, 3);
                if (this.mCurShowArr.indexOf(idx) == -1) {
                    this.mCurShowArr.push(idx);
                    if (this.mCurShowArr.length < 4) {
                        this.produceOrderArr();
                    }
                } else {
                    this.produceOrderArr();
                }
            }
        }

        /** 选择目标选项 */
        private onSelectOption(idx: number): void {
            if (idx == this.mCurHintIdx) {
                // hint next
                this.playCorrectAction(() => {
                    this.hintNext();
                })
            } else {
                // choose err
                this.oops();
            }
        }

        private playCorrectAction(cb: Function): void {
            XDFSoundManager.play(`sound_tip_${this.mCurHintIdx}_mp3`);
            egret.Tween.get(this[`kImgTip${this.mCurHintIdx}`]).to({ alpha: 1 }, 300);
            egret.Tween.get(this[`kImgTip${this.mCurHintIdx}`]).to({ scaleX: 1.5, scaleY: 1.5 }, 300, egret.Ease.backOut);

            this[`kGrpMc${this.mCurHintIdx}`].removeChildren();
            let mc = MovieClipComponent.produce(`mc_action${this.mCurHintIdx}`);
            this[`kGrpMc${this.mCurHintIdx}`].addChild(mc);
            mc.scaleX = mc.scaleY = 1.5;
            mc.bottom = 0;
            mc.horizontalCenter = 0;
            mc.play(2);

            let smokeMc = MovieClipComponent.produce(`mc_cloud`);
            this[`kGrpMc${this.mCurHintIdx}`].addChild(smokeMc);
            smokeMc.scaleX = smokeMc.scaleY = 1.5;
            smokeMc.bottom = 0;
            smokeMc.horizontalCenter = 0;
            smokeMc.play(1);

            cb && cb();
        }

        private hintNext(): void {
            this.clearShadowTween();
            this.mIsHintStatus = false;
            this[`kImgOption${this.mCurHintIdx}`].visible = false;
            this[`kImgShadow${this.mCurHintIdx}`].visible = false;
            // this[`kImgShadow${this.mCurHintIdx}`].source = `img_action_color_${this.mCurHintIdx}_png`;
            this.hint();
        }

        /** 完成 */
        private finish(): void {
            this.kComAnswer.visible = true;
            this.kComAnswer.playGood(() => {
                this.showReplay();
            })
        }

        /** 选错了 */
        private oops(): void {
            this.kComAnswer.visible = true;
            this.touchEnabled = false;
            this.kComAnswer.playErr(() => {
                this.touchEnabled = true;
                this.kComAnswer.visible = false;
            })
        }

        /** 重新开始 */
        private onRePlay(): void {
            egret.Tween.removeTweens(this.kImgReplay);
            this.init();
        }

        private showReplay(): void {
            egret.Tween.removeTweens(this.kImgReplay);
            this.kImgReplay.scaleX = this.kImgReplay.scaleY = 0.3;
            this.kImgReplay.source = "img_replay_j_png";
            this.kImgReplay.visible = true;
            egret.Tween.get(this.kImgReplay, { loop: true })
                .to({ scaleX: 0.32, scaleY: 0.32 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 0.3, scaleY: 0.3 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 0.32, scaleY: 0.32 }, 300, egret.Ease.cubicInOut)
                .to({ scaleX: 0.3, scaleY: 0.3 }, 300, egret.Ease.cubicInOut)
        }

        /** 鼠标移到重放按钮 */
        private onMoveOverReplayBtn(): void {
            if (this.kImgReplay.source != "img_replay_d_png") {
                this.kImgReplay.source = "img_replay_d_png";
                egret.Tween.removeTweens(this.kImgReplay);
                egret.Tween.removeTweens(this.kGrpReplay);
                this.kGrpReplay.y = 758;
                egret.Tween.get(this.kGrpReplay, { loop: true })
                    .to({ y: 778 }, 300, egret.Ease.cubicInOut)
                    .to({ y: 758 }, 300, egret.Ease.cubicInOut)
                    .to({ y: 778 }, 300, egret.Ease.cubicInOut)
                    .to({ y: 758 }, 300, egret.Ease.cubicInOut)
            }
        }

        /** 鼠标移出重放按钮 */
        private onMoveOutReplayBtn(): void {
            if (this.kImgReplay.source != "img_replay_j_png") this.kImgReplay.source = "img_replay_j_png";
            egret.Tween.removeTweens(this.kGrpReplay);
            this.kGrpReplay.y = 768;
            this.showReplay();
        }
    }
} 