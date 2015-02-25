var foo = (function(window, undefined) {
	return {
		plus: function(a, b) {
			return a + b;
		}
	};
})();

module.exports = foo;