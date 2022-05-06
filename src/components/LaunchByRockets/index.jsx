import React, { useState, useEffect, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Stylesheet
import "./styles.css";

//Utils
import {
  dataColorPalette,
  commonOptions as options
} from "../../utils/constants";

/**
 * Responsable d'afficher le nombre de lancement par rocket
 * @params Aucun
 */

export default function LaunchByRockets({
  rocketsID,
  rocketsName,
  pastLaunches
}) {
  const [rockets, setRockets] = useState([]);

  const number = rockets.map((obj) => obj.number);

  const data = {
    "Falcon 1": pastLaunches.filter(({ rocket }) => rocket === rocketsID[0])
      .length,
    "Falcon 9": pastLaunches.filter(({ rocket }) => rocket === rocketsID[1])
      .length,
    "Falcon Heavy": pastLaunches.filter(({ rocket }) => rocket === rocketsID[2])
      .length,
    Starship: pastLaunches.filter(({ rocket }) => rocket === rocketsID[3])
      .length
  };

  // Render
  return (
    <div className="chart-container lbr">
      <h2 className="text-center">Lancement par Rocket</h2>

      <div>
        <Pie
          data={{
            labels: rocketsName,
            datasets: [
              {
                data: Object.values(data),
                backgroundColor: [...dataColorPalette],
                borderColor: [...dataColorPalette],
                borderWidth: 1
              }
            ]
          }}
          options={{
            ...options,
            plugins: {
              legend: {
                position: "left",
                labels: {
                  color: "white",
                  font: {
                    size: 15,
                    family: "Share Tech"
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}

ChartJS.register(ArcElement, Tooltip, Legend);
