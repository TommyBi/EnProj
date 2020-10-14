var __reflect=this&&this.__reflect||function(e,t,n){e.__class__=t,n?n.push(t):n=[t],e.__types__=e.__types__?n.concat(e.__types__):n},__extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n},__awaiter=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(o,s){function r(e){try{h(i.next(e))}catch(t){s(t)}}function a(e){try{h(i["throw"](e))}catch(t){s(t)}}function h(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(r,a)}h((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function n(e){return function(t){return i([e,t])}}function i(n){if(o)throw new TypeError("Generator is already executing.");for(;h;)try{if(o=1,s&&(r=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(r=r.call(s,n[1])).done)return r;switch(s=0,r&&(n=[0,r.value]),n[0]){case 0:case 1:r=n;break;case 4:return h.label++,{value:n[1],done:!1};case 5:h.label++,s=n[1],n=[0];continue;case 7:n=h.ops.pop(),h.trys.pop();continue;default:if(r=h.trys,!(r=r.length>0&&r[r.length-1])&&(6===n[0]||2===n[0])){h=0;continue}if(3===n[0]&&(!r||n[1]>r[0]&&n[1]<r[3])){h.label=n[1];break}if(6===n[0]&&h.label<r[1]){h.label=r[1],r=n;break}if(r&&h.label<r[2]){h.label=r[2],h.ops.push(n);break}r[2]&&h.ops.pop(),h.trys.pop();continue}n=t.call(e,h)}catch(i){n=[6,i],s=0}finally{o=r=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,r,a,h={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},XDFFrame;!function(e){var t=function(e){function t(){var t=e.call(this)||this;return t.percentHeight=100,t.percentWidth=100,t.touchEnabled=!1,t}return __extends(t,e),t}(eui.UILayer);e.BaseUILayer=t,__reflect(t.prototype,"XDFFrame.BaseUILayer");var n=function(){function e(){}return Object.defineProperty(e,"stage",{get:function(){return egret.MainContext.instance.stage},enumerable:!0,configurable:!0}),e.initLayer=function(){this.addLayer(this.Game_Bg,0),this.addLayer(this.Game_Main,1),this.addLayer(this.UI_edge,2),this.addLayer(this.UI_View,3),this.addLayer(this.UI_Tips,4),this.addLayer(this.UI_EffectLayer,5),this.addLayer(this.UI_GUIDE,6),this.addLayer(this.UI_LOGO,7),this.UI_LOGO.addChild(new XDFLogoComponent)},e.addLayer=function(e,t){this.stage.addChildAt(e,t),this.layers.push(e)},e.Game_Bg=new t,e.Game_Main=new t,e.UI_edge=new t,e.UI_View=new t,e.UI_Tips=new t,e.UI_EffectLayer=new t,e.UI_GUIDE=new t,e.UI_LOGO=new t,e.layers=[],e}();e.LayerManager=n,__reflect(n.prototype,"XDFFrame.LayerManager")}(XDFFrame||(XDFFrame={}));var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,n){function i(i){t.call(n,i,e)}if(RES.hasRes(e)){var o=RES.getRes(e);o?i(o):RES.getResAsync(e,i,this)}else RES.getResByUrl(e,i,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.obj_person={armatureName:"loading",animateName:"loading",count:-1,scale:1,position:[0,0]},t.bar_top=new eui.Image,t.bar_move=new eui.Image,t.bar_mask=new eui.Image,t.bar_bot=new eui.Image,t.local_x=650,t.local_y=697,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.createView,t),t}return __extends(t,e),t.prototype.createView=function(){return __awaiter(this,void 0,void 0,function(){var e,t,n;return __generator(this,function(i){return e=new eui.Rect,e.fillColor=16777215,e.width=this.stage.stageWidth,e.height=this.stage.stageHeight,this.addChild(e),DragonFun.animationFun(this,this.obj_person),this.textField=new egret.BitmapText,egret.TextField.default_fontFamily="FZCuYuan-M03S",t=new eui.Label,t.text="0",this.addChild(t),n=RES.getRes("num_fnt"),this.textField.font=n,this.textField.text="0%",this.textField.textAlign="center",this.textField.y=730,this.textField.width=this.stage.stageWidth,this.textField.height=this.stage.stageHeight,this.bar_bot.source=RES.getRes("bar_bot_png"),this.addChild(this.bar_bot),this.bar_bot.x=this.local_x,this.bar_bot.y=this.local_y,this.bar_mask.source=RES.getRes("bar_bot_png"),this.addChild(this.bar_mask),this.bar_mask.x=this.local_x,this.bar_mask.y=this.local_y,this.bar_move.source=RES.getRes("bar_move_png"),this.addChild(this.bar_move),this.bar_move.x=this.local_x-633,this.bar_move.y=this.local_y,this.bar_move.mask=this.bar_mask,this.bar_top.source=RES.getRes("bar_top_png"),this.addChild(this.bar_top),this.bar_top.x=this.local_x,this.bar_top.y=this.local_y,[2]})})},t.prototype.onProgress=function(e,t){this.textField.text=Math.floor(e/t*100).toString()+"%",this.addChild(this.textField),this.bar_move.x=this.local_x-633*(1-e/t)},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),XDFEventManager.addEventListener(XDFEventManager.PAUSE,function(){console.log("PAUSE"),XDFSoundManager.onMute()},this),XDFEventManager.addEventListener(XDFEventManager.RESUME,function(){console.log("RESUME"),XDFSoundManager.resumeMute()},this);var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)}),this.visible=!1},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.loadResource()];case 1:return e.sent(),this.createGameScene(),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,7,,8]),[4,RES.loadConfig("default.res.json",window.__math2_res_config__||"resource/")];case 1:return n.sent(),[4,RES.loadGroup("loading")];case 2:return n.sent(),[4,RES.loadGroup("sound")];case 3:return n.sent(),DragonFun.resetDragon("loading"),e=new LoadingUI,this.stage.addChild(e),[4,this.loadMusic()];case 4:return n.sent(),[4,this.loadTheme()];case 5:return n.sent(),[4,RES.loadGroup("preload",0,e)];case 6:return n.sent(),DragonFun.resetDragon("preload"),this.stage.removeChild(e),[3,8];case 7:return t=n.sent(),console.error(t),[3,8];case 8:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,n){var i=new eui.Theme("resource/default.thm.json",e.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){window.platform.sendMessage(10001,"",-1),XDFFrame.LayerManager.initLayer();var e=new game.MainView;XDFFrame.LayerManager.UI_View.addChild(e)},t.prototype.loadMusic=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:e=RES.getGroupByName("music"),t=0,n.label=1;case 1:return t<e.length?[4,RES.getResAsync(e[t].name)]:[3,4];case 2:n.sent(),n.label=3;case 3:return t++,[3,1];case 4:return[2]}})})},t}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e.prototype.getGameInfo=function(){return{name:document.title}},e.prototype.sendMessage=function(e,t,n,i){void 0===i&&(i=1),console.log("sendToNative",n),egret.ExternalInterface.call("sendToNative",JSON.stringify({code:e,msg:"success",data:{appId:null,appName:null,userId:null,studentId:null,studentName:null,gameId:null,quesId:null,answer:t,finish:i,isRight:n,answerTime:0}})),"undefined"!=typeof __paopaoEgretTextbookMessageHandler__&&__paopaoEgretTextbookMessageHandler__({code:e,msg:"success",data:{appId:null,appName:null,userId:null,studentId:null,studentName:null,gameId:null,quesId:null,answer:t,isRight:n,answerTime:0}})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,n,i){function o(e){t.call(i,e)}function s(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),n.call(i))}var r=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){t.call(i,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(e,n){window.JSONParseClass.setData(e),egret.callLater(function(){t.call(i,generateEUI2)},r)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(e.indexOf(".exml")>-1){var a=e.split("/");a.pop();var h=a.join("/")+"_EUI.json";generateJSON.paths[e]?egret.callLater(function(){t.call(i,generateJSON.paths[e])},this):RES.getResByUrl(h,function(n){window.JSONParseClass.setData(n),egret.callLater(function(){t.call(i,generateJSON.paths[e])},r)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){t.call(i,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),RES.getResByUrl(e,o,this,RES.ResourceItem.TYPE_TEXT)},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var Util=function(){function e(){}return e.addMoney=function(e,t,n){var i=this;n=egret.setTimeout(function(){var o=1;t>100?o=100:t>10&&(o=10),t-=o,e.text=Number(e.text)+o+"",t>0?i.addMoney(e,t,n):n=-1},this,100)},e.setColor=function(e,t){var n=t,i=1,o=15,s=15,r=3,a=3,h=!1,u=!1,l=new egret.GlowFilter(n,i,o,s,r,a,h,u);e.filters=[l]},e.setImageColor=function(e,t){var n=function(e){var t={r:-1,g:-1,b:-1};return t.b=e%256,t.g=Math.floor(e/256)%256,t.r=Math.floor(e/256/256),t},i=n(t),o=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];o[0]=i.r/255,o[6]=i.g/255,o[12]=i.b/255;var s=new egret.ColorMatrixFilter(o);e.filters=[s]},e.randomNum=function(e,t){return parseInt(Math.random()*(t-e+1)+e,10)},e.randomInt=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},e.setTween=function(e,t){egret.Tween.get(e).to({scaleX:0,scaleY:0},0).wait(t).to({scaleX:1,scaleY:1},250).to({scaleX:.9,scaleY:.9},120).to({scaleX:1,scaleY:1},120).call(function(){egret.Tween.get(e,{loop:!0}).to({scaleX:.9,scaleY:.9},500).to({scaleX:1,scaleY:1},500)})},e}();__reflect(Util.prototype,"Util");var Value=function(e){function t(t){var n=e.call(this)||this;return n._value=t,n}return __extends(t,e),Object.defineProperty(t.prototype,"value",{get:function(){return this._value},set:function(e){if(this._value!=e){this._value=e;var t=new Data(Data.DATA);this.dispatchEvent(t)}},enumerable:!0,configurable:!0}),t}(egret.EventDispatcher);__reflect(Value.prototype,"Value");var Data=function(e){function t(t,n,i){return void 0===n&&(n=!1),void 0===i&&(i=!1),e.call(this,t,n,i)||this}return __extends(t,e),t.DATA="valueChang",t}(egret.Event);__reflect(Data.prototype,"Data");var WorldGame=function(e){function t(t,n){var i=e.call(this)||this;return i.isDebug=!0,i.x=t,i.y=n,i.width=1920,i.height=1080,i.skinName="WorldGameSkin",i}return __extends(t,e),t.prototype.partAdded=function(t,n){e.prototype.partAdded.call(this,t,n)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this)},t}(eui.Component);__reflect(WorldGame.prototype,"WorldGame",["eui.UIComponent","egret.DisplayObject"]);var XDFFrame;!function(e){var t=function(){function e(){}return Object.defineProperty(e,"instance",{get:function(){return this._instance||(this._instance=new egret.EventDispatcher),this._instance},enumerable:!0,configurable:!0}),e.dispatch=function(e,t,n,i){return this.instance.dispatchEventWith(e,n,t,i)},e.addEventListenr=function(e,t,n,i,o){this.instance.addEventListener(e,t,n,i,o)},e.removeEventListener=function(e,t,n,i){this.instance.removeEventListener(e,t,n,i)},e.sendEvent=function(e,t){var n=new egret.Event(e);n.data=t,this.instance.dispatchEvent(n)},e}();e.EventCenter=t,__reflect(t.prototype,"XDFFrame.EventCenter")}(XDFFrame||(XDFFrame={}));var game;!function(e){var t=function(){function e(){}return e.eventFinishVideoProgress="eventFinishVideoProgress",e.eventReplay="eventReplay",e}();e.EventConst=t,__reflect(t.prototype,"game.EventConst")}(game||(game={}));var DragonFun=function(e){function t(){var t=e.call(this)||this;return t.egret_factory=new dragonBones.EgretFactory,t}return __extends(t,e),t.getInstance=function(){return this._instance||(this._instance=new t),this._instance},t.resetDragon=function(e){for(var t=RES.getGroupByName(e),n={},i=0;i<t.length;i++){var o=t[i].name;if(o.indexOf("_ske_json")>=0){var s=o.split("_ske_json")[0];n[s]?n[s].skejson=o:n[s]={skejson:o}}if(o.indexOf("_tex_")>=0){var r=o.split("_tex_"),s=r[0],a=r[1];if("png"==a)n[s]?n[s].texpng0=o:n[s]={texpng0:o};else if(a.indexOf("png")>0){var h=a.split("_png"),u="texpng"+h[0];n[s]?n[s][u]=o:n[s]={ind:o}}if("json"==a)n[s]?n[s].texjson0=o:n[s]={texjson0:o};else if(a.indexOf("json")>0){var h=a.split("_json"),u="texjson"+h[0];n[s]?n[s][u]=o:n[s]={ind:o}}}}this.setDragonData(n)},t.setDragonData=function(e){for(var t in e){var n=e[t],i=n.skejson,o=RES.getRes(i);this.getInstance().egret_factory.parseDragonBonesData(o);for(var s=0;100>s;s++){var r=n["texjson"+s],a=n["texpng"+s];if(!r)break;var h=RES.getRes(r),u=RES.getRes(a);this.getInstance().egret_factory.parseTextureAtlasData(h,u)}}},t.animationFun=function(e,t,n,i){var o=t.key;t.key||(o=t.armatureName);var s=this._dragonHash[o];if(s)s.armature.parent&&s.armature.parent.removeChild(s.armature),s.armature.removeEventListener(dragonBones.EventObject.FRAME_EVENT,s.Ecallback,s.thisObject),s.armature.removeEventListener(dragonBones.EventObject.COMPLETE,s.Ccallback,s.thisObject);else{var r=this.getInstance().egret_factory.buildArmatureDisplay(t.armatureName);s={armature:r},this._dragonHash[o]=s}s.thisObject=e,s.Ecallback=function(e){t.event==e.frameLabel&&i()},s.Ccallback=function(){t.isRemove&&(s.armature.parent&&s.armature.parent.removeChild(s.armature),s.armature.removeEventListener(dragonBones.EventObject.FRAME_EVENT,s.Ecallback,s.thisObject),s.armature.removeEventListener(dragonBones.EventObject.COMPLETE,s.Ccallback,s.thisObject)),n&&n()};var a=s.armature;if(t.slot&&(a.armature.getSlot(t.slot[0]).displayIndex=t.slot[1]),t.slotObj)for(var h=0;h<t.slotObj.length;h++){var u=t.slotObj[h];a.armature.getSlot(u.name),a.armature.getSlot(u.name).displayIndex=0,a.armature.getSlot(u.name).display=u.obj,a.armature.getSlot(u.name).display.x=u.obj}var l=t.dom?"string"==typeof t.dom?s.thisObject[t.dom]:t.dom:s.thisObject;return t.at?l.addChildAt(a,t.at||0):l.addChild(a),a.scaleX=t.scale?t.scale:1,a.scaleY=t.scale?t.scale:1,a.x=t.position&&t.position[0]?t.position[0]:0,a.y=t.position&&t.position[1]?t.position[1]:0,a.animation.gotoAndPlayByFrame(t.animateName,1,t.count).timeScale=t.step?t.step:1,t.stop?a.animation.gotoAndStopByFrame(t.animateName?t.animateName:t.armatureName,0):"",a.addEventListener(dragonBones.EventObject.FRAME_EVENT,s.Ecallback,s.thisObject),a.addEventListener(dragonBones.EventObject.COMPLETE,s.Ccallback,s.thisObject),a},t.removeChild=function(e,t){void 0===t&&(t=!1);var n=e.key;e.key||(n=e.armatureName);var i=this._dragonHash[n];i&&(i.armature.parent&&i.armature.parent.removeChild(i.armature),i.armature.removeEventListener(dragonBones.EventObject.FRAME_EVENT,i.Ecallback,i.thisObject),i.armature.removeEventListener(dragonBones.EventObject.COMPLETE,i.Ccallback,i.thisObject),t&&(delete this._dragonHash[n],i.armature.dispose()))},t._dragonHash={},t}(eui.Component);__reflect(DragonFun.prototype,"DragonFun",["eui.UIComponent","egret.DisplayObject"]);var MovieClipComponent=function(e){function t(t,n){var i=e.call(this)||this;return i.mName=t,i.mIsLoad=n,i.createMoviClip(),i}return __extends(t,e),t.produce=function(e,n){void 0===n&&(n=!1),null==t.mCache[e]&&(t.mCache[e]=[]);var i,o=t.mCache[e];return i=o.length>0?o.pop():new t(e,n)},t.reclaim=function(e,n){void 0===n&&(n="1"),null==t.mCache[n]&&(t.mCache[n]=[]);var i=t.mCache[n];-1==i.indexOf(e)&&i.push(e)},t.prototype.createMoviClip=function(){var e,t,n=this;if(this.mIsLoad)MovieClipResLoader.instance.load(this.mName,function(o,s){e=o,t=s,n.mc=new egret.MovieClip(i.generateMovieClipData(n.mName)),n.addChild(n.mc),n.width=n.mc.width,n.height=n.mc.height,n.mc.addEventListener(egret.Event.COMPLETE,n.onComplete,n)});else{e=RES.getRes(this.mName+"_json"),t=RES.getRes(this.mName+"_png");var i=new egret.MovieClipDataFactory(e,t);this.mc=new egret.MovieClip(i.generateMovieClipData(this.mName)),this.addChild(this.mc),this.width=this.mc.width,this.height=this.mc.height,this.setAnchor(),this.mc.addEventListener(egret.Event.COMPLETE,this.onComplete,this)}},t.prototype.setAnchor=function(){this.anchorOffsetX=this.width/2,this.anchorOffsetY=this.height/2},t.prototype.stop=function(e){void 0===e&&(e=null),this.mc.stop(),e&&e()},t.prototype.gotoPlay=function(e,t,n){void 0===t&&(t=null),void 0===n&&(n=void 0),this.mCallBack=t,this.mc.gotoAndPlay(e,n)},t.prototype.play=function(e,t){void 0===e&&(e=0),void 0===t&&(t=null),this.mCallBack=t,this.mc.play(e)},t.prototype.onComplete=function(){this.mCallBack&&this.mCallBack()},t.prototype.resLoad=function(e){},t.mCache={},t}(eui.Component);__reflect(MovieClipComponent.prototype,"MovieClipComponent",["eui.UIComponent","egret.DisplayObject"]);var MovieClipResLoader=function(){function e(){this.mIsloadConfig=!1,this.mIsloadTexture=!1}return Object.defineProperty(e,"instance",{get:function(){return this._instance||(this._instance=new e),this._instance},enumerable:!0,configurable:!0}),e.prototype.load=function(e,t){var n=this;this.mCallBack=t,RES.getResAsync(e+"_json",function(e){n.mConfig=e,n.mIsloadConfig=!0,n.mIsloadConfig&&n.mIsloadTexture&&n.onComplete()},this),RES.getResAsync(e+"_png",function(e){n.mTexture=e,n.mIsloadTexture=!0,n.mIsloadConfig&&n.mIsloadTexture&&n.onComplete()},this)},e.prototype.onComplete=function(){this.mCallBack(this.mConfig,this.mTexture)},e._instance=null,e}();__reflect(MovieClipResLoader.prototype,"MovieClipResLoader");var XDFEventManager=function(e){function t(t){return void 0===t&&(t=null),e.call(this,t)||this}return __extends(t,e),t.getInstance=function(){return this._instance||(this._instance=new t),this._instance},t.dispatchEvent=function(e){this.getInstance().dispatchEvent(e)},t.addEventListener=function(e,t,n){this.getInstance().addEventListener(e,t,n)},t.hasEventListener=function(e){return this.getInstance().hasEventListener(e)},t.removeEventListener=function(e,t){this.getInstance().removeEventListener(e,t,this)},t.onPasue=function(){this.getInstance().dispatchEventWith(t.PAUSE)},t.onResume=function(){this.getInstance().dispatchEventWith(t.RESUME)},t.PAUSE="pause_event",t.RESUME="resume_event",t}(egret.EventDispatcher);__reflect(XDFEventManager.prototype,"XDFEventManager");var XDFLogoComponent=function(e){function t(){var t=e.call(this)||this;return t.percentHeight=100,t.percentWidth=100,t.touchChildren=!1,t.touchEnabled=!1,t.addLogoImage(),t}return __extends(t,e),t.prototype.addLogoImage=function(){var e=new eui.Image;e.source="_xdf_logo__png",e.anchorOffsetX=e.width,e.anchorOffsetY=e.height,e.bottom=0,e.right=0,this.addChild(e)},t.prototype.addToParent=function(e){e.percentHeight=100,e.percentWidth=100,e.touchChildren=!1,e.touchEnabled=!1,e.touchThrough=!0,e.addChild(this)},t}(eui.Component);__reflect(XDFLogoComponent.prototype,"XDFLogoComponent");var XDFSoundManager=function(){function e(){}return e.play=function(e,t,n,i,o,s){void 0===t&&(t=0),void 0===n&&(n=1),void 0===i&&(i=1),void 0===o&&(o=e),this._musicHash[o]||(this._musicHash[o]=new Sound(e,i)),o!=e&&(this._musicHash[o].url=e),this._musicHash[o].play(t,n,this.isMuteMusic,s)},e.stop=function(e,t){void 0===t&&(t=e),this._musicHash[t]&&this._musicHash[t].stop()},e.stopAll=function(){for(var e in this._musicHash)this._musicHash[e].stop()},e.setVolume=function(e,t,n){void 0===n&&(n=e),t=Math.min(t,1),t=Math.max(t,0),this._musicHash[n]&&(this._musicHash[n].volume=t)},e.getVolume=function(e,t){return void 0===t&&(t=e),this._musicHash[t]?this._musicHash[t].volume:null},e.onMute=function(){for(var e in this._musicHash)this._musicHash[e].onMute();this.isMuteMusic=!0},e.resumeMute=function(){for(var e in this._musicHash)this._musicHash[e].resumeMute();this.isMuteMusic=!1},e.removeEventListener=function(){for(var e in this._musicHash)this._musicHash[e].removeEventListener()},e._musicHash={},e.isMuteMusic=!1,e}();__reflect(XDFSoundManager.prototype,"XDFSoundManager");var Sound=function(){function e(e,t){void 0===t&&(t=.5),this.url=e,this._volume=t,this._mute=!1}return e.prototype.play=function(e,t,n,i){var o=this;return void 0===e&&(e=0),void 0===t&&(t=1),void 0===n&&(n=!1),this.stop(),i&&(this.callBack=i),RES.hasRes(this.url)?(RES.getRes(this.url)?(this._currentSound=RES.getRes(this.url),this._currentChannel=this._currentSound.play(e,t),n?this._currentChannel.volume=0:this._currentChannel.volume=this._volume,i&&this._currentChannel.once(egret.Event.SOUND_COMPLETE,this.callBack,this)):RES.getResAsync(this.url,function(s,r){s&&(o._currentSound=s,o._currentChannel=o._currentSound.play(e,t),n?o._currentChannel.volume=0:o._currentChannel.volume=o._volume,i&&o._currentChannel.once(egret.Event.SOUND_COMPLETE,o.callBack,o))},this),void(this._mute=n)):void console.log("列表不存在音频")},e.prototype.stop=function(){this._currentChannel&&(this._currentChannel.hasEventListener(egret.Event.SOUND_COMPLETE)&&this._currentChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.callBack,this),this._currentChannel.stop(),this._currentChannel=null)},Object.defineProperty(e.prototype,"volume",{get:function(){return this._volume},set:function(e){this._volume=e,this._currentChannel&&this._currentChannel.position>0&&(this._currentChannel.volume=e)},enumerable:!0,configurable:!0}),e.prototype.onMute=function(){this._mute=!0,this._currentChannel&&this._currentChannel.position>0&&(this._currentChannel.volume=0)},e.prototype.resumeMute=function(){this._mute=!1,this._currentChannel&&this._currentChannel.position>0&&(this._currentChannel.volume=this._volume)},e.prototype.removeEventListener=function(){this._currentChannel&&this._currentChannel.hasEventListener(egret.Event.SOUND_COMPLETE)&&this._currentChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.callBack,this)},e}();__reflect(Sound.prototype,"Sound");var game;!function(e){var t=function(e){function t(){var t=e.call(this)||this;return t.skinName="AnswerComponentSkin",t}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),this.init()},t.prototype.init=function(){egret.Tween.removeTweens(this.kImgGood),egret.Tween.removeTweens(this.kGrpStarLeft),egret.Tween.removeTweens(this.kGrpStarRight),egret.Tween.removeTweens(this.kImgErr),egret.Tween.removeTweens(this.kImgStarBg),this.kImgGood.visible=this.kImgErr.visible=this.kGrpStarLeft.visible=this.kGrpStarRight.visible=this.kImgStarBg.visible=!1},t.prototype.playGood=function(e){var t=this;this.init(),XDFSoundManager.play("sound_goodjob_mp3",0,1,1),this.kImgGood.scaleX=this.kImgGood.scaleY=5,this.kImgGood.visible=!0,this.kImgGood.rotation=0,egret.Tween.get(this.kImgGood).to({rotation:700,scaleX:1.5,scaleY:1.5},500,egret.Ease.cubicIn).call(function(){t.kGrpStarLeft.visible=t.kGrpStarRight.visible=!0,t.kImgStarBg.visible=!0,t.kImgStarBg.alpha=1,egret.Tween.get(t.kImgStarBg).to({alpha:.5},250,egret.Ease.cubicInOut).to({alpha:1},250,egret.Ease.cubicInOut).to({alpha:.5},250,egret.Ease.cubicInOut).to({alpha:1},250,egret.Ease.cubicInOut),t.kGrpStarLeft.x=450,t.kGrpStarLeft.y=543,t.kGrpStarRight.x=1374,t.kGrpStarRight.y=250,egret.Tween.get(t.kGrpStarLeft).to({x:470,y:520},250,egret.Ease.cubicInOut).to({x:450,y:543},250,egret.Ease.cubicInOut).to({x:470,y:520},250,egret.Ease.cubicInOut).to({x:450,y:543},250,egret.Ease.cubicInOut),egret.Tween.get(t.kGrpStarRight).to({x:1354,y:230},250,egret.Ease.cubicInOut).to({x:1374,y:250},250,egret.Ease.cubicInOut).to({x:1354,y:230},250,egret.Ease.cubicInOut).to({x:1374,y:250},250,egret.Ease.cubicInOut).call(function(){e&&e()})})},t.prototype.playErr=function(e){this.init(),XDFSoundManager.play("sound_oopstryagain_mp3",0,1,1),this.kImgErr.scaleX=this.kImgErr.scaleY=5,this.kImgErr.visible=!0,egret.Tween.get(this.kImgErr).to({rotation:700,scaleX:1.5,scaleY:1.5},500,egret.Ease.cubicIn).wait(1500).call(function(){e&&e()})},t}(eui.Component);e.AnswerComponent=t,__reflect(t.prototype,"game.AnswerComponent",["eui.UIComponent","egret.DisplayObject"])}(game||(game={}));var game;!function(e){var t=function(e){function t(){var t=e.call(this)||this;return t.mArr=["Mom! This shirt is too small.","Take off your shirt, Tony.","These pants are too small.","Take off your pants.","I need new clothes.","Put on your shirt.","Put on your pants.","These are for you."],t.skinName="DialogComponentSkin",t}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),this.init()},t.prototype.init=function(){},t.prototype.light=function(){this.klbl.textColor=16555008},t.prototype.normal=function(){this.klbl.textColor=16777215},t.prototype.setData=function(e){this.mIdx=e,this.klbl.text=this.mArr[e]},t}(eui.Component);e.DialogComponent=t,__reflect(t.prototype,"game.DialogComponent",["eui.UIComponent","egret.DisplayObject"])}(game||(game={}));var game;!function(e){var t=function(t){function n(){var e=t.call(this)||this;return e.skinName="ReplayComponentSkin",e}return __extends(n,t),n.prototype.createChildren=function(){t.prototype.createChildren.call(this),this.kImgReplay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRePlay,this),this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OVER,this.onMoveOverReplayBtn,this),this.kImgReplay.addEventListener(mouse.MouseEvent.ROLL_OUT,this.onMoveOutReplayBtn,this),mouse.enable(this.stage),this.init()},n.prototype.init=function(){egret.Tween.removeTweens(this.kGrpReplay),this.kImgReplay.y=0},n.prototype.onRePlay=function(){egret.Tween.removeTweens(this.kImgReplay),XDFFrame.EventCenter.sendEvent(e.EventConst.eventReplay)},n.prototype.showReplay=function(){egret.Tween.removeTweens(this.kImgReplay),this.kImgReplay.scaleX=this.kImgReplay.scaleY=.3,this.kImgReplay.source="img_replay_j_png",this.kImgReplay.visible=!0,egret.Tween.get(this.kImgReplay,{loop:!0}).to({scaleX:.32,scaleY:.32},300,egret.Ease.cubicInOut).to({scaleX:.3,scaleY:.3},300,egret.Ease.cubicInOut).to({scaleX:.32,scaleY:.32},300,egret.Ease.cubicInOut).to({scaleX:.3,scaleY:.3},300,egret.Ease.cubicInOut)},n.prototype.onMoveOverReplayBtn=function(){"img_replay_d_png"!=this.kImgReplay.source&&(this.kImgReplay.source="img_replay_d_png",egret.Tween.removeTweens(this.kImgReplay),egret.Tween.removeTweens(this.kGrpReplay),this.kGrpReplay.y=0,egret.Tween.get(this.kGrpReplay,{loop:!0}).to({y:10},300,egret.Ease.cubicInOut).to({y:-10},300,egret.Ease.cubicInOut).to({y:10},300,egret.Ease.cubicInOut).to({y:-10},300,egret.Ease.cubicInOut))},n.prototype.onMoveOutReplayBtn=function(){"img_replay_j_png"!=this.kImgReplay.source&&(this.kImgReplay.source="img_replay_j_png"),egret.Tween.removeTweens(this.kGrpReplay),this.kGrpReplay.y=0,this.showReplay()},n}(eui.Component);e.ReplayComponent=t,__reflect(t.prototype,"game.ReplayComponent",["eui.UIComponent","egret.DisplayObject"])}(game||(game={}));var game;!function(e){var t=function(t){function n(){var e=t.call(this)||this;return e.mLength=0,e.skinName="VideoComponentSkin",e}return __extends(n,t),n.prototype.createChildren=function(){t.prototype.createChildren.call(this),this.register()},n.prototype.register=function(){this.mVideo=new egret.Video,this.mVideo.x=0,this.mVideo.y=0,this.mVideo.width=720,this.mVideo.height=540,this.mVideo.fullscreen=!1,this.kGrpVideo.addChild(this.mVideo),XDFFrame.EventCenter.addEventListenr(e.EventConst.eventFinishVideoProgress,this.adjustPlay,this)},n.prototype.play=function(e){this.kRect.alpha=1,egret.Tween.removeTweens(this.kRect),this.mVideo.load("resource/assets/video/"+e+".mp4"),this.mVideo.once(egret.Event.COMPLETE,this.onLoad,this),this.mVideo.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this)},n.prototype.onLoad=function(){this.mVideo.play(0,!1),this.kRect.alpha=1,egret.Tween.get(this.kRect).to({alpha:0},500,egret.Ease.cubicOut),console.log("获取视频长度: "+this.mVideo.length),this.mLength=this.mVideo.length,this.kComPro.reset(this.mLength)},n.prototype.onLoadErr=function(e){console.log("video load error happened",e)},n.prototype.adjustPlay=function(e){egret.log(e),0==this.mLength?console.log("视频尚未加载完成"):(console.log("this.mvideo:",this.mVideo),this.mVideo.play(e.data*this.mVideo.length),this.kComPro.updateProPos(this.mVideo.length-e.data*this.mVideo.length))},n}(eui.Component);e.VideoComponent=t,__reflect(t.prototype,"game.VideoComponent",["eui.UIComponent","egret.DisplayObject"])}(game||(game={}));var game;!function(e){var t=function(t){function n(){var e=t.call(this)||this;return e.mTouchSrcX=0,e.mTmpX=0,e.mIsAdjust=!1,e.skinName="VideoProBarSkin",e}return __extends(n,t),n.prototype.createChildren=function(){t.prototype.createChildren.call(this),this.kImgProBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this),this.init()},n.prototype.reset=function(e){this.kImgProBtn.x=0,this.updateProPos(e)},n.prototype.updateProPos=function(e){egret.Tween.removeTweens(this.kImgProBtn),egret.Tween.get(this.kImgProBtn).to({x:this.kGrpBar.width},1e3*e)},n.prototype.init=function(){this.kImgProBtn.x=0,this.mIsAdjust=!1},n.prototype.onTouchBegin=function(e){this.mTouchSrcX=e.stageX,this.mTmpX=this.kImgProBtn.x,this.mIsAdjust=!0,egret.Tween.removeTweens(this.kImgProBtn)},n.prototype.onTouchEnd=function(t){this.mIsAdjust&&XDFFrame.EventCenter.sendEvent(e.EventConst.eventFinishVideoProgress,this.kImgProBtn.x/this.kGrpBar.width),this.mIsAdjust=!1},n.prototype.onTouchMove=function(e){if(this.mIsAdjust){var t=e.stageX-this.mTouchSrcX;console.log("offSet:",t),this.mTmpX+t>=this.kGrpBar.width?(console.log("结束播放："+(this.mTmpX+t)),this.kImgProBtn.x=this.kGrpBar.width):this.mTmpX+t<=0?(console.log("回到起点："+(this.mTmpX+t)),this.kImgProBtn.x=0):(console.log("位置："+(this.mTmpX+t)),this.kImgProBtn.x=this.mTmpX+t)}},n}(eui.Component);e.VideoProBarComponent=t,__reflect(t.prototype,"game.VideoProBarComponent",["eui.UIComponent","egret.DisplayObject"])}(game||(game={}));var game;!function(e){var t;!function(e){e[e.PUTON_SHIRT=0]="PUTON_SHIRT",e[e.PUTON_PANTS=1]="PUTON_PANTS",e[e.TAKEOFF_SHIRT=2]="TAKEOFF_SHIRT",e[e.TAKEOFF_PANTS=3]="TAKEOFF_PANTS"}(t||(t={}));var n=function(n){function i(){var e=n.call(this)||this;return e.mCurPlayMode=-1,e.mIsFinishPutOn=!1,e.mIsFinishTakeOff=!1,e.mActionQueue=[],e.mCurHintActionType=-1,e.skinName="MainViewSkin",e}return __extends(i,n),i.prototype.createChildren=function(){n.prototype.createChildren.call(this),this.kImgPutOn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartPutOn,this),this.kImgTakeOff.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartTakeOff,this),this.kImgPantsDown0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPutOnPants0,this),this.kImgPantsDown1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPutOnPants1,this),this.kImgShirtDown0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPutOnShirt0,this),this.kImgShirtDown1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPutOnShirt1,this),this.kImgShirtUp_0_g.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTakeOffShirt0,this),this.kImgShirtUp_1_g.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTakeOffShirt1,this),this.kImgPantsUp_0_g.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTakeOffPants0,this),this.kImgPantsUp_1_g.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTakeOffPants1,this),XDFFrame.EventCenter.addEventListenr(e.EventConst.eventReplay,this.init,this),mouse.enable(this.stage),this.init()
},i.prototype.init=function(){this.showHintMode(),this.initMode()},i.prototype.initMode=function(){this.kGrpUpGray0.visible=this.kGrpUpGray1.visible=this.kGrpUpLight0.visible=this.kGrpUpLight1.visible=!1,this.kImgShirtDown0.visible=this.kImgShirtDown1.visible=this.kImgPantsDown0.visible=this.kImgPantsDown1.visible=!1,this.mCurPlayMode=-1,this.kComAnswer.visible=this.kComReplay.visible=!1,this.mIsFinishPutOn=this.mIsFinishTakeOff=!1},i.prototype.showHintMode=function(){egret.Tween.removeTweens(this.kImgPutOn),egret.Tween.removeTweens(this.kImgTakeOff),this.kImgPutOn.scaleX=this.kImgPutOn.scaleY=this.kImgTakeOff.scaleX=this.kImgTakeOff.scaleY=.95,egret.Tween.get(this.kImgPutOn,{loop:!0}).to({scaleX:1.05,scaleY:1.05},800,egret.Ease.cubicInOut).to({scaleX:.95,scaleY:.95},800,egret.Ease.cubicInOut),egret.Tween.get(this.kImgTakeOff,{loop:!0}).to({scaleX:1.05,scaleY:1.05},800,egret.Ease.cubicInOut).to({scaleX:.95,scaleY:.95},800,egret.Ease.cubicInOut)},i.prototype.stopModeHintAction=function(){egret.Tween.removeTweens(this.kImgPutOn),egret.Tween.removeTweens(this.kImgTakeOff),this.kImgPutOn.scaleX=this.kImgPutOn.scaleY=this.kImgTakeOff.scaleX=this.kImgTakeOff.scaleY=1},i.prototype.onStartPutOn=function(){var e=this;-1==this.mCurPlayMode&&(this.mCurPlayMode=0,this.stopModeHintAction(),this.kGrpUpGray0.visible=this.kGrpUpGray1.visible=!1,this.kGrpUpLight0.visible=this.kGrpUpLight1.visible=!0,this.kImgShirtUp_0_l.visible=this.kImgShirtUp_1_l.visible=this.kImgPantsUp_0_l.visible=this.kImgPantsUp_1_l.visible=!1,this.kImgShirtDown0.visible=this.kImgShirtDown1.visible=this.kImgPantsDown0.visible=this.kImgPantsDown1.visible=!0,this.kImgShirtDown0.source="img_shirt_0_g_png",this.kImgShirtDown1.source="img_shirt_1_g_png",this.kImgPantsDown0.source="img_pants_0_g_png",this.kImgPantsDown1.source="img_pants_1_g_png",this.mCurHintActionType=-1,this.mActionQueue=[0,0,1,1],XDFSoundManager.play("sound_put_on_mp3",0,1,1,"sound_put_on_mp3",function(){e.goNextStep()}))},i.prototype.onStartTakeOff=function(){var e=this;-1==this.mCurPlayMode&&(this.mCurPlayMode=1,this.stopModeHintAction(),XDFSoundManager.play("sound_take_off_mp3"),this.kImgShirtDown0.visible=this.kImgShirtDown1.visible=this.kImgPantsDown0.visible=this.kImgPantsDown1.visible=!1,this.kImgShirtDown0.source="img_shirt_0_l_png",this.kImgShirtDown1.source="img_shirt_1_l_png",this.kImgPantsDown0.source="img_pants_0_l_png",this.kImgPantsDown1.source="img_pants_1_l_png",this.kGrpUpGray0.visible=this.kGrpUpGray1.visible=!0,this.kGrpUpLight0.visible=this.kGrpUpLight1.visible=!1,this.kImgShirtUp_0_g.visible=this.kImgShirtUp_1_g.visible=this.kImgPantsUp_0_g.visible=this.kImgPantsUp_1_g.visible=!0,this.mCurHintActionType=-1,this.mActionQueue=[2,2,3,3],XDFSoundManager.play("sound_take_off_mp3",0,1,1,"sound_take_off_mp3",function(){e.goNextStep()}))},i.prototype.onPutOnShirt0=function(){var e=this;return this.mCurHintActionType!=t.PUTON_SHIRT?(this.kComAnswer.visible=!0,void this.kComAnswer.playErr(function(){e.kComAnswer.visible=!1,e.playHintSound()})):(this.kImgShirtDown0.visible=!1,this.kImgShirtUp_0_l.visible=!0,void this.playSoundDing(function(){e.goNextStep()}))},i.prototype.onPutOnShirt1=function(){var e=this;return this.mCurHintActionType!=t.PUTON_SHIRT?(this.kComAnswer.visible=!0,void this.kComAnswer.playErr(function(){e.kComAnswer.visible=!1,e.playHintSound()})):(this.kImgShirtDown1.visible=!1,this.kImgShirtUp_1_l.visible=!0,void this.playSoundDing(function(){e.goNextStep()}))},i.prototype.onPutOnPants0=function(){var e=this;return this.mCurHintActionType!=t.PUTON_PANTS?(this.kComAnswer.visible=!0,void this.kComAnswer.playErr(function(){e.kComAnswer.visible=!1,e.playHintSound()})):(this.kImgPantsDown0.visible=!1,this.kImgPantsUp_0_l.visible=!0,void this.playSoundDing(function(){e.goNextStep()}))},i.prototype.onPutOnPants1=function(){var e=this;return this.mCurHintActionType!=t.PUTON_PANTS?(this.kComAnswer.visible=!0,void this.kComAnswer.playErr(function(){e.kComAnswer.visible=!1,e.playHintSound()})):(this.kImgPantsDown1.visible=!1,this.kImgPantsUp_1_l.visible=!0,void this.playSoundDing(function(){e.goNextStep()}))},i.prototype.onTakeOffShirt0=function(){var e=this;return this.mCurHintActionType!=t.TAKEOFF_SHIRT?(this.kComAnswer.visible=!0,void this.kComAnswer.playErr(function(){e.kComAnswer.visible=!1,e.playHintSound()})):(this.kImgShirtUp_0_g.visible=!1,this.kImgShirtDown0.visible=!0,void this.playSoundDing(function(){e.goNextStep()}))},i.prototype.onTakeOffShirt1=function(){var e=this;return this.mCurHintActionType!=t.TAKEOFF_SHIRT?(this.kComAnswer.visible=!0,void this.kComAnswer.playErr(function(){e.kComAnswer.visible=!1,e.playHintSound()})):(this.kImgShirtUp_1_g.visible=!1,this.kImgShirtDown1.visible=!0,void this.playSoundDing(function(){e.goNextStep()}))},i.prototype.onTakeOffPants0=function(){var e=this;return this.mCurHintActionType!=t.TAKEOFF_PANTS?(this.kComAnswer.visible=!0,void this.kComAnswer.playErr(function(){e.kComAnswer.visible=!1,e.playHintSound()})):(this.kImgPantsUp_0_g.visible=!1,this.kImgPantsDown0.visible=!0,void this.playSoundDing(function(){e.goNextStep()}))},i.prototype.onTakeOffPants1=function(){var e=this;return this.mCurHintActionType!=t.TAKEOFF_PANTS?(this.kComAnswer.visible=!0,void this.kComAnswer.playErr(function(){e.kComAnswer.visible=!1,e.playHintSound()})):(this.kImgPantsUp_1_g.visible=!1,this.kImgPantsDown1.visible=!0,void this.playSoundDing(function(){e.goNextStep()}))},i.prototype.goNextStep=function(){var e=this;if(this.mActionQueue.length<=0){if(0==this.mCurPlayMode?this.mIsFinishPutOn=!0:1==this.mCurPlayMode&&(this.mIsFinishTakeOff=!0),this.mIsFinishPutOn&&this.mIsFinishTakeOff)return this.kComAnswer.visible=!0,void this.kComAnswer.playGood(function(){e.kComReplay.visible=!0,e.kComReplay.showReplay()});this.mCurPlayMode=-1,this.showHintMode()}this.mCurHintActionType=this.mActionQueue.shift(),this.playHintSound()},i.prototype.playHintSound=function(){switch(this.mCurHintActionType){case t.PUTON_SHIRT:XDFSoundManager.play("sound_put_on_shirt_mp3");break;case t.PUTON_PANTS:XDFSoundManager.play("sound_put_on_pants_mp3");break;case t.TAKEOFF_SHIRT:XDFSoundManager.play("sound_take_off_shirt_mp3");break;case t.TAKEOFF_PANTS:XDFSoundManager.play("sound_take_off_pants_mp3")}},i.prototype.playSoundDing=function(e){XDFSoundManager.play("sound_ding_mp3",0,1,1,"sound_ding_mp3",function(){e&&e()})},i}(eui.Component);e.MainView=n,__reflect(n.prototype,"game.MainView")}(game||(game={}));