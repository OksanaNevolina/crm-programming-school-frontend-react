const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const login = '/login';
const orders = '/orders';
const logout = '/logout';
const refresh = '/refresh';
const user = '/user';

const urls = {
  auth: {
    login,
    refresh,
    logout,
    getUser: `${user}/get-me`,
  },
  orders,
};
export { urls, baseURL };
