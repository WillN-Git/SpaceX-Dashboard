import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Stylesheet
import "./style.css";

/**
 * Responsable d'afficher la carte avec les sites
 * de lancement de SpaceX
 *
 * @param {string} id
 */

export default function Maps({ id }) {
  const [places, setPlaces] = useState([]);

  // Fetch Landpads
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/landpads")
      .then((res) => res.json())
      .then((d) => setPlaces(d))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id={id} style={{ width: "100%" }}>
      <div className="Maps">
        <h1 style={{ margin: "20px 10px" }}>Places de lancement</h1>

        <MapContainer
          center={[35.09024, -95.712891]}
          zoom={5}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {places.map(
            ({ status, full_name, locality, region, latitude, longitude }) => (
              <Marker position={[latitude, longitude]}>
                <Popup>
                  {full_name} <br />
                  {locality} - {region} <br />
                  <span style={{ textAlign: "center" }}>{status}</span>
                </Popup>
              </Marker>
            )
          )}
        </MapContainer>
      </div>
    </div>
  );
}
