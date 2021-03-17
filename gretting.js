const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}
// event 기능은 원래 root에 페이지를 보내고 새로고침
// 기본 enent의 기능을 막자.

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}
  
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
      // she is not
      askForName();
    } else {
      paintGreeting(currentUser);
    }
  }
  function init() {
    loadName();
  }
  init();