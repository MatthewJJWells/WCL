import React from 'react';
import './styles.css';

const NavBar = () => (
  <div className='nav-bar'>
    <img src='./logo1.png' alt='img'/>
    <p className='title'>WCL</p>
    <button className='sign-up'>Sign up</button>
    <button className='login'>Login</button>
  </div>
);

export default NavBar;
