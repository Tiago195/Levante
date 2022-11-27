import { Divider, Flex, FormControl, Stack } from '@chakra-ui/react';
import React from 'react';
import { FormNewBook } from './FormNewBook';
import { FormNewUser } from './FormNewUser';

export const Cadastrar = () => {

  return (
    <Flex gap="20px">
      <FormControl  display="flex" justifyContent="space-between" flexDirection="column" >
        <FormNewBook />
      </FormControl>

      <Stack direction='row' h='80vh' >
        <Divider orientation='vertical' />
      </Stack>

      <FormControl display="flex" justifyContent="space-between" flexDirection="column" >
        <FormNewUser />
      </FormControl>
    </Flex>
  );
};
