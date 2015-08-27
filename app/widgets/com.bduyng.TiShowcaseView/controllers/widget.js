
(function constructor(args) {
	$.padding = args.padding || 20; // padding of highligher
	$.margin = args.margin || 100; // margin between description and highlighter

	$.isOpening = false;

})(arguments[0] || {});

function _addTargets(targets) {
	$.highlighters = [];
	setWindowImage(function (_windowImage) {
		for (var i = 0, max = targets.length; i < max; i++) {
			generateHighlighter({
				target : targets[i].point,
				windowImage : _windowImage,
				description : targets[i].description
			});
		}
		_open();
	});
}

function _open() {
	$.container.addEventListener('postlayout', function onPostlayout(e) {
		$.container.removeEventListener('postlayout', onPostlayout);

		// set the first showcase
		$.highlighters.current = 0;
		resetDescription($.highlighters[$.highlighters.current]);
	});

	$.container.opacity = 0;
	$.container.open();

	$.container.animate({
		opacity : 1,
		duration : 300
	}, function (e) {
		$.container.opacity = 1;
		$.isOpening = true;
	});
}

function _close() {
	if ($.isOpening) {
		$.isOpening = false;
		$.highlighters = null;
		$.container.close();
	}
}

function setWindowImage(callback) {
	// take screenshot for generating highlighter
	return Ti.Media.takeScreenshot(function (e) {
		callback && callback(Ti.UI.createImageView({
			top : 0,
			left : 0,
			image : e.media,
			width : e.media.width,
			height : e.media.height
		}).toImage());
	});
}

// convert dp to pixel.
function dpToPx(dp) {
	return ( parseInt(dp) * (Titanium.Platform.displayCaps.dpi / 160));
}

// convert pixel to dp.
function pxToDp(px) {
	return ( parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160));
}

function generateHighlighter(_args) {
	var target = _args.target;
	var highlighterBlob = _args.windowImage.imageAsCropped({
		x : dpToPx(target.rect.x - $.padding / 2),
		y : dpToPx(target.rect.y - $.padding / 2),
		width : dpToPx(target.rect.width + $.padding),
		height : dpToPx(target.rect.height + $.padding),
	});

	var highlighter = Ti.UI.createImageView({
		opacity : 0,
		center : {
			x : target.rect.x + target.rect.width / 2,
			y : target.rect.y + target.rect.height / 2,
		},
		width : pxToDp(highlighterBlob.width),
		height : pxToDp(highlighterBlob.height),
		image : highlighterBlob,
		_description : _args.description
	});

	$.highlighters.push(highlighter);

	$.container.add(highlighter);
}

function resetDescription(highlighter) {
	highlighter.opacity = 1;
	var isBelow = (highlighter.rect.y < Titanium.Platform.displayCaps.platformHeight / 2) ? 1 : -1;

	$.description.text = highlighter._description;
	$.description.center = {
		x : Titanium.Platform.displayCaps.platformWidth / 2,
		y : highlighter.rect.y + (highlighter.height + $.margin) * isBelow
	}

	relocateNextBtn($.description);
}

function relocateNextBtn(description) {
	$.next.center = {
		x : description.center.x,
		y : description.center.y + description.rect.height / 2 + $.padding
	}
}

function next(e) {
	$.highlighters[$.highlighters.current].opacity = 0;
	$.highlighters.current++;

	if ($.highlighters.current === $.highlighters.length) {
		return _close();
	}
	resetDescription($.highlighters[$.highlighters.current]);
}

exports.addTargets = _addTargets;
exports.open = _open;
exports.close = _close;
