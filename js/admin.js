import { getUsername } from "./utils/storage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const helloUser = document.querySelector(".center-heading");
const username = getUsername();

helloUser.innerHTML = `Hello ${username}!`;
