import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import Context from "../context";
import { userApi } from "../utils/api";

type Props = {
  colorScheme?: string,
  variant?: string,
  disabled?: boolean,
  textBtn: string

}

export const ModalLogin = ({textBtn, disabled = false, variant = "solid", colorScheme = ""}: Props) => {
  const {setUser } = useContext(Context);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const send = async () => {
    if(emailInput.current && passwordInput.current) {
      const objLogin = {
        email: emailInput.current.value,
        password: passwordInput.current.value,
      };
      userApi.login(objLogin).then(({data}) => setUser(data));
      onClose();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button disabled={disabled} variant={variant} colorScheme={colorScheme} onClick={onOpen}>{textBtn}</Button>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fazer login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
              <FormLabel>Email</FormLabel>
              <Input ref={emailInput} type='email'  />

              <FormLabel>Password</FormLabel>
              <Input ref={passwordInput}  />
            </FormControl>
          </ModalBody>
    
          <ModalFooter>
            <Button variant='ghost'  mr={3} onClick={onClose}>
                  Close
            </Button>
            <Button onClick={send} colorScheme='green'>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
