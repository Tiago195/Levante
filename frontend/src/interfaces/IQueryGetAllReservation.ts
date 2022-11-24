export interface IQueryGetAllReservation {
  page: number,
  order: string,
  by: string,
  bookId: number,
  userId: number,
  createdAt?: Date,
  status: "Pending" | "Finished" | "Reading" | ""
}