import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handler, name}) => {
	return (
		<button onClick={handler} >{name}</button>
	)
}

const Ane = ({votes, selected, text}) => {
	if (selected === -1) {
		return (
			<>
				<h1>Anecdote of the day</h1>
				<p>no anecdote selected</p>
			</>
		)
	}
	return (
		<>
			<h1>Anecdote of the day</h1>
			<p>{text}</p>
			<p>has {votes[selected]} votes</p>
		</>
	)
}

const High = ({votes, most, text}) => {
	if (votes[most] === 0) {
		return (
			<>
				<h1>Anecdote with most votes</h1>
				<p>no votes yet</p>
			</>
		)
	}
	return (
		<>
			<h1>Anecdote with most votes</h1>
			<p>{text}</p>
			<p>has {votes[most]} votes</p>
		</>
	)
}

const App = (props) => {
	const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
	const [votes, setVotes] = useState(points)
	const [most, setMost] = useState(0)
	const [selected, setSelected] = useState(-1)
	const voter = () => {
		const copy = { ...votes }
		copy[selected] += 1;
		if (copy[selected] > copy[most])
			setMost(selected)
		setVotes(copy);
	}
 	const handler = () => { setSelected(Math.floor(Math.random() * Math.floor(6))); }
 	return (
		<div>
			<Ane votes={votes} selected={selected} text={props.anecdotes[selected]}/>
			<Button handler={voter} name='vote'/>
			<Button handler={handler} name='next' />
			<High votes={votes} most={most} text={props.anecdotes[most]}/>
		</div>
 	)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)