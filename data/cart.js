export let cart = [];

loadFromStorage();

export function emptyCart() {
  cart = [];
  localStorage.removeItem("cart");
}

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartFromStore() {
  const cart = localStorage.getItem("cart");
  return JSON.parse(cart);
}

export function addToCart(productId, itemQuantity = 1) {
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

export function loadCart(renderProductsGrid) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);

    renderProductsGrid();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
