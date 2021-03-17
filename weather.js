const weather = document.querySelector(".js-weather");

const API_KEY = "eceee87470ada461d34a0b5a7f5acc0e";
const COORDS = "coords";

function getWeather(lat, lng){
    // fetch() 안에는 가져올 데이터가 들어가면 된다.
    // 이런식으로 https:// 넣어주고
    // 주의 : 따옴표가 아닌 backtick(``)을 사용할 것 !
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(respons){
        return respons.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
    // then()에 대해서,
    // 언제 사용하나? 데이터가 우리한테 넘어왔을 때
    // 데이터가 넘어오는데 시간이 걸릴 수 있기 때문에
    // then이 하는 역할은 기본적으로 함수를 호출하는 것이다.
    // 데이터가 완전히 들어온 다음 호출하는 것이다.
    // 우리가 then을 사용한 이유는 fetch가 완료되기를 기다려야
    // 하기 때문이다.
    // 이렇게 fetch를 기다리지 않고 다음 작업을 지시하면,
    // 다음 작업은 fetch가 완료되길 기다리지 않을거고
    // fetch는 정상적으로 완료되지 않을 수 있다.
    
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    // 저장 값은 string
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('위치를 불러올 수 없습니다.');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();