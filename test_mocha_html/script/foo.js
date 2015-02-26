
var require = require || null;
var mocha = mocha || null;
var chai = chai || null;
var expect = expect || null;
var foo = foo || null;


// 讓html與node皆可以跑
if (require) {
    expect = require('chai').expect;
    foo = require('../../js/foo.js');
}
else {
    mocha = window.mocha;
    chai = window.chai;
    expect = chai.expect; // expect用法
    foo = window.foo;
    mocha.setup('bdd');
}



describe('baseStorage測試', function() {
	
	it('test foo.plus()', function() {
    	var result = foo.plus(1, 2);
    	console.log(result);
    	expect(result).to.equal(3);
    });

    it('測試亂丟變數 這是test_mocha_html', function() {
    	expect(foo.plus(1, null)).to.equal(NaN);
        expect(foo.plus(5, '10')).to.equal(15);
        expect(foo.plus('10', 5)).to.equal('15');
        expect(foo.plus(undefined, 10)).to.equal(NaN);
    });
});

if (typeof window === 'object' && window.mochaPhantomJS) { 
    mochaPhantomJS.run();
}
else if (typeof window === 'object') { 
    mocha.run();
}