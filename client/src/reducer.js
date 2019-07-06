// Actions

const SHOW_JOIN = "SHOW_JOIN";
const SHOW_LOGIN = "SHOW_LOGIN";
const SHOW_APPBAR = "SHOW_APPBAR";
const SHOW_HOME = "SHOW_HOME";
const SHOW_USER = "SHOW_USER";
const LOGOUT_ACTION = "LOGOUT_ACTION";
const SET_CONTENTS = "SET_CONTENTS";
const EDIT_PROFILEIMG = "EDIT_PROFILEIMG";
const INPUT_NEWCONTENT = "INPUT_NEWCONTENT";
const SET_REPLY = "SET_REPLY";
const RESET_REPLY = "RESET_REPLY";

// Action Creators

function showJoin() {
  return {
    type: SHOW_JOIN
  };
}

function showLogin() {
  return {
    type: SHOW_LOGIN
  };
}

function showAppbar(account) {
  return {
    type: SHOW_APPBAR,
    account: account
  };
}

function showHome() {
  return {
    type: SHOW_HOME
  };
}

function showUser() {
  return {
    type: SHOW_USER
  };
}

function logoutAction() {
  return {
    type: LOGOUT_ACTION
  };
}

function setContents(contents) {
  return {
    type: SET_CONTENTS,
    contents: contents
  };
}

function editProfileImg(account) {
  return {
    type: EDIT_PROFILEIMG,
    account: account
  };
}

function inputNewContent(newContent) {
  return {
    type: INPUT_NEWCONTENT,
    newContent: newContent
  };
}

function setReply(reply) {
  return {
    type: SET_REPLY,
    reply: reply
  };
}

function resetReply() {
  return {
    type: RESET_REPLY
  };
}

// Reducer

const initialState = {
  what: "default",
  account: {
    email: "",
    name: "",
    nickname: "",
    password: "",
    title: "",
    profileImg: ""
  },
  contents: [],
  homeOrUser: "default",
  reply: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_JOIN:
      return applyShowJoin(state);
    case SHOW_LOGIN:
      return applyShowLogin(state);
    case SHOW_APPBAR:
      return applyShowAppbar(state, action.account);
    case LOGOUT_ACTION:
      return applyLogoutAction(state);
    case SHOW_HOME:
      return applyShowHome(state);
    case SHOW_USER:
      return applyShowUser(state);
    case SET_CONTENTS:
      return applySetContents(state, action.contents);
    case EDIT_PROFILEIMG:
      return applyEditProfileImg(state, action.account);
    case INPUT_NEWCONTENT:
      return applyInputNewContent(state, action.newContent);
    case SET_REPLY:
      return applySetReply(state, action.reply);
    case RESET_REPLY:
      return applyResetReply(state);
    default:
      return state;
  }
}

// Reducer Functions

function applyShowJoin(state) {
  return {
    ...state,
    what: "join"
  };
}

function applyShowLogin(state) {
  return {
    ...state,
    what: "default"
  };
}

function applyShowAppbar(state, account) {
  return {
    ...state,
    what: "login",
    account: account
  };
}

function applyShowHome(state) {
  if (state.homeOrUser === "user") {
    return {
      ...state,
      contents: [],
      homeOrUser: "default"
    };
  }
}

function applyShowUser(state) {
  if (state.homeOrUser === "default") {
    return {
      ...state,
      contents: [],
      homeOrUser: "user"
    };
  }
}

function applyLogoutAction(state) {
  return {
    ...state,
    what: "default",
    account: {
      email: "",
      name: "",
      nickname: "",
      password: "",
      title: "",
      profileImg: ""
    },
    homeOrUser: "default"
  };
}

function applySetContents(state, contents) {
  return {
    ...state,
    contents: contents
  };
}

function applyEditProfileImg(state, account) {
  return {
    ...state,
    account: account
  };
}

function applyInputNewContent(state, newContent) {
  return {
    ...state,
    contents: [...state.contents, newContent]
  };
}

function applySetReply(state, reply) {
  return {
    ...state,
    reply: reply
  };
}

function applyResetReply(state) {
  return {
    ...state,
    reply: []
  };
}

// export Action Creators

const actionCreators = {
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
  resetReply
};

export { actionCreators };

// export Reducer

export default reducer;
