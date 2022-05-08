import React from "react";
import "./style.css";

export default function Footer() {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <br />
          <p>
            Data Source :
            <a
              href="https://github.com/r-spacex/SpaceX-API"
              rel="noreferrer"
              target="_blank"
            >
              SpaceX API
            </a>
          </p>
          <p>
            Developed by &copy;
           <a
              href="https://github.com/WillN-Git"
              target="_blank"
              rel="noreferrer"
            >
             Will Ndefo
            </a> 
            <a
              href="https://github.com/MrRyanWise"
              target="_blank"
              rel="noreferrer"
            >
             Ryan Wise
            </a>
            2022
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}
