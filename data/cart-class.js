class Cart {
  constructor(localStorageKey = "cart-oop") {
    this.localStorageKey = localStorageKey;
    this.cartItems = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  getCartFromStore() {
    const cart = localStorage.getItem(this.localStorageKey);
    return JSON.parse(cart);
  }

  addToCart(productId, itemQuantity = 1) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += itemQuantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: itemQuantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const isMatch = this.cartItems.some((item) => item.productId === productId);
    if (!isMatch) return;

    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId,
    );

    this.saveToStorage();
  }

  updateCartQuantity(selector) {
    let cartQuantity = 0;

    for (const cartItem of this.cartItems) {
      cartQuantity += cartItem.quantity;
    }

    const element = document.querySelector(`${selector} `);
    if (!element) return;

    element.innerHTML = cartQuantity;

    cartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart();
const businessCart = new Cart("cart-business");

businessCart.addToCart("3ebe75dc-64d2-4137-8860-1f5a963e534b", 5);
console.log("Cart-oop:", cart);
console.log("Business:", businessCart);

console.log(businessCart instanceof Cart);
