import React from "react";
require("!style!css!less!./add-student/AddStudent.less");

function Support() {
  return (
    <div>
      <div className="panel application-panel container-fluid">
        <div className="SUMMARYPANEL--panel-default">
          <div className="SUMMARYPANEL--panel-body">
            <h3 className="SUMMARYPANEL--panel-title">Contact Information</h3>
            <img className="SUMMARYPANEL--panel-image"
              src="images/baltimore_city_logo.jpg"
              alt="Baltimore City Logo"
            />
            <p>
              If you have any questions or concerns about the reading challenge,
              please see your child’s school for more information. If you have technical
              issues with the use of this app, please 
              email <a href='mailto:CitySchoolsIT@bcps.k12.md.us'>CitySchoolsIT@bcps.k12.md.us</a>.
            </p>
          </div>
        </div>
      </div>
      <div className="panel application-panel container-fluid">
        <div className="SUMMARYPANEL--panel-default">
          <div className="SUMMARYPANEL--panel-body">
            <h3 className="SUMMARYPANEL--panel-title">Getting Started</h3>
            <iframe src="https://drive.google.com/file/d/0B9SRyd85Yz8ZQ09sQktjeTY2czQ/preview" width="640" height="480"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = Support;
