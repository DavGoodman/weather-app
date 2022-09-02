const notificationEL = document.querySelector(".notification")
const iconEL = document.querySelector(".weather-icon")
const tempEL = document.querySelector(".temperature-value p")
const descEL = document.querySelector(".temperature-description p")
const locationEL = document.querySelector(".location p")

const kelvin = 273;
const key = "69683e0cec95b51e4100b1b922d2832e"

const weather = {
    temperature : {
        value : 18,
        unit : "celsius"
    },

    description : "few clouds",
    iconId : "01d",
    city : "London",
    country : "GB"
};


// checks if browser supports geolocation
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition( setPosition, showError)   
    console.log("geolocation works")
}
else {
    notificationEL.getElementsByClassName.display = "block"
    notificationEL.innerHTML = `<p>Browser Doesnt Support Geolocation</p>`
}

// Sets user's position
function setPosition(position){
    let latitude = position.coords.latitude;   
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude)
}

// get Weather from api provider
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api)
    .then(function(response){
        let data = response.json();
        console.log(data)
        return data
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather()
    })
}

function displayWeather(){
    iconEL.innerHTML = `<img src"icons/${weather.iconId}.png"/>`
    tempEL.innerHTML = `${weather.temperature.value}°<span>C</span>`
    descEL.innerHTML = weather.description
    locationEL.innerHTML = `${weather.city}, ${weather.country}`
}

// Show error if an issue with geolocation
function showError(error){
    notificationEL.style.display = "block";
    notificationEL.innerHTML=`<p>${error.message}</p>`
}






tempEL.addEventListener("click", function(){
    if(weather.temperature.unit == "celsius"){
        celsiusToFahrenheit
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
        fahrenheit = Math.floor(fahrenheit)
        tempEL.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit"
    }

    else {
        tempEL.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celsius"
    }
})

function displayWeather(){
    iconEL.innerHTML = `<img src="icons/${weather.iconId}.png" alt="">`

    tempEL.innerHTML = `${weather.temperature.value}°  <span>C</span>`

    descEL.innerHTML = weather.description;

    locationEL.innerHTML = `${weather.city}, ${weather.country}`;
}

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32
}