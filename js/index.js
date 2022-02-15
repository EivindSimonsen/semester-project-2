import { baseUrl } from "./settings/api.js";
import { renderFeatured } from "./utils/render-products.js";
import { getHeroImage } from "./utils/hero-image.js";
import displayMessage from "./components/displayMessage.js";

export async function getFeatured() {

    const productsUrl = baseUrl + "/products";

    try {
        const response = await fetch(productsUrl);      

        const json = await response.json();       

        const product = json;

        renderFeatured(product);
        console.log(product);
    } catch (error) {
        displayMessage("alert-danger", error, ".featured");
    }
}

getHeroImage();
getFeatured();
