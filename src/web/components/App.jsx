import React from "react";
import Header from "./common/Header";

function AppContainer(props) {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        {props.children}
      </div>
    </div>
  );
}

AppContainer.propTypes = {
  children: React.PropTypes.node,
};

export const App = AppContainer;
