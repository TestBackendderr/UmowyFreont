import React from 'react';
import Navbar from '../components/Navbar';
import Leftside from '../components/Leftside';
import ListaUmow from '../components/ListaUmow';

const ListaUmowPage = () => {
  return (
    <div className="lista-umow-page">
      <Navbar />
      <Leftside />
      <div className="lista-umow-content">
        <ListaUmow />
      </div>
    </div>
  );
};

export default ListaUmowPage;