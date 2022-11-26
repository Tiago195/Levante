import { Box, Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import Context from "../context";
import { IBook } from "../interfaces/IBook";
import { booksApi, reservationApi } from "../utils/api";
import { sendNotificationForAdm } from "../utils/socket";

type Props = {
  book: IBook
}

export const ModalReservation = ({ book }: Props) => {
  const { user, query, setBooks } = useContext(Context);
  const toast = useToast();
  const previewDate = useRef<HTMLInputElement>(null);


  const { isOpen, onOpen, onClose } = useDisclosure();

  const sendReservation = async () => {
    if(previewDate.current) {
      const createReservation = {
        userId: user!.id,
        bookId: book.id,
        returnPreview: previewDate.current.value
      };
      // console.log(previewDate.current.value);
      
      try {
        await reservationApi.create(createReservation);
        toast({
          title: "Pedido do Livro enviado, um adm vai cuidar disso para você.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // const {data} = await booksApi.getAll(query!.current);
        // setBooks(data);
        // console.log(data);
        onClose();
        sendNotificationForAdm();
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
      <Button onClick={onOpen} disabled={book.status} variant='solid' colorScheme='blue'>Reservar</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reservar Livro</ModalHeader>
          <ModalCloseButton />
          <ModalBody gap="20px" display="flex" flexDirection="column">
            <Box>
              <Heading>{book.title}</Heading>
              <Text color="gray.500">{book.author}</Text>
            </Box>

            <FormControl>
              <FormLabel>Previsão de entrega</FormLabel>
              <Input ref={previewDate} type="date"/>
              <Text fontSize="2xs" color="gray.500">Prazo minimo de entrega é 3 dias depois da data de reserva.</Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={sendReservation} colorScheme='blue'>Reservar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
