import { Box, Button, Flex, FormControl, FormLabel, Heading, InputRightElement, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, Kbd } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "../context";
import { IQueryGetAllReservation } from "../interfaces/IQueryGetAllReservation";
import { IReservation } from "../interfaces/IReservation";
import { reservationApi } from "../utils/api";
import {AiOutlineSearch} from "react-icons/ai";
import { DreawerFilter } from "./DreawerFilter";
import { Pagination } from "./Pagination";

export const History = () => {
  const query = useRef<IQueryGetAllReservation>({
    title: "",
    email: "",
    by: "",
    order: "id",
    page: 0,
    status: "",
    createdAt: ""
  });
  const [reservations, setReservations] = useState<IReservation[]>([]);

  const getReservations = async () => {
    reservationApi.getAll(query.current).then(({data}) => setReservations(data));
  };

  const incrementPage = async () => {
    query!.current.page += 1;

    await getReservations();
  };

  const decrementPage = async () => {
    query!.current.page -= 1;
    
    await getReservations();
  };

  const search = async ({key}: any) => {
    if(key === "Enter") await getReservations();
  };

  useEffect(() => {getReservations();}, []);

  const colors = {
    Pending: "yellow.500",
    Finished: "red.500",
    Reading: "green.500",
    Denied: "req.1000",
    "": ""
  };

  return (
    <Box>
      <Flex justifyContent="end" alignItems="center" gap="20px">
        <InputGroup maxW="40%">
          <InputLeftElement pointerEvents='none' ><AiOutlineSearch /></InputLeftElement>
          <Input type='tel' onChange={({target}) => query.current.title = target.value} onKeyUp={search} placeholder='Pesquisar pelo titulo do livro' />
          <InputRightElement marginRight="15px"><Kbd>Enter</Kbd></InputRightElement>
        </InputGroup>

        <DreawerFilter query={query} get={getReservations}/>
      </Flex>
      <Box>
        <TableContainer>
          <Table colorScheme='blue'>
            <Thead>
              <Tr>
                <Th>usuario</Th>
                <Th>Livro</Th>
                <Th>data da reserva</Th>
                <Th>previsão de entrega</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservations?.map(resevation => (
                <Tr key={resevation.id}>
                  <Td>
                    <Heading size="md">{resevation.user.email}</Heading>
                    <Text color="gray.500">{resevation.user.name}</Text>
                  </Td>
                  <Td>{resevation.book.title}</Td>
                  <Td>{new Date(resevation.createdAt).toLocaleDateString()}</Td>
                  <Td>{new Date(resevation.returnPreview).toLocaleDateString()}</Td>
                  <Td color={colors[resevation.status]}>{resevation.status}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>usuario</Th>
                <Th>Livro</Th>
                <Th>data da reserva</Th>
                <Th>previsão de entrega</Th>
                <Th>Status</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
      <Pagination page={query.current.page} limit={reservations.length} decrementPage={decrementPage} incrementPage={incrementPage}/>
    </Box>
  );
};
