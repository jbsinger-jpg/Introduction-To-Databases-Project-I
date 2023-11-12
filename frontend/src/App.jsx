// import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import './App.css';
import LandingPage from './pages/LandingPage';

function App() {
  return (

    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
