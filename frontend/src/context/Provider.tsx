import React, { useEffect, useRef, useState } from "react";
import Context from ".";
import { IBook } from "../interfaces/IBook";
import { ICategory } from "../interfaces/ICategory";
import { IQueryGetAllBooks } from "../interfaces/IQueryGetAllBooks";
import { IQueryGetAllReservation } from "../interfaces/IQueryGetAllReservation";
import { IReservation } from "../interfaces/IReservation";
import { IUser } from "../interfaces/IUser";
import { booksApi, categoryApi, reservationApi } from "../utils/api";

export const Provider = ({ children }: any) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [user, setUser] = useState<IUser>(JSON.parse(localStorage.getItem("user") as string) ?? {} as IUser);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [pendencies, setPendencies] = useState<IReservation[]>([]);
  const query = useRef<IQueryGetAllBooks>({
    title: "",
    author: "",
    page: 0,
    order: "id",
    by: "",
    category: "",
    status: ""
  });

  useEffect(() => {
    booksApi.getAll(query.current).then(({data}) => setBooks(data));
    categoryApi.getAll().then(({data}) => setCategories(data));
    // reservationApi.getAll({ status: "Pending" } as IQueryGetAllReservation).then(({data}) => setReservations(data));
    reservationApi.getAllPendencies().then(({data}) => setPendencies(data));
  },[]);

  return (
    <Context.Provider
      value={{
        books,
        setBooks,
        categories,
        setCategories,
        query,
        user,
        setUser,
        reservations,
        setReservations,
        pendencies,
        setPendencies
      }}>
      {children}
    </Context.Provider>
  );
};
