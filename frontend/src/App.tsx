import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Home } from "./pages/Home";
import { Provider } from "./context/Provider";
import { Profile } from "./pages/Profile";
// import { Logo } from "./Logo"
import "./app.css";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider>
      <BrowserRouter>
        {/* <ColorModeSwitcher /> */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
