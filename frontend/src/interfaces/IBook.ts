import { ICategory } from "./ICategory";
import { IReservation } from "./IReservation";

export interface IBook {
  id: number,
  title: string,
  author: string,
  readCount: number,
  status: boolean,
  cover: string,
  resume?: string,
  createdAt: Date,
  updatedAt: Date,
  reservation: IReservation
  categories: ICategory[]
}

export interface IUpdatedBook {
  title?: string,
  author?: string,
  categories: number[],
  resume: string
}

export interface ICreatedBook {
  title: string,
  author: string,
  categories: number[],
  cover: string
}