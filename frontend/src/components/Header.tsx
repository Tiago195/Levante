import { Avatar, AvatarBadge, Box, Button, Flex, Input, InputGroup, InputRightAddon, Menu, MenuButton, MenuItem, MenuList, Select, Text } from '@chakra-ui/react';
import React, {  useContext, useRef } from 'react';
import { ImBooks } from 'react-icons/im';
import { useLocation, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Context from '../context';
import { booksApi } from '../utils/api';
import { ModalLogin } from './ModalLogin';

export const Header = () => {
  const { query, setBooks, user, pendencies } = useContext(Context);
  const method = useRef<HTMLSelectElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const send = async (e: any) => {
    e.preventDefault();
    if(input.current && method.current) {
      type valueType = 'title' | 'author';
      const value = method.current.value as valueType;
      query!.current[value] = input.current.value;

      booksApi.getAll(query!.current).then(({data}) => setBooks(data));
    }
  };

  const logOut = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <Flex padding={[3, 8]} justifyContent="space-between" gap="20px">
      <Flex gap="10px" fontFamily={'monospace'} alignItems="center" fontSize="30px">
        <Button bg="none" _hover={{bg: 'none'}} _focus={{bg: 'none'}} p={0} fontSize="30px"  onClick={() => navigate('/')}>
          <ImBooks />
        </Button>
        <Text as="h1">Levante</Text>
      </Flex>
      
      {!pathname.includes('profile') && (
        <Box flex={1}>
          <form onSubmit={send}>
            <InputGroup>
              <Input placeholder="Pesquisar Livros" ref={input} />
              <InputRightAddon bg="none">
                <Select ref={method} defaultValue="title">
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                </Select>
              </InputRightAddon>
            </InputGroup>
          </form>
        </Box>
      )}
      
      <Box >
        {user?.email ? (
          <Button bg="none" _hover={{bg: 'none'}} w="fit-content" _focus={{bg: 'none'}} zIndex="3">
            <Menu >
              <MenuButton as={Button} bg="none" _hover={{bg: 'none'}} _focus={{bg: 'none'}}>
                <Flex alignItems="center" gap="10px">
                  <Avatar name={user.name} boxSize="2em">
                    {!!pendencies?.length && (
                      <AvatarBadge boxSize='1.25em' bg='blue.500' >{pendencies?.length}</AvatarBadge>
                    )}
                  </Avatar>
                  <Text>{user.email}</Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <Flex justifyContent="space-between" p="5px">
                  <Box>
                    <MenuItem onClick={() => navigate('/profile')}>Op????es</MenuItem>
                    <MenuItem onClick={logOut}>Sair</MenuItem>
                  </Box>
                  <ColorModeSwitcher />
                </Flex>
              </MenuList>
            </Menu>
          </Button>
        ) : (
          <ModalLogin colorScheme='green' textBtn="Login"/>
        )}
      </Box>
    </Flex>
  );
};
