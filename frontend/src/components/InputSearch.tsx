import { Box, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import React, {  useRef, useState } from 'react';
import { Loading } from './Loading';

type Props = {
  list: string,
  api:  (search: string) => Promise<void>,
  searchBy: string,
  children: any
}

export const InputSearch = ({list, api, children, searchBy}: Props) => {
  const [loading, setLoading] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  const search = () => {
    setLoading(true);
    setTimeout(async () => {
      if(!loading && searchInput.current) {
        await api(searchInput.current.value);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Box>
        <InputGroup >
          <InputLeftAddon ><Text>{searchBy}</Text></InputLeftAddon>
          <Input ref={searchInput} onChange={search} list={list} placeholder={`Pesquisar por ${searchBy}`} />
        </InputGroup>
        <Loading loading={loading}/>
      </Box>
      {children}
    </>
  );
};
