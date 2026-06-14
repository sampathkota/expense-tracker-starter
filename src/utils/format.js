export const formatCurrency = (n) =>
  '$' + parseFloat(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
