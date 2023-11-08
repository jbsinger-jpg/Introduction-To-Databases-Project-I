import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import './App.css';
import { PRODUCT_OWNER_URL, PRODUCT_URL, RENTER_URL, SELLER_URL, getInitialData } from './backend_config';
import LandingPage from './pages/LandingPage';

function App() {
  const [renterData, setRenterData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [productOwners, setProductOwners] = useState(null);
  const [productOwnerByProductId, setProductOwnerByProductId] = useState(null);

  useEffect(() => {
    getInitialData([
      { url: RENTER_URL, setData: setRenterData },
      { url: SELLER_URL, setData: setSellerData },
      { url: PRODUCT_URL, setData: setProductData },
      { url: PRODUCT_OWNER_URL, setData: setProductOwners },
      { url: PRODUCT_OWNER_URL + "/1", setData: setProductOwnerByProductId },
    ]);
  }, []);

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
