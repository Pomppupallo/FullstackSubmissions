import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = ( {addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
        <div>
        <form onSubmit={addPerson}>
        <div>
          <p>name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
          </p>
          <p>number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
           />
           </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
    )
}

const Filter = ( {newFilter, handleFilterChange}) => {
    return(
        <p>filter shown with
          <input
          value={newFilter}
          onChange={handleFilterChange}
          />
      </p>
    )
}

const Person = ( {person} ) => {
    return(
        <div>
            <p>{person.name} {person.number}</p>
        </div>
    )
}

const Display = ( {persons, filter} ) => {
    const search = filter.toLowerCase()
    const filteredResults = persons.filter(person => person.name.toLowerCase().includes(search))

    return(
        <div>
        {filteredResults.map(person =>
            <Person key={person.name} person={person} />
        )}
        </div>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const url = 'http://localhost:3001/persons'

  useEffect(() => {
    axios
    .get(url)
    .then(response => {
        setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (!names.includes(newName)) {
        const personObject = {
        name: newName,
        number: newNumber
        }
        axios
          .post(url, personObject)
          .then(response => {
            console.log(response)
          })
        setPersons(persons.concat(personObject))
        setNewName('') 
        setNewNumber('') 
    } else {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h3>Numbers</h3>
      <Display persons={persons} filter={newFilter} />
    </div>
  )

}

export default App