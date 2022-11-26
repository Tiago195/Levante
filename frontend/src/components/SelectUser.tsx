import { Alert, AlertIcon, Badge, Box, Checkbox, Flex, Heading, List, ListIcon, ListItem, Stack, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { userApi } from "../utils/api";
import { InputSearch } from "./InputSearch";
import {BsCalendarFill} from "react-icons/bs";
import { IReservation, statusReservation } from "../interfaces/IReservation";
import { Pagination } from "./Pagination";

type Props = {
  users: IUser[],
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export const SelectUser = ({users, setUsers}: Props) => {
  const searchUsers = async (search: string) => {
    await userApi.getAll(search).then(({data}) => setUsers(data)); 
  };

  const colors = {
    "": "",
    Pending: "yellow.500",
    Finished: "blue.500",
    Reading: "green.500",
    Denied: "red.500",
  };

  const [status, setStatus] = useState<string[]>(["Reading"]);
  const [reservations, setResevations] = useState<IReservation[] | undefined>(users[0]?.reservations);
  const [page, setPage] = useState(0);
  const [getReservations, setGetReservations] = useState(reservations?.filter(e => status.includes(e.status)).slice(page * 10, 10));

  const allChecked = status.length -1 === Object.keys(colors).length - 1;

  const selectStatus = ({ target } :ChangeEvent<HTMLInputElement>) => {
    if(target.checked) setStatus((old) => [...old, target.value]);
    else setStatus(status.filter(e => e !== target.value));

    setPage(0);
  };
  
  useEffect(() => setResevations(users[0]?.reservations as IReservation[]), [users[0]?.reservations]);
  
  useEffect(() => setGetReservations(reservations?.filter(e => status.includes(e.status)).slice(page * 10, 10)),[reservations]);

  useEffect(() => {
    setGetReservations(reservations?.filter(e => status.includes(e.status)).slice(page * 10, 10) ?? []);
  }, [status]);

  const incrementPage = async () => {
    setPage(e => {
      setGetReservations(reservations?.filter(e => status.includes(e.status)).slice((e+1) * 10, (e+2) * 10) ?? []);
      return e+1;
    });
  };

  const decrementPage = async () => {
    setPage(e => {
      if(e-2 < 0) setGetReservations(reservations?.filter(e => status.includes(e.status)).slice(0 * 10, 10));
      else setGetReservations(reservations?.filter(e => status.includes(e.status)).slice((e-2) * 10, (e-1) * 10) ?? []);
      return e-1;
    });
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
            <Flex justifyContent="space-between" alignItems="center">
              <Heading as='h3' size='md'>Reservas</Heading>
              <Stack display="flex" flexDirection="row" justifyContent="space-around" w="100%">

                {Object.entries(colors).map(([stat, color], i) => (
                  i === 0 ? (
                    <Badge key={color} color={color} marginTop="8px">
                      <Checkbox
                        marginTop="4px"
                        onChange={({target}) => {
                          target.checked ? setStatus(Object.keys(colors)) : setStatus([]);
                          setPage(0);
                        }}
                        value={stat}
                        isChecked={allChecked}
                        isIndeterminate={!allChecked}
                      >{stat}</Checkbox>
                    </Badge>
                  ) : (
                    <Badge key={color} color={color} >
                      <Checkbox isChecked={status.includes(stat)} onChange={selectStatus} value={stat}>{stat}</Checkbox>
                    </Badge>
                  )
                ))}
              </Stack>
            </Flex>
            {getReservations?.map(e => (
              <ListItem p="0 10px" key={e.id}>
                <ListIcon as={BsCalendarFill} color={colors[e.status]} />
                {new Date(e.returnPreview).toLocaleDateString("pt-BR", {weekday: "long", year: "numeric", month: "long", day: "numeric"})}
              </ListItem>
            ))}
          </List>
          <Pagination incrementPage={incrementPage} decrementPage={decrementPage} limit={getReservations!.length} page={page}  />
        </Flex>
      )}
    </>
  );
};
