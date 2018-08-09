export function getCurrencyChar(char) {
  const currencyCodeChars = {
    RUB: '₽',
    EUR: '€',
    GBP: '£',
    USD: '$'
  };

  if (currencyCodeChars[char]) {
    return currencyCodeChars[char];
  }
  return char;
}

export function getCurrencyValue(fromVal, toVal, toFixed = 4) {
  return ((1 / toVal) * fromVal).toFixed(toFixed);
}

export function convertCurrency(value, fromRate, toRate) {
  if (fromRate && toRate && parseFloat(value)) {
    return ((parseFloat(value) * fromRate) / toRate).toFixed(2);
  }
  return '0.00';
}

export function validateMoney(value) {
  value = value.replace(/,/, '.');
  if (value.length === 0) {
    return '0';
  }

  let valueInt = parseInt(value, 10);
  valueInt = Number.isNaN(valueInt) ? 0 : valueInt;
  valueInt = Math.abs(valueInt);

  let ext = value.indexOf('.') > -1 ? `.${value.split('.')[1]}` : null;
  ext = ext && ext.length > 3 ? ext.slice(0, 3) : ext;

  return valueInt + ext;
}

export function eventOnlyValue(event) {
  if (
    (event.which >= 48 && event.which <= 57) ||
    ((event.charCode === 46 || event.charCode === 44) && event.target.value.indexOf('.') === -1)) {
    return true;
  }
  event.preventDefault();
  return false;
}
