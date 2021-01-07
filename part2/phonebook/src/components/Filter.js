import React from 'react'

const Filter = ({setNewFilter}) => {
	return (
		<>
		filter shown with:
		<input onChange={(event) => setNewFilter(event.target.value)} />
		</>
	)
}

export default Filter