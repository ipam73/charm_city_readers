import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
require("!style!css!less!./Header.less");

class Header extends React.Component {

  render() {
    return (
      <div>
        <nav className="HEADER--container navbar">

          <ul className="nav navbar-nav pull-left">
            <li className="dropdown">
              <button className="HEADER--button btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <img
                  src="/images/menu-alt-white.png"
                  alt="Sign in with Google"
                />
                Charm City Readers
              </button>
              <ul className="dropdown-menu">
                {this.props.user ?
                <li><h5>{this.props.user.displayName}</h5></li> :
                null
                }
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About the Challenge</Link>
                </li>
                <li>
                  <Link to="/support">Support</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  user: React.PropTypes.object,
}

// sets current state for Header as this.prop
function mapStateToProps(state) {
  return {
    user: state.reducers.user,
  };
}

module.exports = connect(mapStateToProps, null)(Header);
