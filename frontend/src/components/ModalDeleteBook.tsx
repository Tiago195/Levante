import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Progress, useDisclosure } from "@chakra-ui/react";
import React, { RefObject, useContext, useRef, useState } from "react";
import Context from "../context";
import { IBook } from "../interfaces/IBook";
import { booksApi } from "../utils/api";
import { Loading } from "./Loading";

type Props = {
  book: IBook
}

export const ModalDeleteBook = ({ book}: Props) => {
  const { query, setBooks } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef() as RefObject<any>;
  const [loading, setLoading] = useState(false);

  const deleteBook = async () => {
    try {
      setLoading(true);
      await booksApi.delete(book.id);
    } finally {
      booksApi.getAll(query!.current)
        .then(({data}) => setBooks(data))
        .finally(() => {
          setLoading(false);
          onClose();
        });
    }
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
          Deletar
      </Button>
  
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Deletar Livro
            </AlertDialogHeader>
  
            <AlertDialogBody>
              Tem certeza? Você não pode desfazer essa ação depois.
            </AlertDialogBody>
  
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={deleteBook} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
            <Loading loading={loading}/>
          </AlertDialogContent>

        </AlertDialogOverlay>
      </AlertDialog>
    </>
    
  );
};
