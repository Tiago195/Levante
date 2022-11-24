export interface IReservation {
  id: number,
  user: { name: string, email: string },
  book: { title: string, author: string, capa: string, id: number },
  status: "Pending" | "Finished" | "Reading",
  returnPreview: Date,
  returnDate?: Date,
  createdAt: Date
}

export interface ICreatedReservation {
  userId: number,
  bookId: number,
  returnPreview: Date,
}