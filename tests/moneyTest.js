import { formatCurrency } from "../scripts/utils/money.js";

function moneyTest(num, expected) {
  if (formatCurrency(num) === expected) {
    console.log("passed");
  } else {
    console.log("failed");
  }
}

console.log("test suite: FormatCurrency");

console.log("converts cents into dollars");
moneyTest(2022, "20.22");
console.log("works with 0");
moneyTest(2000, "20.00");
console.log("rounds up to the nearest cent");
moneyTest(2000.5, "20.01");
