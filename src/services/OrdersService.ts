import { urls } from '../constants';
import { IPaginationResponse } from '../interfaces/InterfacePaginationResponseOrders';
import { IRes } from '../types/resType';
import { ApiService } from './ApiService';

const OrdersService = {
  getAll: (page: string): IRes<IPaginationResponse> =>
    ApiService.get(urls.orders, { params: { page } }),
};
export { OrdersService };
