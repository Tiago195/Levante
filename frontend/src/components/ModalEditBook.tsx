import { Box, Button, Checkbox, CheckboxGroup, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tag, TagCloseButton, TagLabel, TagRightIcon, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { IBook } from "../interfaces/IBook";
import {GrAdd} from "react-icons/gr";
import Context from "../context";
import { ICategory } from "../interfaces/ICategory";
import { booksApi } from "../utils/api";
import { Loading } from "./Loading";
import { InputCategories } from "./InputCategories";

type Props = {
  book: IBook
}

export const ModalEditBook = ({book}: Props) => {
  const { query, setBooks } = useContext(Context);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const titleInput = useRef<HTMLInputElement>(null);
  const authorInput = useRef<HTMLInputElement>(null);
  const resumeInput = useRef<HTMLTextAreaElement>(null);
  const [categories, setCategories] = useState(book.categories);

  const send = async () => {
    if(titleInput.current && authorInput.current && resumeInput.current) {
      const updateBook = {
        title: titleInput.current.value,
        author: authorInput.current.value,
        categories: categories.map(e => e.id),
        resume: resumeInput.current.value
      };
      
      try {
        setLoading(true);
        await booksApi.update(updateBook, book.id);
      } catch (err: any) {
        const message = err.response.data.message;
        toast({
          title: "Algo deu errado.",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } 
      finally {
        booksApi.getAll(query!.current).then(({data}) => setBooks(data))
          .finally(() => {
            setLoading(false);
            onClose();
          });
      }
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Editar</Button>
  
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar livro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
              <FormLabel>Title</FormLabel>
              <Input ref={titleInput} type='email' defaultValue={book.title}  />

              <FormLabel>Author</FormLabel>
              <Input ref={authorInput} defaultValue={book.author} />

              <FormLabel>Resumo</FormLabel>
              <Textarea ref={resumeInput} defaultValue={book.resume} />

              <InputCategories categories={categories} setCategories={setCategories}/>

            </FormControl>
          </ModalBody>
  
          <ModalFooter>
            <Button variant='ghost' colorScheme={"red"}  mr={3} onClick={onClose}>
                Close
            </Button>
            <Button onClick={send} colorScheme='green'>Salvar</Button>
          </ModalFooter>
          <Loading loading={loading}/>
        </ModalContent>
      </Modal>
    </>
  );
};
