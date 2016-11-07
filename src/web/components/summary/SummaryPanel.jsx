import React from "react";
import AddTimeButton from "../time/AddTimeButton";
require("!style!css!less!./SummaryPanel.less");
import BuddyButton from '../buddy/BuddyButton';

// redux stuff
import {connect} from "react-redux";

function SummaryPanel(props) {
  return (
    <div className="panel application-panel container-fluid">
      <div className="SUMMARYPANEL--panel-default">
        <div className="SUMMARYPANEL--panel-heading">
          <BuddyButton
            studentID={props.student.id}
          />
          <div className="SUMMARYPANEL--heading-text">
            <h1 className="SUMMARYPANEL--panel-title">{props.student.name}</h1>
            <p> {props.student.school_name} </p>
            <p> {`Grade ${props.student.grade}`} </p>
          </div>
        </div>
        <div className="SUMMARYPANEL--panel-body">
          <div className="content-left">
            <p className="content-large"> {props.student.total_mins} </p>
            <p> Minutes Read </p>
          </div>
          <div className="content-right">
            <p className="content-large"> {props.daysLeft} </p>
            <p> Days Left </p>
          </div>
        </div>
        <div className="SUMMARYPANEL--panel-footer">
          <AddTimeButton
            studentID={props.student.id}
          />
        </div>
      </div>
    </div>
  );
}

SummaryPanel.propTypes = {
  student: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    school_name: React.PropTypes.string.isRequired,
    grade: React.PropTypes.string.isRequired,
    total_mins: React.PropTypes.number.isRequired,
  }).isRequired,
  daysLeft: React.PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    daysLeft: state.reducers.daysLeft,
  };
}

module.exports = connect(mapStateToProps, null)(SummaryPanel);
