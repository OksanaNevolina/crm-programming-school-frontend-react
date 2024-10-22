import { urls } from '../constants';
import { IOrder, IPaginationResponse } from '../interfaces';
import { IComment } from '../interfaces/InterfaceComment';
import { IEditOrderForm } from '../interfaces/InterfaceEditOrderForm';
import { IGroup } from '../interfaces/interfaceGroup';
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

  createGroup: (name: string): IRes<IGroup> =>
    ApiService.post(urls.addGroup(), { name }),

  getGroups: (): IRes<IGroup[]> => ApiService.get(urls.getAllGroup()),

  updateOrder: (orderId: number, data: IEditOrderForm) => {
    console.log(data);
    return ApiService.patch(urls.updateOrderId(orderId), data);
  },
};

export { OrdersService };
