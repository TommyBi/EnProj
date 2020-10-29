namespace XDFFrame {
    export interface IEffect {
        //开始效果
        start(target: egret.DisplayObject, args?: any): void;

        //停止效果
        stop(target: egret.DisplayObject, args?: any): void;
    }
}