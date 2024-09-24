import { urls } from '../constants';
import { IPaginationResponse } from '../interfaces';
import { IRes } from '../types';
import { ApiService } from './ApiService';

const OrdersService = {
  getAll: (page: string): IRes<IPaginationResponse> =>
    ApiService.get(urls.orders, { params: { page } }),
};
export { OrdersService };
