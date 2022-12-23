let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";

let dateElement = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

dateElement.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-bar");
  let h1 = document.querySelector("h1");
  let capitalizeCity =
    input.value.charAt(0).toUpperCase() + input.value.slice(1);
  h1.innerHTML = `${capitalizeCity}`;

  function changeInfo(response) {
    let currentTemp = Math.round(response.data.main.temp);
    let feelsLike = Math.round(response.data.main.feels_like);
    let currentWind = Math.round(response.data.wind.speed);
    let currentDescription = response.data.weather[0].description;
    let changeCurrentWind = document.querySelector("#wind-speed");
    let changeCurrentTemp = document.querySelector("#current-temp");
    let changeFeelsLike = document.querySelector("#feels-like-temp");
    let changeCurrentDescription = document.querySelector(
      "#weather-description"
    );
    changeCurrentTemp.innerHTML = `${currentTemp}°C`;
    changeFeelsLike.innerHTML = `${feelsLike}°C`;
    changeCurrentWind.innerHTML = `Wind Speed: ${currentWind} km/h`;
    changeCurrentDescription.innerHTML = `${currentDescription}`;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalizeCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeInfo);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);
