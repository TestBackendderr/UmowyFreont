import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">CRM System</Link>
      </div>
      <div className="navbar-actions">
        <button className="logout-btn">Wyloguj</button>
      </div>
    </nav>
  );
};

export default Navbar;