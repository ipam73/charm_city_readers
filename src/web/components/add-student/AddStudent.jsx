import React from "react";
import {connect} from "react-redux";
import actions from "../../../actions";
require("!style!css!less!./AddStudent.less");

// new student button
// trigger clever login
class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    console.log("USER:", this.props.user);
    this.onClickFn = this.onClickFn.bind(this);
  }

  onClickFn() {
    // this.props.addStudent(this.props.user.uid);
    window.location = "/addstudent?user=" + this.props.user.uid;
    // var wnd = window.open(`/addstudent?user=${this.props.user.uid}`);
    // setTimeout(function() {
    //   wnd.close();
    // }, 5000);
  }

  render() {
    return (
      <div>
        <div className="panel application-panel container-fluid">
          <div className="SUMMARYPANEL--panel-default">
            <div className="SUMMARYPANEL--panel-body">
              <h3 className="SUMMARYPANEL--panel-title">Add a Student</h3>

              <button onClick={this.onClickFn} className="btn btn-default">
                <img
                  src="https://s3.amazonaws.com/assets.clever.com/sign-in-with-clever/sign-in-with-clever-medium.png"
                  alt="Log in with Clever"
                />
              </button>
              <p>
                Click the button to add a student using their Clever login credentials.
                If you need help finding the right credentials please contact the school.
              </p>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddStudent.propTypes = {
  user: React.PropTypes.object.isRequired,
};

// ....
function mapStateToProps(state) {
  return {
    user: state.reducers.user,
  };
}

// currently not used for anything, no actions triggered on this page
function mapDispatchToProps(dispatch) {
  return {
    addStudent: (userID) => {
      dispatch(actions.addStudent(userID));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddStudent);
