import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Підключаємо хуки

import { IOrder } from '../../../interfaces';
import { OrderDetails } from '../orderDetails';
import css from './Order.module.css';

interface IProps {
  orders: IOrder[];
  onSort: (column: string) => void;
  currentOrder: string;
  currentSortOrder: string;
  onUpdateOrders: () => void;
}

const Order: FC<IProps> = ({
  orders,
  onSort,
  currentOrder,
  currentSortOrder,
  onUpdateOrders,
}) => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId?: string }>();
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(
    orderId ? parseInt(orderId) : null,
  );

  const getSortIndicator = (column: string) => {
    if (currentOrder === column) {
      return currentSortOrder === 'ASC' ? '↑' : '↓';
    }
    return '';
  };

  const toggleExpand = (orderId: number) => {
    const isExpanded = expandedOrderId === orderId;
    setExpandedOrderId(isExpanded ? null : orderId);

    onUpdateOrders();

    if (!isExpanded) {
      navigate(`/orders/${orderId}`);
    } else {
      navigate(`/orders`);
    }
  };

  const renderValue = (value: any) => {
    return value === null || value === undefined || value === ''
      ? 'null'
      : value;
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
          <th onClick={() => onSort('group')}>
            Group {getSortIndicator('group')}
          </th>
          <th onClick={() => onSort('manager')}>
            Manager {getSortIndicator('manager')}
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            <tr onClick={() => toggleExpand(order.id)}>
              <td>{renderValue(order.id)}</td>
              <td>{renderValue(order.name)}</td>
              <td>{renderValue(order.surname)}</td>
              <td>{renderValue(order.email)}</td>
              <td>{renderValue(order.phone)}</td>
              <td>{renderValue(order.age)}</td>
              <td>{renderValue(order.course)}</td>
              <td>{renderValue(order.course_format)}</td>
              <td>{renderValue(order.course_type)}</td>
              <td>{renderValue(order.status)}</td>
              <td>{renderValue(order.sum)}</td>
              <td>{renderValue(order.alreadyPaid)}</td>
              <td>
                {order.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : 'null'}
              </td>
              <td>{renderValue(order.group?.name)}</td>
              <td>{renderValue(order.manager)}</td>
            </tr>
            {expandedOrderId === order.id && (
              <tr>
                <td colSpan={15}>
                  <OrderDetails orderId={order.id} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export { Order };
