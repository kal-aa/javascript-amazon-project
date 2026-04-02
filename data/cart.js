export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`,
  ).value;
  const itemQuantity = Number(quantitySelector);

  if (matchingItem) {
    matchingItem.quantity += itemQuantity;
  } else {
    cart.push({
      productId,
      quantity: itemQuantity,
    });
  }
}
