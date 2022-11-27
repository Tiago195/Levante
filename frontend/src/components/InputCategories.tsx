import { Checkbox, CheckboxGroup, FormLabel, Stack, Tag, TagLabel } from '@chakra-ui/react';
import React, { useContext } from 'react';
import Context from '../context';
import { ICategory } from '../interfaces/ICategory';

type Props = {
  categories: ICategory[],
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
}

export const InputCategories = ({setCategories, categories }: Props) => {
  const { categories: AllCategories } = useContext(Context);

  const changeCategories = (e: string[]) => {
    setCategories(e.map((category) => JSON.parse(category)));
  };

  return (
    <>
      <FormLabel>Adicionar categoria</FormLabel>

      <CheckboxGroup colorScheme='green' value={categories.map(e => JSON.stringify({id: e.id, name: e.name }))} onChange={changeCategories}>
        <Stack display="flex" flexDirection="row" wrap="wrap" justifyContent="space-between">
          {AllCategories?.filter((e, i) => i!==0)?.map(category => (
            <Tag key={category.id}>
              <Checkbox value={JSON.stringify({id: category.id, name: category.name })}>
                <TagLabel>{category.name}</TagLabel>
              </Checkbox>
            </Tag>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
};
