const CURRENCY_SYMBOL = "€";

const formatPrice = value => {
  return CURRENCY_SYMBOL + value.toFixed(2);
};

export default formatPrice;
