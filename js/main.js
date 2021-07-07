let number_of_tiles = 4;
let tiles_number_input = document.getElementById("tilesAmount");
let generate_board_button = document.getElementById("generateBoard");
let board_grid = document.getElementById("board");

tiles_number_input.value = number_of_tiles;

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
    let css_instruction = "";
    let tiles_array;

    for(let i=0; i<n; i++){
        if(i < n-1) css_instruction += "auto ";
        else css_instruction += "auto";
    }

    tiles_array = createTiles();

    board_grid.style.backgroundColor = '#2196F3';
    board_grid.style.gridTemplateColumns = css_instruction;
}

function createTiles(){
    let array = [];

    

    return array;
}

function insertImage(){

}

function flipImage(){

}