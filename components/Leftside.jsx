import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Leftside = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const menuItems = React.useMemo(() => {
    if (user?.role === "Handlowiec") {
      return [
        { name: "Kontakty", path: "/kontakty", icon: "👥" },
        { name: "Spotkania", path: "/spotkania", icon: "📅" },
        { name: "Oferty", path: "/oferty", icon: "📋" },
        { name: "Umowy", path: "/umowy", icon: "📝" },
        { name: "Zadania", path: "/listazadan", icon: "📋" },
      ];
    }

    if (user?.role === "Biuro_Obslugi") {
      return [{ name: "Lista Umów", path: "/umowy", icon: "📝" }];
    }

    return [];
  }, [user?.role]);

  return (
    <aside className={`leftside ${isOpen ? "open" : ""}`}>
      <nav className="menu">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="menu-item"
            onClick={onClose}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="menu-buttons">
        {user?.role === "Handlowiec" && (
          <Link href="/utworz-umowe" onClick={onClose}>
            <button className="action-button">Utwórz Umowę</button>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Leftside;
