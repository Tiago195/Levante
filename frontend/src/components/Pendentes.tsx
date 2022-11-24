import { Box, Button, Flex, Heading, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import Context from "../context";
import { reservationApi } from "../utils/api";

export const Pendentes = () => {
  const { pendencies } = useContext(Context);
  const toast = useToast();

  const sendPermition = async (bookId: number,  status: string) => {

    // enviar para o backend a permissao
    try {
      await reservationApi.patch(bookId, status);
      toast({
        title: "Pendencia removida.",
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
    // remover esta pendencia
  };
  console.log(pendencies);
  
  return (
    <Box>
      <TableContainer>
        <Table variant='striped' colorScheme='blue'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
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
            {pendencies?.map(resevation => (
              <Tr key={resevation.id}>
                <Td>
                  <Heading size="md">{resevation.user.email}</Heading>
                  <Text color="gray.500">{resevation.user.name}</Text>
                </Td>
                <Td>{resevation.book.title}</Td>
                <Td>{new Date(resevation.createdAt).toLocaleDateString()}</Td>
                <Td>{new Date(resevation.returnPreview).toLocaleDateString()}</Td>
                <Td>
                  {new Date(resevation.returnPreview).getTime() > new Date().getTime() ? (
                    <Flex gap="10px">
                      <Button onClick={() => sendPermition(resevation.book.id, "Reading")} colorScheme="green">Permitir</Button>
                      <Button onClick={() => sendPermition(resevation.book.id, "Denied")} colorScheme="red">Negar</Button>
                    </Flex>
                    
                  ) : (
                    <Flex gap="10px">
                      <Button onClick={() => sendPermition(resevation.book.id, "Finished")} colorScheme="green">Devolveu</Button>
                    </Flex>
                  ) }
                </Td>
              </Tr>
            ))}
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
