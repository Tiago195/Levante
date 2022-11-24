import { ICategory } from "./ICategory";

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
  categories: ICategory[]
}

export interface IUpdatedBook {
  title?: string,
  author?: string,
  categories: number[],
  content: string
}