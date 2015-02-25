
var expect = require('chai').expect;
var foo = require('../js/foo.js');

describe('baseStorage測試', function() {
	
	it('test foo.add()', function() {
    	var result = foo.plus(1, 2);
    	console.log(result);
    	expect(result).to.equal(3);
    });
});