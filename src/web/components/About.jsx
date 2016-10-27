import React from "react";
require("!style!css!less!./add-student/AddStudent.less");

function About() {
  return (
    <div>
      <div className="panel application-panel container-fluid">
        <div className="SUMMARYPANEL--panel-default">
          <div className="SUMMARYPANEL--panel-body">
            <h3 className="SUMMARYPANEL--panel-title">How does the challenge work?</h3>
            <p>
              This challenge will allow schools to compete to see who has the best 
              readers in Baltimore. Parents should use this app to log minutes every 
              time their children read. The minutes count toward an individual goal 
              and a school goal. So what are you waiting for? Get reading now!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = About;
