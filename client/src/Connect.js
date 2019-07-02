import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./reducer";
import Which from "./Which";

function mapStateToProps(state) {
  const { what } = state;
  return {
    what
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showJoin: bindActionCreators(actionCreators.showJoin, dispatch),
    showLogin: bindActionCreators(actionCreators.showLogin, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Which);
