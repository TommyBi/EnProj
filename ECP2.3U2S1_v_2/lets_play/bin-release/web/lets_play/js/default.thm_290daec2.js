
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
                generateEUI.skins = {"ItembkSkin":"resource/eui_skins/component/itembkSkin.exml","ItembkSkin1":"resource/eui_skins/component/itembkSkin1.exml","Box":"resource/eui_skins/component/Box.exml","game.StickSay":"resource/eui_skins/StickSay.exml","game.BtnSelect":"resource/eui_skins/BtnSelect.exml","game.PlayItem":"resource/eui_skins/PlayItem.exml"};generateEUI.paths['resource/eui_skins/BtnSelect.exml'] = window.BtnSelectSkin = (function (_super) {
	__extends(BtnSelectSkin, _super);
	var BtnSelectSkin$Skin1 = 	(function (_super) {
		__extends(BtnSelectSkin$Skin1, _super);
		function BtnSelectSkin$Skin1() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Group1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Group1","percentWidth",90),
						new eui.SetProperty("_Group1","percentHeight",90)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BtnSelectSkin$Skin1.prototype;

		_proto._Group1_i = function () {
			var t = new eui.Group();
			this._Group1 = t;
			t.percentHeight = 100;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			t.percentWidth = 100;
			t.elementsContent = [this._Image1_i(),this._Image2_i()];
			return t;
		};
		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "img_stick_bg1_png";
			t.percentWidth = 100;
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.percentHeight = 90;
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "btn_1_png";
			t.verticalCenter = 0;
			t.percentWidth = 90;
			t.x = 46;
			t.y = 44;
			return t;
		};
		return BtnSelectSkin$Skin1;
	})(eui.Skin);

	var BtnSelectSkin$Skin2 = 	(function (_super) {
		__extends(BtnSelectSkin$Skin2, _super);
		function BtnSelectSkin$Skin2() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Group1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Group1","percentWidth",90),
						new eui.SetProperty("_Group1","percentHeight",90)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BtnSelectSkin$Skin2.prototype;

		_proto._Group1_i = function () {
			var t = new eui.Group();
			this._Group1 = t;
			t.percentHeight = 100;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			t.percentWidth = 100;
			t.elementsContent = [this._Image1_i(),this._Image2_i()];
			return t;
		};
		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "img_stick_bg2_png";
			t.percentWidth = 100;
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.percentHeight = 90;
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "btn_2_png";
			t.verticalCenter = 0;
			t.percentWidth = 90;
			t.x = 46;
			t.y = 44;
			return t;
		};
		return BtnSelectSkin$Skin2;
	})(eui.Skin);

	var BtnSelectSkin$Skin3 = 	(function (_super) {
		__extends(BtnSelectSkin$Skin3, _super);
		function BtnSelectSkin$Skin3() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Group1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Group1","percentWidth",90),
						new eui.SetProperty("_Group1","percentHeight",90)
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BtnSelectSkin$Skin3.prototype;

		_proto._Group1_i = function () {
			var t = new eui.Group();
			this._Group1 = t;
			t.percentHeight = 100;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			t.percentWidth = 100;
			t.elementsContent = [this._Image1_i(),this._Image2_i()];
			return t;
		};
		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "img_stick_bg3_png";
			t.percentWidth = 100;
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.percentHeight = 55980;
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "btn_3_png";
			t.verticalCenter = 0;
			t.percentWidth = 80;
			t.x = 46;
			t.y = 44;
			return t;
		};
		return BtnSelectSkin$Skin3;
	})(eui.Skin);

	function BtnSelectSkin() {
		_super.call(this);
		this.skinParts = ["kGp"];
		
		this.elementsContent = [this.kGp_i()];
	}
	var _proto = BtnSelectSkin.prototype;

	_proto.kGp_i = function () {
		var t = new eui.Group();
		this.kGp = t;
		t.height = 188;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 627;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Button1_i(),this._Button2_i(),this._Button3_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "";
		t.left = 0;
		t.name = "1";
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.y = 0;
		t.skinName = BtnSelectSkin$Skin1;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.horizontalCenter = 0;
		t.label = "";
		t.name = "2";
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.y = 0;
		t.skinName = BtnSelectSkin$Skin2;
		return t;
	};
	_proto._Button3_i = function () {
		var t = new eui.Button();
		t.label = "";
		t.name = "3";
		t.right = 0;
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.y = 0;
		t.skinName = BtnSelectSkin$Skin3;
		return t;
	};
	return BtnSelectSkin;
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
		this.width = 1440;
		this.elementsContent = [this.kGrpVideo_i(),this._Group1_i()];
	}
	var _proto = CaptionPlayerComSkin.prototype;

	_proto.kGrpVideo_i = function () {
		var t = new eui.Group();
		this.kGrpVideo = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1440;
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
		t.left = 55;
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
		t.source = "img_bg_1_png";
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/LookStickViewSkin.exml'] = window.LookStickViewSkin = (function (_super) {
	__extends(LookStickViewSkin, _super);
	function LookStickViewSkin() {
		_super.call(this);
		this.skinParts = ["kImgPicHead0","kImgHintTarFrame0","kGrpTar0","kImgPicHead2","kImgHintTarFrame2","kGrpTar2","kImgHappy","kGrpHead0","kGrpHead2","kImgPicHead1","kImgHintTarFrame1","kGrpTar1","kImgPicHead3","kImgHintTarFrame3","kGrpTar3","kImgSad","kGrpHead1","kGrpHead3","kImgFrame0","kGrpOption0","kGrp0","kImgFrame1","kGrpOption1","kGrp1","kImgFrame2","kGrpOption2","kGrp2","kImgFrame3","kGrpOption3","kGrp3","kComReplay","kComAnswer","kGrpSmokeAnim"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Group1_i(),this._Group2_i(),this.kGrp0_i(),this.kGrp1_i(),this.kGrp2_i(),this.kGrp3_i(),this.kComReplay_i(),this.kComAnswer_i(),this.kGrpSmokeAnim_i()];
	}
	var _proto = LookStickViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_stick_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "img_stick_bg3_png";
		t.x = 74;
		t.y = 34;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 1098;
		t.y = 50;
		t.elementsContent = [this._Image3_i(),this.kGrpTar0_i(),this.kGrpTar2_i(),this._Label1_i(),this._Label2_i(),this.kImgHappy_i(),this.kGrpHead0_i(),this.kGrpHead2_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 930;
		t.scale9Grid = new egret.Rectangle(45,93,274,837);
		t.source = "img_stick_bg2_png";
		t.x = 0;
		t.y = 70;
		return t;
	};
	_proto.kGrpTar0_i = function () {
		var t = new eui.Group();
		this.kGrpTar0 = t;
		t.height = 125;
		t.horizontalCenter = 0;
		t.scaleX = 1.7;
		t.scaleY = 1.7;
		t.width = 132;
		t.y = 254;
		t.elementsContent = [this.kImgPicHead0_i(),this.kImgHintTarFrame0_i()];
		return t;
	};
	_proto.kImgPicHead0_i = function () {
		var t = new eui.Image();
		this.kImgPicHead0 = t;
		t.source = "img_stick_shadow_0_png";
		t.x = 12;
		t.y = 0;
		return t;
	};
	_proto.kImgHintTarFrame0_i = function () {
		var t = new eui.Image();
		this.kImgHintTarFrame0 = t;
		t.source = "img_stick_o_s_0_png";
		t.x = 11.74;
		t.y = 1.44;
		return t;
	};
	_proto.kGrpTar2_i = function () {
		var t = new eui.Group();
		this.kGrpTar2 = t;
		t.height = 125;
		t.horizontalCenter = 0;
		t.scaleX = 1.7;
		t.scaleY = 1.7;
		t.width = 132;
		t.y = 722;
		t.elementsContent = [this.kImgPicHead2_i(),this.kImgHintTarFrame2_i()];
		return t;
	};
	_proto.kImgPicHead2_i = function () {
		var t = new eui.Image();
		this.kImgPicHead2 = t;
		t.source = "img_stick_shadow_2_png";
		t.x = 12;
		t.y = 0;
		return t;
	};
	_proto.kImgHintTarFrame2_i = function () {
		var t = new eui.Image();
		this.kImgHintTarFrame2 = t;
		t.horizontalCenter = 2.5;
		t.source = "img_stick_o_s_2_png";
		t.verticalCenter = 2;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.size = 43;
		t.text = "I like dogs.";
		t.textColor = 0x000000;
		t.y = 145;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 43;
		t.text = "I like cats.";
		t.textColor = 0x000000;
		t.y = 615;
		return t;
	};
	_proto.kImgHappy_i = function () {
		var t = new eui.Image();
		this.kImgHappy = t;
		t.anchorOffsetX = 87;
		t.anchorOffsetY = 86;
		t.source = "img_stick_happy_png";
		t.x = 182;
		t.y = 66;
		return t;
	};
	_proto.kGrpHead0_i = function () {
		var t = new eui.Group();
		this.kGrpHead0 = t;
		t.x = 63;
		t.y = 235.09;
		t.elementsContent = [this._Image4_i(),this._Image5_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "img_head_02_png";
		t.x = 30.08;
		t.y = 157.24;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "img_head_01_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kGrpHead2_i = function () {
		var t = new eui.Group();
		this.kGrpHead2 = t;
		t.horizontalCenter = -8.5;
		t.y = 702.54;
		t.elementsContent = [this._Image6_i(),this._Image7_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "img_head_06_png";
		t.x = 30.08;
		t.y = 157.24;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "img_head_05_png";
		t.x = 24.24;
		t.y = 12.12;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 1536;
		t.y = 50;
		t.elementsContent = [this._Image8_i(),this._Label3_i(),this._Label4_i(),this.kGrpTar1_i(),this.kGrpTar3_i(),this.kImgSad_i(),this.kGrpHead1_i(),this.kGrpHead3_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 930;
		t.source = "img_stick_bg1_png";
		t.x = 0;
		t.y = 70;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.size = 43;
		t.text = "I don't like cats.";
		t.textColor = 0x000000;
		t.y = 615;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 43;
		t.text = "I don't like dogs.";
		t.textColor = 0x000000;
		t.y = 145;
		return t;
	};
	_proto.kGrpTar1_i = function () {
		var t = new eui.Group();
		this.kGrpTar1 = t;
		t.height = 125;
		t.horizontalCenter = 0;
		t.scaleX = 1.7;
		t.scaleY = 1.7;
		t.width = 132;
		t.y = 254;
		t.elementsContent = [this.kImgPicHead1_i(),this.kImgHintTarFrame1_i()];
		return t;
	};
	_proto.kImgPicHead1_i = function () {
		var t = new eui.Image();
		this.kImgPicHead1 = t;
		t.source = "img_stick_shadow_1_png";
		t.x = 9.34;
		t.y = -6.65;
		return t;
	};
	_proto.kImgHintTarFrame1_i = function () {
		var t = new eui.Image();
		this.kImgHintTarFrame1 = t;
		t.horizontalCenter = 0.5;
		t.source = "img_stick_o_s_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpTar3_i = function () {
		var t = new eui.Group();
		this.kGrpTar3 = t;
		t.height = 125;
		t.horizontalCenter = 0;
		t.scaleX = 1.7;
		t.scaleY = 1.7;
		t.width = 132;
		t.y = 728;
		t.elementsContent = [this.kImgPicHead3_i(),this.kImgHintTarFrame3_i()];
		return t;
	};
	_proto.kImgPicHead3_i = function () {
		var t = new eui.Image();
		this.kImgPicHead3 = t;
		t.source = "img_stick_shadow_3_png";
		t.x = 12;
		t.y = 0;
		return t;
	};
	_proto.kImgHintTarFrame3_i = function () {
		var t = new eui.Image();
		this.kImgHintTarFrame3 = t;
		t.horizontalCenter = 8;
		t.source = "img_stick_o_s_3_png";
		t.verticalCenter = -0.5;
		return t;
	};
	_proto.kImgSad_i = function () {
		var t = new eui.Image();
		this.kImgSad = t;
		t.anchorOffsetX = 86;
		t.anchorOffsetY = 86;
		t.source = "img_stick_sad_png";
		t.x = 181;
		t.y = 66;
		return t;
	};
	_proto.kGrpHead1_i = function () {
		var t = new eui.Group();
		this.kGrpHead1 = t;
		t.x = 67.12;
		t.y = 212.09;
		t.elementsContent = [this._Image9_i(),this._Image10_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "img_head_04_png";
		t.x = -3.25;
		t.y = 75.42;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "img_head_03_png";
		t.x = 24.24;
		t.y = 12.12;
		return t;
	};
	_proto.kGrpHead3_i = function () {
		var t = new eui.Group();
		this.kGrpHead3 = t;
		t.x = 51.97;
		t.y = 695.24;
		t.elementsContent = [this._Image11_i(),this._Image12_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "img_head_08_png";
		t.x = 20.99;
		t.y = 148.14;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.source = "img_head_07_png";
		t.x = 24.24;
		t.y = 12.12;
		return t;
	};
	_proto.kGrp0_i = function () {
		var t = new eui.Group();
		this.kGrp0 = t;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 188;
		t.y = 108;
		t.elementsContent = [this._Group3_i(),this.kGrpOption0_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 322;
		t.elementsContent = [this._Image13_i(),this._Label5_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "img_stick_words_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "Kate";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpOption0_i = function () {
		var t = new eui.Group();
		this.kGrpOption0 = t;
		t.x = 52;
		t.y = 0;
		t.elementsContent = [this.kImgFrame0_i(),this._Image14_i()];
		return t;
	};
	_proto.kImgFrame0_i = function () {
		var t = new eui.Image();
		this.kImgFrame0 = t;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_stick_option_shadow_0_png";
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "img_stick_option_0_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kGrp1_i = function () {
		var t = new eui.Group();
		this.kGrp1 = t;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 510;
		t.y = 110;
		t.elementsContent = [this.kGrpOption1_i(),this._Group4_i()];
		return t;
	};
	_proto.kGrpOption1_i = function () {
		var t = new eui.Group();
		this.kGrpOption1 = t;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image15_i(),this._Image16_i(),this.kImgFrame1_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.source = "img_stick_dog_png";
		t.x = 0;
		t.y = 220;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "img_stick_option_1_png";
		t.x = 150;
		t.y = 0;
		return t;
	};
	_proto.kImgFrame1_i = function () {
		var t = new eui.Image();
		this.kImgFrame1 = t;
		t.scaleX = 1.5;
		t.scaleY = 1.6;
		t.source = "img_stick_option_shadow_1_png";
		t.x = 150;
		t.y = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 320;
		t.elementsContent = [this._Image17_i(),this._Label6_i()];
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "img_stick_words_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "Paul";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrp2_i = function () {
		var t = new eui.Group();
		this.kGrp2 = t;
		t.x = 182;
		t.y = 658;
		t.elementsContent = [this._Group5_i(),this.kGrpOption2_i()];
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 242;
		t.elementsContent = [this._Image18_i(),this._Label7_i()];
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "img_stick_words_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "Neo";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpOption2_i = function () {
		var t = new eui.Group();
		this.kGrpOption2 = t;
		t.x = 40;
		t.y = 0;
		t.elementsContent = [this.kImgFrame2_i(),this._Image19_i()];
		return t;
	};
	_proto.kImgFrame2_i = function () {
		var t = new eui.Image();
		this.kImgFrame2 = t;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_stick_option_shadow_2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "img_stick_option_2_png";
		t.x = 14;
		t.y = 12;
		return t;
	};
	_proto.kGrp3_i = function () {
		var t = new eui.Group();
		this.kGrp3 = t;
		t.x = 516;
		t.y = 642;
		t.elementsContent = [this._Group6_i(),this.kGrpOption3_i()];
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.x = 32;
		t.y = 258;
		t.elementsContent = [this._Image20_i(),this._Label8_i()];
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "img_stick_words_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "Jenny";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGrpOption3_i = function () {
		var t = new eui.Group();
		this.kGrpOption3 = t;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image21_i(),this.kImgFrame3_i(),this._Image22_i()];
		return t;
	};
	_proto._Image21_i = function () {
		var t = new eui.Image();
		t.source = "img_stick_cat_png";
		t.x = 0;
		t.y = 102;
		return t;
	};
	_proto.kImgFrame3_i = function () {
		var t = new eui.Image();
		this.kImgFrame3 = t;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_stick_option_shadow_3_png";
		t.x = 148;
		t.y = 0;
		return t;
	};
	_proto._Image22_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "img_stick_option_3_png";
		t.x = 132;
		t.y = 6;
		return t;
	};
	_proto.kComReplay_i = function () {
		var t = new game.ReplayComponent();
		this.kComReplay = t;
		t.bottom = 100;
		t.right = 100;
		t.skinName = "ReplayComponentSkin";
		t.visible = false;
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
	_proto.kGrpSmokeAnim_i = function () {
		var t = new eui.Group();
		this.kGrpSmokeAnim = t;
		t.x = 1726;
		t.y = 623.09;
		return t;
	};
	return LookStickViewSkin;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/play/LetsPlaySkin.exml'] = window.LetsPlaySkin = (function (_super) {
	__extends(LetsPlaySkin, _super);
	function LetsPlaySkin() {
		_super.call(this);
		this.skinParts = ["kItem1","kItem2","kItem3","kAnimGp","kLb","kTargetGp","kGp","kRestart","kTimeBar"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this.kGp_i(),this.kRestart_i(),this.kTimeBar_i()];
	}
	var _proto = LetsPlaySkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGp_i = function () {
		var t = new eui.Group();
		this.kGp = t;
		t.height = 1080;
		t.width = 1440;
		t.x = 240;
		t.y = 0;
		t.elementsContent = [this._Image2_i(),this._Group1_i(),this.kItem1_i(),this.kItem2_i(),this.kItem3_i(),this.kAnimGp_i(),this.kTargetGp_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.horizontalCenter = 8;
		t.source = "play_2_png";
		t.top = 0;
		t.width = 1486;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1080;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 1920;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.fillMode = "clip";
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_bg_1_png";
		t.verticalCenter = 0;
		t.width = 236;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.fillMode = "clip";
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_bg_1_png";
		t.width = 236;
		t.y = 0;
		return t;
	};
	_proto.kItem1_i = function () {
		var t = new game.PlayItem();
		this.kItem1 = t;
		t.name = "1";
		t.visible = false;
		t.x = 122;
		t.y = 154;
		return t;
	};
	_proto.kItem2_i = function () {
		var t = new game.PlayItem();
		this.kItem2 = t;
		t.name = "2";
		t.visible = false;
		t.x = 541;
		t.y = 154;
		return t;
	};
	_proto.kItem3_i = function () {
		var t = new game.PlayItem();
		this.kItem3 = t;
		t.name = "3";
		t.visible = false;
		t.x = 960.18;
		t.y = 154;
		return t;
	};
	_proto.kAnimGp_i = function () {
		var t = new eui.Group();
		this.kAnimGp = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 1440;
		return t;
	};
	_proto.kTargetGp_i = function () {
		var t = new eui.Group();
		this.kTargetGp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 315.15;
		t.visible = false;
		t.width = 260.61;
		t.x = 152;
		t.y = 641;
		t.elementsContent = [this._Image5_i(),this.kLb_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "play_1_png";
		t.x = 1.7899999999999636;
		t.y = 55.72000000000003;
		return t;
	};
	_proto.kLb_i = function () {
		var t = new eui.Label();
		this.kLb = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 50;
		t.text = "ski";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.width = 198.79;
		t.x = 27.46999999999997;
		t.y = 116.09000000000003;
		return t;
	};
	_proto.kRestart_i = function () {
		var t = new game.ReStartComponent();
		this.kRestart = t;
		t.horizontalCenter = 0;
		t.skinName = "ReStartComponentSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kTimeBar_i = function () {
		var t = new game.TimeBarComponent();
		this.kTimeBar = t;
		t.bottom = -13;
		t.left = 238;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "TimeBarComponentSkin";
		return t;
	};
	return LetsPlaySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PlayItem.exml'] = window.PlayItemSkin = (function (_super) {
	__extends(PlayItemSkin, _super);
	function PlayItemSkin() {
		_super.call(this);
		this.skinParts = ["kImg"];
		
		this.height = 350;
		this.width = 350;
		this.elementsContent = [this.kImg_i()];
	}
	var _proto = PlayItemSkin.prototype;

	_proto.kImg_i = function () {
		var t = new eui.Image();
		this.kImg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "animal_2_png";
		t.top = 0;
		return t;
	};
	return PlayItemSkin;
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
		
		this.height = 278;
		this.width = 278;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = PreWordsComSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 278;
		t.width = 278;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.kImgWords_i(),this.kLabelWords_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto.kImgWords_i = function () {
		var t = new eui.Image();
		this.kImgWords = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_start_png";
		t.verticalCenter = -20;
		t.x = 39;
		t.y = 5;
		return t;
	};
	_proto.kLabelWords_i = function () {
		var t = new eui.Label();
		this.kLabelWords = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "words";
		t.textColor = 0x000000;
		t.x = 86;
		t.y = 215;
		return t;
	};
	return PreWordsComSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/public/WordsPanelComSkin.exml'] = window.WordsPanelComSkin = (function (_super) {
	__extends(WordsPanelComSkin, _super);
	function WordsPanelComSkin() {
		_super.call(this);
		this.skinParts = ["kGrpWords","kGrpMain"];
		
		this.height = 1080;
		this.width = 320;
		this.elementsContent = [this.kGrpMain_i()];
	}
	var _proto = WordsPanelComSkin.prototype;

	_proto.kGrpMain_i = function () {
		var t = new eui.Group();
		this.kGrpMain = t;
		t.bottom = 30;
		t.top = 100;
		t.x = 10;
		t.elementsContent = [this._Image1_i(),this.kGrpWords_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "img_panel_png";
		t.top = 0;
		t.width = 310;
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
		t.gap = 15;
		t.paddingTop = 100;
		return t;
	};
	return WordsPanelComSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/sing/LetsSingViewSkin.exml'] = window.LetsSingViewSkin = (function (_super) {
	__extends(LetsSingViewSkin, _super);
	function LetsSingViewSkin() {
		_super.call(this);
		this.skinParts = ["kImgBg","kComCaption"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.kImgBg_i(),this.kComCaption_i()];
	}
	var _proto = LetsSingViewSkin.prototype;

	_proto.kImgBg_i = function () {
		var t = new eui.Image();
		this.kImgBg = t;
		t.horizontalCenter = 0;
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kComCaption_i = function () {
		var t = new game.CaptionPlayerCom();
		this.kComCaption = t;
		t.horizontalCenter = 0;
		t.skinName = "CaptionPlayerComSkin";
		t.verticalCenter = 0;
		return t;
	};
	return LetsSingViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/stick/StickSay.exml'] = window.StickSaySkin = (function (_super) {
	__extends(StickSaySkin, _super);
	function StickSaySkin() {
		_super.call(this);
		this.skinParts = ["anim2","anim1","kImg1","kImg2","kAnim1","kAnim3","kAnim0","kAnim2","kAnswer2","kAnswer3","kAnswer1","kSide1","kHui1","kGp1","kHui2","kSide2","kGp2","kHui3","kSide3","kGp3","kBtn","kGp","kComWordsPanel","kGrpSmokeAnim","kReplay","kAnswer"];
		
		this.height = 1080;
		this.width = 1920;
		this.anim2_i();
		this.anim1_i();
		this.elementsContent = [this._Image1_i(),this.kGp_i(),this.kComWordsPanel_i(),this._FlagCom1_i(),this._Image6_i(),this.kGrpSmokeAnim_i(),this.kReplay_i(),this.kAnswer_i()];
		
		eui.Binding.$bindProperties(this, ["kImg2"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [30],[],this._Object1,"rotation");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"rotation");
		eui.Binding.$bindProperties(this, ["kImg1"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [9],[],this._Object3,"rotation");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"rotation");
	}
	var _proto = StickSaySkin.prototype;

	_proto.anim2_i = function () {
		var t = new egret.tween.TweenGroup();
		this.anim2 = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 250;
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 250;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.anim1_i = function () {
		var t = new egret.tween.TweenGroup();
		this.anim1 = t;
		t.items = [this._TweenItem2_i()];
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To3_i(),this._To4_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To4_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kGp_i = function () {
		var t = new eui.Group();
		this.kGp = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1440;
		t.elementsContent = [this._Image2_i(),this.kImg1_i(),this.kImg2_i(),this.kAnim1_i(),this.kAnim3_i(),this.kAnim0_i(),this.kAnim2_i(),this.kAnswer2_i(),this.kAnswer3_i(),this.kAnswer1_i(),this.kGp1_i(),this.kGp2_i(),this.kGp3_i(),this.kBtn_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 1080;
		t.horizontalCenter = 0;
		t.source = "img_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kImg1_i = function () {
		var t = new eui.Image();
		this.kImg1 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 560;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "head_1_png";
		t.x = 308;
		t.y = 754;
		return t;
	};
	_proto.kImg2_i = function () {
		var t = new eui.Image();
		this.kImg2 = t;
		t.anchorOffsetX = 635;
		t.anchorOffsetY = 120;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "img_4_png";
		t.x = 892.42;
		t.y = 125.64;
		return t;
	};
	_proto.kAnim1_i = function () {
		var t = new eui.Group();
		this.kAnim1 = t;
		t.height = 10;
		t.width = 10;
		t.x = 598.35;
		t.y = 860;
		return t;
	};
	_proto.kAnim3_i = function () {
		var t = new eui.Group();
		this.kAnim3 = t;
		t.height = 10;
		t.width = 10;
		t.x = 1035;
		t.y = 495;
		return t;
	};
	_proto.kAnim0_i = function () {
		var t = new eui.Group();
		this.kAnim0 = t;
		t.height = 10;
		t.width = 10;
		t.x = 1116;
		t.y = 598;
		return t;
	};
	_proto.kAnim2_i = function () {
		var t = new eui.Group();
		this.kAnim2 = t;
		t.height = 10;
		t.width = 10;
		t.x = 500;
		t.y = 300;
		return t;
	};
	_proto.kAnswer2_i = function () {
		var t = new eui.Group();
		this.kAnswer2 = t;
		t.anchorOffsetX = 337.88;
		t.anchorOffsetY = 1.52;
		t.visible = false;
		t.x = 440;
		t.y = 238.73;
		t.elementsContent = [this._Image3_i(),this._Label1_i(),this._Label2_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 1;
		t.size = 40;
		t.text = "Ehephants have";
		t.textColor = 0x000000;
		t.y = 42.2;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 1.5;
		t.size = 40;
		t.text = "long noses.";
		t.textColor = 0x000000;
		t.y = 93.75;
		return t;
	};
	_proto.kAnswer3_i = function () {
		var t = new eui.Group();
		this.kAnswer3 = t;
		t.anchorOffsetX = 333.33;
		t.anchorOffsetY = 172.73;
		t.visible = false;
		t.x = 995;
		t.y = 500;
		t.elementsContent = [this._Image4_i(),this._Label3_i(),this._Label4_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_7_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 1;
		t.size = 40;
		t.text = "Monkeys have";
		t.textColor = 0x000000;
		t.y = 42.2;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 1.5;
		t.size = 40;
		t.text = "long tails.";
		t.textColor = 0x000000;
		t.y = 93.75;
		return t;
	};
	_proto.kAnswer1_i = function () {
		var t = new eui.Group();
		this.kAnswer1 = t;
		t.anchorOffsetX = 80.3;
		t.anchorOffsetY = 177.28;
		t.visible = false;
		t.x = 650;
		t.y = 660;
		t.elementsContent = [this._Image5_i(),this._Label5_i(),this._Label6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_11_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 1;
		t.size = 40;
		t.text = "Giraffes have";
		t.textColor = 0x000000;
		t.y = 42.2;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 1.5;
		t.size = 40;
		t.text = "long necks.";
		t.textColor = 0x000000;
		t.y = 93.75;
		return t;
	};
	_proto.kGp1_i = function () {
		var t = new eui.Group();
		this.kGp1 = t;
		t.height = 300;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 300;
		t.x = 267.36;
		t.y = 529.03;
		t.elementsContent = [this.kSide1_i(),this.kHui1_i()];
		return t;
	};
	_proto.kSide1_i = function () {
		var t = new eui.Image();
		this.kSide1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_14_png";
		t.visible = false;
		t.x = 4.040000000000134;
		t.y = -13.45999999999998;
		return t;
	};
	_proto.kHui1_i = function () {
		var t = new eui.Image();
		this.kHui1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_12_png";
		t.x = 16.639999999999986;
		t.y = -7.029999999999973;
		return t;
	};
	_proto.kGp2_i = function () {
		var t = new eui.Group();
		this.kGp2 = t;
		t.height = 200;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 200;
		t.x = 720.51;
		t.y = 93.6;
		t.elementsContent = [this.kHui2_i(),this.kSide2_i()];
		return t;
	};
	_proto.kHui2_i = function () {
		var t = new eui.Image();
		this.kHui2 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_3_png";
		t.x = -104.82000000000005;
		t.y = -22;
		return t;
	};
	_proto.kSide2_i = function () {
		var t = new eui.Image();
		this.kSide2 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_5_png";
		t.visible = false;
		t.x = -114.86000000000001;
		t.y = -37.43999999999999;
		return t;
	};
	_proto.kGp3_i = function () {
		var t = new eui.Group();
		this.kGp3 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 200;
		t.x = 1103.04;
		t.y = 393.45;
		t.elementsContent = [this.kHui3_i(),this.kSide3_i()];
		return t;
	};
	_proto.kHui3_i = function () {
		var t = new eui.Image();
		this.kHui3 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_8_png";
		t.x = 41.940000000000055;
		t.y = -27.450000000000045;
		return t;
	};
	_proto.kSide3_i = function () {
		var t = new eui.Image();
		this.kSide3 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_10_png";
		t.visible = false;
		t.x = 25.450000000000045;
		t.y = -39.77000000000004;
		return t;
	};
	_proto.kBtn_i = function () {
		var t = new game.BtnSelect();
		this.kBtn = t;
		t.height = 100;
		t.rotation = 0;
		t.width = 50;
		t.x = 857.55;
		t.y = 908.76;
		return t;
	};
	_proto.kComWordsPanel_i = function () {
		var t = new game.WordsPanelCom();
		this.kComWordsPanel = t;
		t.skinName = "WordsPanelComSkin";
		t.verticalCenter = 0;
		t.x = 143;
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
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.source = "img_bg_1_png";
		t.verticalCenter = 0;
		t.width = 155;
		return t;
	};
	_proto.kGrpSmokeAnim_i = function () {
		var t = new eui.Group();
		this.kGrpSmokeAnim = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		return t;
	};
	_proto.kReplay_i = function () {
		var t = new game.ReplayComponent();
		this.kReplay = t;
		t.skinName = "ReplayComponentSkin";
		t.x = 1539;
		t.y = 855;
		return t;
	};
	_proto.kAnswer_i = function () {
		var t = new game.AnswerComponent();
		this.kAnswer = t;
		t.horizontalCenter = 0;
		t.skinName = "AnswerComponentSkin";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return StickSaySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/think/LetsThinkSkin.exml'] = window.LetsThinkSkin = (function (_super) {
	__extends(LetsThinkSkin, _super);
	function LetsThinkSkin() {
		_super.call(this);
		this.skinParts = ["kImgBg","kGrpCom"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.kImgBg_i(),this.kGrpCom_i()];
	}
	var _proto = LetsThinkSkin.prototype;

	_proto.kImgBg_i = function () {
		var t = new eui.Image();
		this.kImgBg = t;
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
		t.source = "img_bg_1_png";
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