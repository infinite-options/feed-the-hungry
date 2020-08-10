import React from "react";
import "./style.css";
import Loading from "assets/image/loading.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "components/Icons/Icons";
import Spinner from "assets/image/Spinner.svg";
function LoadingPage() {
  return (
    <div className="bd-main is-fullheight-with-navbar">
      <div className="container">
        <div className="loading-body">
          <figure className="image is-128x128">
            <img src={Spinner} />
          </figure>
        </div>
      </div>
    </div>
  );
}
export default LoadingPage;
