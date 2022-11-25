import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Select, Text, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, MutableRefObject, useContext, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Context from "../context";
import { IQueryGetAllReservation } from "../interfaces/IQueryGetAllReservation";
import { statusReservation } from "../interfaces/IReservation";
import { OrderBy } from "./OrderBy";

type Props = {
  query: MutableRefObject<IQueryGetAllReservation>,
  get: () => Promise<void>
}

export const DreawerFilter = ({query, get}: Props) => {
  const { user } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const options = [
    {value: "returnDate", key: "Data de retorno"},
    {value: "returnPreview", key: "Previsão de entrega"},
    {value: "createdAt", key: "Data da reserva"},
  ];
  const btnRef = React.useRef(null);

  const changeOrder = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    query!.current.order = target.value;
  };

  const changeBy = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    query!.current.by = target.value;
  };

  return (
    <>
      <Button ref={btnRef} variant="ghost" onClick={onOpen}>
        <FaEllipsisV />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtrar historico</DrawerHeader>

          <DrawerBody>
            <FormControl display="flex" gap="10px" flexDirection="column">
              <Box>
                <FormLabel >Status</FormLabel>
                <Select  defaultValue={query.current.status} onChange={({target}) => query.current.status = target.value as statusReservation} placeholder="Escolha um status">
                  <option value="Pending">Pending</option>
                  <option value="Finished">Finished</option>
                  <option value="Reading">Reading</option>
                </Select>
              </Box>

              <Box>

                <FormLabel>Data</FormLabel>
                <Input defaultValue={query.current.createdAt} onChange={({target}) => query.current.createdAt = target.value} type="date"/>
              </Box>

              {user?.isAdmin && (
                <Box>
                  <FormLabel>Email do usuario</FormLabel>
                  <Input defaultValue={query.current.email} onChange={({target}) => query.current.email = target.value}/>              
                </Box>
              )}
              <OrderBy
                changeBy={changeBy}
                changeOrder={changeOrder}
                options={options}
                order={query.current.order}
                by={query.current.by}
              />
            </FormControl>
            
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => {get().finally(); onClose();}} colorScheme='blue'>Pesquisar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
