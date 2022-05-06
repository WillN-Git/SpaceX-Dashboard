import React, { useState } from "react";
import { Link } from "react-scroll";

import "./styles.css";

/**
 * Responsable d'afficher le menu
 */

export default function Menu({ menuItems }) {
  const [active, setActive] = useState("Historique de lancement");

  return (
    <nav>
      <div className="box">
        <img
          src="https://farm5.staticflickr.com/4711/40126461411_aabc643fd8_b.jpg"
          alt=""
          className="image"
        />
        <span className="title">Tableau de bord SpaceX</span>
        <span className="dataSource">
          Source de données:&nbsp;
          <a
            href="https://github.com/r-spacex/SpaceX-API"
            className="active dataLink"
          >
            API SpaceX
          </a>
        </span>
      </div>

      <div className="menu">
        {menuItems.map(({ id, title }) => (
          <Link
            key={title}
            to={id}
            spy={true}
            smooth={true}
            duration={500}
            className={active === title ? "active uppercase" : "uppercase"}
            onClick={() => setActive(title)}
          >
            {title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
