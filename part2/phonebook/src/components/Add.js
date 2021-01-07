import React from 'react'

const Add = ({addName, newName, setNewName, newNumber, setNewNumber}) => {
	return (
		<>
			<h3>Add a new</h3>
			<form onSubmit={addName}>
        		<div>
          			name: <input value={newName} onChange={(event) => setNewName(event.target.value)} required />
		  			<br />
		  			number <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} required />
        		</div>
        		<div>
          			<button type="submit">add</button>
        		</div>
      		</form>
		</>
	)
}

export default Add