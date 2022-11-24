import { createContext, Dispatch, MutableRefObject, SetStateAction } from "react";
import { IBook } from "../interfaces/IBook";
import { ICategory } from "../interfaces/ICategory";
import { IQueryGetAllBooks } from "../interfaces/IQueryGetAllBooks";
import { IReservation } from "../interfaces/IReservation";
import { IUser } from "../interfaces/IUser";

export interface IProvider {
  books?: IBook[]
  setBooks: Dispatch<SetStateAction<IBook[]>>
  user?: IUser
  setUser: Dispatch<SetStateAction<IUser>>
  reservations?: IReservation[]
  setReservations: Dispatch<SetStateAction<IReservation[]>>
  categories?: ICategory[]
  setCategories: Dispatch<SetStateAction<ICategory[]>>
  pendencies?: IReservation[]
  setPendencies: Dispatch<SetStateAction<IReservation[]>>
  query?: MutableRefObject<IQueryGetAllBooks>
}


const Context = createContext<IProvider>({
  books: [],
  categories: [],
  setBooks: () => {console.log("s");},
  setUser: () => {console.log("s");},
  setReservations: () => {console.log("s");},
  setCategories: () => {console.log("s");},
  setPendencies: () => {console.log("s");},
});

export default Context;