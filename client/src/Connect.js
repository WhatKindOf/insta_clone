import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./reducer";
import Which from "./Which";

function mapStateToProps(state) {
  const { what, account, contents, homeOrUser } = state;
  return {
    what,
    account,
    contents,
    homeOrUser
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
    editProfileImg: bindActionCreators(actionCreators.editProfileImg, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Which);
