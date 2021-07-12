let cards_folder_path = "../cards/all";
let back_cover_path = "../cards/back_covers/Emerald.png";
let start_button = document.getElementById("startButton");
let img_array = document.getElementsByTagName("img");
let card_pairs_indeces;

const fs = require('fs');

fs.readdirSync(cards_folder_path).forEach(file => {
  
});

start_button.addEventListener("click", start);

cards_folder.close();

function start(){
    addEventsToImgs();
    shuffle();
}

function addEventsToImgs(){
    for(let i in img_array){
        i.addEventListener("click", flipCard);
}

function shuffle(){
    card_pairs_indeces = {};
    let i=0;

    while(card_pairs_indeces.length != 8){
        if(findInMap(i)) continue;
        
        let j = 0;

        while(findInMap(j)){
            j = randum(i+1, 16);
        }

        card_pairs_indeces[i] = j;

        i++;
    }
}

function findInMap(value){
    for(let [k, v] in card_pairs_indeces){
        if(k === value || v === value) return true;
    }

    return false;
}

function flipCard(){
    let image = this;

    if(image.src === back_cover_path){
        let id = parseInt(image.id);

        
        
    } else {
        image.src = back_cover_path;
    }
}

function randnum(min, max) {
    return Math.floor(Math.random() * ((max-1) - min + 1)) + min;
}