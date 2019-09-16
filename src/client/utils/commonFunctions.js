export const totalBeforeTax = (totalCost, shippingCost) => {
  return totalCost + shippingCost;
};

export const taxCollected = (totalCost, shippingCost, taxRate) => {
  return ((totalCost + shippingCost) * (taxRate / 100)).toFixed(2);
};

export const orderTotal = (totalCost, shippingCost, taxRate) => {
  return (
    totalCost +
    shippingCost +
    (totalCost + shippingCost) * (taxRate / 100)
  ).toFixed(2);
};
