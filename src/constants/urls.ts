const baseURL = 'http://localhost:5001';

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
  orderById: (orderId: number): string => `${orders}/${orderId}`,
  addComment: (orderId: number): string => `${orders}/${orderId}/comment`,
};
export { baseURL, urls };
