import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { IBook } from "../interfaces/IBook";
import { ModalDeleteBook } from "./ModalDeleteBook";
import { ModalEditBook } from "./ModalEditBook";

type Props = {
  isAdmin: boolean,
  book: IBook
}


export default function ActionBookBtn({isAdmin, book}: Props) {
  return isAdmin ? (
    <Flex gap="20px">
      <ModalDeleteBook book={book}/>
      <ModalEditBook book={book} />
    </Flex>
  ) : (
    <Button disabled={!book.status} variant='solid' colorScheme='blue'>Reservar</Button>
  );
}
