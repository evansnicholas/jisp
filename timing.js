var jisp = require('./index.js');
var jisp_stacksafe = require('./index_stack_safe.js');
var jisp_preprocess = require('./index_preprocess.js');

var addition = {
    op: "+",
    args: [1, 2]
};

var substraction = {
    op: "-",
    args: [addition, 1]
};

var multiplication = {
    op: "*",
    args: [4, substraction]
};

var division = {
    op: "/",
    args: [multiplication, 2]
};

var ITERATIONS = 1000000;
console.time("Preprocess full eval");
for (var i = 0; i < ITERATIONS; i++) {
    var opsList = [];
    jisp_preprocess.evalFormula(opsList, division);
}
console.timeEnd("Preprocess full eval");

console.time("Preprocess parsing");
for (var i = 0; i < ITERATIONS; i++) {
    jisp_preprocess.buildOpsList([], division);
}
console.timeEnd("Preprocess parsing");

var parsedOpsList = jisp_preprocess.buildOpsList([], division);

console.time("Preprocess parsed eval");
for (var i = 0; i < ITERATIONS; i++) {
    jisp_preprocess.runOpsList(parsedOpsList);
}
console.timeEnd("Preprocess parsed eval");

console.time("Stack safe");
for (var i = 0; i < ITERATIONS; i++) {
    jisp_stacksafe(division);
}
console.timeEnd("Stack safe");

console.time("Old");
for (var i = 0; i < ITERATIONS; i++) {
    jisp(division);
}
console.timeEnd("Old");
