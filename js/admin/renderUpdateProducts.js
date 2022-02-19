import { baseUrl } from "../settings/api.js";

export async function updateProduct() {

    /* const productUrl = baseUrl + "/products/" + id; */
    const productUrl = baseUrl + "/products";
    const productContainer = document.querySelector(".update-product");

    const response = await fetch(productUrl);

    const json = await response.json();       

    const product = json;
    
    console.log(product);

    try {
        for (let i = 0; i < product.length; i++) {

            const imgUrl = baseUrl + product[i].image.formats.large.url;
    
            productContainer.innerHTML += 
            `
            <div class="update-product__content">
                <h3>${product[i].title}<h3>
                <img src="${imgUrl}" alt="${product[i].description}" />
                <p>${product[i].price}$</p>
                <div>
                    <a href="update.html?id=${product[i].id}" class="cta">Update</a>
                </div>
            </div>
            `
          };
    } catch (error) {
        displayMessage("alert-danger", "Products failed to load from server, come back later", ".update-product");
    }
}



