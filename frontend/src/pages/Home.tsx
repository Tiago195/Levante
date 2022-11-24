import React, { useContext } from "react";
import { Box, Button, Divider, Flex, FormControl, FormLabel, Image, Input, List, ListIcon, ListItem, Select, Stack, Switch, Tag, Text } from "@chakra-ui/react";
import { CardBook } from "../components/CardBook";
import { Header } from "../components/Header";
import {FaGamepad} from "react-icons/fa";
import { Categories } from "../components/Categories";
import { CarouselBook } from "../components/CarouselBook";
import { Filtros } from "../components/Filtros";
import Context from "../context";
import { booksApi } from "../utils/api";

export const Home = () => {
  const { books, query, setBooks } = useContext(Context);
  
  const incrementPage = () => {
    query!.current.page += 1;

    booksApi.getAll(query!.current).then(({data}) => setBooks(data));
  };

  const decrementPage = () => {
    query!.current.page -= 1;
    
    booksApi.getAll(query!.current).then(({data}) => setBooks(data));
  };

  return (
    <>
      <Header />
      <Box p={[3, 8]}>
        <CarouselBook/>
        <Flex gap="20px" paddingTop={10}>
          <Categories/>
          <Stack direction='row' h='100vh' >
            <Divider orientation='vertical' />
          </Stack>
          <Flex flexDirection="column" w="100%">
            <Filtros />
            <Flex gap="20px" flexDirection="column">
              {books?.map(book => (
                <CardBook key={book.id} book={book}/>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="center" p={[3, 8]} gap="20px">
          <Button disabled={query!.current.page === 0} onClick={decrementPage}>Anterior</Button>
          <Button>{query!.current.page + 1}</Button>
          <Button disabled={books!.length !== 10} onClick={incrementPage}>Proxima</Button>
        </Flex>
      </Box>
    </>
  );
};