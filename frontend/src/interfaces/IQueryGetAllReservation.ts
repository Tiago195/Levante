import { statusReservation } from "./IReservation";

export interface IQueryGetAllReservation {
  page: number,
  order: string,
  by: string,
  title: string,
  email: string,
  createdAt: string,
  status: statusReservation
}