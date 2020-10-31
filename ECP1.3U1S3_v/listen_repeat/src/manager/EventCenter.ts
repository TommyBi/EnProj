namespace XDFFrame {
    /**
     * 事件处理中心
     */
    export class EventCenter {

        public static _instance: egret.EventDispatcher;

        public constructor() {
        }

        public static get instance(): egret.EventDispatcher {
            if (!this._instance) {
                this._instance = new egret.EventDispatcher();
            }
            return this._instance;
        }

        public static dispatch(type: string, data?: any, bubbles?: boolean, cancelable?: boolean) {
            return this.instance.dispatchEventWith(type, bubbles, data, cancelable);
        }

        public static addEventListenr(type: string, listener: Function, thisObj: any, useCapture?: boolean, priority?: number) {
            this.instance.addEventListener(type, listener, thisObj, useCapture, priority);
        }

        public static removeEventListener(type: string, listener: Function, thisObject, useCapture?: boolean) {
            this.instance.removeEventListener(type, listener, thisObject, useCapture);
        }

        public static sendEvent(e: string, data?: any) {
            var eve = new egret.Event(e);
            eve.data = data;
            this.instance.dispatchEvent(eve);
        }
    }
}
