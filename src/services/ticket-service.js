import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/tickets/';

const getTickets = () => {
	return axios.get(API_URL + 'lista', 
		{ headers:authHeader() });
};

const getTicketsByUser = (data) => {
	return axios.get(API_URL + 'listarByUser/?userId='+data,
		{ headers:authHeader() });
};


const addTicket = (data) => {
	return axios.post(API_URL + 'agregar', {
			ticket: data.ticket,
    		usuario: data.usuario,
		},{ headers:authHeader() });
};

const modificarTicket = (data) => {
	return axios.post(API_URL + 'modificar', {
			id: data.id,
			ticket: data.ticket,
    		usuario: data.usuario,
		},{ headers:authHeader() });
};

const eliminarTicket = (id) => {
	return axios.post(API_URL + 'eliminar', {
			id: id
		},{ headers:authHeader() });
};


export default {
	getTickets,
	addTicket,
	modificarTicket,
	eliminarTicket,
	getTicketsByUser
}