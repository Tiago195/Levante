import React from "react";
import { Box, Flex, Image, Tag, Text } from "@chakra-ui/react";

export const CarouselBook = () => {

  return (
    <Flex justifyContent="center" gap="20px" >
      <Box><Image src='https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/be03cc5f7b589d35bf236e35ad0e001b1923a965.jpg'/></Box>
      <Flex flexDirection="column" justifyContent="space-between">
        <Text fontSize="20px">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque quibusdam blanditiis asperiores </Text>
        <Box><Tag>category</Tag></Box>
      </Flex>
    </Flex> 
  );
};
