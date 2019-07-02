// Actions

const SHOW_JOIN = "SHOW_JOIN";
const SHOW_LOGIN = "SHOW_LOGIN";

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

// Reducer

const initialState = {
  what: "default"
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_JOIN:
      return applyShowJoin(state);
    case SHOW_LOGIN:
      return applyShowLogin(state);
    default:
      return state;
  }
}

// Reducer Functions

function applyShowJoin(state) {
  if (state.what === "default") {
    return {
      ...state,
      what: "join"
    };
  }
}

function applyShowLogin(state) {
  if (state.what === "join") {
    return {
      ...state,
      what: "default"
    };
  }
}

// export Action Creators

const actionCreators = {
  showJoin,
  showLogin
};

export { actionCreators };

// export Reducer

export default reducer;
