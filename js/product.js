import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./utils/render-products.js";
import displayMessage from "./components/displayMessage.js";
import { searchProduct } from "./utils/filter.js";

async function getProducts() {
    const productsUrl = baseUrl + "/products";

    try {
        const response = await fetch(productsUrl);      

        const json = await response.json();       

        const product = json;

        renderProducts(product);
        searchProduct(product);

        console.log(product);
    } catch (error) {
        displayMessage("alert-danger", error, ".products");
    }
}

getProducts();