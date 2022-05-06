import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Stylesheet
import "./styles.css";

// Utils
import { commonOptions, dataColorPalette } from "../../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Responsable d'afficher le taux de réussite
 * des Rockets
 *
 * @param {string[]} rocketID
 * @param {string[]} rocketName
 * @param {Object[]} pastLaunches
 */
export default function SuccessRate({ rocketsID, rocketsName, pastLaunches }) {
  const flight_numbers = pastLaunches.map((_, index) => index);

  return (
    <div className="chart-container lbs">
      <h2 className="text-center">Taux de succès</h2>

      <div style={{ height: "80%" }}>
        <Line
          options={options}
          data={{
            labels: flight_numbers.map((v) => `#${v + 1}`),
            datasets: [
              ...rocketsName.map((name, index) => ({
                label: name,
                type: "line",
                data: flight_numbers.map((flight_number) =>
                  computeSuccessRate(
                    pastLaunches,
                    flight_number,
                    rocketsID[index]
                  )
                ),
                fill: false,
                borderColor: dataColorPalette[index],
                backgroundColor: dataColorPalette[index]
              })),
              {
                label: "Toutes les Rockets",
                type: "line",
                data: flight_numbers.map((flight_number) =>
                  computeSuccessRate(pastLaunches, flight_number)
                ),
                fill: false,
                borderColor: "#ffffffee",
                backgroundColor: "#ffffffee"
              }
            ]
          }}
        />
      </div>
    </div>
  );
}

/**
 * Calcule le taux de réussite d'une rocket à l'aide
 * de ses résultats passés
 *
 * @param {Launch[]} pastLaunches
 * @param {number} flight_number
 * @param {string} rocketID
 */
function computeSuccessRate(pastLaunches, flight_number, rocketID) {
  const givenLaunch = pastLaunches[flight_number];
  const launchesUpToThatPoint = pastLaunches.filter(
    ({ date_local, rocket }) =>
      new Date(date_local) <= new Date(givenLaunch.date_local) &&
      (!rocketID || rocket === rocketID)
  );

  const launchSuccess = launchesUpToThatPoint.filter(({ success }) => success)
    .length;

  return (100 * launchSuccess) / launchesUpToThatPoint.length;
}

const options = {
  ...commonOptions,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "white",
        font: {
          size: 15,
          family: "Share Tech"
        }
      }
    }
  }
};
