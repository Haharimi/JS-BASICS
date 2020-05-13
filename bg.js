const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER); //숫자 0~2 까지에서 랜덤으로 숫자 배정 
    return number;
}

function init() {
    const randomNumber = genRandom ();
    paintImage(randomNumber);
}

init();