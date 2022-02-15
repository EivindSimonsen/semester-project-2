import { renderProducts } from "./render-products.js";

export function searchProduct(product) {
    const search = document.querySelector(".search");
    console.log(search);

    search.onkeyup = function (event) {
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredProducts = product.filter(function (product) {
            if (product.title.toLowerCase().includes(searchValue)) {
                return true;
            }
        });
        renderProducts(filteredProducts);
        console.log(filteredProducts);
    };
}