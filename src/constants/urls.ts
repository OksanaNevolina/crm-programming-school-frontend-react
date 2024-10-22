const baseURL = 'http://localhost:5001';

const login = '/login';
const orders = '/orders';
const logout = '/logout';
const refresh = '/refresh';
const user = '/user';
const group = '/group';
const groupAll = '/group-all';
const update = '/update';

const urls = {
  auth: {
    login,
    refresh,
    logout,
    getUser: `${user}/get-me`,
  },
  orders,
  orderById: (orderId: number): string => `${orders}/${orderId}`,
  updateOrderId: (orderId: number): string => `${orders}${update}/${orderId}`,
  addComment: (orderId: number): string => `${orders}/${orderId}/comment`,
  addGroup: (): string => `${orders}${group}`,
  getAllGroup: (): string => `${orders}${groupAll}`,
};
export { baseURL, urls };
