import React, { useContext } from 'react';
import { Badge, Box, Card, CardBody, CardFooter, Heading, HStack, Stack, Tag, Text } from '@chakra-ui/react';
import { IBook } from '../interfaces/IBook';
import { ModalLogin } from './ModalLogin';
import Context from '../context';
import ActionBookBtn from './ActionBookBtn';
import { GiRead } from 'react-icons/gi';

type Props = {
  book: IBook
}

export const CardBook = ({book}: Props) => {
  const {user} = useContext(Context);
  
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Box 
        backgroundImage={book.cover}
        backgroundSize="cover"
        backgroundPosition="center"
        w="200px"
        filter={book.status ? 'grayscale(1)' : 'grayscale(0)'}
      >

      </Box>
      <Stack w="100%">
        <CardBody >
          <Badge display="flex" w="fit-content" alignItems="center" fontSize="1xs" gap="0.5rem" colorScheme='twitter'><GiRead />{book.readCount}</Badge>
          <Heading size='md'>{book.title}</Heading>

          <Text py='2'>{book.author}</Text>

          <HStack spacing={4}>
            {book.categories.map((category) => (
              <Tag key={category.id}>{category.name}</Tag>
            ))}
          </HStack>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          {user?.email ? (
            <ActionBookBtn isAdmin={user.isAdmin} book={book} />
          ) : (
            <ModalLogin disabled={book.status} variant='solid' colorScheme='blue' textBtn="Reservar"/>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};
