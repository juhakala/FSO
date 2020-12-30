import React from 'react'

const Header = (props) => {
 	return (
		<h1>{props.course.name}</h1>
	)
}

const Part = (props) => {
	return (
	   <p>{props.part.name} {props.part.exercises}</p>
   )
}

const Content = (props) => {
	return (
		<>
			{props.course.parts.map(part => <Part key={part.id} part={part} />)}
		</>
	)
}

const Total = ({course}) => {
	const total = course.parts.reduce((s, p) => s + p.exercises , 0)
	return (
	   <p>Number of exercises {total}</p>
	)
}

const Course = ({course}) => {
	return (
		<div>
		   <Header course={course} />
			 <Content course={course} />
			 <Total course={course} />
		 </div>
   )
}

export default Course