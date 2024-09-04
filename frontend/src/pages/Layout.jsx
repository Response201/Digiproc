import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';


export const Layout = () => {
  return (
    <article className='appContainer'>
      <header >
      <Navbar  />
      </header>
      <main>
        <Outlet />
      </main>
    </article>
  );
};
