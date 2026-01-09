const apiKey = 'YOUR_API_KEY_HERE'; // Add your OpenWeather API key here
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    // Clear previous results
    weatherResult.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        // OpenWeather returns a 404 if the city isn't found
        if (!response.ok) {
            throw new Error('City not found. Please check the spelling.');
        }

        const data = await response.json();

        // Displaying the required fields: Temperature, Humidity, Condition
        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        `;

    } catch (error) {
        // Requirements met: Handling wrong city input using try/catch
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    }
}