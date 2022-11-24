import { Progress } from "@chakra-ui/react";
import React, { useState } from "react";

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
