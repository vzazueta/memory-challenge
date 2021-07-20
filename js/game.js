let cards_folder_path = "./cards/all/";
let PNG = ".png";

let card_paths = [
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

import { setScoreZero, changeScore, finishGame } from "./score.js";
import { print, randnum } from "./misc.js";

let back_cover_path = "./cards/back_covers/Emerald" + PNG;
let start_button = document.getElementById("start-button");
let img_array = document.getElementsByClassName("card");
let previous_card, actual_card;
let wrong_pair;
let play_again;
let cards_flipped;
let used_images;
let existing_pairs;

start_button.addEventListener("click", start);

/* 
    Whenever the 'Start New Game' is clicked or
    the player finishes the game and chooses to
    play again, this function will reset every
    variable to default or zero.
*/
function start() {
    setScoreZero();
    cards_flipped = 0;
    used_images = [];
    existing_pairs = [];
    wrong_pair = false;
    play_again = false;

    for(let image of img_array){
        image.src = back_cover_path;
        image.addEventListener("click", flipCard);
    }

    shuffle();
}

/*
    Randomly chooses indexes from 0 to 15, verifies
    they do not exist already in a Pair object, and
    if so, inserts them to the existing_pairs array.
*/
function shuffle(){
    let key = 0;
    let length = 0;

    while(length < 8) {
        if(existsInPair(key)) {
            key++;
            continue;
        }
        
        let value = -1;

        while(value === -1 || 
            existsInPair(value)) 
            value = randnum(key+1, 15);
        
        createPair(key++, value);
        length++;
    }
}

/*
    Checks whether an index is already present in
    a Pair object or not.
*/
function existsInPair(index){
    for(let pair of existing_pairs) {
        let c1_id = parseInt(pair.card_one.id);
        let c2_id = parseInt(pair.card_two.id);

        if(c1_id === index || c2_id === index) return true;
    }

    return false;
}

/*
    Returns a random image from the card_paths
    given it is not in the used_images array
*/
function setRandomImage() {
    let image_id = randnum(0, 51);

    while(used_images.includes(image_id)) 
    image_id = randnum(0, 51);
    
    used_images.push(image_id);

    return card_paths[image_id];
}

/*
    Used mainly as an event listener for the imgs
    in img_array. Whenever a card is clicked, it
    looks for the image's assigned src (property
    of the Pair object that the img belongs to)
    and 'flips' the card (removes itself from the
    img to avoid it being clicked). 
    
    If two cards are flipped at the same time, the 
    function checkPairs() is activated. If 
    'wrong_pair' boolean is set to true, it reassigns 
    the previous_card and actual_card variables to 
    the back cover of the cards and adds flipCard()
    as an event listener.
*/
function flipCard(){ 
    let this_id = parseInt(this.id);
    let this_pair;

    if(wrong_pair) {
        previous_card.src = back_cover_path;
        actual_card.src = back_cover_path;
        actual_card.addEventListener("click", flipCard);
        previous_card.addEventListener("click", flipCard);
        wrong_pair = false;
    }

    for(let pair of existing_pairs) {
        if(!pair.found) {
            let c1_id = parseInt(pair.card_one.id);
            let c2_id = parseInt(pair.card_two.id);

            if(c1_id === this_id ||
                c2_id === this_id) {
                this_pair = pair;
                break;
            }
        }
    }

    this.src = this_pair.src;
    this.removeEventListener("click", flipCard);
    cards_flipped++;

    if(cards_flipped % 2 === 0) {
        actual_card = this;
        checkPairs();
    } else previous_card = this;
}

function checkPairs(){
    for(let pair of existing_pairs){
        if(!pair.found) {
            let c1 = pair.card_one;
            let c2 = pair.card_two;

            if(actual_card === c1 ||
                actual_card === c2) {
                
                if(previous_card === c1 ||
                    previous_card === c2) {
                    pair.found = true;
                    changeScore(true);
                } else {
                    cards_flipped-=2;
                    wrong_pair = true;
                    changeScore(false);
                }

                if(cards_flipped === 16) {
                    if(finishGame()) 
                        start();
                }
                
                return;
            }
        }
    }
}

function createPair(card_one_id, card_two_id){
    existing_pairs.push({
        card_one : img_array[card_one_id],
        card_two : img_array[card_two_id],
        src : setRandomImage(),
        found : false
    });
}