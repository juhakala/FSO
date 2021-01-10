import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	return axios.get(baseUrl).then(response => response.data)
}

const create = (newObj) => {
	return axios.post(baseUrl, newObj).then(response => response.data)
}

const deleteOne = (id) => {
	return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id, newObj) => {
	return axios.put(`${baseUrl}/${id}`, newObj).then(response => response.data)
}

const personsService = { getAll, create, deleteOne, update }

export default personsService