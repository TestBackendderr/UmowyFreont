import React from "react";
import Navbar from "../Navbar";
import Leftside from "../Leftside";
import Middleside from "../Middleside";
import Rightside from "../Rightside";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="content">
        <Leftside />
        <Middleside />
        <Rightside />
      </div>
    </div>
  );
}
