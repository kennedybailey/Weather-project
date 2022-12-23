let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";

//date
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

//search city
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
    if (apiUnit === "imperial") {
      changeCurrentTemp.innerHTML = `${currentTemp}°F`;
      changeFeelsLike.innerHTML = `${feelsLike}°F`;
      changeCurrentWind.innerHTML = `${currentWind} mph`;
    } else {
      changeCurrentTemp.innerHTML = `${currentTemp}°C`;
      changeFeelsLike.innerHTML = `${feelsLike}°C`;
      changeCurrentWind.innerHTML = `${currentWind} km/h`;
    }

    changeCurrentDescription.innerHTML = `${currentDescription}`;
  }
  let changeToUnit = document.querySelector("#temp-change").innerHTML;
  let apiUnit = "metric";
  if (changeToUnit === "Celsius") {
    apiUnit = "imperial";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalizeCity}&appid=${apiKey}&units=${apiUnit}`;
  axios.get(apiUrl).then(changeInfo);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//temp change
let currentTempUnit = "Celsius";
function updateUnit(currTemp, newUnit) {
  if (newUnit === "Fahrenheit") {
    return Math.round(currTemp * (9 / 5) + 32);
  } else {
    return Math.round((currTemp - 32) * (5 / 9));
  }
}

function changeUnit(event) {
  let changeCurrentTemp = document.querySelector("#current-temp");
  let changeFeelsLike = document.querySelector("#feels-like-temp");
  let changeWindSpeed = document.querySelector("#wind-speed");
  let currentTempNumber = changeCurrentTemp.innerHTML;
  let feelsLikeTempNumber = changeFeelsLike.innerHTML;
  let windSpeedNumber = changeWindSpeed.innerHTML;
  currentTempNumber = currentTempNumber.substring(
    0,
    currentTempNumber.length - 2
  );
  feelsLikeTempNumber = feelsLikeTempNumber.substring(
    0,
    feelsLikeTempNumber.length - 2
  );
  if (currentTempUnit === "Celsius") {
    windSpeedNumber = windSpeedNumber.substring(0, windSpeedNumber.length - 5);
    currentTempUnit = "Fahrenheit";
    let newCurrentTemp = updateUnit(currentTempNumber, currentTempUnit);
    let newFeelsLike = updateUnit(feelsLikeTempNumber, currentTempUnit);
    let newWindSpeed = Math.round(windSpeedNumber / 1.609);
    changeCurrentTemp.innerHTML = `${newCurrentTemp}°F`;
    changeFeelsLike.innerHTML = `${newFeelsLike}°F`;
    changeWindSpeed.innerHTML = `${newWindSpeed} mph`;
    tempChange.innerHTML = "Celsius";
  } else {
    currentTempUnit = "Celsius";
    windSpeedNumber = windSpeedNumber.substring(0, windSpeedNumber.length - 4);
    let newCurrentTemp = updateUnit(currentTempNumber, currentTempUnit);
    let newFeelsLike = updateUnit(feelsLikeTempNumber, currentTempUnit);
    let newWindSpeed = Math.round(windSpeedNumber * 1.609);
    changeCurrentTemp.innerHTML = `${newCurrentTemp}°C`;
    changeFeelsLike.innerHTML = `${newFeelsLike}°C`;
    changeWindSpeed.innerHTML = `${newWindSpeed} km/h`;
    tempChange.innerHTML = "Fahrenheit";
  }
}
let tempChange = document.querySelector("#temp-change");
tempChange.addEventListener("click", changeUnit);
