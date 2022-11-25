import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Cadastrar } from "../components/Cadastrar";
import { Header } from "../components/Header";
import { History } from "../components/History";
import { Pendentes } from "../components/Pendentes";
import { Reservar } from "../components/Reservar";
import Context from "../context";

export const Profile = () => {
  const { user } = useContext(Context);

  return (
    <>
      <Header/>
      <Tabs>
        <TabList>
          {user?.isAdmin && (
            <>
              <Tab>Cadastrar</Tab>
              <Tab>Reservar</Tab>
              <Tab>Pendentes</Tab>
            </>
          )}
          <Tab>Historico de Reservas</Tab>
        </TabList>

        <TabPanels>
          {user?.isAdmin && (
            <>
              <TabPanel>
                <Cadastrar />
              </TabPanel>

              <TabPanel>
                <Reservar />
              </TabPanel>

              <TabPanel>
                <Pendentes />
              </TabPanel>
            </>
          )}

          <TabPanel>
            <History />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
