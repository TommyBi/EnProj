
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
                generateEUI.skins = {"ItembkSkin":"resource/eui_skins/component/itembkSkin.exml","ItembkSkin1":"resource/eui_skins/component/itembkSkin1.exml","Box":"resource/eui_skins/component/Box.exml"};generateEUI.paths['resource/eui_skins/public/ReplayComponentSkin.exml'] = window.ReplayComponentSkin = (function (_super) {
	__extends(ReplayComponentSkin, _super);
	function ReplayComponentSkin() {
		_super.call(this);
		this.skinParts = ["kImgReplay","kGrpReplay"];
		
		this.height = 200;
		this.width = 200;
		this.elementsContent = [this.kGrpReplay_i()];
	}
	var _proto = ReplayComponentSkin.prototype;

	_proto.kGrpReplay_i = function () {
		var t = new eui.Group();
		this.kGrpReplay = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.width = 200;
		t.y = 0;
		t.elementsContent = [this.kImgReplay_i()];
		return t;
	};
	_proto.kImgReplay_i = function () {
		var t = new eui.Image();
		this.kImgReplay = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "img_replay_j_png";
		t.verticalCenter = 0;
		return t;
	};
	return ReplayComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/AnswerComponentSkin.exml'] = window.AnswerComponentSkin = (function (_super) {
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/MainViewSkin.exml'] = window.MainViewSkin = (function (_super) {
	__extends(MainViewSkin, _super);
	function MainViewSkin() {
		_super.call(this);
		this.skinParts = ["kImgPutOn","kImgTakeOff","kImgShirtDown1","kImgShirtDown0","kImgPantsDown1","kImgPantsDown0","kGrpDownLight","kImgShirtUp_0_l","kImgPantsUp_0_l","kGrpUpLight0","kImgShirtUp_0_g","kImgPantsUp_0_g","kGrpUpGray0","kImgShirtUp_1_l","kImgPantsUp_1_l","kGrpUpLight1","kImgShirtUp_1_g","kImgPantsUp_1_g","kGrpUpGray1","kComReplay","kComAnswer"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
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
		t.height = 630;
		t.horizontalCenter = 0;
		t.scaleX = 1.71;
		t.scaleY = 1.72;
		t.verticalCenter = 0;
		t.width = 934;
		t.elementsContent = [this._Image2_i(),this.kImgPutOn_i(),this.kImgTakeOff_i(),this.kGrpDownLight_i(),this.kGrpUpLight0_i(),this.kGrpUpGray0_i(),this.kGrpUpLight1_i(),this.kGrpUpGray1_i(),this.kComReplay_i(),this.kComAnswer_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "img_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgPutOn_i = function () {
		var t = new eui.Image();
		this.kImgPutOn = t;
		t.anchorOffsetX = 105;
		t.anchorOffsetY = 43.5;
		t.source = "img_btn_putOn_png";
		t.x = 267;
		t.y = 70.5;
		return t;
	};
	_proto.kImgTakeOff_i = function () {
		var t = new eui.Image();
		this.kImgTakeOff = t;
		t.anchorOffsetX = 105;
		t.anchorOffsetY = 43.5;
		t.source = "img_btn_takeOff_png";
		t.x = 667;
		t.y = 70.5;
		return t;
	};
	_proto.kGrpDownLight_i = function () {
		var t = new eui.Group();
		this.kGrpDownLight = t;
		t.horizontalCenter = 0;
		t.y = 490.81;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.kImgShirtDown1_i(),this.kImgShirtDown0_i(),this.kImgPantsDown1_i(),this.kImgPantsDown0_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.kImgShirtDown1_i = function () {
		var t = new eui.Image();
		this.kImgShirtDown1 = t;
		t.source = "img_shirt_1_l_png";
		t.x = 0;
		t.y = 8;
		return t;
	};
	_proto.kImgShirtDown0_i = function () {
		var t = new eui.Image();
		this.kImgShirtDown0 = t;
		t.source = "img_shirt_0_l_png";
		t.x = 174;
		t.y = 9;
		return t;
	};
	_proto.kImgPantsDown1_i = function () {
		var t = new eui.Image();
		this.kImgPantsDown1 = t;
		t.source = "img_pants_1_l_png";
		t.x = 370.79;
		t.y = 0;
		return t;
	};
	_proto.kImgPantsDown0_i = function () {
		var t = new eui.Image();
		this.kImgPantsDown0 = t;
		t.source = "img_pants_0_l_png";
		t.x = 514.54;
		t.y = 3;
		return t;
	};
	_proto.kGrpUpLight0_i = function () {
		var t = new eui.Group();
		this.kGrpUpLight0 = t;
		t.x = 138.26;
		t.y = 241.31;
		t.elementsContent = [this.kImgShirtUp_0_l_i(),this.kImgPantsUp_0_l_i()];
		return t;
	};
	_proto.kImgShirtUp_0_l_i = function () {
		var t = new eui.Image();
		this.kImgShirtUp_0_l = t;
		t.source = "img_shirt_0_l_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgPantsUp_0_l_i = function () {
		var t = new eui.Image();
		this.kImgPantsUp_0_l = t;
		t.source = "img_pants_0_l_png";
		t.x = 34.23;
		t.y = 73.97;
		return t;
	};
	_proto.kGrpUpGray0_i = function () {
		var t = new eui.Group();
		this.kGrpUpGray0 = t;
		t.x = 137.92;
		t.y = 237.51;
		t.elementsContent = [this.kImgShirtUp_0_g_i(),this.kImgPantsUp_0_g_i()];
		return t;
	};
	_proto.kImgShirtUp_0_g_i = function () {
		var t = new eui.Image();
		this.kImgShirtUp_0_g = t;
		t.source = "img_shirt_0_g_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgPantsUp_0_g_i = function () {
		var t = new eui.Image();
		this.kImgPantsUp_0_g = t;
		t.source = "img_pants_0_g_png";
		t.x = 32.32;
		t.y = 76.97;
		return t;
	};
	_proto.kGrpUpLight1_i = function () {
		var t = new eui.Group();
		this.kGrpUpLight1 = t;
		t.x = 651.07;
		t.y = 246.59;
		t.elementsContent = [this.kImgShirtUp_1_l_i(),this.kImgPantsUp_1_l_i()];
		return t;
	};
	_proto.kImgShirtUp_1_l_i = function () {
		var t = new eui.Image();
		this.kImgShirtUp_1_l = t;
		t.source = "img_shirt_1_l_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgPantsUp_1_l_i = function () {
		var t = new eui.Image();
		this.kImgPantsUp_1_l = t;
		t.source = "img_pants_1_l_png";
		t.x = 38;
		t.y = 70.72;
		return t;
	};
	_proto.kGrpUpGray1_i = function () {
		var t = new eui.Group();
		this.kGrpUpGray1 = t;
		t.x = 652.84;
		t.y = 243.07;
		t.elementsContent = [this.kImgShirtUp_1_g_i(),this.kImgPantsUp_1_g_i()];
		return t;
	};
	_proto.kImgShirtUp_1_g_i = function () {
		var t = new eui.Image();
		this.kImgShirtUp_1_g = t;
		t.source = "img_shirt_1_g_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgPantsUp_1_g_i = function () {
		var t = new eui.Image();
		this.kImgPantsUp_1_g = t;
		t.source = "img_pants_1_g_png";
		t.x = 38;
		t.y = 72.58;
		return t;
	};
	_proto.kComReplay_i = function () {
		var t = new game.ReplayComponent();
		this.kComReplay = t;
		t.bottom = 40;
		t.right = 40;
		t.scaleX = 0.76;
		t.scaleY = 0.76;
		t.skinName = "ReplayComponentSkin";
		return t;
	};
	_proto.kComAnswer_i = function () {
		var t = new game.AnswerComponent();
		this.kComAnswer = t;
		t.height = 20;
		t.horizontalCenter = 0;
		t.scaleX = 0.76;
		t.scaleY = 0.76;
		t.skinName = "AnswerComponentSkin";
		t.verticalCenter = 0;
		t.width = 20;
		return t;
	};
	return MainViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/DialogComponentSkin.exml'] = window.DialogComponentSkin = (function (_super) {
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
		t.fillColor = 0x414608;
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
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "I need new clothes";
		t.verticalCenter = 0;
		return t;
	};
	return DialogComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/VideoProBarSkin.exml'] = window.VideoProBarSkin = (function (_super) {
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
		t.left = 0;
		t.right = 0;
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
		t.width = 300;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/VideoComponentSkin.exml'] = window.VideoComponentSkin = (function (_super) {
	__extends(VideoComponentSkin, _super);
	function VideoComponentSkin() {
		_super.call(this);
		this.skinParts = ["kGrpVideo","kRect","kComPro"];
		
		this.height = 542;
		this.width = 720;
		this.elementsContent = [this.kGrpVideo_i(),this.kRect_i(),this.kComPro_i()];
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
	return VideoComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/VideoControlComponentSkin.exml'] = window.VideoControlComponentSkin = (function (_super) {
	__extends(VideoControlComponentSkin, _super);
	function VideoControlComponentSkin() {
		_super.call(this);
		this.skinParts = ["kImgPlay","kImgPause","kImgRePlay","kGrpVideo","kRect","kComPro","kGrpMain"];
		
		this.height = 1080;
		this.width = 1440;
		this.elementsContent = [this.kGrpMain_i()];
	}
	var _proto = VideoControlComponentSkin.prototype;

	_proto.kGrpMain_i = function () {
		var t = new eui.Group();
		this.kGrpMain = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.kGrpVideo_i(),this.kRect_i(),this.kComPro_i()];
		return t;
	};
	_proto.kGrpVideo_i = function () {
		var t = new eui.Group();
		this.kGrpVideo = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.kImgPlay_i(),this.kImgPause_i(),this.kImgRePlay_i()];
		return t;
	};
	_proto.kImgPlay_i = function () {
		var t = new eui.Image();
		this.kImgPlay = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_btn_play_n_png";
		t.x = 1109.69;
		t.y = 930.91;
		return t;
	};
	_proto.kImgPause_i = function () {
		var t = new eui.Image();
		this.kImgPause = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_btn_pause_n_png";
		t.x = 1209.69;
		t.y = 930.91;
		return t;
	};
	_proto.kImgRePlay_i = function () {
		var t = new eui.Image();
		this.kImgRePlay = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_btn_rePlay_n_png";
		t.x = 1308.69;
		t.y = 930.91;
		return t;
	};
	_proto.kRect_i = function () {
		var t = new eui.Rect();
		this.kRect = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		return t;
	};
	_proto.kComPro_i = function () {
		var t = new game.VideoProBarComponent();
		this.kComPro = t;
		t.bottom = 50;
		t.left = 80;
		t.skinName = "VideoProBarSkin";
		t.width = 700;
		return t;
	};
	return VideoControlComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/watch/LetsWatchSkin.exml'] = window.LetsWatchSkin = (function (_super) {
	__extends(LetsWatchSkin, _super);
	function LetsWatchSkin() {
		_super.call(this);
		this.skinParts = ["kComVideo"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this.kComVideo_i()];
	}
	var _proto = LetsWatchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kComVideo_i = function () {
		var t = new game.VideoControlComponent();
		this.kComVideo = t;
		t.horizontalCenter = 0;
		t.skinName = "VideoControlComponentSkin";
		t.verticalCenter = 0;
		return t;
	};
	return LetsWatchSkin;
})(eui.Skin);