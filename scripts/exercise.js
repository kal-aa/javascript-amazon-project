async function getProducts(params) {
  const response = await fetch("https://supersimplebackend.dev/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}

/* 
    getProducts()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
*/

async function loadPage() {
  try {
    throw new Error("Wow");
    const products = await getProducts();
    console.log(products);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

// loadPage();

function loadCart(callback) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      resolve(JSON.parse(xhr.response));
    });

    xhr.addEventListener("error", () => {
      reject("Network error");
    });

    xhr.open("GET", "https://supersimplebackend.dev/cart");
    xhr.send();
  });
}

/*
// promise example
const getSomething = (num) => {
  return new Promise((resolve, reject) => {
    if (num) resolve("some data");
    else reject("some error");
  });
};

getSomething()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
*/
