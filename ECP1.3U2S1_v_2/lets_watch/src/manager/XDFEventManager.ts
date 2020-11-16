class XDFEventManager extends egret.EventDispatcher {
	public static PAUSE = "pause_event";
	public static RESUME = "resume_event";
	private static _instance: XDFEventManager;

	private static getInstance(): XDFEventManager {
		if (!this._instance) {
			this._instance = new XDFEventManager();
		}
		return this._instance;
	}

	public constructor(target: egret.IEventDispatcher = null) {
		super(target);
	}

	public static dispatchEvent(event: egret.Event): void {
		this.getInstance().dispatchEvent(event);
	}


	public static addEventListener(type: string, listener: Function, content: any): void {
		this.getInstance().addEventListener(type, listener, content);
	}


	public static hasEventListener(type: string): boolean {
		return this.getInstance().hasEventListener(type);
	}


	public static removeEventListener(type: string, listener: Function): void {
		this.getInstance().removeEventListener(type, listener, this);
	}

	public static onPasue() {
		this.getInstance().dispatchEventWith(XDFEventManager.PAUSE);
	}
	public static onResume() {
		this.getInstance().dispatchEventWith(XDFEventManager.RESUME);
	}
}
