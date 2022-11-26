import io from "socket.io-client";
import { reservationApi } from "./api";

export const socket = io("http://localhost:3001");

export const sendNotificationForAdm = () => {
  socket.emit("requestReservation");
};

export const onNewReservation = (setPendencies: any) => {
  socket.on("newReservation", () => {
    reservationApi.getAllPendencies().then(({data}) => setPendencies(data));
  });
};
