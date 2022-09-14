function formatDate(timestamp) {
  let data = new Date(timestamp);
  let hours = data.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = data.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[data.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = data.getDate();
  let month = months[data.getMonth()];
  return `${day} ${date} ${month}, ${hours}:${minutes}`;
}

function displayWeatherForecast(response) {
  let weatherForecastElement = document.querySelector("#weather-forecast");

  let weatherForecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    weatherForecastHTML =
      weatherForecastHTML +
      `<div class="col-2">
                <div class="weather-forecast-day">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="45"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">18° | </span
                  ><span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>`;
  });

  weatherForecastHTML = weatherForecastHTML + `</div>`;
  weatherForecastElement.innerHTML = weatherForecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `526506b876f3e352ea6d4d31547ae1fc`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  feelsLikeTemperature = response.data.main.feels_like;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  feelsLikeElement.innerHTML = Math.round(feelsLikeTemperature);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `526506b876f3e352ea6d4d31547ae1fc`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFeelsLikeFahrenheitTemp(event) {
  event.preventDefault();
  let feelsLikeFahrenheit = document.querySelector("#feels-like");
  feelsLikeFahrenheit.innerHTML = Math.round(
    (feelsLikeTemperature * 9) / 5 + 32
  );
}

function displayFeelsLikeCelsiusTemp(event) {
  event.preventDefault();
  let feelsLikeCelsius = document.querySelector("#feels-like");
  feelsLikeCelsius.innerHTML = Math.round(feelsLikeTemperature);
}

let celsiusTemperature = null;
let feelsLikeTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let feelsLikeFahrenheitLink = document.querySelector(
  "#feels-like-fahrenheit-link"
);
feelsLikeFahrenheitLink.addEventListener(
  "click",
  displayFeelsLikeFahrenheitTemp
);

let feelsLikeCelsiusLink = document.querySelector("#feels-like-celsius-link");
feelsLikeCelsiusLink.addEventListener("click", displayFeelsLikeCelsiusTemp);

search("Warsaw");
