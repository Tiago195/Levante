export type statusReservation = "Pending" | "Finished" | "Reading" | "Denied" | ""

export interface IReservation {
  id: number,
  user: { name: string, email: string },
  book: { title: string, author: string, capa: string, id: number },
  status: statusReservation,
  returnPreview: string,
  returnDate?: string,
  createdAt: string
}

export interface ICreatedReservation {
  userId: number,
  bookId: number,
  returnPreview: string,
}