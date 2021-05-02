export const login = (token, name, surname) => {
  return (dispatch) => {
    //We should not store this data in local storage...
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("surname", surname);

    dispatch({
      type: "LOGIN",
      token,
      name,
      surname
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    dispatch({
      type: "LOGOUT"
    });
  };
};
