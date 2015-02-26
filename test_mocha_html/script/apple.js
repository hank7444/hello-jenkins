
var require = require || null;
var mocha = mocha || null;
var chai = chai || null;
var expect = expect || null;
var apple = apple || null;


// 讓html與node皆可以跑
if (require) {
    expect = require('chai').expect;
    apple = require('../../js/apple.js');
}
else {
    mocha = window.mocha;
    chai = window.chai;
    expect = chai.expect; // expect用法
    apple = window.apple;
    mocha.setup('bdd');
}



describe('apple測試', function() {
	
	it('test apple.getApple()', function() {
    	var result = apple.getApple();
    	expect(result).to.equal('you have an apple');
    });
    
    
    it('test apple.eatApple()', function() {
    	var result = apple.eatApple();
    	expect(result).to.equal('so sweet!');
    });

    
	it('test apple.throwApple()', function() {
    	var result = apple.throwApple();
    	expect(result).to.equal('oh you hurted me!');
    });

});


if (typeof window === 'object' && window.mochaPhantomJS) { 
    mochaPhantomJS.run();
}
else if (typeof window === 'object') { 
    mocha.run();
}