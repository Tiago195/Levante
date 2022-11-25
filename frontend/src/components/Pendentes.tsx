import { Box, Button, Flex, Heading, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import Context from "../context";
import { IReservation } from "../interfaces/IReservation";
import { reservationApi } from "../utils/api";

export const Pendentes = () => {
  const { pendencies, setPendencies } = useContext(Context);
  const toast = useToast();

  const sendPermition = async (bookId: number,  status: string) => {
    
    try {
      await reservationApi.patch(bookId, status);
      toast({
        title: "Pendencia Resolvida.",
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

    const newPendencies = status === "Reading" ? pendencies?.map(e => ({...e, status: "Reading"})) : pendencies!.filter(e => e.book.id !== bookId);

    setPendencies(newPendencies as IReservation[]);
    
  };
  
  return (
    <Box>
      <TableContainer>
        <Table variant='striped' colorScheme='blue'>
          <Thead>
            <Tr>
              <Th>usuario</Th>
              <Th>Livro</Th>
              <Th>data da reserva</Th>
              <Th>previsão de entrega</Th>
              <Th>Ação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pendencies?.map(resevation => {
              const isLate = new Date(resevation.returnPreview).getTime() < new Date().getTime();
              return (
                <Tr key={resevation.id}>
                  <Td>
                    <Heading size="md">{resevation.user.email}</Heading>
                    <Text color="gray.500">{resevation.user.name}</Text>
                  </Td>
                  <Td>{resevation.book.title}</Td>
                  <Td>{new Date(resevation.createdAt).toLocaleDateString()}</Td>
                  <Td>{new Date(resevation.returnPreview + ":").toLocaleDateString()}</Td>
                  <Td>
                    {resevation.status === "Reading" ||  isLate ? (
                      <Flex gap="10px">
                        <Button onClick={() => sendPermition(resevation.book.id, "Finished")} colorScheme={isLate ? "yellow" : "green"}>Devolveu</Button>
                      </Flex>
                    ) : (
                      <Flex gap="10px">
                        <Button onClick={() => sendPermition(resevation.book.id, "Reading")} colorScheme="green">Permitir</Button>
                        <Button onClick={() => sendPermition(resevation.book.id, "Denied")} colorScheme="red">Negar</Button>
                      </Flex>
                    )}
                  </Td>
                </Tr>
              );})}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>usuario</Th>
              <Th>Livro</Th>
              <Th>data da reserva</Th>
              <Th>previsão de entrega</Th>
              <Th>Ação</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};
