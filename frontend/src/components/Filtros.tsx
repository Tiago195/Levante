import { Button, Flex, FormControl, FormLabel, Select, Switch } from "@chakra-ui/react";
import React, { ChangeEvent, useContext } from "react";
import Context from "../context";
import { booksApi } from "../utils/api";
import { OrderBy } from "./OrderBy";

export const Filtros = () => {
  const { query, setBooks } = useContext(Context);
  const options = [
    {key: "Titulo", value: "title"},
    {value: "author", key: "Author"},
    {value: "readCount", key: "Mais lidos"}
  ];

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
        <OrderBy
          changeBy={changeBy}
          changeOrder={changeOrder}
          options={options}
          order={query!.current.order}
          by={query!.current.by}
        />

        <Button onClick={changeBooks}>Filtrar</Button>
      </Flex>
    </Flex>
  );
};
