import { getUsername } from "../utils/storage.js";

export default function createMenu() {

    const { pathname } = document.location;

    const username = getUsername();
    
    let authLink = `<a class="nav-link" id="${pathname === "/login.html" ? "active" : ""}" href="login.html">Login</a>`;

    if (username) {
        authLink = `<a class="nav-link" id="${pathname === "/admin.html" ? "active" : ""}" href="admin.html">${username}</a>
        <a class="nav-link log-out" id="${pathname === "/login.html" ? "active" : ""}" href="login.html">Logout</a>`;
    }

    if (!username) {
      authLink;
  }

    const navContainer = document.querySelector("header");

    navContainer.innerHTML = 
    `
    <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <a class="navbar-brand" href="index.html"><img src="img/logo.png" alt="Running mans logo, pictured by a sneaker" /></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link" id="${pathname === "/product.html" ? "active" : ""}" href="product.html">Products</a>
                <a class="nav-link" id="${pathname === "/cart.html" ? "active" : ""}" href="cart.html">Cart</a>
                ${authLink}
              </div>
            </div>
          </div>
        </nav>
        `
};




