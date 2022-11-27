import {  Flex, Select } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

type Props = {
  changeOrder: (event: ChangeEvent<HTMLSelectElement>) => void
  changeBy: (event: ChangeEvent<HTMLSelectElement>) => void
  options: {key: string, value: string}[]
  order: string
  by: string
}

export const OrderBy = ({ changeOrder, changeBy, options, order, by }: Props) => {
  
  return (
    <Flex gap="20px">
      <Flex w="fit-content">
        <Select placeholder='Ordenar' onChange={changeOrder} defaultValue={order}>
          {options.map(e => (
            <option key={e.value} value={e.value}>{e.key}</option>
          ))}
        </Select>
      </Flex>

      <Flex w="fit-content">
        <Select placeholder='Por' onChange={changeBy} defaultValue={by}>
          <option value="ASC">Crescente</option>
          <option value="DESC">Decrescente</option>
        </Select>
      </Flex>
    </Flex>
  );
};
