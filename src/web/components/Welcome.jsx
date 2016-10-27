import React from "react";
import {Link} from "react-router";

require("!style!css!less!./Welcome.less");

function Welcome() {
  return (
    <div>
      <div className="WELCOME container-fluid">
        <h3>Welcome!</h3>
        <img className="WELCOME--image"
          src="images/bookshelf.png"
          alt="Bookshelf icon"
        />
        <p>
          Over the next few months, your child's school will be participating in
          a district-wide reading challenge.  With this app your child can track
          their progress and earn rewards!
        </p>
        <div>
          <Link to={`/`} className="WELCOME--button btn btn-default">Get Started!</Link>
        </div>
      </div>
    </div>
  );
}

module.exports = Welcome;
