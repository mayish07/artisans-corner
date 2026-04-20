// client/src/utils/formatCurrency.js
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPrice = (price) => {
  if (price === null || price === undefined) return '$0.00';
  return `$${parseFloat(price).toFixed(2)}`;
};
