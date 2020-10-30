class GameDevice {
    static get isShowReturn() {
        // omo 不显示返回按钮 ai课不显示
        if (window.__math2_res_config__ != undefined) {
            return false;
        } else if (window["isAI"]) {
            return false;
        } else {
            return true;
        }
    }
    static get isShowRefresh() {
        // omo 显示刷新按钮 ai课不显示
        if (window.__math2_res_config__ != undefined) {
            return true;
        } else if (window["isAI"]) {
            return false;
        } else {
            return true;
        }
    }
    /**
     *  0:线下课
     *  1：ai课
     *  2：云教室
     */
    static get platform() {
        if (window.__math2_res_config__ != undefined) {
            return 2;
        } else if (window["isAI"]) {
            return 1;
        } else {
            return 0;
        }
    }

    static get isAI() {
        return window["isAI"] == true;
    }

    static get isOmo() {
        return window.__math2_res_config__ != undefined;
    }
}