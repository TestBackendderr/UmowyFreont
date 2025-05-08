import React from 'react';
import Navbar from '../components/Navbar';
import Leftside from '../components/Leftside';
import UtworzUmowe from '../components/UtworzUmowe';

const UtworzUmowePage = () => {
  return (
    <div className="utworz-umowe-page">
      <Navbar />
      <Leftside />
      <div className="utworz-umowe-content">
        <UtworzUmowe />
      </div>
    </div>
  );
};

export default UtworzUmowePage;