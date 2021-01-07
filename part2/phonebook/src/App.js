import React, { useState } from 'react'
import Numbers from './components/Numbers'
import Add from './components/Add'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([
	{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

	const checkDup = (personArr) => {
		const lst = personArr.map(person => person.name)
		var isDuplicate = lst.some(function(item, idx){ 
			return lst.indexOf(item) !== idx 
		});
		if (isDuplicate === true)
			return false
		else
			return true;
	}

	const addName = (event) => {
		event.preventDefault();
		const newObj = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		}
		if (!checkDup(persons.concat(newObj))) {
			window.alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(newObj))
			setNewName('')
			setNewNumber('')
		}
	}

  return (
    <div>
    	<h2>Phonebook</h2>
		<Filter setNewFilter={setNewFilter}/>
		<Add addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
    	<Numbers persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App