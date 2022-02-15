import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";

export async function getHeroImage() {
    const heroImgUrl = baseUrl + "/home";

    try {
        const response = await fetch(heroImgUrl);

        const json = await response.json();
        
        const getHeroImg = json;
        const baseHeroImg = getHeroImg.hero_banner.formats.large.url;
        const heroImg = baseUrl + baseHeroImg;

        document.querySelector(".header-image").style.cssText+=`background-image:url(${heroImg})`;

    } catch (error) {
        displayMessage("alert-danger", error, ".featured");
    }
}





