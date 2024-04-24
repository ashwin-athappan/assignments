/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
    result = 0;

    add(x) {
        this.result += x;
    }

    subtract(x) {
        this.result -= x;
    }

    multiply(x) {
        this.result *= x;
    }

    divide(x) {
        if (x === 0) {
            throw new Error("Cannot divide by 0");
        }
        this.result /= x;
    }

    clear() {
        this.result = 0;
    }

    getResult() {
        return this.result;
    }

    calculate(expression) {
        if (expression === '') {
            this.result = 0;
            return;
        }

        let operands = [];
        let operators = [];

        let tokens = expression.trim().split("");
        tokens = tokens.filter((x) => x !== ' ');

        for (let i = 0; i < tokens.length; i++) {
            if (Number.isInteger(parseInt(tokens[i]))) {
                let num = '';
                while (i < tokens.length && (Number.isInteger(parseInt(tokens[i])) || tokens[i] === '.')) {
                    num += tokens[i++];
                }
                operands.push(Number.parseFloat(num));
                i --;
            } else if (tokens[i] === '(') {
                operators.push(tokens[i]);
            } else if (tokens[i] === ')') {
                while (operators[operators.length - 1] !== '(') {
                    let ans = this.calc(operators, operands);
                    operands.push(ans);
                }
                operators.pop();
            } else if (tokens[i] === '+' || tokens[i] === '-' || tokens[i] === '*' || tokens[i] === '/') {
                if (operators.length !== 0 && this.precedence(tokens[i]) <= this.precedence(operators[operators.length - 1])) {
                    let ans = this.calc(operators, operands);
                    operands.push(ans);
                }
                operators.push(tokens[i]);
            }
        }

        while (operators.length !== 0) {
            let ans = this.calc(operators, operands)
            operands.push(ans);
        }

        this.result = operands.pop();
    }

    precedence(op) {
        switch (op) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            default:
                return -1;
        }
    }

    calc(operators, operands) {
        let a = operands.pop();
        let b = operands.pop();
        let o = operators.pop();

        switch (o) {
            case '+': return b + a;
            case '-': return b - a;
            case '*': return b * a;
            case '/':
                if (a === 0) {
                    throw new Error('Cannot Divide by 0');
                }
                return b / a;
            default: throw new Error("Invalid operator");
        }
    }
}

module.exports = Calculator;
