import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';
import React, { RefObject, useContext, useRef, useState } from 'react';
import Context from '../context';
import { IBook } from '../interfaces/IBook';
import { booksApi, categoryApi } from '../utils/api';
import { Loading } from './Loading';

type Props = {
  book: IBook
}

export const ModalDeleteBook = ({ book}: Props) => {
  const { query, setBooks, setCategories } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef() as RefObject<any>;
  const [loading, setLoading] = useState(false);

  const deleteBook = async () => {
    try {
      setLoading(true);
      await booksApi.delete(book.id);
    } finally {
      const [books, category] = await Promise.all([booksApi.getAll(query!.current),  categoryApi.getAll()]);
      setBooks(books.data);
      setCategories(category.data);
      onClose();
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
