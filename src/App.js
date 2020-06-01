import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route , Switch, Link} from 'react-router-dom';

//import { Navbar } from './components/Navbar.js';
import { Login } from './components/auth/Login.js';
import { Registro } from './components/auth/Registro.js';
import { Ticket } from './components/Tickets.js';
import { Perfil } from './components/Perfil.js';

import AuthService from './services/auth-service.js';


const App = () => {

 // const [isAdmin, setIsAdmin] = useState(false);
  //const [isUser, setIsUser] = useState(false);
  const [infoUser, setInfoUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getInfoUser();
    
    if (user) {
      setInfoUser(user);
      //setIsUser(user.rol.include('admin'));
     // setIsAdmin(user.rol.include('user'));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  }
  //if (infoUser) {console.log(infoUser)}

  //console.log(infoUser);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to className="navbar-brand">
            Prueba Tickets
          </Link>
          


          {infoUser ? (

            <div className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to={"/tickets"} className="navbar-brand">
                  Tickets
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/perfil"} className="nav-link">
                  {infoUser.nombre}
                </Link>
              </li>
              
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Salir
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/registro"} className="nav-link">
                  Registro
                </Link>
              </li>
            </div>
          )}
        </nav>

        

        <div className="container my-4">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/perfil" component={Perfil} />
            <Route path="/tickets" component={Ticket} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
