import {
  cart,
  removeFromCart,
  saveToStorage,
  updateCartQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = "";

updateCartQuantity(".js-cart-quantity");

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
  <div class="cart-item-container 
              js-cart-item-container-${productId}">
    <div class="delivery-date">Delivery date: Wednesday, June 15</div>

    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />

      <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-price">${formatCurrency(matchingProduct.priceCents)}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span> </span>
          <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${productId}" data-product-id="${productId}">
          Update
          </span>
          <input class="js-update-input-${productId}" style='width: 8%; display: none'/>
          <span class="js-save-updated-quantity js-save-updated-quantity-${productId}" style="color: blue; display: none; cursor: pointer;" data-product-id="${productId}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${productId}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input
            id="${productId}"
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}"
          />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            id="${productId}"
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${productId}"
          />
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}"
          />
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
  const { productId } = link.dataset;

  link.addEventListener("click", () => {
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );

    container.remove();
    updateCartQuantity(".js-cart-quantity");
  });
});

document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;

    const input = document.querySelector(`.js-update-input-${productId}`);
    const saveBtn = document.querySelector(
      `.js-save-updated-quantity-${productId}`,
    );

    const cartItem = cart.find((item) => item.productId === productId);

    if (!cartItem) return;

    if (input.style.display === "none") {
      input.style.display = "inline-block";
      saveBtn.style.display = "inline-block";
      link.style.display = "none";
      input.value = cartItem.quantity;
      input.focus();
    }
  });
});

document.querySelectorAll(".js-save-updated-quantity").forEach((saveBtn) => {
  saveBtn.addEventListener("click", () => {
    const { productId } = saveBtn.dataset;

    const cartItem = cart.find((item) => item.productId === productId);
    if (!cartItem) return;

    updateQuantity(productId, saveBtn, cartItem);
  });
});

function updateQuantity(productId, saveBtn, cartItem) {
  const input = document.querySelector(`.js-update-input-${productId}`);
  const updateBtn = document.querySelector(
    `.js-update-quantity-link-${productId}`,
  );
  const newQuantity = Number(input.value);

  if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
    alert("Quantity must be a whole number greater than 0");
    input.focus();
    return;
  } else if (newQuantity > 20) {
    alert("The maximum quantity you can order per product is 20");
    input.focus();
    return;
  } else if (newQuantity > 0) {
    cartItem.quantity = newQuantity;
    saveToStorage();
    updateCartQuantity(".js-cart-quantity");
    input.style.display = "none";
    saveBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      newQuantity;
  }
}
