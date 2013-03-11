unreleased
==========

* Don't overwrite `$.slider` if it already exists. Further avoids conflict
  with [jQuery-ui](http://jqueryui.com). egorkhmelev/jslider#53.
* Added more meaningful errors when slider is applied to non-`INPUT` elements
  and elements without values. egorkhmelev/jslider#7.

1.1.0
=====

* Fixed support for jQuery 1.9+
* Added `$('#foo').jslider({})` as an alias for `$().slider` for situations
  where [jQuery-ui](http://jqueryui.com) is also included.
  egorkhmelev/jslider#53.

1.0.0
=====

Forked from git://github.com/egorkhmelev/jslider