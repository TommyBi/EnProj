var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var XDFFrame;
(function (XDFFrame) {
    var DBFactory = (function () {
        function DBFactory() {
        }
        Object.defineProperty(DBFactory, "factory", {
            get: function () {
                if (!this._factory) {
                    this._factory = new dragonBones.EgretFactory();
                }
                return this._factory;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DBFactory, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new DBFactory();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /** 创建骨骼动画 */
        DBFactory.createAnim = function (name, textureCount) {
            if (textureCount === void 0) { textureCount = 1; }
            if (!this.cache[name]) {
                var anim = new DBAnim(name);
                anim.createAnim(textureCount);
                this.cache[name] = anim;
                return anim;
            }
            else {
                return this.cache[name];
            }
        };
        DBFactory.cache = {};
        return DBFactory;
    }());
    XDFFrame.DBFactory = DBFactory;
    __reflect(DBFactory.prototype, "XDFFrame.DBFactory");
    /** 动画实例 */
    var DBAnim = (function () {
        function DBAnim(name) {
            this.cb = { cbf: null, thisObj: null };
            this.name = name;
        }
        Object.defineProperty(DBAnim.prototype, "visible", {
            get: function () {
                return this.armatureDisplay && this.armatureDisplay.visible;
            },
            set: function (b) {
                this.armatureDisplay.visible = b;
            },
            enumerable: true,
            configurable: true
        });
        DBAnim.prototype.createAnim = function (textureCount) {
            // 当前默认都是放在了资源配置文件中，新东方的需求就到这了，异步可以作为动态创建组的方式去加载，有时间继续写
            var dragonbonesData = RES.getRes(this.name + "_ske_json");
            if (textureCount == 1) {
                var textureData = RES.getRes(this.name + "_tex_json");
                var texture = RES.getRes(this.name + "_tex_png");
                XDFFrame.DBFactory.factory.parseTextureAtlasData(textureData, texture);
            }
            else {
                for (var i = 0; i < textureCount; i++) {
                    var textureData = RES.getRes(this.name + "_tex_" + i + "_json");
                    var texture = RES.getRes(this.name + "_tex_" + i + "_png");
                    XDFFrame.DBFactory.factory.parseTextureAtlasData(textureData, texture);
                }
            }
            XDFFrame.DBFactory.factory.parseDragonBonesData(dragonbonesData);
            this.armatureDisplay = XDFFrame.DBFactory.factory.buildArmatureDisplay(dragonbonesData.armature[0].name);
            this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.onPlayCb, this);
        };
        DBAnim.prototype.setProtery = function (cfg) {
            this.armatureDisplay.x = cfg.x || 0;
            this.armatureDisplay.y = cfg.y || 0;
            this.armatureDisplay.scaleX = cfg.scaleX || 1;
            this.armatureDisplay.scaleY = cfg.scaleY || 1;
            cfg.parent.addChild(this.armatureDisplay);
        };
        /**
         * 播放
         * @param times: [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次]
         */
        DBAnim.prototype.play = function (armatureName, times, cb, thisObj) {
            if (armatureName === void 0) { armatureName = null; }
            if (times === void 0) { times = -1; }
            this.armatureDisplay.animation.play(armatureName, times);
            if (this.cb && cb && thisObj) {
                this.cb.cbf = cb;
                this.cb.thisObj = thisObj;
            }
        };
        DBAnim.prototype.gotoAndStopByFrame = function (armatureName, frame, cb, thisObj) {
            if (armatureName === void 0) { armatureName = null; }
            if (frame === void 0) { frame = 1; }
            this.armatureDisplay.animation.gotoAndStopByFrame(armatureName);
            if (this.cb && cb && thisObj) {
                this.cb.cbf = cb;
                this.cb.thisObj = thisObj;
            }
        };
        DBAnim.prototype.onPlayCb = function () {
            if (this.cb && this.cb.thisObj) {
                this.cb.cbf.call(this.cb.thisObj);
                this.cb.cbf = null;
                this.cb.thisObj = null;
            }
        };
        return DBAnim;
    }());
    XDFFrame.DBAnim = DBAnim;
    __reflect(DBAnim.prototype, "XDFFrame.DBAnim");
})(XDFFrame || (XDFFrame = {}));
//# sourceMappingURL=XDFDragonManager.js.map