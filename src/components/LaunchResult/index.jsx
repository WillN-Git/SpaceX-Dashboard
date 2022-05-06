import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { commonOptions } from "../../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function LaunchResult({ successfulLaunches, failedLaunches }) {
  return (
    <div className="chart-container lr" style={{ height: "150px" }}>
      <h3 className="text-center">Résultat de lancement</h3>

      <div style={{ height: "80%" }}>
        <Bar
          options={options}
          data={{
            labels: ["Réussites", "Echec"],
            datasets: [
              {
                label: "Réussite",
                data: [successfulLaunches.length, 0],
                backgroundColor: "rgba(0, 255, 0, .5)"
              },
              {
                label: "Echec",
                data: [0, failedLaunches.length],
                backgroundColor: "rgba(255, 0, 0, .5)"
              }
            ]
          }}
        />
      </div>
    </div>
  );
}

const options = {
  ...commonOptions,
  indexAxis: "y",
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
};
