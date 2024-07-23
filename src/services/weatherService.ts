import axios from 'axios';

const WEATHER_API_URL = 'https://api.weather.gov/points';

export const getWeatherForecast = async (lat: number, lon: number) => {
    try {
        const pointResponse = await axios.get(`${WEATHER_API_URL}/${lat},${lon}`);
        const forecastUrl = pointResponse.data.properties.forecast;
        const forecastResponse = await axios.get(forecastUrl);
        if (forecastResponse && forecastResponse.data) {
            return forecastResponse.data.properties.periods;
        } else {
            return []
        }
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        throw new Error('Failed to fetch weather forecast');
    }
};
