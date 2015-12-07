var assert = require("assert");
var jisp = require("../index_preprocess");

describe("Eval", function () {
    describe("evalPlus", function () {
        it("Should correctly add up two numbers", function () {
            var addition = {
                op : "+",
                args : [1, 2]
            };

            assert.equal(3, jisp.evalFormula([], addition));
        });

        it("Should correctly add up nested expressions", function () {
            var nested = {
                op : "+",
                args : [1, 2]
            };

            var addition = {
                op : "+",
                args : [nested, 3]
            };

            assert.equal(6, jisp.evalFormula([], addition));
        });

        it("Should correctly add up deeply nested expressions", function () {
            var nested2 = {
                op : "+",
                args : [2, 2]
            };

            var nested = {
                op : "+",
                args : [nested2, 2]
            };

            var addition = {
                op : "+",
                args : [nested, nested2]
            };

            assert.equal(10, jisp.evalFormula([], addition));
        });
    });

    describe("evalMin", function () {
        it("Should correctly substract two numbers", function () {
            var substraction = {
                op : "-",
                args : [2, 1]
            };

            assert.equal(1, jisp.evalFormula([], substraction));
        });

        it("Should correctly substract two nested numbers", function () {
            var nested = {
                op : "-",
                args : [10, 5]
            };

            var substraction = {
                op : "-",
                args : [nested, 1]
            };
            assert.equal(4, jisp.evalFormula([], substraction));
        });
    });

    describe("evalTimes", function () {
        it("Should correctly multiply two numbers", function () {
            var substraction = {
                op : "*",
                args : [2, 1]
            };

            assert.equal(2, jisp.evalFormula([], substraction));
        });

        it("Should correctly multiply two nested numbers", function () {
            var nested = {
                op : "*",
                args : [10, 5]
            };

            var substraction = {
                op : "*",
                args : [2, nested]
            };
            assert.equal(100, jisp.evalFormula([], substraction));
        });
    });

    describe("evalDiv", function () {
        it("Should correctly divide two numbers", function () {
            var substraction = {
                op : "/",
                args : [10, 2]
            };

            assert.equal(5, jisp.evalFormula([], substraction));
        });

        it("Should correctly divide two nested numbers", function () {
            var nested = {
                op : "/",
                args : [20, 5]
            };

            var substraction = {
                op : "/",
                args : [nested, 2]
            };
            assert.equal(2, jisp.evalFormula([], substraction));
        });
    });

    describe("evalEq", function () {
        it("should find equal expressions to be equal", function () {
            var eq = {
                op : "=",
                args : [1, 1]
            };

            assert.equal(true, jisp.evalFormula([], eq));
        });

        it("should find not equal expressions to be not equal", function () {
            var eq = {
                op : "=",
                args : [1, 2]
            };

            assert.equal(false, jisp.evalFormula([], eq));
        });

        it("should find equal nested expressions to be not equal", function () {
            var addition = {
                op : "+",
                args : [1, 2]
            };

            var eq = {
                op : "=",
                args : [addition, 3]
            };

            assert.equal(true, jisp.evalFormula([], eq));
        });
    });

    describe("eval", function () {
        it("should correctly evaluate a mixed expression", function () {
            var addition = {
                op : "+",
                args : [1, 2]
            };

            var substraction = {
                op : "-",
                args : [addition, 1]
            };

            var multiplication = {
                op : "*",
                args : [4, substraction]
            };

            var division = {
                op : "/",
                args : [multiplication, 2]
            };

            assert.equal(4, jisp.evalFormula([], division));

        });
    });

});