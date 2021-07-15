export function print(thing){
    console.log(thing);
}

export function randnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}