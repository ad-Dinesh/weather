const apiKey = "b5a0a64bd1f3a245a89346cf1f7cb316";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const weatherIcon = document.querySelector(".weather-icon");

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}
toggleThemeBtn.addEventListener("click", toggleTheme);

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").classList.remove("hidden");
    document.querySelector(".weather").classList.add("hidden");
    return;
  }

  const data = await response.json();

  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const type = data.weather[0].main;

  if (type === "Clouds") {
    weatherIcon.src = "images/clouds.png";
    weatherIcon.className = "weather-icon w-40 mx-auto mt-4 cloud-animate";
  } else if (type === "Clear") {
    weatherIcon.src = "images/clear.png";
    weatherIcon.className = "weather-icon w-40 mx-auto mt-4 sun-animate";
  } else if (type === "Rain") {
    weatherIcon.src = "images/rain.png";
    weatherIcon.className = "weather-icon w-40 mx-auto mt-4 rain-animate";
  } else if (type === "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
    weatherIcon.className = "weather-icon w-40 mx-auto mt-4 rain-animate";
  } else if (type === "Mist") {
    weatherIcon.src = "images/mist.png";
    weatherIcon.className = "weather-icon w-40 mx-auto mt-4 cloud-animate";
  }

  document.querySelector(".weather").classList.remove("hidden");
  document.querySelector(".error").classList.add("hidden");
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});
