import React from "react";
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import actions from "../../../actions";

require("!style!css!less!../summary/SummaryPanel.less");

const crabIcon = '/images/buddy/crab.png';
const dogIcon = '/images/buddy/dog.png';
const flagIcon = '/images/buddy/flag.png';
const ravenIcon = '/images/buddy/raven.png';
const sailboatIcon = '/images/buddy/sailboat.png';


class SelectBuddy extends React.Component {
  constructor(props) {
    super(props);
    this.onBuddyPress = this.onBuddyPress.bind(this);
  }

  onBuddyPress(buddyName) {
    this.props.setStudentBuddy(buddyName, this.props.studentID, this.props.parentID);
    hashHistory.push("/");
  }

  render() {
    return (
      <div>
        <div className="panel application-panel container-fluid">
          <div className="SUMMARYPANEL--panel-default">
            <div className="SUMMARYPANEL--panel-body">
              <h3 className="SUMMARYPANEL--panel-title">Select Buddy</h3>
              <a onClick={() => this.onBuddyPress("crab")}>
                <img
                  src={crabIcon}
                  alt="Icon"
                  className="Buddy--img"
                />
              </a>
              <a onClick={() => this.onBuddyPress("dog")}>
                <img
                  src={dogIcon}
                  alt="Icon"
                  className="Buddy--img"
                />
              </a>
              <a onClick={() => this.onBuddyPress("flag")}>
                <img
                  src={flagIcon}
                  alt="Icon"
                  className="Buddy--img"
                />
              </a>
              <a onClick={() => this.onBuddyPress("raven")}>
                <img
                  src={ravenIcon}
                  alt="Icon"
                  className="Buddy--img"
                />
              </a>
              <a onClick={() => this.onBuddyPress("sailboat")}>
                <img
                  src={sailboatIcon}
                  alt="Icon"
                  className="Buddy--img"
                />
              </a>            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const studentID = ownProps.params.id; // from path '/student/:id'
  var parentID = '';
  if (state.reducers.user) {
    parentID = state.reducers.user.uid;
  }
  return {
    parentID,
    studentID,
    student: state.reducers.studentList[studentID],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setStudentBuddy: (buddy, studentID, parentID) => {
      dispatch(actions.setStudentBuddy(buddy, studentID, parentID));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SelectBuddy);
