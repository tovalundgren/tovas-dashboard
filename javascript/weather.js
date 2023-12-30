// API nyckel för att få tillgång till OpenWeatherMap API
const weatherApiKey = "4fd1b0acd5e13b7bce177af0ad53609f";

// Översätt väderbeskrivningar till svenska
const svDescriptions = {
    "clear sky": "Klar himmel",
    "few clouds": "Lite molnigt",
    "scattered clouds": "Spridda moln",
    "broken clouds": "Brutna moln",
    "shower rain": "Skurar",
    "light rain": "Lätt regn",
    "moderate rain": "Måttligt regn",
    "heavy intensity rain": "Kraftigt regn",
    "fog": "Dimma",
    "rain": "Regn",
    "thunderstorm": "Åska",
    "snow": "Snö",
    "light snow": "Lätt snö",
    "heavy snow": "Kraftig snö",
    "haze": "Duggregn",
    "mist": "Dimma",
    "overcast clouds": "Mulet"
};

// Fetcha aktuellt väder via koordinater och uppdatera 'weatherToday' i HTML
async function getWeatherByCoordinates(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`;
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        const weather = json;

        // Väderkort
        const card = document.createElement('div');
        card.className = 'weather-card';

        const titleTempContainer = document.createElement('div');
        titleTempContainer.className = 'title-temp-container';

        // Titel för väder idag
        const title = document.createElement('div');
        title.className = 'weather-title';
        title.textContent = "Idag";

        // Temperatur för väder idag
        const temperature = document.createElement('div');
        temperature.className = 'card-temp';
        temperature.textContent = `${Math.trunc(weather.main.temp)}°C`;

        // Beskrivning baserat på vädret
        const description = document.createElement('div');
        description.className = 'card-description';

        // Ändra engelsk beskrivning till svenska
        const englishDescription = weather.weather[0].description;
        const swedishDescription = svDescriptions[englishDescription] || englishDescription;
        description.textContent = swedishDescription;

        // Ikon baserat på vädret
        const icon = document.createElement('i');
        let iconClass = "fa " + getIconClass(englishDescription);
        icon.className = iconClass + " icon";

        titleTempContainer.appendChild(title);
        titleTempContainer.appendChild(temperature);
        
        card.appendChild(icon);
        card.appendChild(titleTempContainer);
        card.appendChild(description);

        // Appenda kort till 'weatherToday' i HTML
        document.getElementById('weatherToday').appendChild(card);
    } else {
        console.log("HTTP-error: " + response.status);
    }
}

// Fetcha väderprognosen via koordinater och uppdatera 'weatherTomorrow' och 'weatherDayAfterTomorrow' i HTML
async function getWeatherForecast(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`;
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        const forecastList = json.list;

        // Hämta data för imorgon och övermorgon
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

        // Ta fram data för imorgon och övermorgon
        const weatherTomorrow = forecastList.find(entry =>
            new Date(entry.dt_txt).getDate() === tomorrow.getDate()
        );

        const weatherDayAfterTomorrow = forecastList.find(entry =>
            new Date(entry.dt_txt).getDate() === dayAfterTomorrow.getDate()
        );

        // Visa vädret för imorgon och övermorgon
        displayWeather('weatherTomorrow', weatherTomorrow);
        displayWeather('weatherDayAfterTomorrow', weatherDayAfterTomorrow);
    } else {
        console.log("HTTP-error: " + response.status);
    }
}

// Ikoner för vädret
function getIconClass(description) {
    switch (description.toLowerCase()) {
        case "clear sky":
            return "fa-sun";
        case "few clouds":
            return "fa-cloud-sun";
        case "scattered clouds":
            return "fa-cloud";
        case "overcast clouds":
            return "fa-cloud";
        case "broken clouds":
            return "fa-cloud";
        case "shower rain":
            return "fa-cloud-showers-heavy";
        case "light rain":
            return "fa-cloud-showers-heavy";
        case "moderate rain":
            return "fa-cloud-showers-heavy";
        case "heavy intensity rain":
            return "fa-cloud-showers-heavy";
        case "rain":
            return "fa-cloud-showers-heavy";
        case "fog":
            return "fa-cloud";
        case "mist":
            return "fa-fog";
        case "thunderstorm":
            return "fa-bolt";
        case "snow":
            return "fa-snowflake";
        case "light snow":
            return "fa-snowflake";
        case "heavy snow":
            return "fa-snowflake";
        case "haze":
            return "fa-smog";
        default:
            return "fa-question";
    }
}

// Funktion för att visa vädret i en specifik container
function displayWeather(containerId, weather) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'weather-card';

    const titleTempContainer = document.createElement('div');
    titleTempContainer.className = 'title-temp-container';

    // Titel för 'Imorgon' och namnet på dagen för övermorgon
    const title = document.createElement('div');
    title.className = 'weather-title';
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + (containerId === 'weatherTomorrow' ? 1 : 2));

    // Visa dagen för övermorgon på svenska
    const daysOfWeek = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    title.textContent = containerId === 'weatherTomorrow' ? 'Imorgon' : daysOfWeek[targetDate.getDay()];

    // Kolla om väderdatan är tillgänglig
    if (weather) {
        // Temperatur
        const temperature = document.createElement('div');
        temperature.className = 'card-temp';
        temperature.textContent = `${Math.trunc(weather.main.temp)}°C`;

        // Beskrivning och ikon baserat på vädret
        const description = document.createElement('div');
        const icon = document.createElement('i');
        description.className = 'card-description';

        const englishDescription = weather.weather[0].description;
        const swedishDescription = svDescriptions[englishDescription] || englishDescription;
        description.textContent = swedishDescription;

        let iconClass = "fa " + getIconClass(englishDescription);
        icon.className = iconClass + " icon";

        titleTempContainer.appendChild(title);
        titleTempContainer.appendChild(temperature);
        
        card.appendChild(icon);
        card.appendChild(titleTempContainer);
        card.appendChild(description);
    }

    container.appendChild(card);
}

// Hämta användarens plats och få väderdata
async function getWeatherByLocation() {
    const errorMessageElement = document.getElementById('error');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeatherByCoordinates(latitude, longitude);
                getWeatherForecast(latitude, longitude);
            },
            (error) => {
                const errorMessage = `Error med att hämta plats: ${error.message}.`;
                console.error(errorMessage);
                errorMessageElement.textContent = errorMessage;
            }
        );
    } else {
        const errorMessage = "Geolocation stöttas inte av den här webbläsaren."
        console.error(errorMessage);
        errorMessageElement.textContent = errorMessage;
    }
}

getWeatherByLocation();