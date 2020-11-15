import React from "react";
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className="border">
          <p>
            <b>
              Ravi Kumar &copy;{" "}
              <span id="footer-date">{new Date().getFullYear()}</span>
            </b>
          </p>
        </footer>
      </div>
    );
  }
}
