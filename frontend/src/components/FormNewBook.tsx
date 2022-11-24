import { Box, Button, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ICategory } from "../interfaces/ICategory";
import { booksApi } from "../utils/api";
import { InputCategories } from "./InputCategories";

export const FormNewBook = () => {
  const titleInput = useRef<HTMLInputElement>(null);
  const authorInput = useRef<HTMLInputElement>(null);
  const capaInput = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [categories, setCategories] = useState<ICategory[]>([]);


  const createBook = async () => {
    if(titleInput.current && authorInput.current && capaInput.current) {

      const createdBook = {
        title: titleInput.current.value,
        author: authorInput.current.value,
        categories: categories.map(e => e.id),
        capa: capaInput.current.value
      };
      try {
        await booksApi.create(createdBook);
        toast({
          title: "Livro Criado.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        const message = error.response.data.message;
        toast({
          title: "Algo deu errado.",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap="10px">
        <Heading>Livro</Heading>
          
        <Box>
          <FormLabel>Titulo</FormLabel>
          <Input ref={titleInput}/>
        </Box>
        
        <Box>
          <FormLabel>Author</FormLabel>
          <Input ref={authorInput}/>
        </Box>
        <Box>
          <FormLabel>Url da capa</FormLabel>
          <Input ref={capaInput}/>
        </Box>

        <Box>
          <InputCategories categories={categories} setCategories={setCategories}/>
        </Box>
      </Box>

      <Button onClick={createBook} colorScheme="green">Criar</Button>
    </>
  );
};
