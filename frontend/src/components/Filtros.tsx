import { Button, Flex, FormControl, FormLabel, Select, Switch } from "@chakra-ui/react";
import React, { ChangeEvent, useContext } from "react";
import Context from "../context";
import { booksApi } from "../utils/api";

export const Filtros = () => {
  const { query, setBooks } = useContext(Context);

  const changeOrder = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    query!.current.order = target.value;
  };

  const changeBy = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    query!.current.by = target.value;
  };

  const changeBooks = async () => {
    booksApi.getAll(query!.current).then(({data}) => setBooks(data));
  };

  const changeAvailable = async ({target}: ChangeEvent<HTMLInputElement>) => {
    query!.current.status = target.checked ? "true" : "";
    await changeBooks();
  };

  return (
    <Flex justifyContent="space-between" p="10px 0">

      <FormControl display='flex' alignItems='center' w="fit-content">
        <FormLabel >
          Filtrar apenas pelos disponiveis?
        </FormLabel>
        <Switch onChange={changeAvailable}/>
      </FormControl>

      <Flex gap="20px">
        <Flex w="fit-content">
          <Select placeholder='Ordenar Por' onChange={changeOrder}>
            <option value="title">Titulo</option>
            <option value="author">Author</option>
            <option value="lido">Mais lidos</option>
          </Select>
        </Flex>

        <Flex w="fit-content">
          <Select placeholder='Ordem' onChange={changeBy}>
            <option value="ASC">Crescente</option>
            <option value="DESC">Decrescente</option>
          </Select>
        </Flex>

        <Button onClick={changeBooks}>Filtrar</Button>
      </Flex>
    </Flex>
  );
};
