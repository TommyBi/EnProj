class Util {
	public static addMoney(nowNum: eui.Label, am, timeNum) {
		timeNum = egret.setTimeout(() => {
			let aaa = 1;
			if (am > 100) {
				aaa = 100;
			} else if (am > 10) {
				aaa = 10;
			}
			am = am - aaa;
			nowNum.text = Number(nowNum.text) + aaa + "";
			if (am > 0) {
				this.addMoney(nowNum, am, timeNum);
			} else {
				timeNum = -1;
			}
		}, this, 100);
	}

	public static setColor(img, c) {
		//0xff8814 橘色
		// 0xff0000 : 0x79ff56
		var color: number = c;        /// 光晕的颜色，十六进制，不包含透明度
		var alpha: number = 1;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
		var blurX: number = 15;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		var blurY: number = 15;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		var strength: number = 3;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
		var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
		var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
		var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
			strength, quality, inner, knockout);
		img.filters = [glowFilter]
	}

	public static setImageColor(image, color: number) {
		// 将16进制颜色分割成rgb值
		let spliceColor = (color) => {
			let result = { r: -1, g: -1, b: -1 };
			result.b = color % 256;
			result.g = Math.floor((color / 256)) % 256;
			result.r = Math.floor((color / 256) / 256);
			return result;
		}
		let result = spliceColor(color);
		let colorMatrix = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0
		];
		colorMatrix[0] = result.r / 255;
		colorMatrix[6] = result.g / 255;
		colorMatrix[12] = result.b / 255;
		let colorFilter = new egret.ColorMatrixFilter(colorMatrix);
		image.filters = [colorFilter];
	}

	public static randomNum(minNum, maxNum) {
		return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
	}

	public static randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public static setTween(tmp, wnum) {
		egret.Tween.get(tmp).to({ scaleX: 0, scaleY: 0 }, 0).wait(wnum).to({ scaleX: 1, scaleY: 1 }, 250).to({ scaleX: 0.9, scaleY: 0.9 }, 120).to({ scaleX: 1, scaleY: 1 }, 120).call(() => {

			egret.Tween.get(tmp, { loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);


		})
	}

	/**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    public static limit($from: number, $end: number): number {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range: number = $end - $from;
        return $from + Math.random() * range;
    }

    /**
     * 获取一个区间的随机数(整数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    public static limitInteger($from: number, $end: number): number {
        return Math.floor(this.limit($from, $end + 1));
    }

	 /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    public randomArray(arr: Array<any>): any {
        var index: number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
	 /**
     * 拷贝数组
     * @param  {any[]} baseArr
     */
    public static copyArr(baseArr: any[]) {
        let arr = [];
        for (var i = 0; i < baseArr.length; i++) {
            arr.push(baseArr[i]);
        }
        return arr;
    }
	 /**
     *打乱一个数组
     */
    public static resetArray(arr: Array<any>): any[] {
        arr.sort(function () {
            return 0.5 - Math.random();
        });
        return arr;
        //sort 是对数组进行排序
        //他的是这样工作的。每次从数组里面挑选两个数 进行运算。
        //如果传入的参数是0 两个数位置不变。
        //如果参数小于0 就交换位置
        //如果参数大于0就不交换位置
        //接下来用刚才的较大数字跟下一个进行比较。这样循环进行排序。

        /*恰好。我们利用了这一点使用了0.5 - Math.random  这个运算的结果要么是大于0,要么是小于0.这样要么交换位置，要么不交换位置。当然大于或者小于0是随即出现的。所以数组就被随即排序了。*/

    }

}