import { loadCart } from "../data/cart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderPamentSummary from "./checkout/paymentSummary.js";
// import "../data/cart-class.js"
// import "../data/backend-practice.js";

Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve("value2");
    });
  }),
]).then((values) => {
  renderOrderSummary();
  renderPamentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });
})
  .then((value) => {
    console.log(value);

    return new Promise((resolve) => {
      loadCart(() => {
        resolve("value2");
      });
    });
  })
  .then((value) => {
    console.log(value);

    renderOrderSummary();
    renderPamentSummary();
  });
  */

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPamentSummary();
  });
});
*/
