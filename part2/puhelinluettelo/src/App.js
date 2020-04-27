import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <p>
            name:
            <input value={newName} onChange={handleNameChange} />
          </p>
          <p>
            number:
            <input value={newNumber} onChange={handleNumberChange} />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.print === '') {
    return null
  }
  
  const ok = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  let style = ok

  if (message.error) {
    style = error
  } 

  return (
    <div style={style}>
      {message.print}
    </div>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <p>
      filter shown with
      <input value={newFilter} onChange={handleFilterChange} />
    </p>
  );
};

const Person = ({ person, deletePerson}) => {
  return (
    <div>
      <p>
        {person.name} {person.number} id {person.id}
        <button onClick={() => deletePerson(person.id)}> delete</button>
      </p>
    </div>
  );
};

const Display = ({ persons, filter, deletePerson }) => {
  const search = filter.toLowerCase();
  const filteredResults = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  return (
    <div>
      {filteredResults.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newMessage, setNewMessage] = useState({print: '', error: false});

  useEffect(() => {
    personService.getAll().then((personsData) => setPersons(personsData));
  }, [setPersons]);

  const deletePerson = (id) => {
    //const person = persons.find((person) => person.id === id);
    personService
      .remove(id)
      .then((responseData) => {
        console.log(`removed ${responseData.name}`);
        setNewMessage({print: `${responseData.name} was removed succesfully `, style: 'ok'})
        setTimeout(() => setNewMessage(null), 2000)
        setPersons(persons.filter((person) => person.id !== id))
      })
  }
  

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);

    if (!names.includes(newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      };
      personService.create(personObject).then((responseData) => {
        setPersons(persons.concat(responseData));
        setNewName("");
        setNewNumber("");
        setNewMessage({print: `${personObject.name} added successfully `, style: 'ok'})
        setTimeout(() => setNewMessage(null), 2000)
      })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName);
        personService.update({
          ...person,
          number: newNumber
        }).then((responseData) => {
          setPersons(persons.map(person => person.name === newName ? responseData : person))
          //setPersons(persons.map((person) => (person.id !== responseData.id ? person : responseData)));
          setNewName("");
          setNewNumber("");
          setNewMessage({print: `${person.name} number is now successfully changed `, style: 'ok'})
          setTimeout(() => setNewMessage(null), 2000)
        });
      }
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <Notification message={newMessage} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h3>Numbers</h3>
      <Display
        persons={persons}
        filter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;