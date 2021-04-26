import React from 'react';
import './styles.css';
import NavBar from './NavBar/index'
import Main from './Main/index'

const Page: React.FC<{}> = () => {

  return (
    <div className='page'>
      <NavBar></NavBar>
      <Main></Main>
    </div>
  )
};

export default Page;
