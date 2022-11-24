import React, { useEffect, useRef, useState } from "react";
import Context from ".";
import { IBook } from "../interfaces/IBook";
import { ICategory } from "../interfaces/ICategory";
import { IQueryGetAllBooks } from "../interfaces/IQueryGetAllBooks";
import { IUser } from "../interfaces/IUser";
import { booksApi, categoryApi } from "../utils/api";

export const Provider = ({ children }: any) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [user, setUser] = useState<IUser>(JSON.parse(localStorage.getItem("user") as string) ?? {} as IUser);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const query = useRef<IQueryGetAllBooks>({
    title: "",
    author: "",
    page: 0,
    order: "id",
    by: "",
    category: "",
    status: ""
  });

  // useEffect(() => {
  //   if(books.length === 0) {
  //     query.current.page = 0;
  //   }
  // }, [books]);

  useEffect(() => {
    booksApi.getAll(query.current).then(({data}) => setBooks(data));
    categoryApi.getAll().then(({data}) => setCategories(data));
  },[]);

  return (
    <Context.Provider value={{ books, setBooks, categories, query, user, setUser }}>
      {children}
    </Context.Provider>
  );
};
