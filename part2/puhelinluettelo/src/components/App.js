import React, { useState } from 'react'

const Person = ( {person} ) => {
    return(
        <div>
            <p>name: {person.name}</p>
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
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (!names.includes(newName)) {
        const personObject = {
        name: newName
        }

        setPersons(persons.concat(personObject))
        setNewName('')  
    } else {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
    }
  }
  
  const handleFormChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleFormChange}
          />
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