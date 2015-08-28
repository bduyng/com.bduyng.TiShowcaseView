(function () {
	var _targets = [];

	var dummyDescriptions = [
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
		'Duis aute irure dolor in reprehenderit in voluptate velit esse.'
	]

	for (var i = 0, max = 9; i < max; i++) {
		_targets.push({
			point : $['btn' + (i + 1)],
			description : dummyDescriptions[i % 3]
		})
	}

	$.index.addEventListener('postlayout', function onPostlayout(e) {
		$.index.removeEventListener('postlayout', onPostlayout);
		// add targets and open showcase view
		$.showcaseView.addTargets(_targets);
	});

	$.index.open();
})();
