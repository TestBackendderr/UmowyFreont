import React from "react";
import Navbar from "../Navbar";
import Leftside from "../Leftside";
import Middleside from "../Middleside";
import Rightside from "../Rightside";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="content">
        <Leftside />
        <main>{children}</main>
        {/* <Rightside /> */}
      </div>
    </div>
  );
}
