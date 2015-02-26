
var expect = require('chai').expect;
var apple = require('../js/apple.js');

describe('apple測試', function() {
	
	it('test apple.getApple()', function() {
    	var result = apple.getApple();
    	expect(result).to.equal('hahaha! love');
    });
    /*
    it('test apple.eatApple()', function() {
    	var result = apple.eatApple();
    	expect(result).to.equal('so sweet!');
    });*/

	it('test apple.throwApple()', function() {
    	var result = apple.throwApple();
    	expect(result).to.equal('oh you hurted me!');
    });
});