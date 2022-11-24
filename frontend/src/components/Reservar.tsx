import { Alert, AlertIcon, Box, Button, Divider, Flex, FormControl, Heading, Input, InputGroup, InputLeftAddon, Stack, Text, useToast } from "@chakra-ui/react";
import React, { LegacyRef, useRef, useState } from "react";
import { IBook } from "../interfaces/IBook";
import { IUser } from "../interfaces/IUser";
import { reservationApi } from "../utils/api";

import { SelectBook } from "./SelectBook";
import { SelectUser } from "./SelectUser";

export const Reservar = () => {
  const [book, setBooks] = useState<IBook[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const previewDate = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const createReservation = async () => {
    
    if(previewDate.current) {
      const reservation = {
        bookId: book[0]?.id,
        userId: users[0]?.id,
        returnPreview: new Date(previewDate.current.value)
      };
      try {
        await reservationApi.create(reservation);
        toast({
          title: "Reserva Criada.",
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
    <Flex flexDirection="column">
      <Flex gap="20px">
        <FormControl  display="flex" gap="10px" flexDirection="column" >
          <SelectBook book={book} setBooks={setBooks} input={previewDate}/>
        </FormControl>
        

        <Stack direction='row' h='60vh' >
          <Divider orientation='vertical' />
        </Stack>

        <FormControl display="flex" gap="10px" flexDirection="column" >
          <SelectUser users={users} setUsers={setUsers}/>
        </FormControl>
      </Flex>

      <Button onClick={createReservation} colorScheme="green" alignSelf="end">Reservar Livro</Button>
    </Flex>
  );
};
