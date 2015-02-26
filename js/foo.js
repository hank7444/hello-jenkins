var window = window || null;
var foo = (function(window, undefined) {
	return {
		plus: function(a, b) {
			return a + b;
		}
	};
})(window);
// 1234 test again haha 再來一次


// 參考chai-jquery.js的寫法
if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
	// NodeJS
	module.exports = foo;
} else if (typeof define === "function" && define.amd) {
	// AMD
	define(['foo'], function ($) {
	  return foo;
	});
} else {
	// Other environment (usually <script> tag): plug in to global chai instance directly.
	//chai.use(function (chai, utils) {
	 // return chaiJquery(chai, utils, jQuery);
	//});
}