
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"ItembkSkin":"resource/eui_skins/component/itembkSkin.exml","ItembkSkin1":"resource/eui_skins/component/itembkSkin1.exml","Box":"resource/eui_skins/component/Box.exml"};generateEUI.paths['resource/eui_skins/AnswerComponentSkin.exml'] = window.AnswerComponentSkin = (function (_super) {
	__extends(AnswerComponentSkin, _super);
	function AnswerComponentSkin() {
		_super.call(this);
		this.skinParts = ["kImgStarBg","kGrpStarLeft","kGrpStarRight","kImgGood","kImgErr"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Group1_i(),this.kImgErr_i()];
	}
	var _proto = AnswerComponentSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1080;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = 0;
		t.width = 1920;
		t.elementsContent = [this.kImgStarBg_i(),this.kGrpStarLeft_i(),this.kGrpStarRight_i(),this.kImgGood_i()];
		return t;
	};
	_proto.kImgStarBg_i = function () {
		var t = new eui.Image();
		this.kImgStarBg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_star_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpStarLeft_i = function () {
		var t = new eui.Group();
		this.kGrpStarLeft = t;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.x = 470;
		t.y = 500;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.rotation = -20;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_star_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.rotation = -10;
		t.source = "img_star_png";
		t.x = 68.72;
		t.y = 14.46;
		return t;
	};
	_proto.kGrpStarRight_i = function () {
		var t = new eui.Group();
		this.kGrpStarRight = t;
		t.scaleX = -1.5;
		t.scaleY = 1.5;
		t.x = 1374;
		t.y = 250;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.rotation = 10;
		t.source = "img_star_png";
		t.x = 68.72;
		t.y = 14.46;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.rotation = 10;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_star_png";
		t.x = 0;
		t.y = -14;
		return t;
	};
	_proto.kImgGood_i = function () {
		var t = new eui.Image();
		this.kImgGood = t;
		t.anchorOffsetX = 401;
		t.anchorOffsetY = 73;
		t.horizontalCenter = 0;
		t.rotation = 700;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_goodjob_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kImgErr_i = function () {
		var t = new eui.Image();
		this.kImgErr = t;
		t.anchorOffsetX = 381;
		t.anchorOffsetY = 152;
		t.horizontalCenter = 0;
		t.rotation = -1080;
		t.source = "img_tryAgain_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return AnswerComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/DialogComponentSkin.exml'] = window.DialogComponentSkin = (function (_super) {
	__extends(DialogComponentSkin, _super);
	function DialogComponentSkin() {
		_super.call(this);
		this.skinParts = ["klbl"];
		
		this.height = 42;
		this.width = 355;
		this.elementsContent = [this._Rect1_i(),this.klbl_i()];
	}
	var _proto = DialogComponentSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.ellipseHeight = 20;
		t.ellipseWidth = 20;
		t.fillColor = 0xb3cb37;
		t.left = 0;
		t.right = 0;
		t.strokeColor = 0xffffff;
		t.strokeWeight = 3;
		t.top = 0;
		return t;
	};
	_proto.klbl_i = function () {
		var t = new eui.Label();
		this.klbl = t;
		t.fontFamily = "Microsoft JhengHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "I need new clothes";
		t.textColor = 0x561108;
		t.verticalCenter = 0;
		return t;
	};
	return DialogComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/MainScreenSkin.exml'] = window.MainScreenSkin = (function (_super) {
	__extends(MainScreenSkin, _super);
	function MainScreenSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1080;
		this.width = 1920;
	}
	var _proto = MainScreenSkin.prototype;

	return MainScreenSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VideoProBarSkin.exml'] = window.VideoProBarSkin = (function (_super) {
	__extends(VideoProBarSkin, _super);
	function VideoProBarSkin() {
		_super.call(this);
		this.skinParts = ["kImgBar","kGrpBar","kImgProBtn"];
		
		this.height = 100;
		this.width = 500;
		this.elementsContent = [this.kGrpBar_i(),this.kImgProBtn_i()];
	}
	var _proto = VideoProBarSkin.prototype;

	_proto.kGrpBar_i = function () {
		var t = new eui.Group();
		this.kGrpBar = t;
		t.bottom = 5;
		t.width = 500;
		t.x = 0;
		t.elementsContent = [this._Image1_i(),this.kImgBar_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 14;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(55,12,1424,1);
		t.source = "img_pro_line_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kImgBar_i = function () {
		var t = new eui.Image();
		this.kImgBar = t;
		t.height = 15;
		t.scale9Grid = new egret.Rectangle(192,12,1156,2);
		t.source = "img_pro_line_png";
		t.verticalCenter = 0;
		t.width = 500;
		t.x = 0;
		return t;
	};
	_proto.kImgProBtn_i = function () {
		var t = new eui.Image();
		this.kImgProBtn = t;
		t.anchorOffsetX = 111;
		t.anchorOffsetY = 98;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "img_pro_icon_png";
		t.x = 0;
		t.y = 70;
		return t;
	};
	return VideoProBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VideoComponentSkin.exml'] = window.VideoComponentSkin = (function (_super) {
	__extends(VideoComponentSkin, _super);
	function VideoComponentSkin() {
		_super.call(this);
		this.skinParts = ["kGrpVideo","kRect","kComPro","kImgMask"];
		
		this.height = 542;
		this.width = 720;
		this.elementsContent = [this.kGrpVideo_i(),this.kRect_i(),this.kComPro_i(),this.kImgMask_i()];
	}
	var _proto = VideoComponentSkin.prototype;

	_proto.kGrpVideo_i = function () {
		var t = new eui.Group();
		this.kGrpVideo = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.kRect_i = function () {
		var t = new eui.Rect();
		this.kRect = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.kComPro_i = function () {
		var t = new game.VideoProBarComponent();
		this.kComPro = t;
		t.bottom = 10;
		t.skinName = "VideoProBarSkin";
		t.x = 110;
		return t;
	};
	_proto.kImgMask_i = function () {
		var t = new eui.Image();
		this.kImgMask = t;
		t.horizontalCenter = 0;
		t.scaleX = 1.05;
		t.scaleY = 1.05;
		t.source = "img_mask_video_png";
		t.verticalCenter = 0;
		return t;
	};
	return VideoComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/MainViewSkin.exml'] = window.MainViewSkin = (function (_super) {
	__extends(MainViewSkin, _super);
	function MainViewSkin() {
		_super.call(this);
		this.skinParts = ["kCom0","kCom1","kCom2","kCom3","kCom4","kCom5","kCom6","kCom7","kComVideo"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = MainViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 669.27;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.kCom0_i(),this.kCom1_i(),this.kCom2_i(),this.kCom3_i(),this.kCom4_i(),this.kCom5_i(),this.kCom6_i(),this.kCom7_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 40;
		t.requestedRowCount = 4;
		t.verticalGap = 10;
		return t;
	};
	_proto.kCom0_i = function () {
		var t = new game.DialogComponent();
		this.kCom0 = t;
		t.name = "0";
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "DialogComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kCom1_i = function () {
		var t = new game.DialogComponent();
		this.kCom1 = t;
		t.name = "1";
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "DialogComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.kCom2_i = function () {
		var t = new game.DialogComponent();
		this.kCom2 = t;
		t.name = "2";
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "DialogComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto.kCom3_i = function () {
		var t = new game.DialogComponent();
		this.kCom3 = t;
		t.name = "3";
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "DialogComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto.kCom4_i = function () {
		var t = new game.DialogComponent();
		this.kCom4 = t;
		t.name = "4";
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "DialogComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.x = 40;
		t.y = 40;
		return t;
	};
	_proto.kCom5_i = function () {
		var t = new game.DialogComponent();
		this.kCom5 = t;
		t.name = "5";
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "DialogComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto.kCom6_i = function () {
		var t = new game.DialogComponent();
		this.kCom6 = t;
		t.name = "6";
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "DialogComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto.kCom7_i = function () {
		var t = new game.DialogComponent();
		this.kCom7 = t;
		t.name = "7";
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "DialogComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.x = 70;
		t.y = 70;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -23.5;
		t.y = 21.21;
		t.elementsContent = [this.kComVideo_i(),this._Image2_i()];
		return t;
	};
	_proto.kComVideo_i = function () {
		var t = new game.VideoComponent();
		this.kComVideo = t;
		t.skinName = "VideoComponentSkin";
		t.x = 191.61;
		t.y = 71.79;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 632.11;
		t.scale9Grid = new egret.Rectangle(893,653,107,26);
		t.source = "img_tv_png";
		t.touchEnabled = false;
		t.width = 926.85;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return MainViewSkin;
})(eui.Skin);