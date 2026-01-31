export class Weather {
    constructor(data, location) {
        this.city = location;
        this.tempFahrenheit = data.currentConditions.feelslike.toFixed(1);
        this.tempCelsius = this.convertFahrenheitToCelsius(this.tempFahrenheit).toFixed(1);
        this.description = data.currentConditions.conditions;
        this.humidity = data.currentConditions.humidity;
        this.windSpeed = data.currentConditions.windspeed;
        this.cloudCover = data.currentConditions.cloudcover;
        this.icon = data.currentConditions.icon;
        this.time = data.currentConditions.datetime;
        this.isCelsius = true;
    }

    getBackgroundClass() {
        const iconMap = {
            'clear-day': 'bg-clear-day',
            'clear-night': 'bg-clear-night',
            'rain': 'bg-rain',
            'snow': 'bg-snow',
            'sleet': 'bg-sleet',
            'wind': 'bg-windy',
            'fog': 'bg-fog',
            'cloudy': 'bg-cloudy',
            'partly-cloudy-day': 'bg-partly-cloudy-day',
            'partly-cloudy-night': 'bg-partly-cloudy-night',
        };

        return iconMap[this.icon] || "bg-defaul";
    }

    convertFahrenheitToCelsius(temp) {
        return (temp - 32) * (5/9);
    }

    convertCelsiusToFahrenheit(temp) {
        return (temp * (9/5)) + 32;
    }

    getCurrentTemp() {
        return this.isCelsius ? this.tempCelsius: this.tempFahrenheit;
    }

    getTempUnit() {
        return this.isCelsius ? '°C' : '°F';
    }

    toggleUnit() {
        this.isCelsius = !this.isCelsius;
    }
}