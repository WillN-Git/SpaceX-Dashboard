import React, { useState, useEffect } from "react";

// Components
import LaunchByRockets from "../LaunchByRockets";
import LaunchByYear from "../LaunchByYear";
import LaunchResult from "../LaunchResult";
import SuccessRate from "../SuccessRate";

// Stylesheet
import "./styles.css";

export default function Historique({ id }) {
  // Rockets const
  const [rockets, setRockets] = useState([]);
  const rocketsID = rockets.map((rocket) => rocket.id);
  const rocketsName = rockets.map((rocket) => rocket.name);

  // Launches const
  const [launches, setLaunches] = useState([]);
  const pastLaunches = launches.filter((launch) => !launch.upcoming);
  const successfulLaunches = launches.filter((launch) => launch.success);
  const failedLaunches = launches.filter((launch) => !launch.success);
  // const upcomingLaunches = launches.filter((launch) => launch.upcoming);
  const launchesYears = [
    ...new Set(launches.map((launch) => launch.year))
  ].sort();

  // Fetch Launches
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches")
      .then((res) => res.json())
      .then((d) =>
        setLaunches(
          d.map(
            ({
              id,
              name,
              rocket,
              upcoming,
              date_local,
              success,
              flight_number
            }) => ({
              id,
              name,
              upcoming,
              rocket,
              success,
              flight_number,
              date_local,
              year: new Date(date_local).getFullYear()
            })
          )
        )
      )
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Fetch Rockets
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((res) => res.json())
      .then((d) => {
        return setRockets(
          d.map(({ id, name, engines }) => ({
            id,
            name,
            number: engines.number
          }))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div id={id} className="History">
      <div style={{ height: "90px" }} />

      <div>
        <div className="flex-r">
          <img
            src="https://farm5.staticflickr.com/4645/38583830575_3f0f7215e6_b.jpg"
            className="image"
            alt=""
          />

          <h1 className="uppercase">Historique des lancements</h1>
        </div>
        <p>
          Explorez l'historique de lancement de SpaceX - cliquez sur les
          segments de graphique pour filtrer.
        </p>

        <p>Affichage de tous les lancements</p>
      </div>

      <div className="charts">
        <div className="lbr-lr">
          <LaunchByRockets
            rocketsID={rocketsID}
            rocketsName={rocketsName}
            pastLaunches={pastLaunches}
          />
          <div style={{ marginTop: "15px" }} />
          <LaunchResult
            successfulLaunches={successfulLaunches}
            failedLaunches={failedLaunches}
          />
        </div>

        <LaunchByYear
          rocketsID={rocketsID}
          rocketsName={rocketsName}
          launchesYears={launchesYears}
          pastLaunches={pastLaunches}
        />
        <SuccessRate
          rocketsID={rocketsID}
          rocketsName={rocketsName}
          pastLaunches={pastLaunches}
        />
      </div>
    </div>
  );
}
