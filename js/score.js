let score_text = document.getElementById("score");

export function setScoreZero(){
    score_text.innerHTML = "0";
}

export function changeScore(add){
    let score = parseInt(score_text.innerHTML);
    
    if(add) score_text.innerHTML = ++score;
    else score_text.innerHTML = --score;
}

export function finishGame(){
    
}