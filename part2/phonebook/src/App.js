import React, { useEffect, useState } from 'react'
import personsService from './services/person'
import Numbers from './components/Numbers'
import Add from './components/Add'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  	const [ persons, setPersons ] = useState([]) 
  	const [ newName, setNewName ] = useState('')
  	const [ newNumber, setNewNumber ] = useState('')
	const [ newFilter, setNewFilter ] = useState('')
	const [ message, setMessage ] = useState(null)

  	useEffect(() => {
		personsService.getAll().then(response => {
			setPersons(response)
		})
  	}, [])

	const checkDup = (personArr) => {
		const lst = personArr.map(person => person.name)
		const firstDupeIndex = lst.findIndex(
			(item, index) => lst.lastIndexOf(item) !== index
		);
		return firstDupeIndex !== -1 ? persons[firstDupeIndex].id : -1
	}

	const newMessage = (message) => {
		setMessage(message)
		setTimeout(() => {
		  setMessage(null)
		}, 3000)
	}

	const addName = (event) => {
		event.preventDefault();
		const newObj = {
			name: newName,
			number: newNumber
		}
		const indexs = checkDup(persons.concat(newObj))
		if (indexs !== -1) {
			if (window.confirm(`Do you want to update ${newName}'s number?`)) {
				newObj.id = indexs;
				personsService.update(indexs, newObj).then(response => {
					const clone = [...persons]
					const lst = persons.concat(newObj).map(person => person.name)
					const place = lst.findIndex(
						(item, index) => lst.lastIndexOf(item) !== index
					);
					clone[place] = response
					setPersons(clone)
					setNewName('')
					setNewNumber('')
					newMessage(`Updated ${response.name}`)
				})
				.catch(error => {
					newMessage(`Person '${newName}' was already removed from server`)
					setNewName('')
					setNewNumber('')
					personsService.getAll().then(response => {
						setPersons(response)
					})
				})
			}
		} else {
			personsService.create(newObj).then(response => {
				setPersons(persons.concat(response))
				setNewName('')
				setNewNumber('')
				newMessage(`Added ${response.name}`)
			})
		}
	}

	const deleteName = (id) => {
		if (window.confirm("Do you really want to delete this one?")) {
			personsService.deleteOne(id).then(() => {
				setPersons(persons.filter(person => person.id !== id));
			})
		}
	}

  return (
    <div>
    	<h2>Phonebook</h2>
		<Notification message={message} />
		<Filter setNewFilter={setNewFilter}/>
		<Add addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
    	<Numbers persons={persons} filter={newFilter} deleteName={deleteName} />
    </div>
  )
}

export default App