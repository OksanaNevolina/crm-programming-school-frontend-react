import { IOrder } from './InterfaceOrder';

export interface IQuery {
  page: number;
  limit: number;
  sortedBy: string;

  [key: string]: string | number;
}
export interface IPaginationResponse {
  page: number;
  limit: number;
  itemsFound: number;
  data: IOrder[];
}
