import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ( {person, deletePerson} ) => {
    return(
        <div>
            <p>{person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}> delete</button>
            </p>
        </div>
    )
}

const Display = ( {persons, filter, deletePerson} ) => {
    const search = filter.toLowerCase()
    const filteredResults = persons.filter(person => person.name.toLowerCase().includes(search))

    return(
        <div>
        {filteredResults.map(person =>
            <Person key={person.name} person={person} deletePerson={deletePerson}/>
        )}
        </div>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(personsData => setPersons(personsData))
  }, [])

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(responseData => setPersons(persons.filter(person => person.id !== id)))
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (!names.includes(newName)) {
        const personObject = {
        name: newName,
        number: newNumber
        }
        personService
          .create(personObject)
          .then(responseData => {
            console.log(responseData)
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
      <Display persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
  )

}

export default App