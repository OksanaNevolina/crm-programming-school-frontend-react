import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { authActions, getOrderById, ordersActions } from '../../../redux';
import { EditOrderModal } from '../editOrderModal';
import css from './OrderDetails.module.css';

interface IOrderDetailsProps {
  orderId?: number;
}

export interface ICommentFormInputs {
  comment: string;
}

const OrderDetails: FC<IOrderDetailsProps> = ({ orderId }) => {
  const dispatch = useAppDispatch();
  const { order, comments, status, error } = useAppSelector(
    (state) => state.ordersReducer,
  );
  const { me } = useAppSelector((state) => state.authReducer);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICommentFormInputs>({
    defaultValues: {
      comment: '',
    },
  });

  const params = useParams<{ orderId?: string }>();
  const orderIdFromParams =
    orderId || (params.orderId ? parseInt(params.orderId) : undefined);

  useEffect(() => {
    if (orderIdFromParams) {
      dispatch(getOrderById({ orderId: orderIdFromParams }));
      dispatch(authActions.getMe());
    }
  }, [dispatch, orderIdFromParams]);

  const onSubmit: SubmitHandler<ICommentFormInputs> = (
    data: ICommentFormInputs,
  ) => {
    const { comment } = data;

    if (!order.manager || order.manager === me?.email) {
      dispatch(
        ordersActions.addComment({ orderId: orderIdFromParams!, comment }),
      );
      reset();
    } else {
      alert(
        'Ви не можете додати коментар, оскільки заявку взяв інший менеджер.',
      );
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className={css.container}>
      {order ? (
        <>
          <div className={css.leftColumn}>
            <p>
              <strong>Message:</strong> {order.msg}
            </p>
            <p>
              <strong>UTM:</strong> {order.utm}
            </p>
          </div>
          <div className={css.rightColumn}>
            <ul className={css.commentsList}>
              {comments?.map((com, idx) => (
                <li key={idx} className={css.commentItem}>
                  <strong>{com.user?.email}</strong> (
                  {new Date(com.date).toLocaleString()}):
                  <p>
                    {typeof com.comment === 'string'
                      ? com.comment
                      : JSON.stringify(com.comment)}
                  </p>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                {...register('comment', { required: 'Comment is required' })}
                placeholder="Enter your comment"
                disabled={order.manager && order.manager !== me?.email}
              />
              {errors.comment && (
                <p className={css.errorMessage}>{errors.comment.message}</p>
              )}
              <button
                type="submit"
                disabled={order.manager && order.manager !== me?.email}
                className={css.submitButton}
              >
                Submit
              </button>
            </form>
          </div>
          <div>
            <button onClick={handleEditClick} className="editButton">
              Edit
            </button>
            {isEditModalOpen && (
              <EditOrderModal orderId={order.id} onClose={handleCloseModal} />
            )}
          </div>
        </>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export { OrderDetails };
