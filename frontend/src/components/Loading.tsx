import { Progress } from '@chakra-ui/react';
import React from 'react';

type Props = {
  loading: boolean
}

export const Loading = ({loading}: Props) => {
  return (
    <>
      {loading && <Progress size='xs' isIndeterminate />}
    </>
  );
};
