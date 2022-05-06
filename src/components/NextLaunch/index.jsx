import React, { useEffect, useState, useRef } from "react";

// Stylesheet
import "./styles.css";

export default function NextLaunch({ id }) {
  const [nextLaunchTime, setNextLaunchTime] = useState(new Date());
  const [nextLaunch, setNextLaunch] = useState({});
  const [launches, setLaunches] = useState([]);

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  // Fetch Next LaunchTime
  useEffect(() => {
    fetch("https://api.spacexdata.com/v5/launches/next")
      .then((res) => res.json())
      .then((d) => setNextLaunchTime(new Date(d.date_utc)))
      .catch((err) => console.error(err));
  }, []);

  // Fetch Next Launch
  useEffect(() => {
    fetch("https://api.spacexdata.com/v5/launches/next")
      .then((res) => res.json())
      .then((d) => setNextLaunch(d))
      .catch((err) => console.error(err));
  }, []);

  const upcomingLaunches = [...launches].filter((item) => item.upcoming);

  const mission = nextLaunch.name;
  const flight_number = nextLaunch.flight_number;
  const rocketLogo = nextLaunch.links?.patch?.large;
  const launchWindow = nextLaunch.date_local;

  // Fetch Launches
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches")
      .then((res) => res.json())
      .then((d) =>
        setLaunches(
          d.map(
            ({
              links,
              flight_number,
              name,
              date_local,
              success,
              upcoming
            }) => ({
              links,
              flight_number,
              name,
              date_local,
              success,
              upcoming
            })
          )
        )
      )
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const startTimer = () => {
    const countdownDate = nextLaunchTime.getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        // Mise à Jour des timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  // Countdown
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <div id={id}>
      <h1 className="title">Prochain Lancement</h1>

      <div className="grid-box">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <img
            src="https://tdunn891.github.io/spacex-dashboard/assets/img/falcon9.png"
            height="440px"
            alt=""
          />

          <div className="upcomingLaunch">
            <div>
              <img src={rocketLogo} width="180" alt="" />
            </div>

            <p>
              Numéro de vol: {flight_number}
              <br />
              Mission: {mission}
              <br />
              Fenêtre de lancement: {launchWindow}
            </p>

            <div className="countdown">
              <p>
                {timerDays} <br /> Jour{timerDays <= 1 ? "" : "s"}
              </p>
              <p>
                {timerHours} <br /> Heure{timerHours <= 1 ? "" : "s"}
              </p>
              <p>
                {timerMinutes} <br /> Minute{timerMinutes <= 1 ? "" : "s"}
              </p>
              <p>
                {timerSeconds} <br /> Seconde{timerSeconds <= 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <th> Mission </th>
              <th> Launch Date </th>
            </thead>
            <tbody>
              {upcomingLaunches.map(
                ({ date_local, name }) =>
                  new Date() < new Date(date_local) && (
                    <tr>
                      <td>{name}</td>
                      <td>{date_local.split("T")[0]}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
