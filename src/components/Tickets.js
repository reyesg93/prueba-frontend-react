import React, {useState, useEffect} from 'react';

import UserService from '../services/user-service.js';
import TicketService from '../services/ticket-service.js'

import AuthService from '../services/auth-service.js';

const useTicketCollection = () => {
	const user = AuthService.getInfoUser();
	const [listUsuarios, setListUsuarios] = useState([]);
	const [listTicket, setListTicket] = useState([]);
	//const [ticket, setTicket] = useState('');

	const [ticket, setTicket] = useState('');
	const [usuario, setUsuario] = useState('');

	useEffect(() => {

			if (user.rol === 'admin') {
				TicketService.getTickets()
				.then((res) => {
					setListTicket(res.data);

				}).catch((err) => {
					console.log(err);
				});
			}else{
				console.log(user.id);
				TicketService.getTicketsByUser(user.id)
				.then((res) => {

					setListTicket(res.data);

				}).catch((err) => {
					console.log(err);
				});
			}
			
			UserService.getUsers()
			.then((res) => {
				setListUsuarios(res.data);
			}).catch((err) => {
				console.log(err);
			});

			

	}, []);


	return {listTicket, listUsuarios, ticket, setTicket, usuario, setUsuario, setListTicket}
}

export const Ticket = () => {

	const {listTicket, listUsuarios, 
		   ticket, setTicket, 
		   usuario, setUsuario, setListTicket} = useTicketCollection();
	//agregar ticket
	const user = AuthService.getInfoUser();

	const [idticket, setIdTicket] = useState('');

	const handleSubmit = (e) =>{
		e.preventDefault();

		const data = {
			ticket: ticket,
			usuario: usuario
		}
		const dataEdit = {
			id: idticket,
			ticket: ticket, 
			usuario: usuario
		}
		if (idticket) {
			TicketService.modificarTicket(dataEdit)
				.then((res) => {
					window.location.reload();
					//setListTicket(listTicket => [...listTicket, res.data.last]);
				})
				.catch((err) =>{
					console.log(err);
				});

		}else{
			TicketService.addTicket(data)
				.then((res) => {
					
					setListTicket(listTicket => [...listTicket, res.data.last]);
				})
				.catch((err) =>{
					console.log(err);
				});

		}

		
		setTicket('');
		setUsuario('');
	}

	const handleEliminar = ticket => () => {

		TicketService.eliminarTicket(ticket.id)
			.then((res)=> {
				 let items = listTicket.filter(list => list.id !== ticket.id);
    			 setListTicket(items);
			})
			.catch((err) =>{
					console.log(err);
			});
	}

	const handleVer = ticket => () =>{
		
		let item = listTicket.filter(list => list.id === ticket.id);
		setTicket(item[0].ticket_pedido);
		setIdTicket(item[0].id);
		setUsuario(item[0].userId);
	}


	return (
      <div>
      		{user.rol==='admin' ? (<div className="col-lg-12">
			<form  className="" onSubmit={handleSubmit}> 
				<div className="row">
					
					<input type="hidden" value={idticket} />
					<div className="col-lg-6">
						<div className="form-group">
					    	<label><h1>Ticket   {ticket}</h1></label>
					    	<input type="text" value={ticket} onChange={(e)=>setTicket(e.target.value)}  className="form-control" placeholder=""/>
						</div>
					</div>

					<div className="col-lg-6">
						<div className="form-group">
					    	<label><h1>Usuario {usuario}</h1></label>
					    	<select className="form-control" value={usuario} onChange={(e)=>setUsuario(e.target.value)}>
					    		<option>Seleccione..</option>
					    		{listUsuarios.map((usuario, index) => {
					    			return <option key={index} value={usuario.id}>{usuario.nombre}</option>
					    		})}
					    	</select>
						</div>
					</div>
				</div>
				<div className="form-group ">
			    	<button type="submit" className="btn btn-info"><i className="fas fa-plus"></i> Agregar</button>
				</div>
			</form>
			</div>) : (<></>)}
			
			<table className="table md-5">

				<thead className="thead-dark">
				<tr>
				  <th scope="col">#</th>
				  <th scope="col">Descripcion</th>
				  <th scope="col">Usuario</th>
				  <th scope="col">Accion</th>
				</tr>
				</thead>
				<tbody>
					{listTicket.map((ticket, index) => {
						
						return <tr key={index}>
								    <th scope="row">{ticket.id}</th>
								    <td>{ticket.ticket_pedido}</td>
								    <td>{ticket.nombre}</td>
								    <td>
								    {user.rol==='admin' ? ( 
								    	<div>
								    		<button 
								  		className="btn btn-success" 
								  		title="Editar" onClick={handleVer(ticket)}>
								  		<i className="fas fa-times"></i>
								  	</button>
								  		<button 
								  		className="btn btn-danger" 
								  		title="Eliminar" onClick={handleEliminar(ticket)} >
								  		<i className="fas fa-times"></i>
								  	</button>
								    	</div>
								  	) 

								    : (<i></i>)}
								   

								    
								  	</td>
								</tr>;
					})}
				</tbody>
			</table>
		</div>
	);
}