import { urls } from '../constants';
import { IOrder, IPaginationResponse } from '../interfaces';
import { IComment } from '../interfaces/InterfaceComment';
import { IRes } from '../types';
import { ApiService } from './ApiService';

const OrdersService = {
  getAll: (
    page: string,
    order: string,
    sortOrder: string,
  ): IRes<IPaginationResponse> =>
    ApiService.get(urls.orders, {
      params: {
        page,
        order,
        sortOrder,
      },
    }),
  getById: (orderId: number): IRes<IOrder> =>
    ApiService.get(urls.orderById(orderId)),

  addComments: (orderId: number, comment: string): IRes<IComment> => {
    return ApiService.post(urls.addComment(orderId), {
      comment,
    });
  },
};

export { OrdersService };
