import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

require("!style!css!less!../summary/SummaryPanel.less");

const crabIcon = '/images/buddy/crab.png';
const dogIcon = '/images/buddy/dog.png';
const flagIcon = '/images/buddy/flag.png';
const ravenIcon = '/images/buddy/raven.png';
const sailboatIcon = '/images/buddy/sailboat.png';
const placeholder = '/images/BuddyPlaceholder.png';

const buddyNameToIcon = {
  crab: crabIcon,
  dog: dogIcon,
  flag: flagIcon,
  raven: ravenIcon,
  sailboat: sailboatIcon
}

class BuddyButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var buddyIcon = placeholder;
    if (this.props.student && this.props.student.buddy) {
      buddyIcon = buddyNameToIcon[this.props.student.buddy];
    }

    return (
      <Link to={`/selectbuddy/${this.props.studentID}`}>
        <img
          className="Login--img"
          src={buddyIcon}
          alt="Icon"
        />
      </Link>
    );
  }
}


function mapStateToProps(state, props) {
  const studentID = props.studentID;
  return {
    studentID,
    student: state.reducers.studentList[studentID],
  };
}

module.exports = connect(mapStateToProps, null)(BuddyButton);
