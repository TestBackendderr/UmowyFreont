import React from "react";
import Dane from "./biuro/Dane";
import NumerUmowy from "./biuro/NumerUmowy";
import Status from "./biuro/Status";
import Platnosci from "./biuro/Platnosci";
import DaneInstalacji from "./biuro/DaneInstalacji";
import Dokumenty from "./biuro/Dokumenty";
import DataZlozenia from "./biuro/DataZlozenia";
import Historia from "./biuro/Historia";

const UmowaWiecejContent = ({ umowa, umowaId }) => {
  const parsedUmowaId = parseInt(umowaId, 10);
  return (
    <div className="biuro2-content">
      <div className="biuro2-container">
        <div className="biuro2-left">
          <div className="biuro2-top-row">
            <Dane />
            <NumerUmowy />
            <Status />
          </div>
          <div className="biuro2-main-grid">
            <Platnosci umowaId={parsedUmowaId} />
            <DaneInstalacji />
            <Dokumenty umowaId={parsedUmowaId} />
            <DataZlozenia umowaId={parsedUmowaId} />
          </div>
        </div>
        <Historia />
      </div>
    </div>
  );
};

export default UmowaWiecejContent;
