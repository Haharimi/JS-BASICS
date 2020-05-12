const API_KEY = "66d632d1a097f94e3d72d426acdef5f6";
const COORDS = 'coords';

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); //local storage의 value 값은 string type으로 저장
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //객체와 키 값이 동일할때에는 이와 같이 작성해도 된다
        longitude
    };
    saveCoords(coordsObj); //위치 저장 
}

function hadleGeoError(){
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
        // getWeather();
    }
}

function init() {
    loadCoords();
}

init();