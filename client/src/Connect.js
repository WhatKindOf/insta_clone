import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./reducer";
import Which from "./Which";

function mapStateToProps(state) {
  const { what, account, contents, homeOrUser, reply } = state;
  return {
    what,
    account,
    contents,
    homeOrUser,
    reply
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showJoin: bindActionCreators(actionCreators.showJoin, dispatch),
    showLogin: bindActionCreators(actionCreators.showLogin, dispatch),
    showAppbar: bindActionCreators(actionCreators.showAppbar, dispatch),
    showHome: bindActionCreators(actionCreators.showHome, dispatch),
    showUser: bindActionCreators(actionCreators.showUser, dispatch),
    logoutAction: bindActionCreators(actionCreators.logoutAction, dispatch),
    setContents: bindActionCreators(actionCreators.setContents, dispatch),
    editProfileImg: bindActionCreators(actionCreators.editProfileImg, dispatch),
    inputNewContent: bindActionCreators(
      actionCreators.inputNewContent,
      dispatch
    ),
    setReply: bindActionCreators(actionCreators.setReply, dispatch),
    resetReply: bindActionCreators(actionCreators.resetReply, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Which);
