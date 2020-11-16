// TypeScript file
class Value<T> extends egret.EventDispatcher {
	private _value: T;
	public constructor(value: T) {
		super();
		this._value = value;
	}
	public get value(): T {
		return this._value;
	}
	public set value(value: T) {
		if (this._value != value) {
			this._value = value;
			var data = new Data(Data.DATA)
			this.dispatchEvent(data)
		}
	}
}
class Data extends egret.Event {
	public static DATA: string = "valueChang";
	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}