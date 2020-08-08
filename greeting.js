const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

// 파라미터를 로컬 스토리지에 저장하는 함수
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

// form으로 이름을 입력받았을 때 초기화가 되지 않도록 하고
// 이름을 출력하고 로컬 스토리지에 저장
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

// 입력창을 띄우고 이벤트 핸들러를 불러온다
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

// 입력창을 가리고 입력받은 이름을 띄운다
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

// 로컬 스토리지에 이름이 저장되어있으면 출력, 없으면 이름을 받아서 저장
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();