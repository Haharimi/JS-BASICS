const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault(); //event의 기본동작 제어 
    const currentValue = input.value; //현재의 value값(이름)을 얻기위해
    paintGreeting(currentValue); //Hello "value값"
    saveName(currentValue); //localStorage 저장
}


function askForName() {
    form.classList.add(SHOWING_CN); //이름을 요청하는 form을 showing해줌
    form.addEventListener("submit", handleSubmit); 
    //submit 했을 때(enter를 쳤을 때), 웹페이지가 refresh되는 기본동작을 제어해주기위해 handleSubmit 추가
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN); //form 삭제
    greeting.classList.add(SHOWING_CN); //greeting 추가 
    greeting.innerText = `Hello, ${text}!`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        //localStorage에 유저가 없을 때, user의 이름을 물어본다.
        askForName();
    }else{
        //localStorage에 유저가 있을 때 
        paintGreeting(currentUser);
    }
}    

function init() {
    loadName();
}

init();