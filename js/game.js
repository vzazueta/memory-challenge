import { card_paths, back_cover_path, start_button, img_array } from "./variables.js";
import { setScoreZero, changeScore, finishGame } from "./score.js";
import { print, randnum } from "./misc.js";

let previous_card, actual_card;
let wrong_pair;
let cards_flipped;
let used_images;
let existing_pairs;
let flipped_cards;

let selected_component = start_button;
let gameStarted = false;
let DEFAULT_BRIGHTNESS = 100;
let SELECTED_BRIGHTNESS = 70;

setComponentBrightness(SELECTED_BRIGHTNESS);
window.addEventListener("keydown", move);

/* 
    Whenever the 'Start New Game' is clicked or
    the player finishes the game and chooses to
    play again, this function will reset every
    variable to default or zero.
*/
function start() {
    reinstateSelectedComponent(img_array[0]);
    setScoreZero();
    cards_flipped = 0;
    used_images = [];
    existing_pairs = [];
    flipped_cards = [];
    gameStarted = true;
    wrong_pair = false;
    previous_card = null;
    actual_card = null;

    for(let image of img_array){
        image.src = back_cover_path;
    }

    shuffle();
}

/*
    Decides which component is
    selected and dimmed or enlightned
*/
function move(event) {
    // Do nothing if event already handled
    if (event.defaultPrevented) return;

    let id, line;
    let action = event.code;
    let componentIsStartButton = selected_component === start_button;
    
    if(componentIsStartButton){
        if(gameStarted){
            switch(action) {
                case "Enter":
                    start();
                    return;
                case "ArrowRight":
                    id = 12;
                    break;
                case "ArrowLeft":
                    id = 15;
                    break;
                case "ArrowUp":
                    id = 3;
                    break;
                case "ArrowDown":
                    id = 0;
                    break;
                default:
                    return; 
            }
        } else if(action === "Enter") {
            start();
            return;
        } else {
            alert("Press 'Enter' to start");
            return;  
        }
    } else {
        id = parseInt(selected_component.id);
        line = parseInt((id / 4) + 1);

        switch(action) {
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
                        if(id < 12) {
                            reinstateSelectedComponent(start_button);
                            return;
                        }

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
                        if(id > 15) {
                            reinstateSelectedComponent(start_button);
                            return;
                        }

                        break;
                }

                break;
            case "Enter":
                if(!isFound(id)) flipCard(selected_component);
                else alert("Already flipped!");
                break;
            default:
                return; 
        }
    }

    reinstateSelectedComponent(img_array[id]);
    
    event.preventDefault();
}

/*
    Randomly chooses indexes from 0 to 15, verifies
    they do not exist already in a Pair object, and
    if so, inserts them to the existing_pairs array.
*/
function shuffle(){
    let i = 0;
    let size = 0;

    while(size < 8) {
        if(existsInPair(i)) {
            i++;
            continue;
        }
        
        let j = -1;

        while(j === -1 || 
            existsInPair(j)) 
            j = randnum(i+1, 15);
        
        createPair(i++, j);
        size++;
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
    let image_id;

    while(used_images.includes(image_id = randnum(0, 51)));
    
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
    function checkPair() is activated. If 
    'wrong_pair' boolean is set to true, it reassigns 
    the previous_card and actual_card variables to 
    the back cover of the cards and adds flipCard()
    as an event listener.
*/
function flipCard(card) {
    let card_id = parseInt(card.id);
    let card_pair;

    checkIfWrongPair();

    card_pair = lookForCardPair(card_id);

    card.src = card_pair.src;
    cards_flipped++;

    if(cards_flipped % 2 === 0) {
        actual_card = card;
        flipped_cards.push(parseInt(card.id));
        checkPair(card_pair);
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
function checkPair(pair){
    if(!pair.found) {
        let c1 = pair.card_one;
        let c2 = pair.card_two;
        
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
            setComponentBrightness(DEFAULT_BRIGHTNESS);

            if(finishGame()){
                start();
            }
        }
    }
}

/*
    if wrong_pair boolean is set to 'true',
    it resets the previous and actual card
    values to null
*/
function checkIfWrongPair() {
    if(wrong_pair) {
        previous_card.src = back_cover_path;
        previous_card = null;

        actual_card.src = back_cover_path;
        actual_card = null;

        flipped_cards.pop();
        flipped_cards.pop();
        
        wrong_pair = false;
    }
}

/*
    
*/
function lookForCardPair(id) {
    for(let pair of existing_pairs) {
        if(!pair.found) {
            let c1_id = parseInt(pair.card_one.id);
            let c2_id = parseInt(pair.card_two.id);

            if(c1_id === id ||
                c2_id === id) {
                return pair;
            }
        }
    }

    return null;
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

function setComponentBrightness(percent){
    selected_component.style.filter = "brightness(" + percent + "%)";
}

function isFound(id){
    return flipped_cards.includes(id);
}

function reinstateSelectedComponent(component){
    setComponentBrightness(DEFAULT_BRIGHTNESS);
    selected_component = component;
    setComponentBrightness(SELECTED_BRIGHTNESS);
}