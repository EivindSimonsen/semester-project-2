import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;

async function productSpecific() {
    const response = await fetch(productUrl);

    try {
      
        const detailsContainer = document.querySelector(".products-specific");

        const json = await response.json();       

        const product = json;

        console.log(product);

        document.title = product.title;

        const imgUrl = baseUrl + product.image.formats.large.url;

        detailsContainer.innerHTML = 
        `
        <div>
            <h1>${product.title}</h1>
            <p>${product.description}</p>
          </div>
          <div>
            <div class="products__container--content">
              <img src="${imgUrl}" alt="${product.description}" />
              <div class="content-flex">
                <p>${product.price}$</p>
                <a href="#" class="cta">Add to cart</a>
              </div>
            </div>
          </div>
        `
    } catch (error) {
        displayMessage("alert-danger", error, ".products-specific");
    }
    
        
}

productSpecific();