// client/src/utils/formatCurrency.js
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPrice = (price) => {
  if (price === null || price === undefined) return '₹0';
  const inrPrice = parseFloat(price) * 83;
  return `₹${Math.round(inrPrice).toLocaleString('en-IN')}`;
};