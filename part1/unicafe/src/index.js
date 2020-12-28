import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handler, name}) => {
	return (
		<button onClick={handler}>{name}</button>
	)
} 

const Statistic = ({name, value}) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad, all}) => {
	if (all === 0) {
		return (
		<p>No feedpack given</p>
		)
	} else {
		return (
			<table>
				<tbody>
					<Statistic name='Good' value={good} />
					<Statistic name='Neutral' value={neutral} />
					<Statistic name='Bad' value={bad} />
					<Statistic name='All' value={all} />
					<Statistic name='Avarage' value={(good - bad) / all} />
					<Statistic name='Positive' value={good / all * 100 + " %"} />
				</tbody>
			</table>
		)
	}
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const all = good + bad + neutral;

	return (
		<div>
		  	<h1>Give feedpack</h1>
			<Button handler={() => setGood(good + 1)} name='Good'/>
			<Button handler={() => setNeutral(neutral + 1)} name='neutral' />
			<Button handler={() => setBad(bad + 1)} name='bad' />
			<Statistics good={good} neutral={neutral} bad={bad} all={all}/>
		</div>
	)
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)