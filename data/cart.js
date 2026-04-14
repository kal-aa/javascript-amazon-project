export let cart = [];

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },

    {
      productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartFromStore() {
  const cart = localStorage.get("cart");
  return JSON.parse(cart);
}

export function addToCart(productId, itemQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += itemQuantity;
  } else {
    cart.push({
      productId,
      quantity: itemQuantity,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const isMatch = cart.some((item) => item.productId === productId);
  if (!isMatch) return;

  cart = cart.filter((item) => item.productId !== productId);

  saveToStorage();
}

export function updateCartQuantity(selector) {
  let cartQuantity = 0;

  for (const cartItem of cart) {
    cartQuantity += cartItem.quantity;
  }

  const element = document.querySelector(`${selector} `);
  if (!element) return;

  element.innerHTML = cartQuantity;

  cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
