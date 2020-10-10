class XDFSoundManager {
    constructor() {

    }

    private static _musicHash: { [key: string]: Sound } = {};
    static play(url: string, startTime?: number, loops?: number, volume?: number, key = url, func?) {
        if (!this._musicHash[key]) {
            this._musicHash[key] = new Sound(url, volume);
        }
        if (key != url) {
            this._musicHash[key].url = url;
        }
        this._musicHash[key].play(startTime, loops, this.isMuteMusic, func);
    }

    static stop(url: string, key = url) {
        if (this._musicHash[key]) {
            this._musicHash[key].stop();
        }
    }

    static stopAll() {
        for (let key in this._musicHash) {
            this._musicHash[key].stop();
        }
    }


    static setVolume(url: string, volume: number, key = url) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        if (this._musicHash[key]) {
            this._musicHash[key].volume = volume;
        }
    }

    static getVolume(url: string, key = url) {
        if (this._musicHash[key]) {
            return this._musicHash[key].volume
        } else {
            return null;
        }
    }
    /**
     * 静音
     */
    static isMuteMusic = false;
    public static onMute(): void {
        for (let key in this._musicHash) {
            this._musicHash[key].onMute();
        }
        this.isMuteMusic = true;
    }

    /**
     * 恢复音量
     */
    public static resumeMute(): void {
        for (let key in this._musicHash) {
            this._musicHash[key].resumeMute();
        }
        this.isMuteMusic = false;
    }


    public static removeEventListener(): void {
        for (let key in this._musicHash) {
            this._musicHash[key].removeEventListener();
        }
    }


}
class Sound {
    private _currentChannel: egret.SoundChannel;
    private _currentSound: egret.Sound;
    // private _volume: number = 0.5;
    private _mute: boolean = false;
    private callBack;
    constructor(public url: string, private _volume = 0.5) {

    }
    play(startTime?: number, loops: number = 1, mute?: boolean, func?) {
        this.stop();
        if (func) {
            this.callBack = func;
        }

        if (!RES.hasRes(this.url)) {
            console.log("列表不存在音频");
            return;
        }

        if (RES.getRes(this.url)) {
            this._currentSound = RES.getRes(this.url)
            this._currentChannel = this._currentSound.play(startTime, loops);
            if (mute) {
                this._currentChannel.volume = 0;
            } else {
                this._currentChannel.volume = this._volume;
            }
            if (func) {
                this._currentChannel.once(egret.Event.SOUND_COMPLETE, this.callBack, this);
            }
        } else {
            RES.getResAsync(this.url, (v, k) => {
                if (v) {
                    this._currentSound = v;
                    this._currentChannel = this._currentSound.play(startTime, loops);
                    if (mute) {
                        this._currentChannel.volume = 0;
                    } else {
                        this._currentChannel.volume = this._volume;
                    }
                    if (func) {
                        this._currentChannel.once(egret.Event.SOUND_COMPLETE, this.callBack, this);
                    }
                }

            }, this);
        }
        this._mute = mute;
    }
    stop() {
        if (this._currentChannel) {
            if (this._currentChannel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                this._currentChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.callBack, this);
            }
            this._currentChannel.stop();
            this._currentChannel = null;
        }

    }

    set volume(value: number) {
        this._volume = value;

        if (this._currentChannel && this._currentChannel.position > 0)
            this._currentChannel.volume = value;

    }
    get volume() {
        return this._volume;
    }


    /**
     * 静音
     */
    public onMute(): void {
        this._mute = true;
        if (this._currentChannel && this._currentChannel.position > 0) {
            this._currentChannel.volume = 0;
        }
    }

    /**
     * 恢复音量
     */
    public resumeMute(): void {
        this._mute = false;
        if (this._currentChannel && this._currentChannel.position > 0) {
            this._currentChannel.volume = this._volume;
        }
    }

    public removeEventListener(): void {
        if (this._currentChannel) {
            if (this._currentChannel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                this._currentChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.callBack, this);
            }
        }
    }

}