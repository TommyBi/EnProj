
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
                generateEUI.skins = {"ItembkSkin":"resource/eui_skins/component/itembkSkin.exml","ItembkSkin1":"resource/eui_skins/component/itembkSkin1.exml","Box":"resource/eui_skins/component/Box.exml"};generateEUI.paths['resource/eui_skins/public/VideoProBarSkin.exml'] = window.VideoProBarSkin = (function (_super) {
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
		t.height = 8;
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
		t.height = 8;
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
		t.bottom = -2;
		t.scaleX = 0.2;
		t.scaleY = 0.2;
		t.source = "img_pro_icon_png";
		t.x = 0;
		return t;
	};
	return VideoProBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/captionVideoPlayer/CaptionPlayerComSkin.exml'] = window.CaptionPlayerComSkin = (function (_super) {
	__extends(CaptionPlayerComSkin, _super);
	function CaptionPlayerComSkin() {
		_super.call(this);
		this.skinParts = ["kGrpVideo","kComPro","kImgCaption","kImgPlay","kImgRePlay","kGrpControl"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.kGrpVideo_i(),this._Group1_i()];
	}
	var _proto = CaptionPlayerComSkin.prototype;

	_proto.kGrpVideo_i = function () {
		var t = new eui.Group();
		this.kGrpVideo = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1920;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1440;
		t.elementsContent = [this.kComPro_i(),this.kGrpControl_i()];
		return t;
	};
	_proto.kComPro_i = function () {
		var t = new game.VideoProBarComponent();
		this.kComPro = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "VideoProBarSkin";
		t.width = 776;
		return t;
	};
	_proto.kGrpControl_i = function () {
		var t = new eui.Group();
		this.kGrpControl = t;
		t.bottom = 0;
		t.right = 0;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.kImgCaption_i(),this.kImgPlay_i(),this.kImgRePlay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 20;
		return t;
	};
	_proto.kImgCaption_i = function () {
		var t = new eui.Image();
		this.kImgCaption = t;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "img_micro_enable_png";
		t.visible = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgPlay_i = function () {
		var t = new eui.Image();
		this.kImgPlay = t;
		t.source = "img_play_png";
		t.x = 145;
		t.y = 12;
		return t;
	};
	_proto.kImgRePlay_i = function () {
		var t = new eui.Image();
		this.kImgRePlay = t;
		t.source = "img_rePlay_png";
		t.x = 363;
		t.y = 12;
		return t;
	};
	return CaptionPlayerComSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/VideoControlComponentSkin.exml'] = window.VideoControlComponentSkin = (function (_super) {
	__extends(VideoControlComponentSkin, _super);
	function VideoControlComponentSkin() {
		_super.call(this);
		this.skinParts = ["kGrpVideo","kComPro","kImgRePlay","kImgPlay","kImgPause","kGrpMain"];
		
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
		t.elementsContent = [this.kGrpVideo_i(),this.kComPro_i(),this.kImgRePlay_i(),this.kImgPlay_i(),this.kImgPause_i()];
		return t;
	};
	_proto.kGrpVideo_i = function () {
		var t = new eui.Group();
		this.kGrpVideo = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
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
	_proto.kImgRePlay_i = function () {
		var t = new eui.Image();
		this.kImgRePlay = t;
		t.source = "img_rePlay_png";
		t.x = 1308.69;
		t.y = 961.21;
		return t;
	};
	_proto.kImgPlay_i = function () {
		var t = new eui.Image();
		this.kImgPlay = t;
		t.source = "img_play_png";
		t.x = 1187.69;
		t.y = 961.21;
		return t;
	};
	_proto.kImgPause_i = function () {
		var t = new eui.Image();
		this.kImgPause = t;
		t.source = "img_pause_png";
		t.visible = false;
		t.x = 1209.69;
		t.y = 961.21;
		return t;
	};
	return VideoControlComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/chant/LetsChantSkin.exml'] = window.LetsChantSkin = (function (_super) {
	__extends(LetsChantSkin, _super);
	function LetsChantSkin() {
		_super.call(this);
		this.skinParts = ["kComVideo"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this.kComVideo_i()];
	}
	var _proto = LetsChantSkin.prototype;

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
	return LetsChantSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/DialogComponentSkin.exml'] = window.DialogComponentSkin = (function (_super) {
	__extends(DialogComponentSkin, _super);
	function DialogComponentSkin() {
		_super.call(this);
		this.skinParts = ["klbl"];
		
		this.height = 84;
		this.width = 710;
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
		t.bold = true;
		t.fontFamily = "Arial";
		t.horizontalCenter = 0.5;
		t.size = 44;
		t.stroke = 1;
		t.strokeColor = 0xffffff;
		t.text = "I need new clothes";
		t.textColor = 0x561108;
		t.verticalCenter = 2;
		return t;
	};
	return DialogComponentSkin;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/listenRepeat/ListenRepeatViewSkin.exml'] = window.ListenRepeatViewSkin = (function (_super) {
	__extends(ListenRepeatViewSkin, _super);
	function ListenRepeatViewSkin() {
		_super.call(this);
		this.skinParts = ["kCom0","kCom1","kCom2","kCom3","kCom4","kCom5","kCom6","kCom7","kComVideo"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = ListenRepeatViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_1_png";
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
		t.scaleX = 1;
		t.scaleY = 1;
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
		t.scaleX = 1;
		t.scaleY = 1;
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
		t.scaleX = 1;
		t.scaleY = 1;
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
		t.scaleX = 1;
		t.scaleY = 1;
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
		t.scaleX = 1;
		t.scaleY = 1;
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
		t.scaleX = 1;
		t.scaleY = 1;
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
		t.scaleX = 1;
		t.scaleY = 1;
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
		t.scaleX = 1;
		t.scaleY = 1;
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
	return ListenRepeatViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/ReplayComponentSkin.exml'] = window.ReplayComponentSkin = (function (_super) {
	__extends(ReplayComponentSkin, _super);
	function ReplayComponentSkin() {
		_super.call(this);
		this.skinParts = ["kImgReplay","kImgStart","kGrpReplay"];
		
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
		t.elementsContent = [this.kImgReplay_i(),this.kImgStart_i()];
		return t;
	};
	_proto.kImgReplay_i = function () {
		var t = new eui.Image();
		this.kImgReplay = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 103.5;
		t.source = "img_replay_j_png";
		t.x = 100;
		t.y = 100.5;
		return t;
	};
	_proto.kImgStart_i = function () {
		var t = new eui.Image();
		this.kImgStart = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 115;
		t.source = "img_start_png";
		t.x = 100;
		t.y = 112.5;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/play/DDSComponentSkin.exml'] = window.DDSComponentSkin = (function (_super) {
	__extends(DDSComponentSkin, _super);
	function DDSComponentSkin() {
		_super.call(this);
		this.skinParts = ["kGrpAnim","kImg","kImgMask","kGrpAnimMask","kGrpMain"];
		
		this.height = 300;
		this.width = 270;
		this.elementsContent = [this.kGrpMain_i()];
	}
	var _proto = DDSComponentSkin.prototype;

	_proto.kGrpMain_i = function () {
		var t = new eui.Group();
		this.kGrpMain = t;
		t.height = 300;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = 0;
		t.width = 270;
		t.elementsContent = [this._Image1_i(),this.kGrpAnim_i(),this.kImg_i(),this.kGrpAnimMask_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -45.5;
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.source = "img_lp_hole_png";
		t.x = 26;
		t.y = 292.88;
		return t;
	};
	_proto.kGrpAnim_i = function () {
		var t = new eui.Group();
		this.kGrpAnim = t;
		t.horizontalCenter = 0;
		t.y = 350;
		return t;
	};
	_proto.kImg_i = function () {
		var t = new eui.Image();
		this.kImg = t;
		t.anchorOffsetX = 270;
		t.anchorOffsetY = 270;
		t.height = 540;
		t.horizontalCenter = 0;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_lp_option0_png";
		t.width = 540;
		t.y = 52;
		return t;
	};
	_proto.kGrpAnimMask_i = function () {
		var t = new eui.Group();
		this.kGrpAnimMask = t;
		t.x = -14.76;
		t.y = 78.08;
		t.elementsContent = [this._Image2_i(),this.kImgMask_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.source = "img_lp_hole_png";
		t.x = -148.77;
		t.y = 123.47;
		return t;
	};
	_proto.kImgMask_i = function () {
		var t = new eui.Image();
		this.kImgMask = t;
		t.height = 250;
		t.scale9Grid = new egret.Rectangle(0,0,1,1);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_mask_png";
		t.width = 300;
		t.x = 18;
		t.y = 0;
		return t;
	};
	return DDSComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/TimeBarComponentSkin.exml'] = window.TimeBarComponentSkin = (function (_super) {
	__extends(TimeBarComponentSkin, _super);
	function TimeBarComponentSkin() {
		_super.call(this);
		this.skinParts = ["kImgBar","kGrpMain"];
		
		this.height = 200;
		this.width = 733;
		this.elementsContent = [this.kGrpMain_i()];
	}
	var _proto = TimeBarComponentSkin.prototype;

	_proto.kGrpMain_i = function () {
		var t = new eui.Group();
		this.kGrpMain = t;
		t.horizontalCenter = -31.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = 16;
		t.elementsContent = [this._Image1_i(),this.kImgBar_i(),this._Image2_i(),this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_lp_bar_bg_png";
		t.x = 37.83;
		t.y = 0;
		return t;
	};
	_proto.kImgBar_i = function () {
		var t = new eui.Image();
		this.kImgBar = t;
		t.height = 40;
		t.scale9Grid = new egret.Rectangle(26,2,163,13);
		t.source = "img_bar_png";
		t.width = 520;
		t.x = 204.6;
		t.y = 270;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "img_lp_scale_png";
		t.width = 500;
		t.x = 202.13;
		t.y = 269.75;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "img_lp_bar_frame_png";
		t.x = 37.83;
		t.y = 1.43;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.15;
		t.scaleY = 0.15;
		t.source = "img_lp_bar_clock_png";
		t.x = 68.64;
		t.y = 194.96;
		return t;
	};
	return TimeBarComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/ReStartComponentSkin.exml'] = window.ReStartComponentSkin = (function (_super) {
	__extends(ReStartComponentSkin, _super);
	function ReStartComponentSkin() {
		_super.call(this);
		this.skinParts = ["kGrpGoodJob","kGrpTimeOut","kGrpStart","kGrpResult"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this.kGrpResult_i()];
	}
	var _proto = ReStartComponentSkin.prototype;

	_proto.kGrpResult_i = function () {
		var t = new eui.Group();
		this.kGrpResult = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this.kGrpGoodJob_i(),this.kGrpTimeOut_i(),this.kGrpStart_i()];
		return t;
	};
	_proto.kGrpGoodJob_i = function () {
		var t = new eui.Group();
		this.kGrpGoodJob = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpTimeOut_i = function () {
		var t = new eui.Group();
		this.kGrpTimeOut = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.kGrpStart_i = function () {
		var t = new eui.Group();
		this.kGrpStart = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.x = 20;
		t.y = 20;
		return t;
	};
	return ReStartComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/play/DDSViewSkin.exml'] = window.DDSViewSkin = (function (_super) {
	__extends(DDSViewSkin, _super);
	function DDSViewSkin() {
		_super.call(this);
		this.skinParts = ["kLabelDesc","kCom0","kCom1","kCom2","kComBar","kGrpAnimHummer","kComRestart"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Group1_i(),this._Group3_i(),this._Group4_i(),this.kGrpAnimHummer_i(),this.kComRestart_i()];
	}
	var _proto = DDSViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.width = 1920;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_bg_1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "img_lp_bg_png";
		t.width = 1447.12;
		t.x = 240;
		t.y = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1440;
		t.elementsContent = [this._Group2_i(),this.kCom0_i(),this.kCom1_i(),this.kCom2_i(),this.kComBar_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.top = -86;
		t.elementsContent = [this._Image3_i(),this.kLabelDesc_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(126,25,257,117);
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_lp_wordPanel_png";
		t.top = 0;
		t.width = 400;
		return t;
	};
	_proto.kLabelDesc_i = function () {
		var t = new eui.Label();
		this.kLabelDesc = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 55;
		t.text = "Everyone wears a mask and a costume.";
		t.textColor = 0x000000;
		t.verticalCenter = 58;
		return t;
	};
	_proto.kCom0_i = function () {
		var t = new game.DDSComponent();
		this.kCom0 = t;
		t.skinName = "DDSComponentSkin";
		t.x = 198.99;
		t.y = 279.69;
		return t;
	};
	_proto.kCom1_i = function () {
		var t = new game.DDSComponent();
		this.kCom1 = t;
		t.skinName = "DDSComponentSkin";
		t.x = 930.21;
		t.y = 282.72;
		return t;
	};
	_proto.kCom2_i = function () {
		var t = new game.DDSComponent();
		this.kCom2 = t;
		t.skinName = "DDSComponentSkin";
		t.x = 567.49;
		t.y = 521.82;
		return t;
	};
	_proto.kComBar_i = function () {
		var t = new game.TimeBarComponent();
		this.kComBar = t;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "TimeBarComponentSkin";
		t.x = 0;
		t.y = 913.34;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image4_i(),this._Image5_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.fillMode = "repeat";
		t.source = "img_bg_1_png";
		t.width = 240;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.fillMode = "repeat";
		t.source = "img_bg_1_png";
		t.width = 240;
		t.x = 1680;
		t.y = 0;
		return t;
	};
	_proto.kGrpAnimHummer_i = function () {
		var t = new eui.Group();
		this.kGrpAnimHummer = t;
		t.height = 200;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 200;
		t.x = 96;
		t.y = 421;
		return t;
	};
	_proto.kComRestart_i = function () {
		var t = new game.ReStartComponent();
		this.kComRestart = t;
		t.horizontalCenter = 0;
		t.skinName = "ReStartComponentSkin";
		t.verticalCenter = 0;
		return t;
	};
	return DDSViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/play/FindMarkViewSkin.exml'] = window.FindMarkViewSkin = (function (_super) {
	__extends(FindMarkViewSkin, _super);
	function FindMarkViewSkin() {
		_super.call(this);
		this.skinParts = ["kGrp0","kGrp1","kGrp2","kGrp3","kGrp4","kGrp5","kGrp6","kGrp7","kImgOptionSame","kImgOptionDif","kComAnswer","kComReplay"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.kGrp0_i(),this.kGrp1_i(),this.kGrp2_i(),this.kGrp3_i(),this.kGrp4_i(),this.kGrp5_i(),this.kGrp6_i(),this.kGrp7_i(),this._Image3_i(),this._Image4_i(),this._Label1_i(),this._Label2_i(),this.kImgOptionSame_i(),this.kImgOptionDif_i(),this.kComAnswer_i(),this.kComReplay_i()];
	}
	var _proto = FindMarkViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1082;
		t.horizontalCenter = 0;
		t.source = "img_fm_bg_png";
		t.verticalCenter = 0;
		t.width = 1602.39;
		return t;
	};
	_proto.kGrp0_i = function () {
		var t = new eui.Group();
		this.kGrp0 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 296;
		t.y = 170;
		return t;
	};
	_proto.kGrp1_i = function () {
		var t = new eui.Group();
		this.kGrp1 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 306;
		t.y = 180;
		return t;
	};
	_proto.kGrp2_i = function () {
		var t = new eui.Group();
		this.kGrp2 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 316;
		t.y = 190;
		return t;
	};
	_proto.kGrp3_i = function () {
		var t = new eui.Group();
		this.kGrp3 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 326;
		t.y = 200;
		return t;
	};
	_proto.kGrp4_i = function () {
		var t = new eui.Group();
		this.kGrp4 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 336;
		t.y = 210;
		return t;
	};
	_proto.kGrp5_i = function () {
		var t = new eui.Group();
		this.kGrp5 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 346;
		t.y = 220;
		return t;
	};
	_proto.kGrp6_i = function () {
		var t = new eui.Group();
		this.kGrp6 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 356;
		t.y = 230;
		return t;
	};
	_proto.kGrp7_i = function () {
		var t = new eui.Group();
		this.kGrp7 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 366;
		t.y = 240;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(58,109,350,6);
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_fm_option_panel_png";
		t.x = 1244;
		t.y = 752;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.fillMode = "repeat";
		t.right = 0;
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		t.width = 159;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 40;
		t.text = "The Same =";
		t.textColor = 0xff0000;
		t.x = 1360;
		t.y = 860;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 40;
		t.text = "Different =";
		t.textColor = 0x4a64a8;
		t.x = 1384;
		t.y = 956;
		return t;
	};
	_proto.kImgOptionSame_i = function () {
		var t = new eui.Image();
		this.kImgOptionSame = t;
		t.anchorOffsetX = 136;
		t.anchorOffsetY = 136;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "img_fm_same_png";
		t.x = 1661;
		t.y = 873;
		return t;
	};
	_proto.kImgOptionDif_i = function () {
		var t = new eui.Image();
		this.kImgOptionDif = t;
		t.anchorOffsetX = 121;
		t.anchorOffsetY = 121;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "img_fm_dif_png";
		t.x = 1663;
		t.y = 981;
		return t;
	};
	_proto.kComAnswer_i = function () {
		var t = new game.AnswerComponent();
		this.kComAnswer = t;
		t.horizontalCenter = 0;
		t.skinName = "AnswerComponentSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kComReplay_i = function () {
		var t = new game.ReplayComponent();
		this.kComReplay = t;
		t.skinName = "ReplayComponentSkin";
		t.visible = false;
		t.x = 1528;
		t.y = 840;
		return t;
	};
	return FindMarkViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/play/LetsPlaySkin.exml'] = window.LetsPlaySkin = (function (_super) {
	__extends(LetsPlaySkin, _super);
	function LetsPlaySkin() {
		_super.call(this);
		this.skinParts = ["kGrpOption0","kGrpOption1","kGrpOption2","kGrpRole","kComTimeBar","kComRestart"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.kGrpOption0_i(),this.kGrpOption1_i(),this.kGrpOption2_i(),this.kGrpRole_i(),this.kComTimeBar_i(),this.kComRestart_i()];
	}
	var _proto = LetsPlaySkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1110.39;
		t.horizontalCenter = 0;
		t.source = "img_p_bg_png";
		t.verticalCenter = 13;
		t.width = 2040.42;
		return t;
	};
	_proto.kGrpOption0_i = function () {
		var t = new eui.Group();
		this.kGrpOption0 = t;
		t.height = 200;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.width = 200;
		t.x = 635;
		t.y = 217;
		return t;
	};
	_proto.kGrpOption1_i = function () {
		var t = new eui.Group();
		this.kGrpOption1 = t;
		t.height = 200;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.width = 200;
		t.x = 860;
		t.y = 217;
		return t;
	};
	_proto.kGrpOption2_i = function () {
		var t = new eui.Group();
		this.kGrpOption2 = t;
		t.height = 200;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.width = 200;
		t.x = 1081;
		t.y = 217;
		return t;
	};
	_proto.kGrpRole_i = function () {
		var t = new eui.Group();
		this.kGrpRole = t;
		t.height = 200;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 200;
		t.x = 785;
		t.y = 530.73;
		return t;
	};
	_proto.kComTimeBar_i = function () {
		var t = new game.TimeBarComponent();
		this.kComTimeBar = t;
		t.skinName = "TimeBarComponentSkin";
		t.x = 263.52;
		t.y = 878.36;
		return t;
	};
	_proto.kComRestart_i = function () {
		var t = new game.ReStartComponent();
		this.kComRestart = t;
		t.horizontalCenter = 0;
		t.skinName = "ReStartComponentSkin";
		t.verticalCenter = 0;
		return t;
	};
	return LetsPlaySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/FlagComSkin.exml'] = window.FlagComSkin = (function (_super) {
	__extends(FlagComSkin, _super);
	function FlagComSkin() {
		_super.call(this);
		this.skinParts = ["kGrpMain"];
		
		this.height = 200;
		this.width = 400;
		this.elementsContent = [this.kGrpMain_i(),this._Label1_i()];
	}
	var _proto = FlagComSkin.prototype;

	_proto.kGrpMain_i = function () {
		var t = new eui.Group();
		this.kGrpMain = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = -49;
		t.size = 40;
		t.stroke = 4;
		t.strokeColor = 0xffffff;
		t.text = "Words";
		t.textColor = 0x439541;
		t.verticalCenter = -10;
		return t;
	};
	return FlagComSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/PreWordsComSkin.exml'] = window.PreWordsComSkin = (function (_super) {
	__extends(PreWordsComSkin, _super);
	function PreWordsComSkin() {
		_super.call(this);
		this.skinParts = ["kImgWords","kLabelWords"];
		
		this.width = 278;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = PreWordsComSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 278;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.kImgWords_i(),this.kLabelWords_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.kImgWords_i = function () {
		var t = new eui.Image();
		this.kImgWords = t;
		t.name = "flag";
		t.source = "img_start_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kLabelWords_i = function () {
		var t = new eui.Label();
		this.kLabelWords = t;
		t.bold = true;
		t.name = "flag";
		t.size = 40;
		t.text = "words";
		t.textColor = 0x000000;
		t.x = 41;
		t.y = 210;
		return t;
	};
	return PreWordsComSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/WordsPanelComSkin.exml'] = window.WordsPanelComSkin = (function (_super) {
	__extends(WordsPanelComSkin, _super);
	function WordsPanelComSkin() {
		_super.call(this);
		this.skinParts = ["kGrpWords","kGrpMain"];
		
		this.height = 1080;
		this.width = 288;
		this.elementsContent = [this.kGrpMain_i()];
	}
	var _proto = WordsPanelComSkin.prototype;

	_proto.kGrpMain_i = function () {
		var t = new eui.Group();
		this.kGrpMain = t;
		t.x = 10;
		t.y = 150;
		t.elementsContent = [this._Image1_i(),this.kGrpWords_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 872;
		t.horizontalCenter = 0;
		t.source = "img_panel_png";
		t.width = 278;
		t.y = 0;
		return t;
	};
	_proto.kGrpWords_i = function () {
		var t = new eui.Group();
		this.kGrpWords = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 278;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 6;
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	return WordsPanelComSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/stick/StickSayViewNewSkin.exml'] = window.StickSayViewNewSkin = (function (_super) {
	__extends(StickSayViewNewSkin, _super);
	function StickSayViewNewSkin() {
		_super.call(this);
		this.skinParts = ["kGrpBtn0","kGrpBtn1","kGrpBtn2","kGrpBtn3","kImgMask0","kImgMaskLine0","kImgMask1","kImgMaskLine1","kImgMask2","kImgMaskLine2","kImgMask3","kImgMaskLine3","kGrpAnim","kImgDesc0","kImgDesc1","kImgDesc2","kImgDesc3","kComAnswer","kComReplay","kComWordsPanel"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Group1_i(),this.kImgMask0_i(),this.kImgMaskLine0_i(),this.kImgMask1_i(),this.kImgMaskLine1_i(),this.kImgMask2_i(),this.kImgMaskLine2_i(),this.kImgMask3_i(),this.kImgMaskLine3_i(),this.kGrpAnim_i(),this.kImgDesc0_i(),this.kImgDesc1_i(),this.kImgDesc2_i(),this.kImgDesc3_i(),this.kComAnswer_i(),this.kComReplay_i(),this.kComWordsPanel_i(),this._FlagCom1_i(),this._Image11_i()];
	}
	var _proto = StickSayViewNewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1.12;
		t.scaleY = 1.12;
		t.source = "img_ss_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 12;
		t.left = 170;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.kGrpBtn0_i(),this.kGrpBtn1_i(),this.kGrpBtn2_i(),this.kGrpBtn3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 5;
		return t;
	};
	_proto.kGrpBtn0_i = function () {
		var t = new eui.Group();
		this.kGrpBtn0 = t;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.source = "img_stick_bg1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.25;
		t.scaleY = 0.25;
		t.source = "img_ss_btn_0_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpBtn1_i = function () {
		var t = new eui.Group();
		this.kGrpBtn1 = t;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this._Image5_i(),this._Image6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.source = "img_stick_bg3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_btn_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpBtn2_i = function () {
		var t = new eui.Group();
		this.kGrpBtn2 = t;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 20;
		t.y = 20;
		t.elementsContent = [this._Image7_i(),this._Image8_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.source = "img_stick_bg2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.25;
		t.scaleY = 0.25;
		t.source = "img_ss_btn_2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpBtn3_i = function () {
		var t = new eui.Group();
		this.kGrpBtn3 = t;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 30;
		t.y = 30;
		t.elementsContent = [this._Image9_i(),this._Image10_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.source = "img_stick_bg3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.2;
		t.scaleY = 0.2;
		t.source = "img_ss_btn_3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kImgMask0_i = function () {
		var t = new eui.Image();
		this.kImgMask0 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_head_mask0_png";
		t.x = 660.76;
		t.y = 84.61;
		return t;
	};
	_proto.kImgMaskLine0_i = function () {
		var t = new eui.Image();
		this.kImgMaskLine0 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_head_mask_l0_png";
		t.x = 785.09;
		t.y = 227.52;
		return t;
	};
	_proto.kImgMask1_i = function () {
		var t = new eui.Image();
		this.kImgMask1 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_head_mask1_png";
		t.x = 1315.25;
		t.y = 42.03;
		return t;
	};
	_proto.kImgMaskLine1_i = function () {
		var t = new eui.Image();
		this.kImgMaskLine1 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_head_mask_l1_png";
		t.x = 1463.41;
		t.y = 257.99;
		return t;
	};
	_proto.kImgMask2_i = function () {
		var t = new eui.Image();
		this.kImgMask2 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_head_mask2_png";
		t.x = 566.7;
		t.y = 521.28;
		return t;
	};
	_proto.kImgMaskLine2_i = function () {
		var t = new eui.Image();
		this.kImgMaskLine2 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_head_mask_l2_png";
		t.x = 571.6;
		t.y = 668.05;
		return t;
	};
	_proto.kImgMask3_i = function () {
		var t = new eui.Image();
		this.kImgMask3 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_head_mask3_png";
		t.x = 1065.31;
		t.y = 520.94;
		return t;
	};
	_proto.kImgMaskLine3_i = function () {
		var t = new eui.Image();
		this.kImgMaskLine3 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_ss_head_mask_l3_png";
		t.x = 1143.33;
		t.y = 681;
		return t;
	};
	_proto.kGrpAnim_i = function () {
		var t = new eui.Group();
		this.kGrpAnim = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		return t;
	};
	_proto.kImgDesc0_i = function () {
		var t = new eui.Image();
		this.kImgDesc0 = t;
		t.anchorOffsetX = 120;
		t.anchorOffsetY = 74;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_hint_panel_0_png";
		t.x = 875.7;
		t.y = 238.06;
		return t;
	};
	_proto.kImgDesc1_i = function () {
		var t = new eui.Image();
		this.kImgDesc1 = t;
		t.anchorOffsetX = 119;
		t.anchorOffsetY = 71;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_hint_panel_1_png";
		t.x = 1535.33;
		t.y = 249.21;
		return t;
	};
	_proto.kImgDesc2_i = function () {
		var t = new eui.Image();
		this.kImgDesc2 = t;
		t.anchorOffsetX = 118;
		t.anchorOffsetY = 82;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_hint_panel_2_png";
		t.x = 651.4;
		t.y = 669.21;
		return t;
	};
	_proto.kImgDesc3_i = function () {
		var t = new eui.Image();
		this.kImgDesc3 = t;
		t.anchorOffsetX = 117;
		t.anchorOffsetY = 80;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_hint_panel_3_png";
		t.x = 1263.6;
		t.y = 667.63;
		return t;
	};
	_proto.kComAnswer_i = function () {
		var t = new game.AnswerComponent();
		this.kComAnswer = t;
		t.horizontalCenter = 0;
		t.skinName = "AnswerComponentSkin";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.kComReplay_i = function () {
		var t = new game.ReplayComponent();
		this.kComReplay = t;
		t.bottom = 50;
		t.right = 173;
		t.skinName = "ReplayComponentSkin";
		t.visible = false;
		return t;
	};
	_proto.kComWordsPanel_i = function () {
		var t = new game.WordsPanelCom();
		this.kComWordsPanel = t;
		t.skinName = "WordsPanelComSkin";
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 148;
		return t;
	};
	_proto._FlagCom1_i = function () {
		var t = new game.FlagCom();
		t.left = 135;
		t.scaleX = 0.8;
		t.scaleY = 1;
		t.skinName = "FlagComSkin";
		t.top = 0;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.fillMode = "repeat";
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		t.width = 186.67;
		t.x = -30;
		return t;
	};
	return StickSayViewNewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/think/LetsThinkSkin.exml'] = window.LetsThinkSkin = (function (_super) {
	__extends(LetsThinkSkin, _super);
	function LetsThinkSkin() {
		_super.call(this);
		this.skinParts = ["kGrpCom"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this.kGrpCom_i()];
	}
	var _proto = LetsThinkSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpCom_i = function () {
		var t = new eui.Group();
		this.kGrpCom = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 50;
		return t;
	};
	return LetsThinkSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/think/ThinkComponentSkin.exml'] = window.ThinkComponentSkin = (function (_super) {
	__extends(ThinkComponentSkin, _super);
	function ThinkComponentSkin() {
		_super.call(this);
		this.skinParts = ["kImgShadow","kImgCard","kGrpBg","kImgNameBg","kImgArrow","kLabelWord","kGrpWord","kImgMask","kImgSound","kImgNameBg0","kImgArrow0","kGrpWordStatic","kGrpMain"];
		
		this.height = 666;
		this.width = 469;
		this.elementsContent = [this.kGrpMain_i()];
	}
	var _proto = ThinkComponentSkin.prototype;

	_proto.kGrpMain_i = function () {
		var t = new eui.Group();
		this.kGrpMain = t;
		t.height = 666;
		t.horizontalCenter = 0;
		t.width = 469;
		t.y = 0;
		t.elementsContent = [this.kGrpBg_i(),this.kGrpWord_i(),this.kImgMask_i(),this.kImgSound_i(),this.kGrpWordStatic_i()];
		return t;
	};
	_proto.kGrpBg_i = function () {
		var t = new eui.Group();
		this.kGrpBg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.kImgShadow_i(),this.kImgCard_i()];
		return t;
	};
	_proto.kImgShadow_i = function () {
		var t = new eui.Image();
		this.kImgShadow = t;
		t.source = "img_think_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgCard_i = function () {
		var t = new eui.Image();
		this.kImgCard = t;
		t.source = "img_think_shadow_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kGrpWord_i = function () {
		var t = new eui.Group();
		this.kGrpWord = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 400;
		t.x = -330;
		t.y = 493;
		t.elementsContent = [this.kImgNameBg_i(),this.kImgArrow_i(),this.kLabelWord_i()];
		return t;
	};
	_proto.kImgNameBg_i = function () {
		var t = new eui.Image();
		this.kImgNameBg = t;
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(5,13,382,78);
		t.source = "img_think_name_bg_png";
		t.touchEnabled = false;
		t.width = 400;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgArrow_i = function () {
		var t = new eui.Image();
		this.kImgArrow = t;
		t.right = 15;
		t.source = "img_think_arrow_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kLabelWord_i = function () {
		var t = new eui.Label();
		this.kLabelWord = t;
		t.bold = true;
		t.horizontalCenter = -17;
		t.size = 45;
		t.text = "luckyWords";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.kImgMask_i = function () {
		var t = new eui.Image();
		this.kImgMask = t;
		t.height = 104;
		t.left = 13;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_mask_png";
		t.touchEnabled = false;
		t.width = 400;
		t.x = 13;
		t.y = 493;
		return t;
	};
	_proto.kImgSound_i = function () {
		var t = new eui.Image();
		this.kImgSound = t;
		t.name = "sound";
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_think_sound_png";
		t.x = 381;
		t.y = 398;
		return t;
	};
	_proto.kGrpWordStatic_i = function () {
		var t = new eui.Group();
		this.kGrpWordStatic = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 13;
		t.y = 493;
		t.elementsContent = [this.kImgNameBg0_i(),this.kImgArrow0_i()];
		return t;
	};
	_proto.kImgNameBg0_i = function () {
		var t = new eui.Image();
		this.kImgNameBg0 = t;
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(5,13,382,78);
		t.source = "img_think_name_bg_png";
		t.touchEnabled = false;
		t.width = 57;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kImgArrow0_i = function () {
		var t = new eui.Image();
		this.kImgArrow0 = t;
		t.right = 15;
		t.source = "img_think_arrow_png";
		t.verticalCenter = 0;
		return t;
	};
	return ThinkComponentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VideoPlayerSkin.exml'] = window.VideoPlayerSkin = (function (_super) {
	__extends(VideoPlayerSkin, _super);
	function VideoPlayerSkin() {
		_super.call(this);
		this.skinParts = ["kComCaption"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.kComCaption_i()];
	}
	var _proto = VideoPlayerSkin.prototype;

	_proto.kComCaption_i = function () {
		var t = new game.CaptionPlayerCom();
		this.kComCaption = t;
		t.horizontalCenter = 0;
		t.skinName = "CaptionPlayerComSkin";
		t.verticalCenter = 0;
		return t;
	};
	return VideoPlayerSkin;
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