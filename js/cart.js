import { getExistingProducts } from "./utils/getProducts.js";
import createMenu from "./components/createMenu.js";

createMenu();

// gets the products in the local storage array
const products = getExistingProducts();

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-total");

// if the array is empty, display this message
if (products.length === 0) {
    cartContainer.innerHTML = `<h2 class="section__name">You have no items in cart</h2>`;
}

// variable which will add up all product prices
let total = 0;

// loop through all the products, and create html for them
products.forEach(function(product) {

    //adds the prices of all products
    total += parseFloat(product.price);
    // removes some decimals
    total = Math.round(total * 100) / 100;
    
    cartContainer.innerHTML += 
    `
    <section class="cart-item">
        <div onclick="location.href='../../product-specific.html?id=${product.id}';" style="cursor: pointer">
            <h2>${product.title}</h2>
            <p>${product.price}$</p>
        </div>
        <div class="products__container--content cart-item--img" onclick="location.href='../../product-specific.html?id=${product.id}';" style="cursor: pointer">
            <img src="${product.img}" alt="${product.description}" />
        </div>
        <button class="trash-can"><i class="fas fa-trash"></i></button>
    </section>
    <hr />
    `

    cartTotal.innerHTML = 
        `<hr class="hr-cart" />
            <div class="cart-total__price">
                <p>Total:</p>
                <p>${total}$</p>
            </div>
        <button class="cta cart-total--cta">Checkout</button>
        `;
        
});

/*FYI --- The only trash can that works is the first one! The others don't respond to the event*/
// removes the cart items from local storage, and refreshes the page
const trashCan = document.querySelector(".trash-can");
    trashCan.addEventListener("click", removeFromCart);

    function removeFromCart() {
        localStorage.removeItem("products");
        document.location.reload();
    }
// i could only manage to clear the whole array, and not single items



