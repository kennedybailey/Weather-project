let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let enterCity = prompt("Enter a city.");
enterCity = enterCity.toLowerCase();
let found = false;
for (let city in weather) {
  if (city === enterCity) {
    let tempF = (weather[enterCity].temp * 9) / 5 + 32;
    let capitalizeCity = enterCity.charAt(0).toUpperCase() + enterCity.slice(1);
    alert(
      `it is currently ${Math.round(weather[enterCity].temp)}°C (${Math.round(
        tempF
      )}°F) in ${capitalizeCity} with a humidity of ${
        weather[enterCity].humidity
      }%`
    );
    found = true;
  }
}
if (found === false) {
  alert(
    `Sorry, we do not know the weather for this city, try going to https://www.google.com/search?q=weather+${enterCity}`
  );
}
