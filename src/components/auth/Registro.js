import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import AuthService from "../../services/auth-service.js";

export const Registro = () => {

	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		const user = {
			nombre: nombre,
			correo: correo,
			password: password
		}

		AuthService.registro(user)
		.then((res) => {
			history.push('/login');
		})
		.catch((err) => {
			console.log(err);
		});

	}


	return(
		<div className="container">
			<div className="row">
		    	<div className="col-md-5 mt-5 mx-auto">
		    		<form className="form-signin" onSubmit = {handleSubmit}>
					  <h1 className="h3 mb-3 font-weight-normal text-center">Registro</h1>
					  <label  className="">Nombre</label>
					  <input type="text"
					  		 value={nombre}
					  		 onChange={(e)=>setNombre(e.target.value)}
					  		 id="inputEmail" 
					  		 className="form-control" 
					  		 placeholder="" 
					  		   />
					  <label  className="">Correo Electronico </label>
					  <input type="text"
					  		 value={correo}
					  		 onChange={(e)=>setCorreo(e.target.value)}
					  		 id="inputEmail" 
					  		 className="form-control" 
					  		 placeholder="" 
					  		   />

					  <label  className="">Contraseña</label>
					  <input type="password"
					  		 value={password}
					  		 onChange={(e)=>setPassword(e.target.value)}
							 id="inputPassword" 
							 className="form-control" 
							 placeholder=""  />
						<br/>
					  <button className="btn btn-lg btn-primary btn-block" type="submit">Registrar</button>
					  <p className="mt-5 mb-3 text-muted">&copy; </p>
					</form>
				</div>
			</div>
		</div>
	)
}