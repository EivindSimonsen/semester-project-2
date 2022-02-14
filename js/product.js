import { getProducts } from "./utils/render-products.js";

function searchThing(product) {
    const search = document.querySelector(".search");

    search.onkeyup = function (event) {
        const searchValue = event.target.value.trim().toLowerCase();
        console.log(searchValue);

        const filteredArticles = product.filter(function (product) {
            if (product.title.toLowerCase().startsWith(searchValue)) {
                return true;
            }
        });
        getProducts(filteredArticles);
    }
}

searchThing();
getProducts();