# Alloy Showcase Views [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

An [Alloy](http://appcelerator.com/alloy) [Widget](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Widgets) to introduce the best features of your app to users by an awesome way.

* Source code: [https://github.com/bduyng/com.bduyng.TiShowcaseView/tree/master](https://github.com/bduyng/com.bduyng.TiShowcaseView/tree/master)
* Test app: [https://github.com/bduyng/com.bduyng.TiShowcaseView/tree/test](https://github.com/bduyng/com.bduyng.TiShowcaseView/tree/test)

<!-- ### Screenshot
![Screenshot](https://github.com/bduyng/com.bduyng.TiShowcaseView/blob/test/demo.gif?raw=true)

## Get it [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/com.bduyng.TiShowcaseView)

Install via [gitTio](http://gitt.io/component/com.bduyng.TiShowcaseView):

	$ gittio install com.bduyng.TiShowcaseView -->

Or download a [release](https://github.com/bduyng/com.bduyng.TiShowcaseView/releases), extract it to your app's `app/widgets/com.bduyng.TiShowcaseView` folder and add the dependency to your `config.json`:

	{
		..
		"dependencies": {
			"com.bduyng.TiShowcaseView": "*"
			..
		}
	}

## Use it

Feel free to modify if need.

### index.js
	(function () {
		// NOTE : _targets is an array which contains labels, buttons or any view
		// you want to highlight and introduce to users

		$.index.addEventListener('postlayout', function onPostlayout(e) {
			$.index.removeEventListener('postlayout', onPostlayout);
			// add targets and open showcase view
			$.showcaseView.addTargets(_targets);
		});

		$.index.open();
	})();


## Changelog

* 1.0.0 Initial version

## License

	The MIT License (MIT)

	Copyright (c) 2015 Duy Bao Nguyen

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
