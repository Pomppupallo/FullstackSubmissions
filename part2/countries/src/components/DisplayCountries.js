import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ( {weather} ) => {
    if (weather === null) {
        return null
    }

    return(
        <div>
            <h3>Weather in {weather.location.name}</h3>
            <p><b>temperature:</b> {weather.current.temperature}</p>
            <img src={weather.current.weather_icons} alt="weather" height="75" />
            <p><b>wind:</b> {weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
        </div>
    )
}

const OneCountry = ( {country} ) => {
    const [weather, setWeather] = useState(null)
    const ApiURL = 'http://api.weatherstack.com/current'
    const capital = country.capital

    useEffect(
        () => {
        const params= {
            access_key: 'notForYouToSee',
            query: capital,
            units: 'm',
            languages: 'fi'
        }

        axios
          .get(ApiURL, {params})
          .then(response => {
          setWeather(response.data)
        })
      }, [capital]
    )

    return(
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => 
                    <li key={language.name}> {language.name}</li>
                )}
            </ul>
            <img src={country.flag} alt="flag" height="75" />
            <Weather weather={weather} />
        </div>
    )
}

const DisplayCountries = ( {countries, newSearch, handleClick} ) => {
    const filter = newSearch.toLowerCase()
    const toShow = countries.filter(country => country.name.toLowerCase().includes(filter))

    if (toShow.length > 10) {
        return(
            <div>
                <p>{`Too many matches (${toShow.length}), specify another filter`}</p>
            </div>
        ) 
    } else if (toShow.length <= 10 && toShow.length !== 1) {
        return(
            <div>
                {toShow.map(country => 
                    <p key={country.name}> {country.name} 
                    <button onClick={() => handleClick(country.name)}>show</button>
                    </p>
                )}
            </div>
        )
    } else {
        return(
            <div>
                <OneCountry country={toShow[0]} />
            </div>
        )
    }
}

export default DisplayCountries