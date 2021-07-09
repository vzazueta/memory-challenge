let n = 4;
let cards_folder = new Folder("../cards/all");
let start_button = document.getElementById("startButton");
let board_grid = document.getElementById("board");
let img_array = document.getElementsByTagName("img");
let same_cards_map;

cards_folder.close();

function randnum(max, min) {
    return Math.floor(Math.random() * ((max-1) - (min+1) + 1)) + min;
}

function start(){
    init();
}

function init(){
    shuffle();
}

function shuffle(){
    for(let i=0; i<(n^2)/2; i++){
        if(findInMap(i)) continue;

        let j = findSlot(n^2, i);

        same_cards_map[i] = j;
    }
}

function findSlot(max, min){
    let j = randnum(max, min);
    let isTaken = findInMap(j);

    while(isTaken){
        j = randnum(max, min);
        isTaken = findInMap(j);
    }

    return j;
}

function findInMap(value) {
    for(let v of same_cards_map.values()) {
        if (v === value) { 
          return true; 
        }
      }  
    
    return false;
}


function flipCard(){

}