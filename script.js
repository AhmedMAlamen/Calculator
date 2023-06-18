class Calculator {
    constructor(preOperandTextElement, currentOperandTextElement){
    this.currentOperandTextElement = currentOperandTextElement
    this.preOperandTextElement = preOperandTextElement
    this.clear()
    }
    clear() {
        this.currentOperand = '';
        this.preOperand = '';
        this.operation = undefined;
    }
    delete() {
        this. currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number) {
        if(number ==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOpertaion(operation) {
        if(this.currentOperand === ``) return
        if(this.preOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.preOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.preOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                 break    
             case '*':
                computation = prev * current
                break;
                case '÷':
                    computation = prev / current
                    break;        
                default:
                    return
        }
        this.currentOperand =computation
        this.operation = undefined
        this.preOperand = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integersDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intgerDisplay = ''
        if(isNaN(intgerDisplay)) {
            intgerDisplay = ''
        }else {
            intgerDisplay = integersDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if (decimalDigits != null) {
            return `${intgerDisplay}.${decimalDigits}`
        }
        else {
            return intgerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.getDisplayNumber(this.currentOperand)
        if(this.preOperand != null) {
            this.preOperandTextElement.innerText = `${this.getDisplayNumber(this.preOperand)} ${this.operation}`
        } else{
            this.preOperandTextElement.innerText = ''
        }
    }
}
const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const allClear = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const preOperandTextElement = document.querySelector('[data-pre-operation]')
const currentOperandTextElement = document.querySelector('[data-current-operation]')

const calculator = new Calculator(preOperandTextElement, currentOperandTextElement)
numberButton.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOpertaion(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click' , () => {
    calculator.compute()
    calculator.updateDisplay()
})
allClear.addEventListener('click' , () => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click' , () => {
    calculator.delete()
    calculator.updateDisplay()
})