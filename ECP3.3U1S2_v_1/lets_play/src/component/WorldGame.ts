class WorldGame extends eui.Component implements eui.UIComponent {

	private isDebug: boolean = true;
	public constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
		this.width = 1920;
		this.height = 1080;
		// this.addWord();
		this.skinName = "WorldGameSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}


	// public addWord() {
	// 	var factor: number = 50;
	// 	//创建world
	// 	var world: p2.World = new p2.World();

	// 	world.sleepMode = p2.World.BODY_SLEEPING;



	// 	//创建plane

	// 	var planeShape: p2.Plane = new p2.Plane();

	// 	var planeBody: p2.Body = new p2.Body();

	// 	planeBody.addShape(planeShape);

	// 	planeBody.displays = [];

	// 	world.addBody(planeBody);



	// 	egret.Ticker.getInstance().register(function (dt) {

	// 		if (dt < 10) {

	// 			return;

	// 		}

	// 		if (dt > 1000) {

	// 			return;

	// 		}

	// 		world.step(dt / 1000);



	// 		var stageHeight: number = egret.MainContext.instance.stage.stageHeight;

	// 		var l = world.bodies.length;

	// 		for (var i: number = 0; i < l; i++) {

	// 			var boxBody: p2.Body = world.bodies[i];

	// 			var box: egret.DisplayObject = boxBody.displays[0];

	// 			if (box) {

	// 				box.x = boxBody.position[0] * factor;

	// 				box.y = stageHeight - boxBody.position[1] * factor;

	// 				box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;

	// 				if (boxBody.sleepState == p2.Body.SLEEPING) {

	// 					box.alpha = 0.5;

	// 				}

	// 				else {

	// 					box.alpha = 1;

	// 				}

	// 			}

	// 		}

	// 	}, this);
		

	// 	//鼠标点击添加刚体

	// 	this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, addOneBox, this);

	// 	var self = this;



	// 	function addOneBox(e: egret.TouchEvent): void {


	// 		console.log("ffffffffffffff");

	// 		var positionX: number = Math.floor(e.stageX / factor);

	// 		var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);


	// 		console.log(positionX,positionY)

	// 		var display: egret.DisplayObject;


	// 			//添加方形刚体

	// 			//var boxShape: p2.Shape = new p2.Rectangle(2, 1);

	// 			var boxShape: p2.Shape = new p2.Box({ width: 2, height: 1 });

	// 			var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });

	// 			boxBody.addShape(boxShape);

	// 			world.addBody(boxBody);



	// 			if (self.isDebug) {

	// 				display = self.createBox((<p2.Box>boxShape).width * factor, (<p2.Box>boxShape).height * factor);

	// 			} else {

	// 				display = self.createBitmapByName("rect");

	// 			}
	// 			display.width = (<p2.Box>boxShape).width * factor;

	// 			display.height = (<p2.Box>boxShape).height * factor;

			



	// 		display.anchorOffsetX = display.width / 2;

	// 		display.anchorOffsetY = display.height / 2;



	// 		boxBody.displays = [display];

	// 		self.addChild(display);

	// 	}
	// }
	// /**
	
	// 	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
	
	// 	 */

	// private createBitmapByName(name: string): egret.Bitmap {

	// 	var result: egret.Bitmap = new egret.Bitmap();

	// 	var texture: egret.Texture = RES.getRes(name);

	// 	result.texture = texture;

	// 	return result;

	// }

    // /**

    //  * 创建一个圆形

    //  */

	// private createBall(r: number): egret.Shape {

	// 	var shape = new egret.Shape();

	// 	shape.graphics.beginFill(0xfff000);

	// 	shape.graphics.drawCircle(r, r, r);

	// 	shape.graphics.endFill();

	// 	return shape;

	// }

    // /**

    //  * 创建一个方形

    //  */

	// private createBox(width: number, height: number): egret.Shape {

	// 	var shape = new egret.Shape();

	// 	shape.graphics.beginFill(0xfff000);

	// 	shape.graphics.drawRect(0, 0, width, height);

	// 	shape.graphics.endFill();

	// 	return shape;

	// }

}