import React from 'react';
import Navbar from '../components/Navbar';
import Leftside from '../components/Leftside';
import Middleside from '../components/Middleside';
import Rightside from '../components/Rightside';

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Leftside />
      <Middleside />
      <Rightside />
    </div>
  );
}