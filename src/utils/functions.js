export const cartQuantity = (items) => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const subTotal = (items) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

export const totalCart = (item) => {
  return item.reduce((sum, item) => sum + item.subTotal, 0);
};

export const phoneNumber = (number) => {
  const phoneNum = number.toString();
  return `${phoneNum.slice(0, 2)}-${phoneNum.slice(2, 6)}-${phoneNum.slice(6)}`;
};

export const discount = (price, percentage) => {
  return price * (1 - percentage / 100);
};
