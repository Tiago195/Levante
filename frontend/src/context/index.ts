import { createContext, Dispatch, MutableRefObject, SetStateAction } from "react";
import { IBook } from "../interfaces/IBook";
import { ICategory } from "../interfaces/ICategory";
import { IQueryGetAllBooks } from "../interfaces/IQueryGetAllBooks";
import { IUser } from "../interfaces/IUser";

export interface IProvider {
  books?: IBook[]
  setBooks: Dispatch<SetStateAction<IBook[]>>
  user?: IUser,
  setUser: Dispatch<SetStateAction<IUser>>
  categories?: ICategory[]
  query?: MutableRefObject<IQueryGetAllBooks>
}


const Context = createContext<IProvider>({
  books: [],
  categories: [],
  setBooks: () => {console.log("s");},
  setUser: () => {console.log("s");},
});

export default Context;