import { Alert, AlertIcon, Box, Flex, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IUser } from "../interfaces/IUser";
import { userApi } from "../utils/api";
import { InputSearch } from "./InputSearch";
import {BsCalendarFill} from "react-icons/bs";
import { statusReservation } from "../interfaces/IReservation";

type Props = {
  users: IUser[],
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export const SelectUser = ({users, setUsers}: Props) => {

  const searchUsers = async (search: string) => {
    await userApi.getAll(search).then(({data}) => setUsers(data)); 
  };

  const colors = {
    Pending: "yellow.500",
    Finished: "red.500",
    Reading: "green.500",
    Denied: "req.1000",
    "": ""
  };
  return (
    <>
      <InputSearch list="users" api={searchUsers} searchBy="Email">
        <datalist id="users" >
          {users.map(e => (
            <option key={e.id} value={e.email}>
              <Box>
                <Text>{e.name}</Text>
              </Box>
            </option>
          ))}
        </datalist>
      </InputSearch>
      {!!users.length && (
        <Flex flexDirection="column" gap="20px">
          <Box>
            <Heading>{users[0].email}</Heading>
            <Text color="gray.500">{users[0].name}</Text>
          </Box>
          <List>
            <Heading as='h3' size='md'>Reservas</Heading>
            {users[0].reservations?.map(e => (
              <ListItem p="0 10px" key={e.id}>
                <ListIcon as={BsCalendarFill} color={colors[e.status]} />
                {new Date(e.returnPreview).toLocaleDateString("pt-BR", {weekday: "long", year: "numeric", month: "long", day: "numeric"})}
              </ListItem>
            ))}
          </List>
        </Flex>
      )}
    </>
  );
};
