var eval = function (expr) {
	var stack = [];
	var currEval;
	var toVisit = [expr];

	if (typeof expr === "number") {
		return expr;
	}
	while (toVisit.length > 0 || stack.length > 0) {
		if (stack.length > 0) {
			var top = stack.pop();
			if (top.args.length === 2) {
				currEval = evalOp(top);
				if (stack.length > 0) {
					var nextTop = stack.pop();
					nextTop.args.push(currEval);
					stack.push(nextTop);
				}
			} else {
				var next = toVisit.pop();
				if (typeof next === "number") {
					top.args.push(next);
					stack.push(top);
				} else {
					stack.push(top);
					stack.push({
						op : next.op,
						args : []
					});
					toVisit = toVisit.concat(next.args.reverse());
				}
			}
		} else {
			var next = toVisit.pop();
			stack.push({
				op : next.op,
				args : []
			});
			toVisit = toVisit.concat(next.args.reverse());
		}

		// console.log("to visit");
		// console.log(toVisit);

		// console.log("stack");
		// console.log(stack);
		// console.log("")
	}
	return currEval;
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

	return args[0] + args[1];
};

var evalMin = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for min but found " + args.length
		};
	}

	return args[0] - args[1];
};

var evalTimes = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for times but found " + args.length
		};
	}

	return args[0] * args[1];
};

var evalDiv = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for div but found " + args.length
		};
	}

	return args[0] / args[1];
};

var evalGt = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for > but found " + args.length
		};
	}

	return args[0] > args[1];
};

var evalSt = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for < but found " + args.length
		};
	}

	return args[0] < args[1];
};

var evalEq = function (args) {
	if (args.length !== 2) {
		throw {
			name : "IncorrectArgs",
			message : "Expected 2 args for = but found " + args.length
		};
	}

	return args[0] === args[1];
};

module.exports = eval;
