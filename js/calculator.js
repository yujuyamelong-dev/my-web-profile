// 계산기 클래스
class Calculator {
  constructor(displayElement, previousOperandElement) {
    this.displayElement = displayElement;
    this.previousOperandElement = previousOperandElement;
    this.clear();
  }

  // 디스플레이 업데이트
  updateDisplay() {
    this.displayElement.value = this.currentOperand || '0';

    if (this.operation != null) {
      this.previousOperandElement.textContent =
        `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandElement.textContent = '';
    }
  }

  // 숫자 추가
  appendNumber(number) {
    // 소수점 처리: 이미 있으면 무시
    if (number === '.' && this.currentOperand.includes('.')) return;

    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  // 연산자 선택
  chooseOperation(operation) {
    // 현재 피연산자가 없으면 연산자만 변경
    if (this.currentOperand === '') {
      this.operation = operation;
      return;
    }

    // 이전 연산이 있으면 계산 먼저 실행
    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  // TODO(human): compute() 메서드 구현
  // 이전 피연산자와 현재 피연산자를 주어진 연산자로 계산
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        // 0으로 나누기 처리
        if (current === 0) {
          alert('0으로 나눌 수 없습니다');
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    // 결과를 최대 10자리까지 표시
    this.currentOperand = parseFloat(computation.toFixed(10));
    this.operation = null;
    this.previousOperand = '';
  }

  // 삭제 (마지막 숫자 제거)
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  // 초기화
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
    this.updateDisplay();
  }
}

// DOM 요소 가져오기
const displayElement = document.getElementById('display');
const previousOperandElement = document.getElementById('previous-operand');

// 계산기 인스턴스 생성
const calculator = new Calculator(displayElement, previousOperandElement);

// 이벤트 리스너 등록

// 숫자 버튼
document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.dataset.number);
  });
});

// 연산자 버튼
document.querySelectorAll('[data-operator]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.dataset.operator);
  });
});

// 액션 버튼 (AC, 삭제, 계산)
document.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'clear') {
      calculator.clear();
    } else if (action === 'delete') {
      calculator.delete();
    } else if (action === 'calculate') {
      calculator.compute();
      calculator.updateDisplay();
    }
  });
});

// 키보드 지원
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') calculator.appendNumber(e.key);
  if (e.key === '.') calculator.appendNumber(e.key);
  if (e.key === '+' || e.key === '-') calculator.chooseOperation(e.key);
  if (e.key === '*') {
    e.preventDefault();
    calculator.chooseOperation(e.key);
  }
  if (e.key === '/') {
    e.preventDefault();
    calculator.chooseOperation(e.key);
  }
  if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }
  if (e.key === 'Backspace') {
    e.preventDefault();
    calculator.delete();
  }
  if (e.key === 'Escape') calculator.clear();
});
