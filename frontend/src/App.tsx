import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Home } from "./pages/Home";
import { Provider } from "./context/Provider";
// import { Logo } from "./Logo"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider>
      <BrowserRouter>
        {/* <ColorModeSwitcher /> */}
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
