import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from "../../services/auth-service.js";

export const Login = () => {

	const[correo, setCorreo] = useState('');
	const[password, setPassword] = useState('');

	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();

		const user = {
			correo: correo,
			password: password
		}

		AuthService.login(user)
		.then(() => {
			history.push('/tickets');
			window.location.reload();
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
					  <h1 className="h3 mb-3 font-weight-normal text-center">Ingreso</h1>
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
					  <button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
					  
					</form>
				</div>
			</div>
		</div>
	)
}