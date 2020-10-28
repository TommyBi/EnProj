//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.obj_person = {
            armatureName: "loading",
            animateName: "loading",
            count: -1,
            scale: 1,
            position: [0, 0]
        };
        _this.bar_top = new eui.Image();
        _this.bar_move = new eui.Image();
        _this.bar_mask = new eui.Image();
        _this.bar_bot = new eui.Image();
        _this.local_x = 650;
        _this.local_y = 697;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var my_bg, label, fnt;
            return __generator(this, function (_a) {
                my_bg = new eui.Rect;
                my_bg.fillColor = 0xffffff;
                my_bg.width = this.stage.stageWidth;
                my_bg.height = this.stage.stageHeight;
                this.addChild(my_bg);
                DragonFun.animationFun(this, this.obj_person);
                this.textField = new egret.BitmapText();
                egret.TextField.default_fontFamily = "FZCuYuan-M03S";
                label = new eui.Label();
                // label.fontFamily = "FZCuYuan-M03S";
                label.text = "0";
                this.addChild(label);
                fnt = RES.getRes("num_fnt");
                this.textField.font = fnt;
                this.textField.text = "0%";
                this.textField.textAlign = "center";
                this.textField.y = 730;
                this.textField.width = this.stage.stageWidth;
                this.textField.height = this.stage.stageHeight;
                this.bar_bot.source = RES.getRes("bar_bot_png");
                this.addChild(this.bar_bot);
                this.bar_bot.x = this.local_x;
                this.bar_bot.y = this.local_y;
                this.bar_mask.source = RES.getRes("bar_bot_png");
                this.addChild(this.bar_mask);
                this.bar_mask.x = this.local_x;
                this.bar_mask.y = this.local_y;
                this.bar_move.source = RES.getRes("bar_move_png");
                this.addChild(this.bar_move);
                this.bar_move.x = this.local_x - 633;
                this.bar_move.y = this.local_y;
                this.bar_move.mask = this.bar_mask;
                this.bar_top.source = RES.getRes("bar_top_png");
                this.addChild(this.bar_top);
                this.bar_top.x = this.local_x;
                this.bar_top.y = this.local_y;
                return [2 /*return*/];
            });
        });
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = Math.floor((current / total) * 100).toString() + "%";
        this.addChild(this.textField);
        this.bar_move.x = this.local_x - (1 - current / total) * 633;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map