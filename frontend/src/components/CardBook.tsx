import React, { useContext } from "react";
import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, HStack, Image, Stack, Tag, Text } from "@chakra-ui/react";
import { IBook } from "../interfaces/IBook";
import { ModalLogin } from "./ModalLogin";
import Context from "../context";
import ActionBookBtn from "./ActionBookBtn";

type Props = {
  book: IBook
}

export const CardBook = ({book}: Props) => {
  const {user} = useContext(Context);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow='hidden'
      variant='outline'
    >
      <Box 
        backgroundImage={book.capa}
        backgroundSize="cover"
        backgroundPosition="center"
        w="200px"
        filter={book.status ? "grayscale(0)" : "grayscale(1)"}
      >

      </Box>
      <Stack w="100%">
        <CardBody >
          <Heading size='md'>{book.title}</Heading>

          <Text py='2'>{book.author}</Text>

          <HStack spacing={4}>
            {book.categories.map((category) => (
              <Tag key={category.id}>{category.name}</Tag>
            ))}
          </HStack>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          {/* troca isso aqui depois */}
          {user?.email ? (
            <ActionBookBtn isAdmin={user.isAdmin} book={book} />
          ) : (
            <ModalLogin disabled={!book.status} variant='solid' colorScheme='blue' textBtn="Reservar"/>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};
