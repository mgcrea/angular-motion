# [AngularMotion](http://mgcrea.github.io/angular-motion)

[![Bower Version](http://img.shields.io/bower/v/angular-motion.svg?style=flat)](https://github.com/mgcrea/angular-motion/releases) [![Build Status](http://img.shields.io/travis/mgcrea/angular-motion/master.svg?style=flat)](http://travis-ci.org/mgcrea/angular-motion) [![devDependency Status](http://img.shields.io/david/dev/mgcrea/angular-motion.svg?style=flat)](https://david-dm.org/mgcrea/angular-motion#info=devDependencies)

[![Banner](http://mgcrea.github.io/angular-motion/images/snippet.png)](http://mgcrea.github.io/angular-motion)

AngularMotion is an animation starter-kit built for [AngularJS 1.2.0+](https://github.com/angular/angular.js).

It's a spin off from [AngularStrap](http://mgcrea.github.io/angular-strap) v2 release work.


## Documentation and examples

+ Check the [documentation](http://mgcrea.github.io/angular-motion) and [changelog](https://github.com/mgcrea/angular-motion/releases).


## Communication

- If you **need help**, use [Stack Overflow](http://stackoverflow.com/questions/tagged/angular-strap).
- If you'd like to **ask a general question**, use [Stack Overflow](http://stackoverflow.com/questions/tagged/angular-strap).
- If you **found a bug**, open an issue.
- If you **have a feature request**, open an issue.
- If you **want to contribute**, submit a pull request.


## Quick start

+ Install AngularMotion with [Bower](https://github.com/bower/bower).

>
```bash
$ bower install angular-motion --save
```

+ Include the required libraries is your `index.html`:

>
``` html
<link rel="stylesheet" href="bower_components/angular-motion/dist/angular-motion.min.css">
```

+ Inject the `ngAnimate` module into your app

>
``` js
angular.module('myApp', ['ngAnimate']);
```


## Developers

Clone the repo, `git clone git://github.com/mgcrea/angular-motion.git`, [download the latest release](https://github.com/mgcrea/angular-motion/zipball/master) or install with bower `bower install angular-motion --save`.

You can build the latest version using `gulp`.

>
```bash
$ gulp build
```

You can quickly hack around (the docs) with:

>
```bash
$ gulp serve
```


## Contributing

Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!


## Authors

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea


## Copyright and license

```
The MIT License

Copyright (c) 2014 - 2015 Olivier Louvignes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
