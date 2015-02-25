var foo = (function(window, undefined) {
	return {
		plus: function(a, b) {
			return a + b;
		}
	};
})();
// 1234

module.exports = foo;