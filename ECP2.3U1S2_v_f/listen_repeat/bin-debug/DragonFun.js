var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var DragonFun = (function (_super) {
    __extends(DragonFun, _super);
    function DragonFun() {
        var _this = _super.call(this) || this;
        _this.egret_factory = new dragonBones.EgretFactory();
        return _this;
    }
    DragonFun.getInstance = function () {
        if (!this._instance) {
            this._instance = new DragonFun();
        }
        return this._instance;
    };
    /**
     * anbox             接收动画变量
     * dom               动画父级
     * count             动画播发次数  默认为1
     * step              动画播放速率   几倍加速
     * stop              动画停在第几帧
     * slotname          卡槽名称
     * slotindex         卡槽资源下标
     * scale             x,y方向等比缩放  默认不传sx,sy都执行scale  scale默认为1
     * tObject           父级元素
     * dbObj,
     * cfun?,            完成回调
     * efun?             事件回调
     * **/
    DragonFun.resetDragon = function (tmp) {
        var sourceArr = RES.getGroupByName(tmp);
        var zzz = {};
        for (var i = 0; i < sourceArr.length; i++) {
            var aaa = sourceArr[i].name;
            if (aaa.indexOf("_ske_json") >= 0) {
                var ccc = aaa.split("_ske_json")[0];
                zzz[ccc] ? zzz[ccc].skejson = aaa : zzz[ccc] = { skejson: aaa };
            }
            if (aaa.indexOf("_tex_") >= 0) {
                var fff = aaa.split("_tex_");
                var ccc = fff[0];
                var ddd = fff[1];
                if (ddd == "png") {
                    zzz[ccc] ? zzz[ccc].texpng0 = aaa : zzz[ccc] = { texpng0: aaa };
                }
                else if (ddd.indexOf("png") > 0) {
                    var idd = ddd.split("_png");
                    var ind = "texpng" + idd[0];
                    zzz[ccc] ? zzz[ccc][ind] = aaa : zzz[ccc] = { ind: aaa };
                }
                if (ddd == "json") {
                    zzz[ccc] ? zzz[ccc].texjson0 = aaa : zzz[ccc] = { texjson0: aaa };
                }
                else if (ddd.indexOf("json") > 0) {
                    var idd = ddd.split("_json");
                    var ind = "texjson" + idd[0];
                    zzz[ccc] ? zzz[ccc][ind] = aaa : zzz[ccc] = { ind: aaa };
                }
            }
        }
        this.setDragonData(zzz);
    };
    DragonFun.setDragonData = function (jsonObj) {
        for (var key in jsonObj) {
            var ddd = jsonObj[key];
            var skejson = ddd.skejson;
            var dragonbonesData = RES.getRes(skejson);
            this.getInstance().egret_factory.parseDragonBonesData(dragonbonesData);
            for (var i = 0; i < 100; i++) {
                var texjson = ddd["texjson" + i];
                var texpng = ddd["texpng" + i];
                if (!texjson) {
                    break;
                }
                var textureData = RES.getRes(texjson);
                var texture = RES.getRes(texpng);
                this.getInstance().egret_factory.parseTextureAtlasData(textureData, texture);
            }
        }
    };
    DragonFun.animationFun = function (tObject, dbObj, cfun, efun) {
        //进来先移除动画在播放  避免动画叠加
        var key = dbObj.key;
        if (!dbObj.key) {
            key = dbObj.armatureName;
        }
        // console.log(dbObj.key,!dbObj.key,dbObj.armatureName, dbObj.animateName)
        var aObj = this._dragonHash[key];
        if (aObj) {
            if (aObj.armature.parent) {
                aObj.armature.parent.removeChild(aObj.armature);
            }
            aObj.armature.removeEventListener(dragonBones.EventObject.FRAME_EVENT, aObj.Ecallback, aObj.thisObject);
            aObj.armature.removeEventListener(dragonBones.EventObject.COMPLETE, aObj.Ccallback, aObj.thisObject);
        }
        else {
            var armaturetmp = this.getInstance().egret_factory.buildArmatureDisplay(dbObj.armatureName);
            aObj = {
                armature: armaturetmp,
            };
            this._dragonHash[key] = aObj;
        }
        aObj.thisObject = tObject;
        aObj.Ecallback = function (e) {
            // console.log(e.frameLabel)
            if (dbObj.event == e.frameLabel) {
                efun();
            }
        };
        aObj.Ccallback = function () {
            if (dbObj.isRemove) {
                if (aObj.armature.parent) {
                    aObj.armature.parent.removeChild(aObj.armature);
                }
                aObj.armature.removeEventListener(dragonBones.EventObject.FRAME_EVENT, aObj.Ecallback, aObj.thisObject);
                aObj.armature.removeEventListener(dragonBones.EventObject.COMPLETE, aObj.Ccallback, aObj.thisObject);
            }
            // if (aObj.armature.parent && dbObj.isRemove) {	// 播放完成移除动画
            //                 dbObj.dom ? aObj.thisObject[dbObj.dom].removeChild(armature) : armature.parent.removeChild(armature);
            //             }
            if (cfun) {
                cfun();
            }
        };
        //创建动画
        var armature = aObj.armature;
        // ["name",1]
        if (dbObj.slot)
            armature.armature.getSlot(dbObj.slot[0]).displayIndex = dbObj.slot[1];
        if (dbObj.slotObj) {
            for (var i = 0; i < dbObj.slotObj.length; i++) {
                var oobj = dbObj.slotObj[i];
                armature.armature.getSlot(oobj.name);
                armature.armature.getSlot(oobj.name).displayIndex = 0;
                armature.armature.getSlot(oobj.name).display = oobj.obj;
                armature.armature.getSlot(oobj.name).display.x = oobj.obj;
            }
        }
        var Fa_g = dbObj.dom ? (typeof (dbObj.dom) == "string" ? aObj.thisObject[dbObj.dom] : dbObj.dom) : aObj.thisObject;
        //  console.log(dbObj.dom,tObject)
        //添加到舞台
        dbObj.at ? Fa_g.addChildAt(armature, dbObj.at || 0) : Fa_g.addChild(armature);
        armature.scaleX = dbObj.scale ? dbObj.scale : 1;
        armature.scaleY = dbObj.scale ? dbObj.scale : 1;
        armature.x = (dbObj.position && dbObj.position[0]) ? dbObj.position[0] : 0;
        armature.y = (dbObj.position && dbObj.position[1]) ? dbObj.position[1] : 0;
        //播放动画
        armature.animation.gotoAndPlayByFrame(dbObj.animateName, 1, dbObj.count).timeScale = dbObj.step ? dbObj.step : 1;
        dbObj.stop ? armature.animation.gotoAndStopByFrame(dbObj.animateName ? dbObj.animateName : dbObj.armatureName, 0) : "";
        //监听帧
        armature.addEventListener(dragonBones.EventObject.FRAME_EVENT, aObj.Ecallback, aObj.thisObject);
        //动画播放完成
        armature.addEventListener(dragonBones.EventObject.COMPLETE, aObj.Ccallback, aObj.thisObject);
        return armature;
    };
    DragonFun.removeChild = function (dbObj, dispose) {
        if (dispose === void 0) { dispose = false; }
        var key = dbObj.key;
        if (!dbObj.key) {
            key = dbObj.armatureName;
        }
        var aObj = this._dragonHash[key];
        if (aObj) {
            if (aObj.armature.parent) {
                aObj.armature.parent.removeChild(aObj.armature);
            }
            aObj.armature.removeEventListener(dragonBones.EventObject.FRAME_EVENT, aObj.Ecallback, aObj.thisObject);
            aObj.armature.removeEventListener(dragonBones.EventObject.COMPLETE, aObj.Ccallback, aObj.thisObject);
            //释放骨骼
            if (dispose) {
                delete this._dragonHash[key];
                aObj.armature.dispose();
            }
        }
    };
    // public static dragonFun: DragonFun;
    // public static anBoxArr: any[] = [];
    DragonFun._dragonHash = {};
    return DragonFun;
}(eui.Component));
__reflect(DragonFun.prototype, "DragonFun", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DragonFun.js.map