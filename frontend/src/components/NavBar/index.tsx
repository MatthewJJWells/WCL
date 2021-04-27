import React from 'react';
import './styles.css';
import logo from '../../images/logo3.png';

const NavBar = () => (
	<div className='nav-bar'>
		<div className='logo-name'>
			<img className='logo' src={logo} alt='WCL Logo'/>
			<p className='title'>Warcraft Lookup</p>
		</div>
		<div className='sign-in'>
			<button className='sign-up'>Sign up</button>
			<button className='login'>Login</button>
		</div>
	</div>
);

export default NavBar;
