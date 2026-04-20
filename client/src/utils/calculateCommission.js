// client/src/utils/calculateCommission.js
export const calculateOrderPricing = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal >= 75 ? 0 : 5.99;
  const platformFee = parseFloat((subtotal * 0.05).toFixed(2));
  const vendorPayout = parseFloat((subtotal * 0.95).toFixed(2));
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = parseFloat((subtotal + shippingCost + tax).toFixed(2));

  return {
    subtotal,
    shippingCost,
    platformFee,
    vendorPayout,
    tax,
    total,
  };
};

export const calculateCommission = (amount) => {
  return {
    platformFee: parseFloat((amount * 0.05).toFixed(2)),
    vendorPayout: parseFloat((amount * 0.95).toFixed(2)),
  };
};
