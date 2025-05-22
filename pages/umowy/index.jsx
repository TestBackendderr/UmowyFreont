import React from "react";
import Navbar from "../../components/Navbar";
import Leftside from "../../components/Leftside";
import ListaUmow from "../../components/ListaUmow";
import withAuth from "@/utils/withAuth";

const UmowyPage = () => {
  return (
    <div className="umowy-page-layout">
      <Navbar />
      <Leftside />
      <div className="lista-umow-content">
        <ListaUmow />
      </div>
    </div>
  );
};

export default withAuth(UmowyPage);
