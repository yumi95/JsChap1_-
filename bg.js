const body = document.querySelector("body");

const IMG_NUMBER = 5;

function panintImge(imgNumber){
    const image = new Image();
    // random 숫자는 0부터 시작되기 때문에
    image.src = `img/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage")
    body.prepend(image);

}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    panintImge(randomNumber);
}

init();
