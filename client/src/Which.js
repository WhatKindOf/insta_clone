import React from "react";
import Login from "./Login";
import Join from "./Join";
import Home from "./Home";

export default class Which extends React.Component {
  render() {
    const { what, showJoin, showLogin } = this.props;
    return what === "login" ? (
      <Home />
    ) : what === "join" ? (
      <Join showLogin={showLogin} />
    ) : (
      <Login showJoin={showJoin} />
    );
  }
}
