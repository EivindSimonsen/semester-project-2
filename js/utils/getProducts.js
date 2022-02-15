export function getExistingProducts() {
    const product = localStorage.getItem("products");

    if (!product) {
      return [];
    } else {
      return JSON.parse(product);
    }
  }