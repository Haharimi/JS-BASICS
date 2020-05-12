const weather = document.querySelector(".js-weather");

const API_KEY = "66d632d1a097f94e3d72d426acdef5f6";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )//API를 통해 서버에서 날씨 정보를 가져오고 
        .then(function(response) {
            return response.json();
        }) //API에서 날씨 정보가 모두 다운받아지면 response에 json데이터를 가져오고 
        .then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerHTML = `${Math.floor(temperature)}℃ ${place}`;
        })//js데이터가 준비되면 데이터를 보여준다. 
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); //local storage의 value 값은 string type으로 저장
}
   
function handleGeoSucces(position){ // 위치동의 허용했을 때
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //객체와 키 값이 동일할때에는 이와 같이 작성해도 된다
        longitude
    };
    saveCoords(coordsObj); //위치 저장 
    getWeather(latitude, longitude); //날씨불러오기 
}

function hadleGeoError(){ //위치동의 거절했을 때 
    console.log('cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, hadleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        // 좌표가 없다면 
        askForCoords();
    }else {
        // 좌표가 있다면 날씨를 가져온다
        const paeseCoords = JSON.parse(loadedCoords);
        getWeather(paeseCoords.latitude, paeseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();