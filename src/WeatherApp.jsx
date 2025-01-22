import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'your-api-key'
    const difKelvin = 273.15 // Kelvin to Celsius

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${apiKey}`)
            const data = await response.json()
            setWeatherData(data)
        } catch (error) {
            console.error(error, 'Error al obtener el clima')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchWeather()
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    return (
        <div className='container'>
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ciudad"
                    value={city}
                    onChange={handleCityChange} />
                <button>Buscar</button>
            </form>

            {weatherData && (
                <div className='weather'>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es {Math.floor(weatherData.main.temp - difKelvin).toFixed(2)}°C</p>
                    <p>La condición meteorológica actual: {weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                </div>
            )}
        </div>
    )
}
