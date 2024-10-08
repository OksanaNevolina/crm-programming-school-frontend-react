import React, { FC, useState } from 'react';

import { IOrder } from '../../../interfaces';
import { OrderDetails } from '../orderDetails';
import css from './Order.module.css';

interface IProps {
  orders: IOrder[];
  onSort: (column: string) => void;
  currentOrder: string;
  currentSortOrder: string;
}

const Order: FC<IProps> = ({
  orders,
  onSort,
  currentOrder,
  currentSortOrder,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const getSortIndicator = (column: string) => {
    if (currentOrder === column) {
      return currentSortOrder === 'ASC' ? '↑' : '↓';
    }
    return '';
  };

  const toggleExpand = (orderId: number) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th onClick={() => onSort('id')}>ID {getSortIndicator('id')}</th>
          <th onClick={() => onSort('name')}>
            Name {getSortIndicator('name')}
          </th>
          <th onClick={() => onSort('surname')}>
            Surname {getSortIndicator('surname')}
          </th>
          <th onClick={() => onSort('email')}>
            Email {getSortIndicator('email')}
          </th>
          <th onClick={() => onSort('phone')}>
            Phone {getSortIndicator('phone')}
          </th>
          <th onClick={() => onSort('age')}>Age {getSortIndicator('age')}</th>
          <th onClick={() => onSort('course')}>
            Course {getSortIndicator('course')}
          </th>
          <th onClick={() => onSort('course_format')}>
            Course Format {getSortIndicator('course_format')}
          </th>
          <th onClick={() => onSort('course_type')}>
            Course Type {getSortIndicator('course_type')}
          </th>
          <th onClick={() => onSort('status')}>
            Status {getSortIndicator('status')}
          </th>
          <th onClick={() => onSort('sum')}>Sum {getSortIndicator('sum')}</th>
          <th onClick={() => onSort('alreadyPaid')}>
            Already Paid {getSortIndicator('alreadyPaid')}
          </th>
          <th onClick={() => onSort('created_at')}>
            Created At {getSortIndicator('created_at')}
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            <tr onClick={() => toggleExpand(order.id)}>
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
              <td>{new Date(order.created_at).toLocaleString()}</td>
            </tr>
            {expandedOrderId === order.id && (
              <>
                <tr>
                  <td colSpan={13}>
                    <OrderDetails orderId={order.id} />
                  </td>
                </tr>
              </>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export { Order };
