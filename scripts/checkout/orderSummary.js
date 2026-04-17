import {
  cart,
  removeFromCart,
  saveToStorage,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from ".././utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import renderPamentSummary from "./paymentSummary.js";
deliveryOptions;

function renderOrderSummary() {
  let cartSummaryHTML = "";

  updateCartQuantity(".js-cart-quantity");

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dayFormat = deliveryDate.format("dddd, MMMM, D");

    cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container js-cart-item-container-${productId}">
    <div class="delivery-date js-delivery-date">Delivery date: ${dayFormat}</div>

    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />

      <div class="cart-item-details">
        <div class="product-name js-product-name-${productId}">${matchingProduct.name}</div>
        <div class="product-price">$${matchingProduct.getPrice()}</div>
        <div class="product-quantity js-product-quantity-${productId}">
          <span> Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span> </span>
          <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${productId}" data-product-id="${productId}">
          Update
          </span>
          <input class="js-update-input-${productId}" style='width: 8%; display: none'/>
          <span class="js-save-updated-quantity js-save-updated-quantity-${productId}" style="color: blue; display: none; cursor: pointer;" data-product-id="${productId}">Save</span>
          <span class="delete-quantity-link js-delete-link-${productId} link-primary js-delete-quantity-link" data-product-id="${productId}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(productId, cartItem)}
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

      updateCartQuantity(".js-cart-quantity");

      renderOrderSummary();
      renderPamentSummary();
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
      renderPamentSummary();
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

  function deliveryOptionsHTML(productId, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      let currentDate = dayjs();
      let remainingDays = deliveryOption.deliveryDays;

      while (remainingDays > 0) {
        currentDate = currentDate.add(1, "day");

        const dayOfWeek = currentDate.day();

        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          // 0 Sunday, 6 Saturday
          remainingDays--;
        }
      }

      const dateString = currentDate.format("dddd, MMMM, D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `  
          <div class="delivery-option js-delivery-option"
          data-product-id="${productId}"
          data-delivery-option-id="${deliveryOption.id}">
            <input
            ${isChecked ? "checked" : ""}
              id="${productId}"
              type="radio"
              class="delivery-option-input js-delivery-option-input-${productId}-${deliveryOption.id}"
              name="delivery-option-${productId}"
            />
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price js-delivery-option-price-${productId}-${deliveryOption.id}">${priceString} Shipping</div>
            </div>
          </div>
       `;
    });

    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { deliveryOptionId, productId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPamentSummary();
    });
  });
}

export default renderOrderSummary;
