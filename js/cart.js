import { getExistingProducts } from "./utils/getProducts.js";

const products = getExistingProducts();

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-total");

if (products.length === 0) {
    cartContainer.innerHTML = `<h2 class="section__name">You have no items in cart</h2>`;
}

let total = 0;

products.forEach(function(product) {

    total += parseFloat(product.price);
    total = Math.round(total * 100) / 100;
    console.log(total);
    
    cartContainer.innerHTML += 
    `
    <section class="cart-item">
        <div>
            <h2>${product.title}</h2>
            <p>${product.price}$</p>
        </div>
        <div class="products__container--content cart-item--img">
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

