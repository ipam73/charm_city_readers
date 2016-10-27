import React from "react";
import {connect} from "react-redux";
import actions from "../../../actions";
require("!style!css!less!../add-student/AddStudent.less");
require("!style!css!less!./Login.less");

// Logout page
class Logout extends React.Component {
  constructor(props) {
    super(props);
    props.logout();
  }

  render() {
    return (
      <p>You have been logged out, you will be redirected shortly to login...</p>
    );
  }
}

Logout.propTypes = {
  logout: React.PropTypes.func.isRequired,
}

// currently not used for anything, no actions triggered on this page
function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(actions.logout());
    },
  };
}

module.exports = connect(null, mapDispatchToProps)(Logout);
