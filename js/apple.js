/* nodejs模組 */
var window = window || null;
var apple = (function(window, undefined) {
	return {
		getApple: function() {
			return 'you have an apple';
		},
		eatApple: function() {
			return 'so sweet!';
		},
		throwApple: function() {
			return 'oh! you hurted me!';
		}
	};
})();
// 1234 test again haha 再來一次


// 參考chai-jquery.js的寫法
if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
	// NodeJS
	module.exports = apple;
} else if (typeof define === "function" && define.amd) {
	// AMD
	define(['apple'], function ($) {
	  return apple;
	});
} else {
	// Other environment (usually <script> tag): plug in to global chai instance directly.
	//chai.use(function (chai, utils) {
	 // return chaiJquery(chai, utils, jQuery);
	//});
}