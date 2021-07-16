import { print } from './misc.js';

let score_text = document.getElementById("score");
let username;
let final_score;
//let xhr = new XMLHttpRequest();
//let site = "http://something.com";

xhr.onreadystatechange = function(){
    if (xhr.readyState === 4){
        print("Score uploaded succesfully!");
    }
};

export function setScoreZero(){
    score_text.innerText = "0";
}

export function changeScore(add){
    let score = parseInt(score_text.innerHTML);
    
    if(add) score_text.innerHTML = ++score;
    else score_text.innerHTML = --score;
}

export function finishGame(){
    final_score = parseInt(score_text.innerText);
    username = prompt("Finished!\n\n"+
                    "Please, enter your username:", 
                    "Victor Zazueta");

    let play_again = confirm("Your score: "+final_score+"\n\n"+
                            "Play Again?");

    sendToDatabase();

    return play_again;
}

// We will use local storage for now
function sendToDatabase(){
    //xhr.open('POST', site);

    let user_and_score = {
        user : username,
        score : final_score
    }

    localStorage.setItem("game_info", user_and_score);
}