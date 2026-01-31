import { Weather } from "./weather.js";

export async function fetchWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=CBHNLFGAN2RTA6H35442DVVDP`)

        if (!response.ok) {
            throw new Error("Couldn't find Location");
        }

        const data = await response.json();
        console.log(data);

        const weather = new Weather(data, location);
        return weather
    }
    catch(error) {
        console.error(error);
    }
}

export function displayWeather(weather) {
    if (!weather) {
        console.log("No weather data to display!");
        return;
    }

    const city = document.querySelector(".location");
    const tempText = document.querySelector("#temperature");
    const description = document.querySelector("#description");
    const humidity = document.querySelector("#humidity");
    const windSpeed = document.querySelector("#windSpeed");
    const cloudCover = document.querySelector("#cloudCover");

    city.textContent = weather.city;
    tempText.textContent = weather.getCurrentTemp() + weather.getTempUnit();
    description.textContent = weather.description;
    humidity.textContent = "Humidity: " + weather.humidity;
    windSpeed.textContent = "Wind Speed: " + weather.windSpeed + "km/h";
    cloudCover.textContent = "Cloud Cover: " + weather.cloudCover;

    document.body.className = "";
    document.body.classList.add(weather.getBackgroundClass())
}