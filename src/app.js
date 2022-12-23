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
//forecast function
function forecast(response) {
  function forecastBox(forecastData, whichBox) {
    let date = new Date(forecastData.dt * 1000);
    let day = days[date.getDay()];
    let dayOfWeek = document.querySelector(`#${whichBox}-day`);
    dayOfWeek.innerHTML = day;
    let mainIcon = forecastData.weather[0].main;
    updateIcon(document.querySelector(`#${whichBox}-icon`), mainIcon);
    let forecastTemp = document.querySelector(`#${whichBox}-min`);
    if (currentTempUnit === "Celsius") {
      forecastTemp.innerHTML = Math.round(forecastData.main.temp) + "°C";
    } else {
      forecastTemp.innerHTML = Math.round(forecastData.main.temp) + "°F";
    }
  }
  forecastBox(response.data.list[7], "first");
  forecastBox(response.data.list[15], "second");
  forecastBox(response.data.list[23], "third");
  forecastBox(response.data.list[31], "fourth");
  forecastBox(response.data.list[39], "fifth");
}

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

let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=toronto&appid=${apiKey}&units=metric`;
axios.get(forecastUrl).then(forecast);

//temp change
let currentTempUnit = "Celsius";
function updateUnit(currTemp, newUnit) {
  if (newUnit === "Fahrenheit") {
    return Math.round(currTemp * (9 / 5) + 32);
  } else {
    return Math.round((currTemp - 32) * (5 / 9));
  }
}
function getTempNumber(tempWithUnit) {
  return tempWithUnit.substring(0, tempWithUnit.length - 2);
}
function changeUnit(event) {
  let changeCurrentTemp = document.querySelector("#current-temp");
  let changeFeelsLike = document.querySelector("#feels-like-temp");
  let changeWindSpeed = document.querySelector("#wind-speed");
  let firstTemp = document.querySelector("#first-min");
  let secondTemp = document.querySelector("#second-min");
  let thirdTemp = document.querySelector("#third-min");
  let fourthTemp = document.querySelector("#fourth-min");
  let fifthTemp = document.querySelector("#fifth-min");
  let windSpeedNumber = changeWindSpeed.innerHTML;
  let currentTempNumber = getTempNumber(changeCurrentTemp.innerHTML);
  let feelsLikeTempNumber = getTempNumber(changeFeelsLike.innerHTML);
  let firstTempNumber = getTempNumber(firstTemp.innerHTML);
  let secondTempNumber = getTempNumber(secondTemp.innerHTML);
  let thirdTempNumber = getTempNumber(thirdTemp.innerHTML);
  let fourthTempNumber = getTempNumber(fourthTemp.innerHTML);
  let fifthTempNumber = getTempNumber(fifthTemp.innerHTML);
  if (currentTempUnit === "Celsius") {
    windSpeedNumber = windSpeedNumber.substring(0, windSpeedNumber.length - 5);
    currentTempUnit = "Fahrenheit";
    let newCurrentTemp = updateUnit(currentTempNumber, currentTempUnit);
    let newFeelsLike = updateUnit(feelsLikeTempNumber, currentTempUnit);
    let newWindSpeed = Math.round(windSpeedNumber / 1.609);
    let newFirstTemp = updateUnit(firstTempNumber, currentTempUnit);
    let newSecondTemp = updateUnit(secondTempNumber, currentTempUnit);
    let newThirdTemp = updateUnit(thirdTempNumber, currentTempUnit);
    let newFourthTemp = updateUnit(fourthTempNumber, currentTempUnit);
    let newFifthTemp = updateUnit(fifthTempNumber, currentTempUnit);
    changeCurrentTemp.innerHTML = `${newCurrentTemp}°F`;
    changeFeelsLike.innerHTML = `${newFeelsLike}°F`;
    changeWindSpeed.innerHTML = `${newWindSpeed} mph`;
    firstTemp.innerHTML = `${newFirstTemp}°F`;
    secondTemp.innerHTML = `${newSecondTemp}°F`;
    thirdTemp.innerHTML = `${newThirdTemp}°F`;
    fourthTemp.innerHTML = `${newFourthTemp}°F`;
    fifthTemp.innerHTML = `${newFifthTemp}°F`;
    tempChange.innerHTML = "Celsius";
  } else {
    currentTempUnit = "Celsius";
    windSpeedNumber = windSpeedNumber.substring(0, windSpeedNumber.length - 4);
    let newCurrentTemp = updateUnit(currentTempNumber, currentTempUnit);
    let newFeelsLike = updateUnit(feelsLikeTempNumber, currentTempUnit);
    let newWindSpeed = Math.round(windSpeedNumber * 1.609);
    let newFirstTemp = updateUnit(firstTempNumber, currentTempUnit);
    let newSecondTemp = updateUnit(secondTempNumber, currentTempUnit);
    let newThirdTemp = updateUnit(thirdTempNumber, currentTempUnit);
    let newFourthTemp = updateUnit(fourthTempNumber, currentTempUnit);
    let newFifthTemp = updateUnit(fifthTempNumber, currentTempUnit);
    changeCurrentTemp.innerHTML = `${newCurrentTemp}°C`;
    changeFeelsLike.innerHTML = `${newFeelsLike}°C`;
    changeWindSpeed.innerHTML = `${newWindSpeed} km/h`;
    firstTemp.innerHTML = `${newFirstTemp}°C`;
    secondTemp.innerHTML = `${newSecondTemp}°C`;
    thirdTemp.innerHTML = `${newThirdTemp}°C`;
    fourthTemp.innerHTML = `${newFourthTemp}°C`;
    fifthTemp.innerHTML = `${newFifthTemp}°C`;
    tempChange.innerHTML = "Fahrenheit";
  }
}
let tempChange = document.querySelector("#temp-change");
tempChange.addEventListener("click", changeUnit);
