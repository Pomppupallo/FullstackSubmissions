import React, { useState } from 'react'

const Person = ( {person} ) => {
    return(
        <div>
            <p>{person.name} {person.number}</p>
        </div>
    )
}

const Display = ( {persons} ) => {

    return(
        <div>
        {persons.map(person =>
            <Person key={person.name} person={person} />
        )}
        </div>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '055 0505'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <Display persons={persons} />
    </div>
  )

}

export default App