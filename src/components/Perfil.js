import React from 'react';
import AuthService from '../services/auth-service';

export const Perfil = () => {
	const infoUser = AuthService.getInfoUser();
  //console.log(infoUser);
	return (
    <div className="container">
      <header className="jumbotron">
        <h3>
           Perfil <strong>{infoUser.nombre}</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {infoUser.accessToken.substring(0, 20)} ...{" "}
        {infoUser.accessToken.substr(infoUser.accessToken.length - 20)} 
        
      </p>
      <p>
        <strong>Usuario ID:</strong> {infoUser.id}
      </p>
      <p>
        <strong>Correo:</strong> {infoUser.correo}
      </p>
      <strong>Rol:</strong> {infoUser.rol}
      <ul>
        
      </ul>
    </div>
  );
};
