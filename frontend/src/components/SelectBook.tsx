import { Alert, AlertIcon, Box, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { LegacyRef, useState } from "react";
import { IBook } from "../interfaces/IBook";
import { IQueryGetAllBooks } from "../interfaces/IQueryGetAllBooks";
import { booksApi } from "../utils/api";
import { CardBook } from "./CardBook";
import { InputSearch } from "./InputSearch";

type Props = {
  book: IBook[],
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>,
  input: LegacyRef<HTMLInputElement>
}

export const SelectBook = ({book, setBooks, input}: Props) => {

  const searchBooks = async (search: string) => {
    const query: IQueryGetAllBooks = {
      title: search,
      author: "",
      by: "",
      category: "",
      order: "",
      page: 0,
      status: ""
    };
    await booksApi.getAll(query).then(({data}) => setBooks(data)); 
  };

  return (
    <>
      <InputSearch list="books" api={searchBooks} searchBy="Livro">
        <datalist id="books" >
          {book.map(e => (
            <option key={e.id} value={e.title}>
              <Box>
                <Text>{e.author}</Text>
              </Box>
            </option>
          ))}
        </datalist>
      </InputSearch>
      {!!book.length && (
        <>
          <CardBook book={book[0]}/>
          {
            book[0].status && (
              <Flex gap="20px">
                <Alert status='info' variant='top-accent'>
                  <AlertIcon />{`Previsão de retorno: ${new Date(book[0].reservation.returnPreview).toLocaleDateString()}`}
                </Alert>
              </Flex>
            )
          }
        </>
      )}
      <FormLabel>Previsão de entrega</FormLabel>
      <Input ref={input} type="date"></Input>
    </>
  );
};
