function displayWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let apiKey = `526506b876f3e352ea6d4d31547ae1fc`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
