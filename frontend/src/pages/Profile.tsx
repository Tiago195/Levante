import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { Cadastrar } from "../components/Cadastrar";
import { Header } from "../components/Header";
import { Pendentes } from "../components/Pendentes";
import { Reservar } from "../components/Reservar";

export const Profile = () => {
  return (
    <>
      <Header/>

      <Tabs>
        <TabList>
          <Tab>Cadastrar</Tab>
          <Tab>Reservar</Tab>
          <Tab>Pendentes</Tab>
          <Tab>Historico de Reservas</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Cadastrar />
          </TabPanel>

          <TabPanel>
            <Reservar />
          </TabPanel>

          <TabPanel>
            <Pendentes />
          </TabPanel>

          <TabPanel>
            das
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
