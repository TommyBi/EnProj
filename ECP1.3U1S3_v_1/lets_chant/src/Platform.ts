/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    getUserInfo(): Promise<any>;

    login(): Promise<any>
    getGameInfo();

    sendMessage(code, info, isRight);
}

declare function __paopaoEgretTextbookMessageHandler__(message: Object);

class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {

    }
    getGameInfo() {
        return { name: document.title }
    }

    sendMessage(code, info, isRight, finish = 1) {
        console.log("sendToNative", isRight);
        egret.ExternalInterface.call("sendToNative", JSON.stringify({
            //10001 开始 10002答题
            code: code,
            msg: "success",
            data: {
                appId: null,
                appName: null,
                userId: null,
                studentId: null,
                studentName: null,
                gameId: null,
                quesId: null,
                answer: info,
                finish: finish,  // 0: 表示这个游戏做完之后就没有游戏了
                isRight: isRight, //【0：错误，1：正确，2：未作答】
                answerTime: 0
            }
        }));

        if (typeof __paopaoEgretTextbookMessageHandler__ != "undefined")
            __paopaoEgretTextbookMessageHandler__({
                //code : 10001 载入游戏完成  10002答题 10003透传
                code: code,
                msg: "success",
                data: {
                    appId: null,
                    appName: null,
                    userId: null,
                    studentId: null,
                    studentName: null,
                    gameId: null,
                    quesId: null,
                    answer: info,
                    isRight: isRight, //【0：错误，1：正确，2：未作答,3：作答完成】
                    answerTime: 0
                }
            })
    }

}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
    __math2_res_config__: string

}