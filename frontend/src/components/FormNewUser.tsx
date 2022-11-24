import { Box, Button, Checkbox, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import { userApi } from "../utils/api";

export const FormNewUser = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const isAdminInput = useRef<HTMLInputElement>(null);
  const toast = useToast();


  const createUser = async () => {
    if(nameInput.current && emailInput.current && passwordInput.current && isAdminInput.current) {
      const createUser = {
        name: nameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
        isAdmin: isAdminInput.current.checked
      };  
      try {
        await userApi.create(createUser);
        toast({
          title: "Usuario Criado.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log(isAdminInput.current.checked);
        
        nameInput.current.value = "";
        emailInput.current.value = "";
        passwordInput.current.value = "";
        
      } catch (error: any) {
        const message = error.response.data.message;
        toast({
          title: "Algo deu errado.",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap="10px">
        <Heading>Usuario</Heading>

        <Box>
          <FormLabel>Nome</FormLabel>
          <Input ref={nameInput} />
        </Box>
    
        <Box>
          <FormLabel>Email</FormLabel>
          <Input ref={emailInput} type="email"/>
        </Box>

        <Box>
          <FormLabel>Password</FormLabel>
          <Input ref={passwordInput} />
        </Box>

        <Checkbox ref={isAdminInput}>ADM</Checkbox>
      </Box>

      <Button onClick={createUser} colorScheme="green">Criar</Button>
    </>
  );
};
