import React from 'react';
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Footer() {
    return (
        <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-left-content">
              <p className="is-Nunito" style={{ fontSize: 14 }}>
                ©2020 by Serving Now
              </p>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-right-content">
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faFacebookF} />
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faTwitter} />
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faLinkedinIn} />
              </span>
            </div>
          </div>
        </div>
      </footer>
    )
}
export default Footer;