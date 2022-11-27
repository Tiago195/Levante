import { Box, Button, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { RiUserSmileFill, RiAdminFill } from 'react-icons/ri';
import { MdChildFriendly, MdBook } from 'react-icons/md';
import { GiAlienStare } from 'react-icons/gi';
import Context from '../context';
import { booksApi } from '../utils/api';

export const Categories = () => {
  const { categories, query, setBooks } = useContext(Context);

  const categoriesIcons = {
    Humor: RiUserSmileFill,
    'Infanto Juvenis': MdChildFriendly ,
    Jogos: FaGamepad,
    Poesia: MdBook,
    'Ficção Científica': GiAlienStare,
    'Escolha do editor': RiAdminFill 
  };

  const changeCategory = (name: string) => {
    query!.current.category = name;
    booksApi.getAll(query!.current).then(({data}) => setBooks(data));
  };

  return (
    <Box w="300px" >
      <h1>Categorias</h1>
      <List p={2} spacing={3}>
        {categories?.map(category => (
          <Button key={category.id} variant="outline" w="100%" onClick={() => changeCategory(category.name)}>
            <ListItem  display="flex" alignItems="center" >
              <ListIcon as={categoriesIcons[category.name]}/>
              <Text>{category.name}({category.qtdBooks})</Text>
            </ListItem>
          </Button>
        ))}
        <Button variant="outline" w="100%" onClick={() => changeCategory('')}>
          <ListItem  display="flex" alignItems="center" >
            <ListIcon />
            <Text>Todos({categories?.reduce((a, b) => a + b.qtdBooks, 0)})</Text>
          </ListItem>
        </Button>
      </List >
    </Box>
  );
};
