var assert = require("assert");
var eval = require("../index");

describe("Eval", function () {
	describe("evalPlus", function () {
		it("Should correctly add up nested expressions", function () {
			var nested = {
				op : "+",
				args : [1, 2]
			};

			var addition = {
				op : "+",
				args : [nested, 3]
			};

			assert.equal(6, eval(addition));
		});
    });
	
	
});