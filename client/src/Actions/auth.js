export const login = (token, name, surname) => ({
  type: "LOGIN",
  token,
  name,
  surname
});

export const logout = () => ({
  type: "LOGOUT"
});
