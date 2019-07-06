import React from "react";
import Login from "./Login";
import Join from "./Join";
import Appbar from "./Appbar";

export default class Which extends React.Component {
  render() {
    const {
      what,
      account,
      contents,
      homeOrUser,
      showJoin,
      showLogin,
      showAppbar,
      showHome,
      showUser,
      logoutAction,
      setContents,
      editProfileImg,
      inputNewContent,
      setReply,
      reply,
      resetReply
    } = this.props;
    return what === "login" ? (
      <Appbar
        account={account}
        logoutAction={logoutAction}
        contents={contents}
        showHome={showHome}
        showUser={showUser}
        homeOrUser={homeOrUser}
        setContents={setContents}
        showLogin={showLogin}
        editProfileImg={editProfileImg}
        inputNewContent={inputNewContent}
        setReply={setReply}
        reply={reply}
        resetReply={resetReply}
      />
    ) : what === "join" ? (
      <Join showLogin={showLogin} />
    ) : (
      <Login showJoin={showJoin} showAppbar={showAppbar} />
    );
  }
}