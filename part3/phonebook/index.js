const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
//app.use(morgan('tiny'))
morgan.token('content', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
	return [
	  tokens.method(req, res),
	  tokens.url(req, res),
	  tokens.status(req, res),
	  tokens.res(req, res, 'content-length'), '-',
	  tokens['response-time'](req, res), 'ms',
	  tokens.content(req, res)
	].join(' ')
  }))

const persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456"
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323532"
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345"
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "39-23-6423122"
	}
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/info', (request, response) => {
	const stamp = new Date();
	response.send(`<p>Phonebook as info for ${persons.length} people</p><p>${stamp}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const index = persons.map(e => { return e.id; }).indexOf(id);
	if (persons[index])
		response.json(persons[index])
	else
		response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const index = persons.map(e => { return e.id; }).indexOf(id);
	if (index !== -1)
		persons.splice(index, 1)
	response.status(204).end()
})

const checkDup = (name) => {
	return (persons.map(e => { return e.name; }).indexOf(name))
}



app.post('/api/persons', (request, response) => {
	const body = request.body
	if (!body.name || !body.number) {
		return response.status(400).json({ 
			error: 'name and/or number missing' 
		})
	} else if (checkDup(body.name) !== -1) {
		return response.status(400).json({ 
			error: 'name already in database' 
		})
	}
	const person = {
		name: body.name,
		number: body.number,
		id: Math.floor(Math.random() * Math.floor(100000))
	}
	persons.push(person)
	response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)