import React, {useState, useEffect} from 'react';
import FindCountries from './components/FindCountries';
import DisplayCountries from './components/DisplayCountries';
import axios from 'axios'

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
   <div>
     <FindCountries handleSearchChange={handleSearchChange} newSearch={newSearch}/>
     <DisplayCountries countries={countries} newSearch={newSearch}/>
   </div>
  );
}

export default App;
