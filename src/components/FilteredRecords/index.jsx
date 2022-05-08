import React, { useState, useEffect } from "react";

// Stylesheet
import "./styles.css";

/**
 * Responsable d'afficher les lancements enregistrés
 *
 * @param {number} recordset
 * @param {number} gap
 */
export default function FilteredRecords({ recordset, gap }) {
  const [launches, setLaunches] = useState([]);

  const filteredRecords = [...launches]
    .filter((item) => item.success !== null)
    .reverse()
    .slice(recordset, recordset + gap);

  // Fetch Launches
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches")
      .then((res) => res.json())
      .then((d) =>
        setLaunches(
          d.map(({ links, flight_number, name, date_local, success }) => ({
            links,
            flight_number,
            name,
            date_local,
            success
          }))
        )
      )
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h4
        style={{ fontStyle: "italic", textAlign: "right", marginRight: "10px" }}
      >
        Affichage {recordset + 1} - {recordset + gap} sur 160
      </h4>

      <div className="fr-container">
        <table>
          <thead>
            <th> Flight #</th>
            <th> Patch </th>
            <th> Mission </th>
            <th> Launch Date </th>
            <th> Launch Result </th>
            <th> Video </th>
          </thead>
          <tbody>
            {filteredRecords.map(
              ({ links, date_local, flight_number, name, success }) => (
                <tr>
                  <td>#{flight_number}</td>
                  <td>
                    <img
                      src={links.patch.small}
                      height="50px"
                      width="50px"
                      alt={name}
                    />
                  </td>
                  <td>{name}</td>
                  <td>{date_local.split("T")[0]}</td>
                  <td>
                    {success ? (
                      <span class="success" title="null">
                        SUCCESS
                      </span>
                    ) : (
                      <span class="failure" title="Fail">
                        FAILURE
                      </span>
                    )}
                  </td>
                  <td class="primary">
                    <a href={links.webcast} target="_blank">
                      {" "}
                      <img
                        src="https://png.pngtree.com/png-clipart/20210214/ourmid/pngtree-youtube-logo-transparent-png-png-image_5990834.png"
                        height="25"
                        width="25"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
