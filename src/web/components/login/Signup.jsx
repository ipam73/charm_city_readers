import React from "react";
import {connect} from "react-redux";
import actions from "../../../actions";
import TextInput from "../common/TextInput";
require("!style!css!less!../add-student/AddStudent.less");
require("!style!css!less!./Signup.less");

// Signup Page
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.setEmailState = this.setEmailState.bind(this);
    this.setPasswordState = this.setPasswordState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  setEmailState(event) {
    return this.setState({
      email: event.target.value, 
    });
  }

  setPasswordState(event) {
    return this.setState({
      password: event.target.value, 
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log("creating user with email:", this.state.email);

    this.props.createUser(this.state.email, this.state.password);
  }

  handleLogin(event) {
    event.preventDefault();
    // console.log("login user with email:", this.state.email);

    this.props.loginWithPassword(this.state.email, this.state.password);
  }

  render() {
    // console.log("render signup");

    return (
      <div>
        <div className="Signup--panel application-panel container-fluid container">
            <div className="content">
              <TextInput
                name="email"
                value={this.state.email}
                placeholder="Email"
                onChange={this.setEmailState}
                className="Signup--text-input"
              />
              <TextInput
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.setPasswordState}
                className="Signup--text-input"
                isPassword
              />

              <p className="Signup--errorMessage">{this.props.errorMessage}</p>

              <input
                type="submit"
                className="Signup--button btn btn-default"
                value="Sign In"
                onClick={this.handleLogin}
              />
              <input
                type="submit"
                className="Signup--button Signup--button-purple btn btn-default"
                value="Sign Up"
                onClick={this.handleSubmit}
              />
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.reducers.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (email, password) => {
      dispatch(actions.createUser(email, password, true));
    },
    loginWithPassword: (email, password) => {
      dispatch(actions.loginWithPassword(email, password, true));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Signup);
