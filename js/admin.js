import { getUsername } from "./utils/storage.js";
import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";

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

    if (productNameValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("alert-warning", "Fill all fields", ".form-success");
    }

    const imgFileName = "/uploads/" + imageValue;

    addProductItem(productNameValue, priceValue, descriptionValue, imgFileName);
}

async function addProductItem(name, price, description, image) {
    const url = baseUrl + "/products";

    const data = JSON.stringify({ title: name, price: price, description: description, image_url: image});

    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("alert-success", "Product created", ".form-success");
            addProduct.reset();
        }

        if(json.error) {
            displayMessage("alert-danger", json.message, ".form-success");
        }

        console.log(json);
    } catch (error) {
        displayMessage("alert-danger", error, ".form-success");
    }

}