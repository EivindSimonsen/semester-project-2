import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";

// Featured products at home page
export async function getFeatured() {

    const productsUrl = baseUrl + "/products";

    const container = document.querySelector(".featured");

    try {
        const response = await fetch(productsUrl);      

        const json = await response.json();       

        const product = json;

        container.innerHTML = "";

        for (let i = 0; i < product.length; i++) {

            if (product[i].featured === false) {
                continue;
            }

            const imgUrl = baseUrl + product[i].image.formats.large.url;

            container.innerHTML += 
            `
            <div class="featured__product">
              <h3>${product[i].title}</h3>
              <div class="featured__product--card">
                <img src="${imgUrl}" alt="${product[i].description}" />
                <a href="product-specific.html?id=${product[i].id}" class="cta">Read more</a>
              </div>
            </div>
            `
        }

        console.log(product);
    } catch (error) {
        displayMessage("alert-danger", error, ".featured");
    }
}

// All products at products page
export async function getProducts(product) {
    const productsUrl = baseUrl + "/products";

    const container = document.querySelector(".products");

    try {
        const response = await fetch(productsUrl);      

        const json = await response.json();       

        const product = json;

        container.innerHTML = "";

        for (let i = 0; i < product.length; i++) {

          const imgUrl = baseUrl + product[i].image.formats.large.url;

            container.innerHTML += 
            `
            <div class="products__container">
              <h3>${product[i].title}</h3>
              <div class="products__container--content">
                <img src="${imgUrl}" alt="${product[i].description}" />
                <div class="content-flex">
                  <p>${product[i].price}$</p>
                  <a href="product-specific.html?id=${product[i].id}" class="cta">Read more</a>
                </div>
              </div>
            </div>
            `
        }

        console.log(product);
    } catch (error) {
        displayMessage("alert-danger", error, ".products");
    }
}