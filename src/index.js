import "./style.css"
import { fetchWeather, displayWeather } from "./fetchWeather.js"

let currentWeather = null;

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.querySelector("#searchBtn");
    const tempTypeBtn = document.querySelector("#tempTypeBtn");
    const tempTypeDisplay = document.querySelector("#tempTypeDisplay");

    tempTypeBtn.disabled = true;

    searchBtn.addEventListener("click", async () => {
        const location = document.querySelector("#location").value;
        currentWeather = await fetchWeather(location);
        displayWeather(currentWeather);

        if (currentWeather) {
            tempTypeBtn.disabled = false;
        }
    });

    tempTypeBtn.addEventListener("click", () => {
        if (currentWeather) {
            currentWeather.toggleUnit();
            tempTypeDisplay.textContent = currentWeather.isCelsius ? "Celsius" : "Fahrenheit";
            displayWeather(currentWeather);
        }
    })
});

