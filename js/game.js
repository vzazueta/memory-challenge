let cards_folder_path = "../cards/all/";
let back_cover_path = "../cards/back_covers/Emerald.png";
let start_button = document.getElementById("startButton");
let img_array = document.getElementsByTagName("img");
let card_pairs_indeces;

let card_paths_array = [
    cards_folder_path + "C2.png",
    cards_folder_path + "C3",
    cards_folder_path + "C4",
    cards_folder_path + "C5",
    cards_folder_path + "C6",
    cards_folder_path + "C7",
    cards_folder_path + "C8",
    cards_folder_path + "C9",
    cards_folder_path + "C10",
    cards_folder_path + "CA",
    cards_folder_path + "CJ",
    cards_folder_path + "CK",
    cards_folder_path + "CQ",

    cards_folder_path + "D2",
    cards_folder_path + "D3",
    cards_folder_path + "D4",
    cards_folder_path + "D5",
    cards_folder_path + "D6",
    cards_folder_path + "D7",
    cards_folder_path + "D8",
    cards_folder_path + "D9",
    cards_folder_path + "D10",
    cards_folder_path + "DA",
    cards_folder_path + "DJ",
    cards_folder_path + "DK",
    cards_folder_path + "DQ",

    cards_folder_path + "H2",
    cards_folder_path + "H3",
    cards_folder_path + "H4",
    cards_folder_path + "H5",
    cards_folder_path + "H6",
    cards_folder_path + "H7",
    cards_folder_path + "H8",
    cards_folder_path + "H9",
    cards_folder_path + "H10",
    cards_folder_path + "HA",
    cards_folder_path + "HJ",
    cards_folder_path + "HK",
    cards_folder_path + "HQ",

    cards_folder_path + "S2",
    cards_folder_path + "S3",
    cards_folder_path + "S4",
    cards_folder_path + "S5",
    cards_folder_path + "S6",
    cards_folder_path + "S7",
    cards_folder_path + "S8",
    cards_folder_path + "S9",
    cards_folder_path + "S10",
    cards_folder_path + "SA",
    cards_folder_path + "SJ",
    cards_folder_path + "SK",
    cards_folder_path + "SQ"
];

start_button.addEventListener("click", start);

for(let i=0; i<img_array.length; i++){
    img_array[i].addEventListener("click", flipCard);
}

function start(){
    shuffle();
}

function shuffle(){
    card_pairs_indeces = {};
    let i=0;

    while(card_pairs_indeces.length != 8){
        if(findInMap(i)) continue;
        
        let j = 0;

        while(findInMap(j) && j != 0){
            j = randnum(i+1, 16);
        }

        card_pairs_indeces[i++] = j;
    }
}

function findInMap(value){
    for(let [k, v] in card_pairs_indeces){
        if(k === value || v === value) return true;
    }

    return false;
}

function flipCard(){
    if(this.src === back_cover_path) {
        let id = parseInt(this.id);
        
        for(let [k, v] in card_pairs_indeces) {
            if(v === id) id = k;
        }

        this.src = card_paths_array[id];
    } else {
        this.src = back_cover_path;
    }
}

function randnum(min, max) {
    return Math.floor(Math.random() * ((max-1) - min + 1) + min);
}