import { getToken } from "../utils/storage.js";
import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";

export async function addProductItem(name, price, description, featured, image) {

    const addProduct = document.querySelector(".add-product");
    const url = baseUrl + "/products";

    // This will upload the right IMAGE_URL to the API, however, i am using the image.formats.large.url for the products, and i can't seem to target that.
    // So the last body data takes the image of ID 1, and that will be the product image.
    const data = JSON.stringify({ title: name, price: price, description: description, featured: featured, image_url: image, image: 1 });

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