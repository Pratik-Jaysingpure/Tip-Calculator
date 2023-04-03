const tipCustom = document.querySelector('#tipSetCustom');
const radioInput = document.querySelectorAll('input[name=tipAmount]');
const bill = document.querySelector('#bill');
const numPeople = document.querySelector('#numPeople');
const outTip = document.querySelector('#output-tip');
const outTotal = document.querySelector('#output-total');
const resetBtn = document.querySelector('#reset');
const billError = document.querySelector('#billError');
const numPeopleError = document.querySelector('#numPeopleError');

let tipAm = 0.0;
let split = 0;
let billAmount = 0;

// uncheck selected tip when custom amount is clicked
tipCustom.addEventListener('click', () => {
  uncheckTips();
});

// Check for inputs
bill.addEventListener('input', () => {
  if (isValid(bill)) {
    billAmount = parseFloat(bill.value);
    tipSum();
  }
});

tipCustom.addEventListener('input', () => {
  if (isValid(tipCustom)) {
    tipAm = parseFloat(tipCustom.value) / 100;
    tipSum();
  }
});

numPeople.addEventListener('input', () => {
  if (isValid(numPeople)) {
    split = parseFloat(numPeople.value);
    tipSum();
  }
});

radioInput.forEach((r) => {
  r.addEventListener('click', () => {
    resetBtn.classList.add('reset-active');
    tipCustom.value = '';
    tipAm = parseFloat(r.value) / 100;
    tipSum();
  });
});

resetBtn.addEventListener('click', () => {
  if (resetBtn.classList.contains('reset-active')) {
    clearOutput();
    clear();
    uncheckTips();
    resetBtn.classList.remove('reset-active');
    bill.classList.remove('invalid');
    numPeople.classList.remove('invalid');
    tipCustom.classList.remove('invalid');
    billError.classList.add('hidden');
    numPeopleError.classList.add('hidden');
  }
});

// Check if input is valid
const isValid = (e) => {
  if (e.value !== '' && parseFloat(e.value) >= 1) {
    e.classList.remove('invalid');
    resetBtn.classList.add('reset-active');
    if (e === numPeople) {
      numPeopleError.classList.add('hidden');
    } else if (e === bill) {
      billError.classList.add('hidden');
    }
    return true;
  } else {
    e.classList.add('invalid');
    resetBtn.classList.add('reset-active');
    clearOutput();
    if (e === numPeople) {
      numPeopleError.classList.remove('hidden');
    } else if (e === bill) {
      billError.classList.remove('hidden');
    }
  }
};

// Work out tip amount
function tipSum() {
  if (split > 0 && tipAm > 0 && billAmount > 0) {
    let tip = billAmount * tipAm;
    let total = billAmount + tip;
    let tipPerPerson = tip / split;
    let totalPerPerson = total / split;
    tipPerPerson = (
      Math.round((tipPerPerson + Number.EPSILON) * 100) / 100
    ).toFixed(2);
    totalPerPerson = (
      Math.round((totalPerPerson + Number.EPSILON) * 100) / 100
    ).toFixed(2);

    outTip.innerHTML = '£' + tipPerPerson;
    outTotal.innerHTML = '£' + totalPerPerson;
    resetBtn.classList.add('reset-active');
  } else {
    clearOutput();
  }
}

// Reset tips
const clearOutput = () => {
  outTip.innerHTML = '£' + '0.00';
  outTotal.innerHTML = '£' + '0.00';
};

const clear = () => {
  tipPerPerson = 0;
  totalPerPerson = 0;
  billAmount = 0;
  tipAm = 0;
  split = 0;
  bill.value = '';
  numPeople.value = '';
  tipCustom.value = '';
};

const uncheckTips = () => {
  radioInput.forEach((el) => {
    if (el.checked) {
      el.checked = false;
    }
  });
};
