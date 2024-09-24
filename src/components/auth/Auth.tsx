import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IAuth } from '../../interfaces';
import { authActions } from '../../redux';
import css from './Auth.module.css';

const Auth = () => {
  const { register, reset, handleSubmit } = useForm<IAuth>();

  const { errors } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login: SubmitHandler<IAuth> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login({ user }));

    if (requestStatus === 'fulfilled') {
      reset();
      navigate('/orders');
    }
  };
  return (
    <div className={css.mainAuth}>
      <div className={css.login}>
        <form className={css.formLoginAdmin} onSubmit={handleSubmit(login)}>
          <span className={css.labelName}>Email</span>
          <input
            id="email"
            type="text"
            placeholder="email"
            className={css.label}
            {...register('email')}
          />

          <span className={css.labelName}>Password</span>
          <input
            id="password"
            type="text"
            placeholder="password"
            className={css.label}
            {...register('password')}
          />

          <button>LOGIN</button>
          {errors && <span>{errors.detail}</span>}
        </form>
      </div>
    </div>
  );
};

export { Auth };
