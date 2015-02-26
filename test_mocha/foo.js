
var expect = require('chai').expect;
var foo = require('../js/foo.js');

describe('baseStorage測試', function() {
	
	it('test foo.plus()', function() {
    	var result = foo.plus(1, 2);
    	console.log(result);
    	expect(result).to.equal(3);
    });

    it('測試亂丟變數 這是test_mocha', function() {
    	expect(foo.plus(1, null)).to.equal(NaN);
        expect(foo.plus(5, '10')).to.equal(15);
        expect(foo.plus('10', 5)).to.equal('15');
        expect(foo.plus(undefined, 10)).to.equal(NaN);
    });
});