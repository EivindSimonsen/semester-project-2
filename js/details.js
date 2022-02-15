import { baseUrl } from "./settings/api.js";
import { getExistingProducts } from "./utils/getProducts.js";
import displayMessage from "./components/displayMessage.js";

// locating the querystring in the url
const queryString = document.location.search;

// finding the parameters, in this case the ID
const params = new URLSearchParams(queryString);

// gets the id from the parameter
const id = params.get("id");

// if there is no id in url, return to index page
if (!id) {
    document.location.href = "/";
}

// creating a variable with the api url with added "products" and parameter id
const productUrl = baseUrl + "/products/" + id;

// finds products in localstorage array
const findProduct = getExistingProducts();

async function productSpecific() {

    try {
      
        const detailsContainer = document.querySelector(".products-specific");

        const response = await fetch(productUrl);

        const json = await response.json();       

        const product = json;

        console.log(product);

        // changes the document title to be whatever the product name is
        document.title = product.title;

        // Images use a different url that the base productUrl variable
        const imgUrl = baseUrl + product.image.formats.large.url;

        let cssClass = "cta";
        let ctaText = "Add to cart"

        // checks if product exists in the array, if it does the cta button will have different styling
        const doesObjectExist = findProduct.find(function(products) {
          return parseInt(products.id) === product.id;
        });

        if (doesObjectExist) {
          cssClass = "cta-added";
          ctaText = "In cart";
        }

        // the content on the page
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
                <button class="${cssClass} cta-change" data-id="${product.id}" data-title="${product.title}" data-img="${imgUrl}" data-price="${product.price}">${ctaText}</button>
              </div>
            </div>
          </div>
        `

    } catch (error) {
        displayMessage("alert-danger", "Products failed to load from server, come back later", ".products-specific");
    }

    // selecting the button in the content above
    const buttonCart = document.querySelector(".cta");
        
    buttonCart.addEventListener("click", handleClick);

    function handleClick() {
      const id = this.dataset.id;
      const title = this.dataset.title;
      const img = this.dataset.img;
      const price = this.dataset.price;

      console.log(id);
      console.log(title);
      console.log(img);
      console.log(price);

      const currentProducts = getExistingProducts();

      const productExists = currentProducts.find(function(product) {
        return product.id === id;
      });

      if (!productExists) {
        const finalProduct = { id: id, title: title, img: img, price: price };

        currentProducts.push(finalProduct);

        saveProduct(currentProducts);
      } else {
        const newProducts = currentProducts.filter(product => product.id !== id);
        saveProduct(newProducts);
      }
      
      buttonCart.innerHTML = `In cart`
      buttonCart.style.backgroundColor = "lightgreen";
      buttonCart.style.color = "black";
    }

    function saveProduct(product) {
      localStorage.setItem("products", JSON.stringify(product));
    }
}

productSpecific();