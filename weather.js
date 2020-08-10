const weather = document.querySelector(".js-weather");

const API_KEY = "edde74c32c238c67ca29b141f037163b";
const COORDS = "coords";

// api 정보를 불러온다 fetch로 response객체를 받고 response를 json으로 바꾼다
// json에서 temperature와 place를 구해 ".js-weather"에 넣는다
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function (response) {
    return response.json();
  }).then(function (json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}

// 위치정보 객체를 string으로 변환하여 로컬 스토리지에 저장하는 함수
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// getCurrentPosition이 성공했을 때 position객체를 받아 위도와 경도를 얻는다
// 위도와 경도로 coordsObj객체를 만든다
// coordsObj를 로컬 스토리지에 저장하고 getWeather을 불러온다
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

// getCurrentPosition이 실패했을 때 메시지 출력
function handleGeoError() {
  console.log("Can't access geo location");
}

// 사용자의 위치를 요청하는 함수
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

// 로컬 스토리지에 위치정보가 저장되어 있으면 getWeather실행, 없으면 askForCoords로 요청
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();