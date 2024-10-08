import { IUserComment } from './InterfaceUser';

export interface IComment {
  id: number;
  user: IUserComment;
  comment: string;
  date: string;
}
