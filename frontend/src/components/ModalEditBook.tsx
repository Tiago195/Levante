import { Box, Button, Checkbox, CheckboxGroup, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tag, TagCloseButton, TagLabel, TagRightIcon, Textarea, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { IBook } from "../interfaces/IBook";
import {GrAdd} from "react-icons/gr";
import Context from "../context";
import { ICategory } from "../interfaces/ICategory";
import { booksApi } from "../utils/api";
import { Loading } from "./Loading";

type Props = {
  book: IBook
}

export const ModalEditBook = ({book}: Props) => {
  const { categories: AllCategories, query, setBooks } = useContext(Context);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);


  const titleInput = useRef<HTMLInputElement>(null);
  const authorInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState(book.categories);
  // const anotherTags = AllCategories?.filter(category => categories.some(e => e.id !== category.id));
  
  const changeCategories = (e: string[]) => {
    setCategories(e.map((category) => JSON.parse(category)));
  };

  const send = async () => {
    if(titleInput.current && authorInput.current && contentInput.current) {
      const updateBook = {
        title: titleInput.current.value,
        author: authorInput.current.value,
        categories: categories.map(e => e.id),
        content: contentInput.current.value
      };
      
      try {
        setLoading(true);
        await booksApi.update(updateBook, book.id);
      } finally {
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
          <ModalHeader>Fazer login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
              <FormLabel>Title</FormLabel>
              <Input ref={titleInput} type='email' defaultValue={book.title}  />

              <FormLabel>Author</FormLabel>
              <Input ref={authorInput} defaultValue={book.author} />

              <FormLabel>Content</FormLabel>
              <Input ref={contentInput} defaultValue={book.content} />

              <FormLabel>Adicionar categoria</FormLabel>

              <CheckboxGroup colorScheme='green' defaultValue={categories.map(e => JSON.stringify(e))} onChange={changeCategories}>
                <Stack display="flex" flexDirection="row" wrap="wrap" justifyContent="space-between">
                  {AllCategories?.map(category => (
                    <Tag key={category.id}>
                      <Checkbox value={JSON.stringify({id: category.id, name: category.name })}>
                        <TagLabel>{category.name}</TagLabel>
                      </Checkbox>
                    </Tag>
                  ))}
                </Stack>
              </CheckboxGroup>

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
