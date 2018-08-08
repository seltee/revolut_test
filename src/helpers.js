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
  return ((parseFloat(value) * fromRate) / toRate).toFixed(2);
}
