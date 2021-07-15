let cards_folder_path = "./cards/all/";
let PNG = ".png";

let card_paths_array = [
    cards_folder_path + "C2" + PNG,
    cards_folder_path + "C3" + PNG,
    cards_folder_path + "C4" + PNG,
    cards_folder_path + "C5" + PNG,
    cards_folder_path + "C6" + PNG,
    cards_folder_path + "C7" + PNG,
    cards_folder_path + "C8" + PNG,
    cards_folder_path + "C9" + PNG,
    cards_folder_path + "C10" + PNG,
    cards_folder_path + "CA" + PNG,
    cards_folder_path + "CJ" + PNG,
    cards_folder_path + "CK" + PNG,
    cards_folder_path + "CQ" + PNG,

    cards_folder_path + "D2" + PNG,
    cards_folder_path + "D3" + PNG,
    cards_folder_path + "D4" + PNG,
    cards_folder_path + "D5" + PNG,
    cards_folder_path + "D6" + PNG,
    cards_folder_path + "D7" + PNG,
    cards_folder_path + "D8" + PNG,
    cards_folder_path + "D9" + PNG,
    cards_folder_path + "D10" + PNG,
    cards_folder_path + "DA" + PNG,
    cards_folder_path + "DJ" + PNG,
    cards_folder_path + "DK" + PNG,
    cards_folder_path + "DQ" + PNG,

    cards_folder_path + "H2" + PNG,
    cards_folder_path + "H3" + PNG,
    cards_folder_path + "H4" + PNG,
    cards_folder_path + "H5" + PNG,
    cards_folder_path + "H6" + PNG,
    cards_folder_path + "H7" + PNG,
    cards_folder_path + "H8" + PNG,
    cards_folder_path + "H9" + PNG,
    cards_folder_path + "H10" + PNG,
    cards_folder_path + "HA" + PNG,
    cards_folder_path + "HJ" + PNG,
    cards_folder_path + "HK" + PNG,
    cards_folder_path + "HQ" + PNG,

    cards_folder_path + "S2" + PNG,
    cards_folder_path + "S3" + PNG,
    cards_folder_path + "S4" + PNG,
    cards_folder_path + "S5" + PNG,
    cards_folder_path + "S6" + PNG,
    cards_folder_path + "S7" + PNG,
    cards_folder_path + "S8" + PNG,
    cards_folder_path + "S9" + PNG,
    cards_folder_path + "S10" + PNG,
    cards_folder_path + "SA" + PNG,
    cards_folder_path + "SJ" + PNG,
    cards_folder_path + "SK" + PNG,
    cards_folder_path + "SQ" + PNG
];

import { setScoreZero, changeScore } from "./score.js";
import { print, randnum } from "./misc.js";

let back_cover_path = "./cards/back_covers/Emerald" + PNG;
let start_button = document.getElementById("start-button");
let img_array = document.getElementsByClassName("card");
let previous_card, actual_card;
let wrong_pair = false;
let cards_flipped;
let card_pairs_indeces;
let keys_and_images;
let used_images;
let existing_pairs;

start_button.addEventListener("click", start);

function start(){
    this.innerHTML = "Restart Game";
    setScoreZero();
    cards_flipped = 0;
    card_pairs_indeces = {};
    keys_and_images = {};
    used_images = [];
    existing_pairs = [];

    for(let image of img_array){
        image.src = back_cover_path;
        image.addEventListener("click", flipCard);
    }

    shuffle();
}

function shuffle(){
    let key = 0;
    let length = 0;

    while(length < 8){
        if(findInMap(key)) {
            key++;
            continue;
        }
        
        let value = -1;

        while(value === -1 || findInMap(value)) value = randnum(key+1, 15);
        
        setRandomImage(key);
        card_pairs_indeces[key++] = value;
        length++;
    }

    createPairs();
}

function findInMap(index){
    let entries = Object.entries(card_pairs_indeces);
    
    for(let [k, v] of entries) {
        if(k === index || v === index) return true;
    }

    return false;
}

function setRandomImage(key){
    let image_id = randnum(0, 51);

    while(used_images.includes(image_id)){
        image_id = randnum(0, 51);
    }
    
    used_images.push(image_id);
    keys_and_images[key] = card_paths_array[image_id];
}

function flipCard(){ 
    //let back_cover = back_cover_path.replace('.', '');
    let card_id = parseInt(this.id);
    let entries = Object.entries(card_pairs_indeces);
    let png_id = card_id;

    if(wrong_pair){
        previous_card.src = back_cover_path;
        actual_card.src = back_cover_path;
        actual_card.addEventListener("click", flipCard);
        previous_card.addEventListener("click", flipCard);
        wrong_pair = false;
    }

    for(let [k, v] of entries) {
        if(v === png_id) {
            png_id = k;
            break;
        } else if(k === png_id) break;
    }
        
    changeCardState(card_id, true);
    this.src = keys_and_images[png_id];
    this.removeEventListener("click", flipCard);
    cards_flipped++;
    

    if(cards_flipped % 2 === 0) checkPairs(card_id);
    else previous_card = this;
}

function checkPairs(id){
    print("Checking pairs");
    for(let pair of existing_pairs){
        if(!pair.found) {
            let c1 = pair.card_one;
            let c2 = pair.card_two;

            if(c1[0] === id) {
                print("matched id c1");

                if(c1[1] === previous_card) {
                    print("Found pair with c1");

                    pair.found = true;
                    changeScore(true);
                } else {
                    print("Did not find pair with c1");
                    
                    wrong_pair = true;
                    c1[2] = false;
                    cards_flipped-=2;
                    changeScore(false);
                }
                print("cards flipped: "+cards_flipped);

                break;
            } else if(c2[0] === id) {
                print("matched id c2");
                actual_card = c2[1];

                if(c1[1] === previous_card) {
                    print("Found pair with c2");
                    pair.found = true;
                    changeScore(true);
                } else {
                    print("Did not find pair with c2");
                    
                    wrong_pair = true;
                    c2[2] = false;
                    cards_flipped-=2;
                    changeScore(false);
                }
                
                print("cards flipped: "+cards_flipped);
                
                break;
            }
        }
    }
}

function createPairs(){
    let k_and_v = Object.entries(card_pairs_indeces);

    for(let [k, v] of k_and_v) {
        let pair = {
            card_one : [k, img_array[k], false],
            card_two : [v, img_array[v], false],
            src : keys_and_images[k],
            found : false
        }

        existing_pairs.push(pair);
    }
}

function changeCardState(id, new_state){
    for(let pair of existing_pairs){
        if(pair.card_one[0] === id) pair.card_one[2] = new_state;
        else if(pair.card_two[0] === id) pair.card_two[2] = new_state;
    }
}