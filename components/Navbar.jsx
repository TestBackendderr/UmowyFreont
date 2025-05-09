import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">CRM System</Link>
      </div>
      <p>{user ? `${user.sub} : ${user.role}` : "Not logged in"}</p>
      <div className="navbar-actions">
        {user && (
          <button className="logout-btn" onClick={logout}>
            Wyloguj
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
