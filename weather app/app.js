const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');
let searchElement = document.getElementById('search-input');
const searchBTN = document.getElementById('btn');
const weather = {};
weather.temperatue = {
    unit: 'celsius'
};
const KELVIN = 273;
const key = "96f6ba150dbfde1782395bffef95d6a2";

function displayWeatherByCity() {
    iconElement.innerHTML = `<img src ="icons/icons/${weather.iconId}.png" alt="">`
    tempElement.innerHTML = `${weather.temperatue.value} <span>degrees C</span>`
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
    
    
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showErr);
    
}
else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p> Browser does not support Geolocation </p>';
}

function setPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // console.log(latitude);


    getWeather(latitude, longitude);
    
}

function showErr(params) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${params.message}</p>`;    
}
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
    .then(function(response){
    let data = response.json();
    return data;
    })
    .then(function (data) {
        weather.temperatue.value = Math.floor(data.main.temp - KELVIN)
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        console.log(weather.iconId);
        weather.city = data.name;
        weather.country = data.sys.country;        
    })
     .then(function(){
        displayWeather();
    });
    
}
 function displayWeather() {
     iconElement.innerHTML = `<img src ="icons/icons/${weather.iconId}.png" alt="">`
     tempElement.innerHTML = `${weather.temperatue.value} <span>degrees C</span>`
     descElement.innerHTML = weather.description;
     locationElement.innerHTML = `${weather.city}, ${weather.country}`
     

     
 }
 searchBTN.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeatherInfo(searchElement.value);
    // searchElement='';
    
});
function getWeatherInfo(city) {
    let apis = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(apis)
    .then(function(response){
    let data = response.json();
    return data;
    })
    .then(function (data) {
        weather.temperatue.value = Math.floor(data.main.temp - KELVIN)
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        console.log(weather.iconId);
        weather.city = data.name;
        weather.country = data.sys.country;        
    })
     .then(function(){
        displayWeatherByCity();
        

    });

    
}