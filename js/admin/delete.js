import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "../components/displayMessage.js";

export default function deleteButton(id) {

    const container = document.querySelector(".delete-product");

    container.innerHTML = 
    `
    <h2 class="danger-zone">Danger zone</h2>
    <button type="button" class="cta" id="delete">Delete</button>
    <div class="form-success">Item deleted</div>
    `

    const button = document.querySelector("#delete");

    button.onclick = async function() {

        const doDelete = confirm("Are you sure? Product will be deleted from the website!");

        if (doDelete) {
            const url = baseUrl + "/products/" + id;

            const token = getToken();
    
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            try {
                const response = await fetch(url, options);
                const json = await response.json();
                console.log(json);

                location.href = "admin.html";
    
    
            } catch (error) {
                displayMessage("alert-danger", error, "form");
            } 
        }
    };
}