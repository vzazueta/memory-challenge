import { card_paths, back_cover_path, start_button, img_array } from "./variables.js";
import { setScoreZero, changeScore, finishGame } from "./score.js";
import { print, randnum } from "./misc.js";

let previous_card, actual_card;
let wrong_pair;
let cards_flipped;
let used_images;
let existing_pairs;
let flipped_cards;
let selected_card;

start_button.addEventListener("click", start);

window.addEventListener("keydown", move);

/* 
    Whenever the 'Start New Game' is clicked or
    the player finishes the game and chooses to
    play again, this function will reset every
    variable to default or zero.
*/
function start() {
    setScoreZero();
    if(selected_card) setCardBrightness(100);
    selected_card = img_array[0];
    setCardBrightness(115);
    cards_flipped = 0;
    used_images = [];
    existing_pairs = [];
    flipped_cards = [];
    wrong_pair = false;
    previous_card = null;
    actual_card = null;

    for(let image of img_array){
        image.src = back_cover_path;
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
function flipCard(card){ 
    let card_id = parseInt(card.id);
    let card_pair;

    if(wrong_pair) {
        previous_card.src = back_cover_path;
        previous_card = null;

        actual_card.src = back_cover_path;
        actual_card = null;

        flipped_cards.pop();
        flipped_cards.pop();
        
        wrong_pair = false;
    }

    for(let pair of existing_pairs) {
        if(!pair.found) {
            let c1_id = parseInt(pair.card_one.id);
            let c2_id = parseInt(pair.card_two.id);

            if(c1_id === card_id ||
                c2_id === card_id) {
                card_pair = pair;
                break;
            }
        }
    }

    card.src = card_pair.src;
    //this.removeEventListener("click", flipCard);
    cards_flipped++;

    if(cards_flipped % 2 === 0) {
        actual_card = card;
        flipped_cards.push(parseInt(card.id));
        checkPairs();
    } else {
        previous_card = card;
        flipped_cards.push(parseInt(card.id));
    }
}

/*
    If previous_card and actual_card are in the same
    Pair object, it is considered a found pair.
    Otherwise, wrong_pair boolean is set to 'true'.
    In any case, the score is updated for good or ill.
    When the 16 cards are flipped, the finishGame()
    function is activated.
*/
function checkPairs(){
    for(let pair of existing_pairs) {
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
                    cards_flipped -= 2;
                    wrong_pair = true;
                    changeScore(false);
                }

                if(cards_flipped === 16) {
                    setCardBrightness(100);

                    if(finishGame()){
                        start();
                    }
                }
                
                return;
            }
        }
    }
}

/*
    Creates and inserts a Pair object to its
    respective array.
*/
function createPair(card_one_id, card_two_id){
    existing_pairs.push({
        card_one : img_array[card_one_id],
        card_two : img_array[card_two_id],
        src : setRandomImage(),
        found : false
    });
}

function move(event) {
    if (event.defaultPrevented)
      return; // Do nothing if event already handled

    setCardBrightness(100);

    let direction = event.code;
    let id = parseInt(selected_card.id);
    let line = parseInt((id / 4) + 1);

    switch(direction) {
        case "ArrowDown":
            id += 4;
            if(id > 15) id -= 16;

            break;
        case "ArrowUp":
            id -= 4;
            if(id < 0) id += 16;

            break;
        case "ArrowLeft":
            switch(line) {
                case 1:
                    id--;
                    if(id < 0) id += 4;

                    break;
                case 2:
                    id--;
                    if(id < 4) id += 4;

                    break;
                case 3:
                    id--;
                    if(id < 8) id += 4;

                    break;
                case 4:
                    id--;
                    if(id < 12) id += 4;

                    break;
            }

            break;
        case "ArrowRight":
            switch(line) {
                case 1:
                    id++;
                    if(id > 3) id -= 4;

                    break;
                case 2:
                    id++;
                    if(id > 7) id -= 4;

                    break;
                case 3:
                    id++;
                    if(id > 11) id -= 4;

                    break;
                case 4:
                    id++;
                    if(id > 15) id -= 4;

                    break;
            }

            break;
        case "Enter":
            if(!isFound(id)) flipCard(selected_card);
            else alert("Already flipped!");
        break;
    }

    //while(isFound(id)) {
    //    id = findBestCard(id, direction);
    //}

    selected_card = img_array[id];

    if(!isFound(id)) setCardBrightness(115);
    else setCardBrightness(85);
    
    event.preventDefault();
}

function setCardBrightness(percent){
    selected_card.style.filter = "brightness(" + percent + "%)";
}

function isFound(id){
    return flipped_cards.includes(id);
}