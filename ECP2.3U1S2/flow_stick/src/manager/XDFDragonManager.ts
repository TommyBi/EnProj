namespace XDFFrame {
    export class DBFactory {
        public static _instance: DBFactory;
        public static _factory: dragonBones.EgretFactory;
        public static get factory(): dragonBones.EgretFactory {
            if (!this._factory) {
                this._factory = new dragonBones.EgretFactory();
            }
            return this._factory;
        }

        public static get instance(): DBFactory {
            if (!this._instance) {
                this._instance = new DBFactory();
            }
            return this._instance;
        }

        private static cache = {};

        public constructor() { }

        /** 创建骨骼动画 */
        public static createAnim(name: string, textureCount: number = 1): DBAnim {
            if (!this.cache[name]) {
                let anim = new DBAnim(name);
                anim.createAnim(textureCount);
                this.cache[name] = anim;
                return anim;
            } else {
                return this.cache[name];
            }

        }
    }

    /** 动画实例 */
    export class DBAnim {
        constructor(name: string) {
            this.name = name;
        }
        private name: string;
        private armatureDisplay: dragonBones.EgretArmatureDisplay;
        public set visible(b) {
            this.armatureDisplay.visible = b;
        }
        public get visible(): boolean {
            return this.armatureDisplay && this.armatureDisplay.visible;
        }
        private cb: { cbf: Function, thisObj: any } = { cbf: null, thisObj: null };
        public createAnim(textureCount: number) {
            // 当前默认都是放在了资源配置文件中，新东方的需求就到这了，异步可以作为动态创建组的方式去加载，有时间继续写
            let dragonbonesData = RES.getRes(`${this.name}_ske_json`);
            if (textureCount == 1) {
                let textureData = RES.getRes(`${this.name}_tex_json`);
                let texture = RES.getRes(`${this.name}_tex_png`);
                XDFFrame.DBFactory.factory.parseTextureAtlasData(textureData, texture);
            } else {
                for (let i = 0; i < textureCount; i++) {
                    let textureData = RES.getRes(`${this.name}_tex_${i}_json`);
                    let texture = RES.getRes(`${this.name}_tex_${i}_png`);
                    XDFFrame.DBFactory.factory.parseTextureAtlasData(textureData, texture);
                }
            }

            XDFFrame.DBFactory.factory.parseDragonBonesData(dragonbonesData);
            this.armatureDisplay = XDFFrame.DBFactory.factory.buildArmatureDisplay(dragonbonesData.armature[0].name);
            this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.onPlayCb, this);
        }

        public setProtery(cfg: { x?: number, y?: number, scaleX?: number, scaleY?: number, parent: egret.DisplayObjectContainer }) {
            this.armatureDisplay.x = cfg.x || 0;
            this.armatureDisplay.y = cfg.y || 0;
            this.armatureDisplay.scaleX = cfg.scaleX || 1;
            this.armatureDisplay.scaleY = cfg.scaleY || 1;
            cfg.parent.addChild(this.armatureDisplay);
        }

        /** 
         * 播放
         * @param times: [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次]
         */
        public play(armatureName: string = null, times: number = -1, cb?: Function, thisObj?: any): void {
            this.armatureDisplay.animation.play(armatureName, times);
            if (this.cb && cb && thisObj) {
                this.cb.cbf = cb;
                this.cb.thisObj = thisObj;
            }
        }
        public gotoAndStopByFrame(armatureName: string = null, frame: number = 1, cb?: Function, thisObj?: any): void {
            this.armatureDisplay.animation.gotoAndStopByFrame(armatureName,);
            if (this.cb && cb && thisObj) {
                this.cb.cbf = cb;
                this.cb.thisObj = thisObj;
            }
        }

        public onPlayCb(): void {
            if (this.cb && this.cb.thisObj) {
                this.cb.cbf.call(this.cb.thisObj);
                this.cb.cbf = null;
                this.cb.thisObj = null;
            }
        }
    }
}