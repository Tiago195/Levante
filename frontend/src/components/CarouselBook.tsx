import React, { useEffect, useState } from "react";
import { Badge, Box, Flex, Heading, HStack, Image, Tag, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GiRead } from "react-icons/gi";

import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { IBook } from "../interfaces/IBook";
import { booksApi } from "../utils/api";
import { IQueryGetAllBooks } from "../interfaces/IQueryGetAllBooks";

export const CarouselBook =  () => {
  const [books, setBooks] = useState<IBook[]>();

  useEffect(() => {
    (() => {
      booksApi.getAll({category: "Escolha do editor"} as IQueryGetAllBooks).then(({data}) => setBooks(data));
    })();
  },[]);

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      allowSlideNext={true}
      allowSlidePrev={true}
    >
      {books?.map(book => (
        <SwiperSlide key={book.id} style={{display: "flex" }}>
          <Flex gap="20px" >
            <Box
              backgroundImage={book.cover}
              backgroundSize="cover"
              backgroundPosition="center"
              w="200px"
              h="300px"
              filter={book.status ? "grayscale(1)" : "grayscale(0)"}
            ></Box>
            <Flex flexDirection="column" justifyContent="space-between" maxW="70%">
              <Box>
                <Box>
                  <Badge display="flex" w="fit-content" alignItems="center" fontSize="1xs" gap="0.5rem" colorScheme='twitter'><GiRead />{book.readCount}</Badge>
                  <Heading>{book.title}</Heading>
                  <Text color="gray.500">{book.author}</Text>
                </Box>
                <Text marginTop="10px" alignSelf="self-start" fontSize="20px">{book.resume}</Text>
              </Box>
              <Box>
                <HStack spacing={4}>
                  {book.categories.map((category) => (
                    <Tag key={category.id}>{category.name}</Tag>
                  ))}
                </HStack>
              </Box>
            </Flex>
          </Flex> 
        </SwiperSlide>
      ))}
    </Swiper>
  );
};