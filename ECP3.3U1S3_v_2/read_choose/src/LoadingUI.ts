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

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }

    public obj_person = {
        armatureName: "loading",
        animateName: "loading",								//必传
        count: -1,
        scale: 1,
        position: [0, 0]

    };

    /**百分比位图 */
    private textField: egret.BitmapText;
    /**loadicon */
    private load: egret.Bitmap;
    /**百分比图片 */
    private loadBar: egret.Bitmap;
    /**loadBar背景 */
    private loadBar1: egret.Bitmap;
    private loadBar2: egret.Bitmap;
    private loadBar3: egret.Bitmap;
    public bar_top: any = new eui.Image();
    public bar_move: any = new eui.Image();
    public bar_mask: any = new eui.Image();
    public bar_bot: any = new eui.Image();
    public local_x = 650;
    public local_y = 697;
    private bjImg: egret.Bitmap;

    private async createView() {
        let my_bg: eui.Rect = new eui.Rect;
        my_bg.fillColor = 0xffffff;
        my_bg.width = this.stage.stageWidth;
        my_bg.height = this.stage.stageHeight;
        this.addChild(my_bg);
        DragonFun.animationFun(this, this.obj_person);
        this.textField = new egret.BitmapText();

        egret.TextField.default_fontFamily = "FZCuYuan-M03S";
        let label = new eui.Label();
        // label.fontFamily = "FZCuYuan-M03S";
        label.text = "0";
        this.addChild(label);

        let fnt = RES.getRes("num_fnt");//加载字体位图
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
    }

    public onProgress(current: number, total: number): void {
        this.textField.text = Math.floor((current / total) * 100).toString() + "%";
        this.addChild(this.textField);
        this.bar_move.x = this.local_x - (1 - current / total) * 633;
    }

}
