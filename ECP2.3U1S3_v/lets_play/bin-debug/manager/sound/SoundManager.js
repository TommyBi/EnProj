var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
var SoundManager = (function () {
    /**
     * 构造函数
     */
    function SoundManager() {
        this.bgOn = true;
        this.effectOn = true;
        this.bgVolume = 0.5;
        this.effectVolume = 0.5;
        this.bg = new SoundBg();
        this.bg.setVolume(this.bgVolume);
        this.effect = new SoundEffects();
        this.effect.setVolume(this.effectVolume);
    }
    Object.defineProperty(SoundManager, "ins", {
        get: function () {
            if (!this._instance)
                this._instance = new SoundManager();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 播放音效
     * @param effectName
     * @param loop 循环播放的次数，默认1次，0表示无限循环
     */
    SoundManager.prototype.playEffect = function (effectName, loop) {
        if (loop === void 0) { loop = 1; }
        if (!this.effectOn)
            return null;
        return this.effect.play(effectName, loop);
    };
    /** 停止播放音效 */
    SoundManager.prototype.stopEffect = function (effectName) {
        if (!this.effectOn)
            return;
        this.effect.close(effectName);
    };
    /**
     * 播放背景音乐
     * @param key
     */
    SoundManager.prototype.playBg = function (bgName) {
        this.currBg = bgName;
        if (!this.bgOn)
            return;
        if (!this.effectOn)
            return;
        this.bg.play(bgName);
    };
    /**
     * 停止背景音乐
     */
    SoundManager.prototype.stopBg = function () {
        this.bg.stop();
    };
    /**
     * 设置音效是否开启
     * @param $isOn
     */
    SoundManager.prototype.setEffectOn = function ($isOn) {
        this.effectOn = $isOn;
    };
    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    SoundManager.prototype.setBgOn = function ($isOn) {
        this.bgOn = $isOn;
        if (!this.bgOn) {
            this.stopBg();
        }
        else {
            if (this.currBg) {
                this.playBg(this.currBg);
            }
        }
    };
    /**
     * 设置背景音乐音量
     * @param volume
     */
    SoundManager.prototype.setBgVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.bgVolume = volume;
        this.bg.setVolume(this.bgVolume);
    };
    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    SoundManager.prototype.getBgVolume = function () {
        return this.bgVolume;
    };
    /**
     * 设置音效音量
     * @param volume
     */
    SoundManager.prototype.setEffectVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.effectVolume = volume;
        this.effect.setVolume(this.effectVolume);
    };
    /**
     * 获取音效音量
     * @returns {number}
     */
    SoundManager.prototype.getEffectVolume = function () {
        return this.effectVolume;
    };
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    SoundManager.CLEAR_TIME = 3 * 60 * 1000;
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
