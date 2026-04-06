import searchByTags from "./modules/search.js";

const searchbar = document.getElementById("subproject-search");
const keywords = {
    "allure_dark_gui": ["gui","ui","interface","dark","theme","night","obsidian","black"],
    "allure_emoji_pack": ["emojis","emoticon","font","custom"],
    "allure_3d_plants":["three","3d","plants","plant","flowers","models"],
    "allure_fresh_animations":["fa","fresh","animations","patch","compatibility","fix"]
}
const omit = ["allure","pack","rp","tp","resourcepack","resource","texture","texturepack","the","an"]

const cardsContainer = document.getElementById("cards-container");
const cards = Array.from(cardsContainer.children);
cards.forEach( card => {
    console.log(card.id)
});

searchbar.addEventListener("input", (e) => {
    let results = searchByTags(keywords, searchbar.value, omit);
    cardsContainer.innerHTML="";
    cards.forEach(card => {
        if(results.includes(card.id)){
            cardsContainer.appendChild(card);
        }
    });
    if(cardsContainer.innerHTML==""){
        cardsContainer.innerHTML="Sorry, there are no results matching your query...";
    }
});