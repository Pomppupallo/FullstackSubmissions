import React, { useState } from 'react'

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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (!names.includes(newName)) {
        const personObject = {
        name: newName,
        number: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('') 
        setNewNumber('') 
    } else {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    }

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