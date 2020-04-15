import React from 'react'

const OneCountry = ( {country} ) => {
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