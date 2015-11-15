var eval = function (expr) {
	if (typeof expr === "number") {
		return expr;
	} else {
		return evalOp(expr);
	}
};

var evalOp = function (opExpr) {
	switch (opExpr.op) {
	case "+":
		return evalPlus(opExpr.args);
	case "-":
		return evalMin(opExpr.args);
	case "*":
		return evalTimes(opExpr.args);
	case "/":
		return evalDiv(opExpr.args);
	case ">":
		return evalGt(opExpr.args);
	case "=":
		return evalEq(opExpr.args);
	case "<":
		return evalSt(opExpr.args);
	default:
		throw {
			name : "UnrecognizedOpError",
			message : "Did not recognize op: " + opExpr.op
		};
	}
};

var evalPlus = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for plus but found " + args.length
		};
	}

	return eval(args[0]) + eval(args[1]);
};

var evalMin = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for min but found " + args.length
		};
	}

	return eval(args[0]) - eval(args[1]);
};

var evalTimes = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for times but found " + args.length
		};
	}

	return eval(args[0]) * eval(args[1]);
};

var evalDiv = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for div but found " + args.length
		};
	}

	return eval(args[0]) / eval(args[1]);
};

var evalGt = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for > but found " + args.length
		};
	}

	return eval(args[0]) > eval(args[1]);
};

var evalSt = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for < but found " + args.length
		};
	}

	return eval(args[0]) < eval(args[1]);
};

var evalEq = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for = but found " + args.length
		};
	}

	return eval(args[0]) === eval(args[1]);
};

module.exports = eval;