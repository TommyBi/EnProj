/**
 * Created by yangsong on 15-1-14.
 * 音效类
 */
class SoundEffects extends BaseSound {
    private _volume:number;
    private objcatch = {};
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 播放一个音效，支持返回播放中的音效并设置循环次数
     * 如果是异步加载的网络音效，有可能播放成功的时候也返回null
     * 
     * @param effectName
     * @param loop 0表示循环播放，默认为1，播放一次
     */
    public play(effectName:string, loop:number = 1):egret.SoundChannel {
        if(this.isSoundError)return;
        var sound:egret.Sound = this.getSound(effectName);
        if (sound) {
            return this.playSound(sound, loop, effectName);
        }
        return null;
    }

    /* 停止播放音效 */
    public close(effectName:string):void {
        if(this.isSoundError)return;
        if (this.objcatch[effectName]) {
            this.objcatch[effectName].stop();
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound:egret.Sound, loop:number = 1, effectName = ""):egret.SoundChannel {
        var channel:egret.SoundChannel = sound.play(0, loop);
        channel.volume = this._volume;
        if (effectName == "boss_snore_mp3") {
            this.objcatch[effectName] = channel;
        }
        return channel;
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume:number):void {
        this._volume = volume;
    }


    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key:string, loop:number = 1):egret.SoundChannel {
        let sound:egret.Sound = RES.getRes(key);
        if(sound){
            return this.playSound(sound, loop);
        }
        return null;
    }
}