
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/MainViewSkin.exml'] = window.MainViewSkin = (function (_super) {
	__extends(MainViewSkin, _super);
	function MainViewSkin() {
		_super.call(this);
		this.skinParts = ["kImgOption0","kImgOption1","kImgOption2","kImgOption3","kImgPanel","kPants","kShirt","kGrpPanel","kGrpFlag","kImgShadow1","kImgTip1","kGrpMc1","kImgShadow0","kGrpMc0","kImgTip0","kImgShadow3","kGrpMc3","kImgTip3","kImgShadow2","kGrpMc2","kImgTip2","kImgReplay","kGrpReplay","kComAnswer","kRectMaskPanel","kRectMaskFlag"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this._Image2_i(),this.kImgOption0_i(),this.kImgOption1_i(),this.kImgOption2_i(),this.kImgOption3_i(),this.kGrpPanel_i(),this.kGrpFlag_i(),this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this.kGrpReplay_i(),this.kComAnswer_i(),this.kRectMaskPanel_i(),this.kRectMaskFlag_i()];
	}
	var _proto = MainViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_0_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.fillColor = 0xffffff;
		t.left = 261;
		t.right = 260;
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_bg_png";
		t.verticalCenter = 66.5;
		return t;
	};
	_proto.kImgOption0_i = function () {
		var t = new eui.Image();
		this.kImgOption0 = t;
		t.scaleX = 1.6;
		t.scaleY = 1.6;
		t.source = "img_action_0_png";
		t.x = 588.75;
		t.y = 56;
		return t;
	};
	_proto.kImgOption1_i = function () {
		var t = new eui.Image();
		this.kImgOption1 = t;
		t.scaleX = 1.6;
		t.scaleY = 1.6;
		t.source = "img_action_1_png";
		t.x = 1133.67;
		t.y = 56;
		return t;
	};
	_proto.kImgOption2_i = function () {
		var t = new eui.Image();
		this.kImgOption2 = t;
		t.scaleX = 1.6;
		t.scaleY = 1.6;
		t.source = "img_action_2_png";
		t.x = 950.01;
		t.y = 56;
		return t;
	};
	_proto.kImgOption3_i = function () {
		var t = new eui.Image();
		this.kImgOption3 = t;
		t.scaleX = 1.6;
		t.scaleY = 1.6;
		t.source = "img_action_3_png";
		t.x = 766.35;
		t.y = 57.6;
		return t;
	};
	_proto.kGrpPanel_i = function () {
		var t = new eui.Group();
		this.kGrpPanel = t;
		t.name = "kGrpPanel";
		t.verticalCenter = 45;
		t.x = -76;
		t.elementsContent = [this.kImgPanel_i(),this.kPants_i(),this.kShirt_i()];
		return t;
	};
	_proto.kImgPanel_i = function () {
		var t = new eui.Image();
		this.kImgPanel = t;
		t.scaleX = 1.8;
		t.scaleY = 1.8;
		t.source = "img_select_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kPants_i = function () {
		var t = new eui.Group();
		this.kPants = t;
		t.anchorOffsetY = 0;
		t.height = 239.39;
		t.name = "pants";
		t.width = 200;
		t.x = 97;
		t.y = 464.03;
		return t;
	};
	_proto.kShirt_i = function () {
		var t = new eui.Group();
		this.kShirt = t;
		t.anchorOffsetY = 0;
		t.height = 209.09;
		t.name = "shirt";
		t.width = 200;
		t.x = 97;
		t.y = 190.15;
		return t;
	};
	_proto.kGrpFlag_i = function () {
		var t = new eui.Group();
		this.kGrpFlag = t;
		t.height = 180;
		t.name = "kGrpFlag";
		t.touchChildren = false;
		t.touchEnabled = true;
		t.width = 350;
		t.x = 219.81;
		t.y = 0;
		t.elementsContent = [this._Label1_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 50;
		t.stroke = 4;
		t.strokeColor = 0xffffff;
		t.text = "Words";
		t.textColor = 0x328a38;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 400;
		t.touchThrough = true;
		t.width = 400;
		t.x = 1242.51;
		t.y = 37.58;
		t.elementsContent = [this.kImgShadow1_i(),this.kImgTip1_i(),this.kGrpMc1_i()];
		return t;
	};
	_proto.kImgShadow1_i = function () {
		var t = new eui.Image();
		this.kImgShadow1 = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_shadow_1_0_png";
		return t;
	};
	_proto.kImgTip1_i = function () {
		var t = new eui.Image();
		this.kImgTip1 = t;
		t.horizontalCenter = -5;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_dia_1_png";
		t.y = 77.09;
		return t;
	};
	_proto.kGrpMc1_i = function () {
		var t = new eui.Group();
		this.kGrpMc1 = t;
		t.bottom = 0;
		t.height = 400;
		t.horizontalCenter = 0;
		t.width = 400;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 400;
		t.width = 500;
		t.x = 893.34;
		t.y = 265.17;
		t.elementsContent = [this.kImgShadow0_i(),this.kGrpMc0_i(),this.kImgTip0_i()];
		return t;
	};
	_proto.kImgShadow0_i = function () {
		var t = new eui.Image();
		this.kImgShadow0 = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_shadow_0_0_png";
		return t;
	};
	_proto.kGrpMc0_i = function () {
		var t = new eui.Group();
		this.kGrpMc0 = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		return t;
	};
	_proto.kImgTip0_i = function () {
		var t = new eui.Image();
		this.kImgTip0 = t;
		t.anchorOffsetX = 114;
		t.anchorOffsetY = 37;
		t.horizontalCenter = -24;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_dia_0_png";
		t.y = 80.07;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 400;
		t.width = 500;
		t.x = 501.88;
		t.y = 655.04;
		t.elementsContent = [this.kImgShadow3_i(),this.kGrpMc3_i(),this.kImgTip3_i()];
		return t;
	};
	_proto.kImgShadow3_i = function () {
		var t = new eui.Image();
		this.kImgShadow3 = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_shadow_3_0_png";
		return t;
	};
	_proto.kGrpMc3_i = function () {
		var t = new eui.Group();
		this.kGrpMc3 = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		return t;
	};
	_proto.kImgTip3_i = function () {
		var t = new eui.Image();
		this.kImgTip3 = t;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_dia_3_png";
		t.x = 63.45;
		t.y = 57.57;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 400;
		t.width = 500;
		t.x = 880.27;
		t.y = 657.03;
		t.elementsContent = [this.kImgShadow2_i(),this.kGrpMc2_i(),this.kImgTip2_i()];
		return t;
	};
	_proto.kImgShadow2_i = function () {
		var t = new eui.Image();
		this.kImgShadow2 = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "img_shadow_2_0_png";
		return t;
	};
	_proto.kGrpMc2_i = function () {
		var t = new eui.Group();
		this.kGrpMc2 = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		return t;
	};
	_proto.kImgTip2_i = function () {
		var t = new eui.Image();
		this.kImgTip2 = t;
		t.horizontalCenter = -12;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "img_dia_2_png";
		t.y = 6.06;
		return t;
	};
	_proto.kGrpReplay_i = function () {
		var t = new eui.Group();
		this.kGrpReplay = t;
		t.height = 200;
		t.right = 300;
		t.width = 200;
		t.y = 768;
		t.elementsContent = [this.kImgReplay_i()];
		return t;
	};
	_proto.kImgReplay_i = function () {
		var t = new eui.Image();
		this.kImgReplay = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 103;
		t.source = "img_replay_j_png";
		t.x = 100;
		t.y = 100;
		return t;
	};
	_proto.kComAnswer_i = function () {
		var t = new game.AnswerComponent();
		this.kComAnswer = t;
		t.horizontalCenter = 0;
		t.skinName = "AnswerComponentSkin";
		t.touchChildren = false;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.kRectMaskPanel_i = function () {
		var t = new eui.Image();
		this.kRectMaskPanel = t;
		t.fillMode = "repeat";
		t.height = 910;
		t.source = "img_bg_1_png";
		t.touchEnabled = false;
		t.verticalCenter = 45;
		t.visible = false;
		t.width = 310;
		t.x = 259;
		return t;
	};
	_proto.kRectMaskFlag_i = function () {
		var t = new eui.Rect();
		this.kRectMaskFlag = t;
		t.height = 180;
		t.top = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.width = 350;
		t.x = 259;
		return t;
	};
	return MainViewSkin;
})(eui.Skin);