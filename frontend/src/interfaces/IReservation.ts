export interface IReservation {
  id: number,
  userId: number,
  bookId:number,
  returnPreview: Date,
  returnDate?: Date,
  createdAt: Date
}

export interface ICreatedReservation {
  userId: number,
  bookId: number,
  returnPreview: Date,
}