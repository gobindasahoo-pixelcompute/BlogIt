import axios from "axios";

import routes from "../routes";

const login = payload =>
  axios.post(routes.session, {
    login: payload,
  });

const logout = () => axios.delete(`/session`);

const signup = payload =>
  axios.post(routes.users, {
    user: payload,
  });

const authApi = {
  login,
  logout,
  signup,
};

export default authApi;
