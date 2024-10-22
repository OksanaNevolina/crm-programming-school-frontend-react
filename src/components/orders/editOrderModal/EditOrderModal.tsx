import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from 'react-modal';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IEditOrderForm } from '../../../interfaces/InterfaceEditOrderForm';
import { ActionsGroups, ordersActions } from '../../../redux';
import css from './EditOrderModal.module.css';

Modal.setAppElement('#root');

const EditOrderModal: FC<{ orderId: number; onClose: () => void }> = ({
  orderId,
  onClose,
}) => {
  const { groups } = useAppSelector((state) => state.groupsReducer);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm<IEditOrderForm>();
  const { order } = useAppSelector((state) => state.ordersReducer);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    if (order) {
      setValue('name', order.name || null);
      setValue('surname', order.surname || null);
      setValue('email', order.email || null);
      setValue('phone', order.phone || null);
      setValue('age', order.age || null);
      setValue('course', order.course || null);
      setValue('course_format', order.course_format || null);
      setValue('course_type', order.course_type || null);
      setValue('sum', order.sum || null);
      setValue('alreadyPaid', order.alreadyPaid || null);
      setValue('status', order.status || null);
      setValue('groupId', order.group?.id || null);
    }
  }, [order, setValue]);

  useEffect(() => {
    dispatch(ActionsGroups.getGroups());
  }, [dispatch]);

  const onSubmit: SubmitHandler<IEditOrderForm> = async (data) => {
    const preparedData = {
      ...data,
      sum: Number(data.sum),
      alreadyPaid: Number(data.alreadyPaid),
      age: Number(data.age),
      email: data.email.trim(),
      groupId: data.groupId,
    };

    let newGroupId: number | null = null;

    if (newGroupName) {
      const newGroupResponse = await dispatch(
        ActionsGroups.createGroup(newGroupName),
      ).unwrap();
      newGroupId = newGroupResponse.id;
      setNewGroupName('');
      dispatch(ActionsGroups.getGroups());
    }

    await dispatch(
      ordersActions.updateOrder({
        orderId,
        data: {
          ...preparedData,
          groupId: newGroupId ? newGroupId : preparedData.groupId,
        },
      }),
    );

    onClose();
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} className={css.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <input {...register('name')} placeholder="Name" className={css.input} />
        <input
          {...register('surname')}
          placeholder="Surname"
          className={css.input}
        />
        <input
          {...register('email')}
          placeholder="Email"
          className={css.input}
        />
        <input
          {...register('phone')}
          placeholder="Phone"
          className={css.input}
        />
        <input
          type="number"
          {...register('age')}
          placeholder="Age"
          className={css.input}
        />
        <select {...register('status')} className={css.select}>
          <option value="In work">In work</option>
          <option value="New">New</option>
          <option value="Aggre">Aggre</option>
          <option value="Disaggre">Disaggre</option>
          <option value="Dubbing">Dubbing</option>
        </select>

        <select {...register('course')} className={css.select}>
          <option value="FS">FS</option>
          <option value="QACX">QACX</option>
          <option value="JCX">JCX</option>
          <option value="JSCX">JSCX</option>
          <option value="FE">FE</option>
          <option value="PCX">PCX</option>
        </select>

        <select {...register('course_type')} className={css.select}>
          <option value="pro">pro</option>
          <option value="minimal">minimal</option>
          <option value="premium">premium</option>
          <option value="incubator">incubator</option>
          <option value="vip">vip</option>
        </select>

        <select {...register('course_format')} className={css.select}>
          <option value="static">static</option>
          <option value="online">online</option>
        </select>

        <input
          type="number"
          {...register('sum')}
          placeholder="Sum"
          className={css.input}
        />
        <input
          type="number"
          {...register('alreadyPaid')}
          placeholder="Already Paid"
          className={css.input}
        />

        <select {...register('groupId')} className={css.select}>
          <option value={order.group?.name}>{order.group?.name}</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Or create a new group"
          className={css.input}
        />

        <div className={css.buttonGroup}>
          <button type="submit" className={css.button}>
            Save
          </button>
          <button
            type="button"
            className={`${css.button} ${css.cancelButton}`}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export { EditOrderModal };
