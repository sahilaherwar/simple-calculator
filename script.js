let history = [];
const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = ""
}

function back() {
    var b = display.value;
    display.value = b.substr(0, b.length - 1);
}


async function calculate() {
    let expression = document.getElementById('display').value;
    let result = evaluateExpression(expression);
    if (expression.includes('%')) {
        const inputs = expression.split('%');
        if (inputs.length === 2) {
            const value = parseFloat(inputs[0]);
            const percentage = parseFloat(inputs[1]);
            if (!isNaN(value) && !isNaN(percentage)) {
                result = (value * percentage) / 100;
            } else {
                alert('Invalid input format. Please enter two numbers separated by % symbol.');
                return;
            }
        } else {
            alert('Invalid input format. Please enter two numbers separated by % symbol.');
            return;
        }
    } else {
        try {
            result = eval(expression);
        } catch (error) {
            alert('Invalid expression.');
            return;
        }
    }
    document.getElementById('display').value = result;
    history.push(expression + ' = ' + result); 

    await fetch('/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operation: expression, solution: result })
    });
}

function evaluateExpression(expression) {
    let tokens = expression.split(/([+\-*\/])/);
    let operand1 = parseFloat(tokens[0]);
    let operator = tokens[1];
    let operand2 = parseFloat(tokens[2]);

    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
    }
}



