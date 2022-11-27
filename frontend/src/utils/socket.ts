import { Dispatch, SetStateAction } from 'react';
import io from 'socket.io-client';
import { IReservation } from '../interfaces/IReservation';
import { reservationApi } from './api';

export const socket = io('http://localhost:3001');

export const sendNotificationForAdm = () => {
  socket.emit('requestReservation');
};

export const onNewReservation = (setPendencies: Dispatch<SetStateAction<IReservation[]>>) => {
  socket.on('newReservation', () => {
    reservationApi.getAllPendencies().then(({data}) => setPendencies(data));
  });
};
