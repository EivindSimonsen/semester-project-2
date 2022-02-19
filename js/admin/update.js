import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "../components/displayMessage.js";
import createMenu from "../components/createMenu.js";
import deleteButton from "./delete.js";

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const featured = document.querySelector("#featured");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");


const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
    document.location.href = "admin.html";
}

const productUrl = baseUrl + "/products/" + id;

async function updateProductDetail() {
    
    try {
        const response = await fetch(productUrl);
        const details = await response.json();
        console.log(details)

        title.value = details.title;
        price.value = details.price;
        featured.options[featured.selectedIndex].value = details.featured;
        description.value = details.description;
        idInput.value = details.id;

        deleteButton(details.id);

        
    } catch (error) {
        displayMessage("alert-danger", error, "form");
    } 
}

updateProductDetail();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    const productNameValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const featuredValue = featured.options[featured.selectedIndex].value;
    const idValue = idInput.value;

    if (productNameValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("alert-warning", "Fill all fields", "form");
    }

    if (featuredValue === "True");

    updateRequest(productNameValue, priceValue, descriptionValue, featuredValue, idValue);
}

async function updateRequest(title, price, description, featured, image) {

    const url = baseUrl + "/products/" + id;

    const data = JSON.stringify({ title: title, price: price, description: description, featured: featured, image_url: image, image: 2 });

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if(json.updated_at) {
            displayMessage("alert-success", "Product updated", ".form-success");
        }

        if (json.error) {
            displayMessage("alert-danger", json.message, ".form-success");
        }

    } catch (error) {
        displayMessage("alert-danger", error, ".form-success");
    } 

}
