var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var XDFSoundManager = (function () {
    function XDFSoundManager() {
    }
    XDFSoundManager.play = function (url, startTime, loops, volume, key, func) {
        if (key === void 0) { key = url; }
        if (!this._musicHash[key]) {
            this._musicHash[key] = new Sound(url, volume);
        }
        if (key != url) {
            this._musicHash[key].url = url;
        }
        this._musicHash[key].play(startTime, loops, this.isMuteMusic, func);
    };
    XDFSoundManager.stop = function (url, key) {
        if (key === void 0) { key = url; }
        if (this._musicHash[key]) {
            this._musicHash[key].stop();
        }
    };
    XDFSoundManager.stopAll = function () {
        for (var key in this._musicHash) {
            this._musicHash[key].stop();
        }
    };
    XDFSoundManager.setVolume = function (url, volume, key) {
        if (key === void 0) { key = url; }
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        if (this._musicHash[key]) {
            this._musicHash[key].volume = volume;
        }
    };
    XDFSoundManager.getVolume = function (url, key) {
        if (key === void 0) { key = url; }
        if (this._musicHash[key]) {
            return this._musicHash[key].volume;
        }
        else {
            return null;
        }
    };
    XDFSoundManager.onMute = function () {
        for (var key in this._musicHash) {
            this._musicHash[key].onMute();
        }
        this.isMuteMusic = true;
    };
    /**
     * 恢复音量
     */
    XDFSoundManager.resumeMute = function () {
        for (var key in this._musicHash) {
            this._musicHash[key].resumeMute();
        }
        this.isMuteMusic = false;
    };
    XDFSoundManager.removeEventListener = function () {
        for (var key in this._musicHash) {
            this._musicHash[key].removeEventListener();
        }
    };
    XDFSoundManager._musicHash = {};
    /**
     * 静音
     */
    XDFSoundManager.isMuteMusic = false;
    return XDFSoundManager;
}());
__reflect(XDFSoundManager.prototype, "XDFSoundManager");
var Sound = (function () {
    function Sound(url, _volume) {
        if (_volume === void 0) { _volume = 0.5; }
        this.url = url;
        this._volume = _volume;
        // private _volume: number = 0.5;
        this._mute = false;
    }
    Sound.prototype.play = function (startTime, loops, mute, func) {
        var _this = this;
        if (loops === void 0) { loops = 1; }
        this.stop();
        if (func) {
            this.callBack = func;
        }
        if (!RES.hasRes(this.url)) {
            console.log("列表不存在音频");
            return;
        }
        if (RES.getRes(this.url)) {
            this._currentSound = RES.getRes(this.url);
            this._currentChannel = this._currentSound.play(startTime, loops);
            if (mute) {
                this._currentChannel.volume = 0;
            }
            else {
                this._currentChannel.volume = this._volume;
            }
            if (func) {
                this._currentChannel.once(egret.Event.SOUND_COMPLETE, this.callBack, this);
            }
        }
        else {
            RES.getResAsync(this.url, function (v, k) {
                if (v) {
                    _this._currentSound = v;
                    _this._currentChannel = _this._currentSound.play(startTime, loops);
                    if (mute) {
                        _this._currentChannel.volume = 0;
                    }
                    else {
                        _this._currentChannel.volume = _this._volume;
                    }
                    if (func) {
                        _this._currentChannel.once(egret.Event.SOUND_COMPLETE, _this.callBack, _this);
                    }
                }
            }, this);
        }
        this._mute = mute;
    };
    Sound.prototype.stop = function () {
        if (this._currentChannel) {
            if (this._currentChannel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                this._currentChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.callBack, this);
            }
            this._currentChannel.stop();
            this._currentChannel = null;
        }
    };
    Object.defineProperty(Sound.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            this._volume = value;
            if (this._currentChannel && this._currentChannel.position > 0)
                this._currentChannel.volume = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 静音
     */
    Sound.prototype.onMute = function () {
        this._mute = true;
        if (this._currentChannel && this._currentChannel.position > 0) {
            this._currentChannel.volume = 0;
        }
    };
    /**
     * 恢复音量
     */
    Sound.prototype.resumeMute = function () {
        this._mute = false;
        if (this._currentChannel && this._currentChannel.position > 0) {
            this._currentChannel.volume = this._volume;
        }
    };
    Sound.prototype.removeEventListener = function () {
        if (this._currentChannel) {
            if (this._currentChannel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                this._currentChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.callBack, this);
            }
        }
    };
    return Sound;
}());
__reflect(Sound.prototype, "Sound");
//# sourceMappingURL=XDFSoundManager.js.map