function eval() {
    // Do not use eval!!!
    return;
}

const operation = {
  "+": (a, b) => {
    return a + b;
  },
  "-": (a, b) => {
    return a - b;
  },
  "*": (a, b) => {
    return a * b;
  },
  "/": (a, b) => {
    if (b == 0) {
      throw new Error("TypeError: Division by zero.");
    } else {
      return a / b;
    }
  }
}
const operatorPriority = {
  "(": 10,
  "*": 9,
  "/": 9,
  "+": 8,
  "-": 8,
  ")": 1
}
function expressionCalculator(expr) {
  expr="("+expr+")";
  let opBrackets=expr.match(/\(/g);
  let clBrackets=expr.match(/\)/g)
  if (opBrackets.length!=clBrackets.length) {
    throw new Error("ExpressionError: Brackets must be paired");
  }
  expr=expr.match(/\d+|\S/g); //one or more digit OR any simbol exept of space
  let operatorStack=["("];
  let operandStack=[];
  let i=1;
  while (i < expr.length) {
    let currSymbol=expr[i];
    let prevOperator=operatorStack[operatorStack.length-1];
    if (operatorPriority.hasOwnProperty(currSymbol)) {
      if (operatorPriority[currSymbol] > operatorPriority[prevOperator] || (prevOperator=="(" && currSymbol!=")")) {
        operatorStack.push(currSymbol);
        i++;
      } else {
        if (currSymbol===")" && prevOperator==="(") {
          operatorStack.pop();
          i++;
        } else {
          let b = operandStack.pop();
          let a = operandStack.pop();
          operandStack.push(operation[operatorStack.pop()](a, b));
        }
      }
    } else if (/\d/g.test(currSymbol)) {
      operandStack.push(+currSymbol);
      i++;
    } else i++;
  }
  expr=operandStack[0];
  return expr
}

module.exports = {
    expressionCalculator
}