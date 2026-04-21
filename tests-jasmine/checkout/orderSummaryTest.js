import { cart, loadFromStorage } from "../../../data/cart.js";
import renderOrderSummary from "../../../scripts/checkout/orderSummary.js";
import { loadProducts } from "../../data/products.js";
import renderPamentSummary from "../../scripts/checkout/paymentSummary.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";
describe("test suite: renderOrderSummary", () => {
  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },

        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    spyOn(localStorage, "setItem");
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2,
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText,
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText,
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText,
    ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(document.querySelector(`.product-price`).innerText).toContain("$");
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(cart.length).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`),
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`),
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText,
    ).toEqual("2 Slot Toaster - Black");
    expect(document.querySelector(`.product-price`).innerText).toContain("$");
  });
});

describe("test suite: updating delivery option", () => {
  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div> 
      <div class="js-payment-summary"></div>
        `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },

        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    spyOn(localStorage, "setItem");
    loadFromStorage();

    renderPamentSummary();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("changes the delivery option", () => {
    const currentRadio = document.querySelector(
      `.js-delivery-option-input-${productId1}-3`,
    );

    expect(currentRadio.checked).toEqual(false);

    currentRadio.click();

    expect(currentRadio.checked).toEqual(true);
    expect(
      document.querySelector(`.js-delivery-option-price-${productId1}-3`)
        .innerHTML,
    ).toEqual("$9.99 - Shipping");
  });
});
