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
 * Created by yangsong on 15-1-14.
 * 音效类
 */
var SoundEffects = (function (_super) {
    __extends(SoundEffects, _super);
    /**
     * 构造函数
     */
    function SoundEffects() {
        var _this = _super.call(this) || this;
        _this.objcatch = {};
        return _this;
    }
    /**
     * 播放一个音效，支持返回播放中的音效并设置循环次数
     * 如果是异步加载的网络音效，有可能播放成功的时候也返回null
     *
     * @param effectName
     * @param loop 0表示循环播放，默认为1，播放一次
     */
    SoundEffects.prototype.play = function (effectName, loop) {
        if (loop === void 0) { loop = 1; }
        if (this.isSoundError)
            return;
        var sound = this.getSound(effectName);
        if (sound) {
            return this.playSound(sound, loop, effectName);
        }
        return null;
    };
    /* 停止播放音效 */
    SoundEffects.prototype.close = function (effectName) {
        if (this.isSoundError)
            return;
        if (this.objcatch[effectName]) {
            this.objcatch[effectName].stop();
        }
    };
    /**
     * 播放
     * @param sound
     */
    SoundEffects.prototype.playSound = function (sound, loop, effectName) {
        if (loop === void 0) { loop = 1; }
        if (effectName === void 0) { effectName = ""; }
        var channel = sound.play(0, loop);
        channel.volume = this._volume;
        if (effectName == "boss_snore_mp3") {
            this.objcatch[effectName] = channel;
        }
        return channel;
    };
    /**
     * 设置音量
     * @param volume
     */
    SoundEffects.prototype.setVolume = function (volume) {
        this._volume = volume;
    };
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    SoundEffects.prototype.loadedPlay = function (key, loop) {
        if (loop === void 0) { loop = 1; }
        var sound = RES.getRes(key);
        if (sound) {
            return this.playSound(sound, loop);
        }
        return null;
    };
    return SoundEffects;
}(BaseSound));
__reflect(SoundEffects.prototype, "SoundEffects");
//# sourceMappingURL=SoundEffects.js.map