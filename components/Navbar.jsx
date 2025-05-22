import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import Leftside from "./Leftside";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return null;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="burger" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div className="navbar-logo">
            <Link href="/">CRM System</Link>
          </div>
        </div>

        <p className="navbar-user">
          {user ? `${user.sub} : ${user.role}` : "Not logged in"}
        </p>

        <div className="navbar-actions">
          {user && (
            <button className="logout-btn" onClick={logout}>
              Wyloguj
            </button>
          )}
        </div>
      </nav>

      <Leftside isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
