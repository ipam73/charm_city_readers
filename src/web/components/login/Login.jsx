import React from "react";
import {connect} from "react-redux";
import actions from "../../../actions";
import Signup from "./Signup";
import {Link} from "react-router";

require("!style!css!less!./Login.less");

// login button
// trigger Google Login
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onClickFn = this.onClickFn.bind(this);
  }

  onClickFn() {
    this.props.loginWithGoogle();
  }

  render() {
    return (
      <div>
        <div className="panel application-panel container-fluid">
          <img className="Login--img" src="/images/logo.png" alt="Icon"></img>
          <h1 className="Login--title SUMMARYPANEL--panel-title">Charm City Readers</h1>
          <div className="SUMMARYPANEL--panel-default">
            <div className="Login--panel-body">
              <h3 className="Login--panel-title">Parent Login</h3>

              <Signup object={this.props.newuser} />

              <div className="Login--img-button-container">
                <button onClick={this.onClickFn} className="Login--img-button btn btn-default">
                  <img
                    src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
                    alt="Sign in with Google"
                  />
                </button>
              </div>
              <Link to="/support" className="Login--help-text">Need help?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithGoogle: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
}

// ....
function mapStateToProps(state) {
  return {
    user: state.reducers.user,
  };
}

// currently not used for anything, no actions triggered on this page
function mapDispatchToProps(dispatch) {
  return {
    loginWithGoogle: () => {
      dispatch(actions.loginWithGoogle());
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
