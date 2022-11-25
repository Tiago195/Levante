import { Button, Flex } from "@chakra-ui/react";
import React from "react";

type Props = {
  page: number
  decrementPage: () => Promise<void>
  incrementPage: () => Promise<void>
  limit: number
}

export const Pagination = ({page, decrementPage, incrementPage, limit}: Props) => {
  return (
    <Flex justifyContent="center" p={[3, 8]} gap="20px">
      <Button disabled={page === 0} onClick={decrementPage}>Anterior</Button>
      <Button>{page + 1}</Button>
      <Button disabled={limit !== 10} onClick={incrementPage}>Proxima</Button>
    </Flex>
  );
};
