import React from "react";
import Dane from "./biuro/Dane";
import NumerUmowy from "./biuro/NumerUmowy";
import Status from "./biuro/Status";
import Platnosci from "./biuro/Platnosci";
import DaneInstalacji from "./biuro/DaneInstalacji";
import Dokumenty from "./biuro/Dokumenty";
import DataZlozenia from "./biuro/DataZlozenia";
import Historia from "./biuro/Historia";
import UtworzZadanie from "./biuro/UtworzZadanie";

const UmowaWiecejContent = ({ umowa, umowaId }) => {
  const parsedUmowaId = parseInt(umowaId, 10);

  return (
    <div className="biuro2-content">
      <div className="biuro2-container">
        <div className="biuro2-left">
          <div className="biuro2-top-row">
            <Dane umowaId={parsedUmowaId} umowa={umowa} />
            <NumerUmowy umowa={umowa} />
            <Status umowa={umowa} />
          </div>
          <div className="biuro2-main-grid">
            <Platnosci umowa={umowa} umowaId={parsedUmowaId} />
            <DaneInstalacji umowa={umowa} />
            <Dokumenty umowaId={parsedUmowaId} />
            <DataZlozenia umowaId={parsedUmowaId} />
          </div>
        </div>
        <div className="biuro2-right">
          <Historia umowa={umowa} />
          <UtworzZadanie umowaId={parsedUmowaId} umowa={umowa} />
        </div>
      </div>
    </div>
  );
};

export default UmowaWiecejContent;