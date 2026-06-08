import { updateCartQuantity } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateCartQuantity(".js-cart-quantity");

let ordersHtml = "";

loadProductsFetch().then(() => {
  orders.forEach((order) => {
    let totalPriceCents = 0;

    order.cart.forEach((c) => {
      const matchingProduct = products.find((p) => p.id === c.productId);

      if (!matchingProduct) return;

      totalPriceCents += matchingProduct.priceCents * c.quantity;
    });

    const productsHtml = generateOrderProductsHTML(order.cart, products);

    ordersHtml += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${new Date(order.orderId).toDateString()}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(totalPriceCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${new Date(order.orderId).toISOString()}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsHtml}
          </div>
        </div>
  `;
  });

  document.querySelector(".js-orders-grid").innerHTML =
    ordersHtml || "No Orders Yet";
});

function generateOrderProductsHTML(cart, products) {
  let html = "";

  cart.forEach((c) => {
    const product = products.find((p) => p.id === c.productId);

    if (!product) return;

    html += `
      <div class="product-image-container">
        <img src="${product.image}" />
      </div>

      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-quantity">Quantity: ${c.quantity}</div>
        <div class="product-price">$${formatCurrency(product.priceCents)}</div>
      </div>

      <div class="product-actions">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </div>
    `;
  });

  return html;
}
