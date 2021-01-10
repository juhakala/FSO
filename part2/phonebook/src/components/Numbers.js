import React from 'react'

const Name = ({person, filter, deleteName}) => {
	if (person.name.toUpperCase().includes(filter.toUpperCase())) {
		return (
			<li>{person.name}: {person.number} <button onClick={deleteName}>Delete</button></li>
		)
	} else {
		return (<></>)
	}
} 

const Numbers = ({persons, filter, deleteName}) => {
	return (
		<>
			<h2>Numbers</h2>
			<ul>
				{persons.map(person => <Name key={person.id} person={person} filter={filter} deleteName={() => deleteName(person.id)} />)}
			</ul>
		</>
	)
}

export default Numbers