import React, { useState } from 'react';

import { Link, withRouter, useHistory } from 'react-router-dom';

export const Navbar = () => {

	const [loginRegLink, setLoginRegLink] = useState('');

	const [userLink, setUserLink] = useState('');

	const loginRegLink = (
	  <ul className="navbar-nav">
	    <li className="nav-item">
	      <Link to="/" className="nav-link">Login</Link>
	    </li>
	    <li className="nav-item">
	      <Link to="/registro" className="nav-link">Register</Link>
	    </li>
	  </ul>
	)


	const userLink = (
	  <ul className="navbar-nav">
	    <li className="nav-item">
	      <Link to="" className="nav-link">
	        Tickets
	      </Link>
	    </li>
	    <li className="nav-item">
	      <a href=""  className="nav-link">
	        Logout
	      </a>
	    </li>
	  </ul>
	)

	return (	
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
		    <button
		      className="navbar-toggler"
		      type="button"
		      data-toggle="collapse"
		      data-target="#navbarsExample10"
		      aria-controls="navbarsExample10"
		      aria-expanded="false"
		      aria-label="Toggle navigation"
		    >
		      <span className="navbar-toggler-icon" />
		    </button>

		    <div
		      className="collapse navbar-collapse justify-content-md-center"
		      id="navbarsExample10"
		    >
		      <ul className="navbar-nav">
		        <li className="nav-item">
		          
		        </li>
		      </ul>
		      {localStorage.usertoken ? userLink : loginRegLink}
		    </div>
		</nav>
	);
}
