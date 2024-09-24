import { FC } from 'react';

import { IOrder } from '../../../interfaces';
import css from './Order.module.css';

interface IProps {
  orders: IOrder[];
}

const Order: FC<IProps> = ({ orders }) => {
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>surname</th>
          <th>email</th>
          <th>phone</th>
          <th>age</th>
          <th>course</th>
          <th>course_format</th>
          <th>course_type</th>
          <th>status</th>
          <th>sum</th>
          <th>alreadyPaid</th>
          <th>created_at</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.name}</td>
            <td>{order.surname}</td>
            <td>{order.email}</td>
            <td>{order.phone}</td>
            <td>{order.age}</td>
            <td>{order.course}</td>
            <td>{order.course_format}</td>
            <td>{order.course_type}</td>
            <td>{order.status}</td>
            <td>{order.sum}</td>
            <td>{order.alreadyPaid}</td>
            <td>{order.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Order };
