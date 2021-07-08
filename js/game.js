let number_of_tiles = 4;
let cards_folder = new Folder("../cards/all");
let back_cover = new File("../cards/back_covers/Emerald.png");
let generate_board_button = document.getElementById("generateBoard");
let board_grid = document.getElementById("board");

tiles_number_input.value = number_of_tiles;
cards_folder.close();

generate_board_button.onclick = function generateBoard(){
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

    tiles_array = tilesArray(n);

    board_grid.style.backgroundColor = '#2196F3';
    board_grid.style.gridTemplateColumns = css_instruction;
}

function tilesArray(n){
    let array = [];
    cards_folder.reset();

    for(let i=0; i<(n^2); i++){
        let tile = function(){
            let img = cards_folder.next();
        }

        array.push(tile);
    }

    cards_folder.close();

    return array;
}


function flipImage(){

}