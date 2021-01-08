import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'
import Add from './components/Add'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
	console.log('run')
	axios
		.get('http://localhost:3001/persons')
		.then(resp => {
			setPersons(resp.data)
		})
  }, [])

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