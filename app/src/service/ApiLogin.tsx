import Path from "./Path";

const loginToken = (formData: any) => Path.Post(formData, "login");
const logout = () => Path.PostNoForm("logout");
const refreshToken = (formData: any) => Path.Post(formData, "refreshtoken");
const register = (formData: any) => Path.Post(formData, "register");

const ApiLogin = {
  refreshToken,
  loginToken,
  logout,
  register,
};
export default ApiLogin;
