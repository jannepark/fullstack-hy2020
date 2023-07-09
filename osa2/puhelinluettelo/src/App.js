import { eventWrapper } from '@testing-library/user-event/dist/utils'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    name: newName
  } 
  setPersons(persons.concat(personObject))
  setNewName('')
}
const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}
const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )

}

export default App