(function () {
	var _targets = [];
	for (var i = 0, max = 9; i < max; i++) {
		_targets.push({
			point : $['btn' + (i + 1)],
			description : "Description " + (i + 1)
		})
	}

	$.index.addEventListener('postlayout', function onPostlayout(e) {
		$.index.removeEventListener('postlayout', onPostlayout);
		// add targets and open showcase view
		$.showcaseView.addTargets(_targets);
	});

	$.index.open();
})();
