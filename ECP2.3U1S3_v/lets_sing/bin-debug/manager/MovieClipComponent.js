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
/**
 * MovieClip动画
 */
var MovieClipComponent = (function (_super) {
    __extends(MovieClipComponent, _super);
    function MovieClipComponent(name, isLod) {
        var _this = _super.call(this) || this;
        _this.mName = name;
        _this.mIsLoad = isLod;
        _this.createMoviClip();
        return _this;
    }
    /**
     * 创建
    //  * @param  {string="1"} type
     * @param  {string} mcName 动画名称
     * @param  {boolean} isLod 是否需要动态加载资源，默认不需要
     * @returns MovieClipComponent
     */
    MovieClipComponent.produce = function (mcName, isLod) {
        if (isLod === void 0) { isLod = false; }
        if (MovieClipComponent.mCache[mcName] == null) {
            MovieClipComponent.mCache[mcName] = [];
        }
        var dict = MovieClipComponent.mCache[mcName];
        var item;
        if (dict.length > 0) {
            item = dict.pop();
        }
        else {
            item = new MovieClipComponent(mcName, isLod);
        }
        return item;
    };
    /**
     * 回收
     */
    MovieClipComponent.reclaim = function (item, type) {
        if (type === void 0) { type = "1"; }
        if (MovieClipComponent.mCache[type] == null) {
            MovieClipComponent.mCache[type] = [];
        }
        var dict = MovieClipComponent.mCache[type];
        if (dict.indexOf(item) == -1) {
            dict.push(item);
        }
    };
    MovieClipComponent.prototype.createMoviClip = function () {
        var _this = this;
        var data;
        var texture;
        if (this.mIsLoad) {
            MovieClipResLoader.instance.load(this.mName, function (_config, _texture) {
                data = _config;
                texture = _texture;
                _this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(_this.mName));
                _this.addChild(_this.mc);
                _this.width = _this.mc.width;
                _this.height = _this.mc.height;
                // this.setAnchor();
                _this.mc.addEventListener(egret.Event.COMPLETE, _this.onComplete, _this);
            });
        }
        else {
            data = RES.getRes(this.mName + "_json");
            texture = RES.getRes(this.mName + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);
            this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.mName));
            this.addChild(this.mc);
            this.width = this.mc.width;
            this.height = this.mc.height;
            this.setAnchor();
            this.mc.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        }
    };
    MovieClipComponent.prototype.setAnchor = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    MovieClipComponent.prototype.stop = function (callBack) {
        if (callBack === void 0) { callBack = null; }
        this.mc.stop();
        if (callBack)
            callBack();
    };
    /**
     * 动画播放，默认播放1次
     */
    MovieClipComponent.prototype.gotoPlay = function (animType, callBack, playNum) {
        if (callBack === void 0) { callBack = null; }
        if (playNum === void 0) { playNum = undefined; }
        this.mCallBack = callBack;
        this.mc.gotoAndPlay(animType, playNum);
    };
    /**
     * 动画播放，默认播放1次
     */
    MovieClipComponent.prototype.play = function (playNum, callBack) {
        if (playNum === void 0) { playNum = 0; }
        if (callBack === void 0) { callBack = null; }
        this.mCallBack = callBack;
        this.mc.play(playNum);
    };
    MovieClipComponent.prototype.onComplete = function () {
        if (this.mCallBack)
            this.mCallBack();
    };
    MovieClipComponent.prototype.resLoad = function (name) {
    };
    MovieClipComponent.mCache = {};
    return MovieClipComponent;
}(eui.Component));
__reflect(MovieClipComponent.prototype, "MovieClipComponent", ["eui.UIComponent", "egret.DisplayObject"]);
var MovieClipResLoader = (function () {
    function MovieClipResLoader() {
        this.mIsloadConfig = false;
        this.mIsloadTexture = false;
    }
    Object.defineProperty(MovieClipResLoader, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new MovieClipResLoader();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    MovieClipResLoader.prototype.load = function (name, callBack) {
        var _this = this;
        this.mCallBack = callBack;
        RES.getResAsync(name + "_json", function (e) {
            _this.mConfig = e;
            _this.mIsloadConfig = true;
            if (_this.mIsloadConfig && _this.mIsloadTexture)
                _this.onComplete();
        }, this);
        RES.getResAsync(name + "_png", function (e) {
            _this.mTexture = e;
            _this.mIsloadTexture = true;
            if (_this.mIsloadConfig && _this.mIsloadTexture)
                _this.onComplete();
        }, this);
    };
    MovieClipResLoader.prototype.onComplete = function () {
        this.mCallBack(this.mConfig, this.mTexture);
    };
    MovieClipResLoader._instance = null;
    return MovieClipResLoader;
}());
__reflect(MovieClipResLoader.prototype, "MovieClipResLoader");
//# sourceMappingURL=MovieClipComponent.js.map