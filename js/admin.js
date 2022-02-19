import { getUsername } from "./utils/storage.js";
import createMenu from "./components/createMenu.js";
import displayMessage from "./components/displayMessage.js";
import { addProductItem } from "./admin/add.js"
import { updateProduct } from "./admin/renderUpdateProducts.js";

createMenu();

const helloUser = document.querySelector(".center-heading");
const username = getUsername();

helloUser.innerHTML = `Hello ${username}!`;


// add product section

const addProduct = document.querySelector(".add-product");
const productName = document.querySelector("#productName");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const featured = document.querySelector("#featured");
const description = document.querySelector("#description");
const message = document.querySelector(".form-success");

addProduct.addEventListener("submit", add);

function add(event) {
    event.preventDefault();

    message.innerHTML = "";

    const productNameValue = productName.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageValue = image.files[0].name;
    const featuredValue = featured.options[featured.selectedIndex].value;

    if (productNameValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageValue === null || undefined) {
        return displayMessage("alert-warning", "Fill all fields", ".form-success");
    }

    if (featuredValue === "True");

    const imgFileName = "/uploads/" + imageValue;

    addProductItem(productNameValue, priceValue, descriptionValue, featuredValue, imgFileName);
}

// Update product section

updateProduct();
