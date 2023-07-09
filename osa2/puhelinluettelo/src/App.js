import { useState } from 'react'
import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === personObject.name)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const filterPersons = persons.filter(
    (person) => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <NewPersonForm addPerson={addPerson} handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons}  />
    </div>
  )
}

export default App