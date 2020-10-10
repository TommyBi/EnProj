// TypeScript file
class DragonFun extends eui.Component implements eui.UIComponent {
    private static _instance: DragonFun;
    public egret_factory: dragonBones.EgretFactory;
    // public static dragonFun: DragonFun;
    // public static anBoxArr: any[] = [];
    private static _dragonHash: { [key: string]: armatureObj } = {};


    public constructor() {
        super();
        this.egret_factory = new dragonBones.EgretFactory();
    }


    private static getInstance(): DragonFun {
        if (!this._instance) {
            this._instance = new DragonFun();
        }
        return this._instance;
    }

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

    public static resetDragon(tmp) {
        let sourceArr = RES.getGroupByName(tmp);
        let zzz = {};
        for (let i = 0; i < sourceArr.length; i++) {
            let aaa = sourceArr[i].name;
            if (aaa.indexOf("_ske_json") >= 0) {
                let ccc = aaa.split("_ske_json")[0]
                zzz[ccc] ? zzz[ccc].skejson = aaa : zzz[ccc] = { skejson: aaa };
            }
            if (aaa.indexOf("_tex_") >= 0) {
                let fff = aaa.split("_tex_");
                let ccc = fff[0];
                let ddd = fff[1];

                if (ddd == "png") {
                    zzz[ccc] ? zzz[ccc].texpng0 = aaa : zzz[ccc] = { texpng0: aaa };
                } else if (ddd.indexOf("png") > 0) {
                    let idd = ddd.split("_png");
                    let ind = "texpng" + idd[0];
                    zzz[ccc] ? zzz[ccc][ind] = aaa : zzz[ccc] = { ind: aaa };
                }

                if (ddd == "json") {
                    zzz[ccc] ? zzz[ccc].texjson0 = aaa : zzz[ccc] = { texjson0: aaa };
                } else if (ddd.indexOf("json") > 0) {
                    let idd = ddd.split("_json");
                    let ind = "texjson" + idd[0];
                    zzz[ccc] ? zzz[ccc][ind] = aaa : zzz[ccc] = { ind: aaa };
                }
            }
        }

        this.setDragonData(zzz);
    }


    public static setDragonData(jsonObj) {
        for (let key in jsonObj) {
            let ddd = jsonObj[key];
            let skejson = ddd.skejson;
            let dragonbonesData = RES.getRes(skejson);
            this.getInstance().egret_factory.parseDragonBonesData(dragonbonesData);
            for (let i = 0; i < 100; i++) {
                let texjson = ddd["texjson" + i];
                let texpng = ddd["texpng" + i];
                if (!texjson) {
                    break;
                }
                let textureData = RES.getRes(texjson);
                let texture = RES.getRes(texpng);
                this.getInstance().egret_factory.parseTextureAtlasData(textureData, texture);
            }

        }
    }

    public static animationFun(tObject, dbObj, cfun?, efun?) {
        //进来先移除动画在播放  避免动画叠加
        let key = dbObj.key;
        if (!dbObj.key) {
            key = dbObj.armatureName;
        }
        // console.log(dbObj.key,!dbObj.key,dbObj.armatureName, dbObj.animateName)
        let aObj = this._dragonHash[key] as armatureObj;
        if (aObj) {
            if (aObj.armature.parent) {
                aObj.armature.parent.removeChild(aObj.armature);
            }
            aObj.armature.removeEventListener(dragonBones.EventObject.FRAME_EVENT, aObj.Ecallback, aObj.thisObject);
            aObj.armature.removeEventListener(dragonBones.EventObject.COMPLETE, aObj.Ccallback, aObj.thisObject);
        } else {
            let armaturetmp: dragonBones.EgretArmatureDisplay = this.getInstance().egret_factory.buildArmatureDisplay(dbObj.armatureName);
            aObj = <armatureObj>{
                armature: armaturetmp,
            }
            this._dragonHash[key] = aObj;
        }
        aObj.thisObject = tObject;
        aObj.Ecallback = (e) => {
            // console.log(e.frameLabel)
            if (dbObj.event == e.frameLabel) {
                efun();
            }
        }
        aObj.Ccallback = () => {
            if (dbObj.isRemove) {	// 播放完成移除动画
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
        }
        //创建动画

        let armature = aObj.armature;
        // ["name",1]
        if (dbObj.slot)
            armature.armature.getSlot(dbObj.slot[0]).displayIndex = dbObj.slot[1]

        if (dbObj.slotObj) {
            for (let i = 0; i < dbObj.slotObj.length; i++) {
                let oobj = dbObj.slotObj[i];
                armature.armature.getSlot(oobj.name);
                armature.armature.getSlot(oobj.name).displayIndex = 0;
                armature.armature.getSlot(oobj.name).display = oobj.obj;
                armature.armature.getSlot(oobj.name).display.x = oobj.obj;
            }
        }
        let Fa_g: any = dbObj.dom ? (typeof (dbObj.dom) == "string" ? aObj.thisObject[dbObj.dom] : dbObj.dom) : aObj.thisObject;
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
    }
    public static removeChild(dbObj, dispose = false) {
        let key = dbObj.key;
        if (!dbObj.key) {
            key = dbObj.armatureName;
        }

        let aObj = this._dragonHash[key] as armatureObj;
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
    }
}

interface armatureObj {
    Ecallback: Function;
    Ccallback: Function;
    armature: dragonBones.EgretArmatureDisplay;
    thisObject: any;
}