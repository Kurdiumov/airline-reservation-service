const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.token,
        name: action.name,
        surname: action.surname
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default authReducer;
