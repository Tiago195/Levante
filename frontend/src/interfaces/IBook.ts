import { ICategory } from "./ICategory";
import { IReservation } from "./IReservation";

export interface IBook {
  id: number,
  title: string,
  author: string,
  lido: number,
  status: boolean,
  capa: string,
  content?: string,
  createdAt: Date,
  updatedAt: Date,
  reservations: IReservation[]
  categories: ICategory[]
}

export interface IUpdatedBook {
  title?: string,
  author?: string,
  categories: number[],
  content: string
}

export interface ICreatedBook {
  title: string,
  author: string,
  categories: number[],
  capa: string
}