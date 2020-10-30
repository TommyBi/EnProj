/**
 * 示例自定义插件，您可以查阅 http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/cmdExtensionPlugin/index.html
 * 了解如何开发一个自定义插件
 */
import * as fs from 'fs';
import * as path from 'path';

export class CustomPlugin implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {

    }
}


export class CopyIndex implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {
        let index = fs.readFileSync(path.join(commandContext.projectRoot, "template/webAI/index.html"));
        commandContext.createFile(path.join(commandContext.outputDir, "index.html"), index);
    }
}

