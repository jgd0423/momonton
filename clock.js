const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const zeroPlusHours = hours < 10 ? `0${hours}` : hours;
  const zeroPlusMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const zeroPlusSeconds = seconds < 10 ? `0${seconds}` : seconds;
  clockTitle.innerText = `${zeroPlusHours}:${zeroPlusMinutes}:${zeroPlusSeconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();