
var buildOpsList = function(opsList, ast) {
    var nextDepIdx = opsList.length + 1;

    var opsObj = {
        opFn: selectOperator(ast.op),
        computedConcreteInputs: new Array(ast.args.length),
        staticConcreteInputs: new Array(ast.args.length),
        dependencies: new Array(ast.args.length)
    };
    opsList.push(opsObj);

    for (var i=0; i < ast.args.length; i++) {
        var arg = ast.args[i];
        if (typeof arg === "number") {
            opsObj.staticConcreteInputs[i] = arg;
        } else {
            opsObj.dependencies[i] = nextDepIdx;
            opsList = buildOpsList(opsList, arg);
            nextDepIdx += opsList.length - 1;
        }
    }

    return opsList;
};

var runOpsList = function(opsList) {
    var op;
    for (var i=opsList.length - 1; i >=  0; i--) {
        var lastResolvedDepIdx = 0;
        op = opsList[i];

        for (var j=0; j < op.computedConcreteInputs.length; j++) {
            if (op.staticConcreteInputs[j]) {
                op.computedConcreteInputs[j] = op.staticConcreteInputs[j];
            } else {
                op.computedConcreteInputs[j] = opsList[op.dependencies[j]].result;
            }
        }

        op.result = op.opFn(op.computedConcreteInputs);
        // console.log(opsList);
        // op.computedConcreteInputs = [];
    }
    return opsList[0].result;
};

var evalFormula = function(opsList, ast) {
    // var updatedOpsList = buildOpsList(opsList, ast);
    // console.log(updatedOpsList);
    return runOpsList(buildOpsList(opsList, ast));
};

var evalParsedFormula = function(opsList) {
    return runOpsList(opsList);
}

var selectOperator = function(expr) {
    switch (expr) {
    case "+":
        return function(args) { return args[0] + args[1]; };
    case "-":
        return function(args) { return args[0] - args[1]; };
    case "*":
        return function(args) { return args[0] * args[1]; };
    case "/":
        return function(args) { return args[0] / args[1]; };
    case ">":
        return function(args) { return args[0] > args[1]; };
    case "=":
        return function(args) { return args[0] === args[1]; };
    case "<":
        return function(args) { return args[0] < args[1]; };
    default:
        throw {
            name : "UnrecognizedOpError",
            message : "Did not recognize op: " + opExpr.op
        };
    }
}

module.exports = {
    buildOpsList: buildOpsList,
    runOpsList: runOpsList,
    evalFormula: evalFormula,
}