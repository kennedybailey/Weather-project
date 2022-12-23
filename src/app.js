let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";

//date
let dateElement = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = days[now.getDay()];
let hours = now.getHours();
let currMinutes = now.getMinutes();
if (((currMinutes) => 0) && currMinutes < 10) {
  currMinutes = "0" + currMinutes;
}
let minutes = currMinutes;

dateElement.innerHTML = `${day} ${hours}:${minutes}`;

//search city
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

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
    let mainIcon = response.data.weather[0].main;
    updateIcon(document.querySelector("#main-icon"), mainIcon);
  }
  let changeToUnit = document.querySelector("#temp-change").innerHTML;
  let apiUnit = "metric";
  if (changeToUnit === "Celsius") {
    apiUnit = "imperial";
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${apiUnit}`;
  axios.get(apiUrl).then(changeInfo);
  //forecast function
  function forecast(response) {
    console.log(response);
    function forecastBox(forecastData, whichBox) {
      let date = new Date(forecastData.dt * 1000);
      let day = days[date.getDay()];
      let dayOfWeek = document.querySelector(`#${whichBox}-day`);
      dayOfWeek.innerHTML = day;
      let mainIcon = forecastData.weather[0].main;
      updateIcon(document.querySelector(`#${whichBox}-icon`), mainIcon);
      let forecastTemp = document.querySelector(`#${whichBox}-min`);
      forecastTemp.innerHTML = Math.round(forecastData.main.temp) + "°C";
    }
    forecastBox(response.data.list[7], "first");
    forecastBox(response.data.list[15], "second");
    forecastBox(response.data.list[23], "third");
    forecastBox(response.data.list[31], "fourth");
    forecastBox(response.data.list[39], "fifth");
  }

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${apiUnit}`;
  axios.get(forecastUrl).then(forecast);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//icon updates
function updateIcon(icon, weather) {
  if (weather === `Thunder`) {
    icon.setAttribute("src", "media/thunder.svg");
  } else if (weather === `Drizzle`) {
    icon.setAttribute("src", "media/rainy-4.svg");
  } else if (weather === `Rain`) {
    icon.setAttribute("src", "media/rainy-6.svg");
  } else if (weather === `Snow`) {
    icon.setAttribute("src", "media/snowy-6.svg");
  } else if (weather === `Clear`) {
    icon.setAttribute("src", "media/day.svg");
  } else if (weather === `Clouds`) {
    icon.setAttribute("src", "media/cloudy.svg");
  } else {
    icon.setAttribute("src", "http://openweathermap.org/img/wn/50d@2x.png");
  }
}

//default weather info
function defaultWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Toronto`;
  let currentTemp = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let currentWind = Math.round(response.data.wind.speed);
  let currentDescription = response.data.weather[0].description;
  let changeCurrentWind = document.querySelector("#wind-speed");
  let changeCurrentTemp = document.querySelector("#current-temp");
  let changeFeelsLike = document.querySelector("#feels-like-temp");
  let changeCurrentDescription = document.querySelector("#weather-description");
  changeCurrentTemp.innerHTML = `${currentTemp}°C`;
  changeFeelsLike.innerHTML = `${feelsLike}°C`;
  changeCurrentWind.innerHTML = `${currentWind} km/h`;

  changeCurrentDescription.innerHTML = `${currentDescription}`;

  let mainIcon = response.data.weather[0].main;
  updateIcon(document.querySelector("#main-icon"), mainIcon);
}
let firstApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=${apiKey}&units=metric`;
axios.get(firstApiUrl).then(defaultWeather);

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
