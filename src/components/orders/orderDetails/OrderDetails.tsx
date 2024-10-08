import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IComment } from '../../../interfaces/InterfaceComment';
import { authActions, getOrderById, ordersActions } from '../../../redux';
import css from './OrderDetails.module.css'; // Підключаємо модуль стилів

interface IOrderDetailsProps {
  orderId: number;
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

  useEffect(() => {
    dispatch(getOrderById({ orderId }));
    dispatch(authActions.getMe());
  }, [dispatch, orderId]);

  const onSubmit: SubmitHandler<ICommentFormInputs> = (
    data: ICommentFormInputs,
  ) => {
    const { comment } = data;

    if (!order.manager || order.manager === me.email) {
      dispatch(ordersActions.addComment({ orderId, comment }));
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
              {comments?.map((com: IComment, idx: number) => (
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
                disabled={order.manager && order.manager !== me.email}
              />
              {errors.comment && (
                <p className={css.errorMessage}>{errors.comment.message}</p>
              )}
              <button
                type="submit"
                disabled={order.manager && order.manager !== me.email}
                className={css.submitButton}
              >
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export { OrderDetails };
