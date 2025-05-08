import React from 'react';
import Link from 'next/link';

const Leftside = () => {
  const menuItems = [
    { name: 'Kontakty', path: '/kontakty', icon: '👥' },
    { name: 'Spotkania', path: '/spotkania', icon: '📅' },
    { name: 'Oferty', path: '/oferty', icon: '📋' },
    { name: 'Umowy', path: '/umowy', icon: '📝' },
  ];

  return (
    <aside className="leftside">
      <nav className="menu">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path} className="menu-item">
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="menu-buttons">
        <Link href="/utworz-umowe">
          <button className="action-button">Utwórz Umowę</button>
        </Link>
        <button className="action-button secondary">Lista Umów</button>
      </div>
    </aside>
  );
};

export default Leftside;