/**
 * Inspired by https://tdunn891.github.io/spacex-dashboard/
 */

import React, { useReducer } from "react";

// Components
import FilteredRecords from "./components/FilteredRecords";
import Footer from "./components/Footer";
import Historique from "./components/Historique";
import Maps from "./components/Maps";
import Menu from "./components/Menu";
import NextLaunch from "./components/NextLaunch";

// Stylesheet
import "./styles.css";

export default function App() {
  const [state, dispatch] = useReducer(navInFr_reducer, initialRecordset);

  return (
    <div className="App">
      <Menu menuItems={menuItems} />

      <Historique id={menuItems[0].id} />

      <div id={menuItems[1].id} className="fr">
        <h1>Engregistrements :</h1>

        <div className="btn">
          <button onClick={() => dispatch({ type: "PREV" })}>PREV</button>
          <button onClick={() => dispatch({ type: "NEXT" })}>NEXT</button>
        </div>
      </div>

      <FilteredRecords recordset={state.recordset} gap={gap} />

      <hr />

      <NextLaunch id={menuItems[2].id} />

      <hr />

      <Maps id={menuItems[3].id} />

      <Footer />
    </div>
  );
}

const menuItems = [
  {
    id: "Historique",
    title: "Historique de lancement"
  },
  {
    id: "Enregistrement",
    title: "Enregistrements"
  },
  {
    id: "Prochain",
    title: "Prochain lancement"
  },
  {
    id: "PLaces",
    title: "Places"
  }
];

const gap = 8;

const initialRecordset = { recordset: 0 };

function navInFr_reducer(state, action) {
  switch (action.type) {
    case "NEXT":
      return {
        recordset:
          state.recordset + gap >= 160 ? state.recordset : state.recordset + gap
      };
    case "PREV":
      return {
        recordset: state.recordset - gap < 0 ? 0 : state.recordset - gap
      };
    default:
      throw new Error("ACTION INEXISTANTE");
  }
}
