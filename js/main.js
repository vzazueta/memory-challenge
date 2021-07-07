let number_of_tiles = 4;
let tiles_number_input;
let generate_board_button;
let board_grid;

tiles_number_input = document.getElementById("tilesAmount");
tiles_number_input.value = number_of_tiles;

generate_board_button = document.getElementById("generateBoard");

board_grid = document.getElementsByClassName("grid");

generate_board_button.onclick = function generateBoard(){
    number_of_tiles = tiles_number_input.value;
    if(number_of_tiles < 4 || number_of_tiles > 10) tiles_number_input.value = number_of_tiles = 4;
    else if(number_of_tiles % 2 != 0) tiles_number_input.value = number_of_tiles = number_of_tiles-1;
    
    init();
}

function init(){
    createBoard(number_of_tiles);
}

function createBoard(n){
    
}

function createTile(){

}

function insertImage(){
    
}

function flipImage(){

}