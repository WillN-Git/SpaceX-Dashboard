import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Stylesheet
import "./styles.css";

import { commonOptions } from "../../utils/settings";
import { dataColorPalette } from "../../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function LaunchByYear({
  rocketsID,
  rocketsName,
  launchesYears,
  pastLaunches
}) {
  return (
    <div className="chart-container lby">
      <h2 className="text-center">Lancement par Année</h2>

      <div style={{ height: "80%" }}>
        <Bar
          options={options}
          data={{
            labels: launchesYears,
            datasets: [...new Array(rocketsID.length)].map((_, index) => ({
              label: rocketsName[index],
              backgroundColor: dataColorPalette[index],
              data: launchesYears.map(
                (year) =>
                  pastLaunches.filter(
                    (launch) =>
                      launch.year === year && launch.rocket === rocketsID[index]
                  ).length
              )
            }))
          }}
        />
      </div>
    </div>
  );
}

const options = {
  ...commonOptions,
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
