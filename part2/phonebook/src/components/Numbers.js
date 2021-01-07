import React from 'react'

const Name = ({person, filter}) => {
	if (person.name.toUpperCase().includes(filter.toUpperCase())) {
		return (
			<li>{person.name}: {person.number}</li>
		)
	} else {
		return (<></>)
	}
} 

const Numbers = ({persons, filter}) => {
	console.log(filter);
	return (
		<>
			<h2>Numbers</h2>
			<ul>
				{persons.map(person => <Name key={person.id} person={person} filter={filter} />)}
			</ul>
		</>
	)
}

export default Numbers