
(function constructor(args) {
    $.padding = args.padding || 20; // padding of highligher
    $.margin = args.margin || 100; // margin between description and highlighter

    $.borderRadius = args.borderRadius || 80;

    if (args.dimColor) {
        console.log(args.dimColor);
        $.background.backgroundColor = args.dimColor;
    }

    $.lighterDimColor = '#33FFFFFF';


    $.isOpening = false;

})(arguments[0] || {});

function _addTargets(targets) {
    $.highlighters = [];
    setWindowImage(function (_windowImage) {
        for (var i = 0, max = targets.length; i < max; i++) {
            prepareForGeneratingHighlighter({
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

function prepareForGeneratingHighlighter(_args) {
    var target = _args.target;

    // prepare for cropping square
    var lengthOfSize = target.rect.width > target.rect.height ?
        target.rect.width :
        target.rect.height;

    // caculate property position of cropping
    var _x = (target.rect.x + target.rect.width / 2); // center
    _x -= lengthOfSize / 2;

    var _y = (target.rect.y + target.rect.height / 2); // center
    _y -= lengthOfSize / 2;

    // cropping
    var highlighterBlob = _args.windowImage.imageAsCropped({
        x : dpToPx(_x - $.padding / 2),
        y : dpToPx(_y - $.padding / 2),
        width : dpToPx(lengthOfSize + $.padding),
        height : dpToPx(lengthOfSize + $.padding),
    });

    generateHighlighter_(target, highlighterBlob, _args.description);


}

function generateHighlighter_(target, highlighterBlob, description) {
    // highligh by circle shape
    var highlighter = Ti.UI.createImageView({
        opacity : 1,
        width : pxToDp(highlighterBlob.width),
        height : pxToDp(highlighterBlob.width),
        borderRadius : pxToDp(highlighterBlob.width / 2),
        image : highlighterBlob,

        _description : description
    });

    // generate border view
    var lengthOfSize = pxToDp(highlighterBlob.width) + $.borderRadius;
    var borderView = Ti.UI.createView({
        opacity : 0,
        center : {
            x : target.rect.x + target.rect.width / 2,
            y : target.rect.y + target.rect.height / 2,
        },
        width : lengthOfSize,
        height : lengthOfSize,
        borderRadius : lengthOfSize / 2,
        backgroundColor : $.lighterDimColor,

        _description : description,
    })

    borderView.add(highlighter);

    $.highlighters.push(borderView);

    $.container.add(borderView);
}

function resetDescription(highlighter) {
    var isBelow = (highlighter.rect.y < Titanium.Platform.displayCaps.platformHeight / 2) ? 1 : -1;

    $.description.text = highlighter._description;
    $.description.center = {
        x : Titanium.Platform.displayCaps.platformWidth / 2,
        y : highlighter.rect.y + (highlighter.height + $.margin) * isBelow
    }

    relocateNextBtn($.description);

    highlighter.animate({
        opacity : 1,
        duration : 300
    }, function (e) {
        highlighter.opacity = 1;
    });
}

function relocateNextBtn(description) {
    $.next.center = {
        x : description.center.x,
        y : description.center.y + description.rect.height / 2 + 30
    }
}

function next(e) {
    $.highlighters[$.highlighters.current].animate({
        opacity : 0,
        duration : 300,
    }, function (e) {
        $.highlighters[$.highlighters.current].opacity = 0;

        $.highlighters.current++;

        if ($.highlighters.current === $.highlighters.length) {
            return _close();
        }
        resetDescription($.highlighters[$.highlighters.current]);
    });
}

exports.addTargets = _addTargets;
exports.open = _open;
exports.close = _close;

// Don't want to delete this function :)

// function generateLighterColor(originalColor) {
//     var dimColorValue = parseInt(originalColor.substring(1, originalColor.length), 16);
//     var deltaValue = parseInt('22000000', 16);

//     return '#' + (dimColorValue + deltaValue).toString(16);

// }
