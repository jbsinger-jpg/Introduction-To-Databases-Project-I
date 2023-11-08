import { useEffect, useState } from 'react';
import { ChakraProvider, Box, Input, FormLabel, VStack, HStack, Button, Heading } from "@chakra-ui/react";
import './App.css';
import { PRODUCT_OWNER_URL, PRODUCT_URL, RENTER_URL, SELLER_URL, getInitialData } from './backend_config';

function App() {
  const [renterData, setRenterData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [productOwners, setProductOwners] = useState(null);
  const [productOwnerByProductId, setProductOwnerByProductId] = useState(null);

  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getInitialData([
      { url: RENTER_URL, setData: setRenterData },
      { url: SELLER_URL, setData: setSellerData },
      { url: PRODUCT_URL, setData: setProductData },
      { url: PRODUCT_OWNER_URL, setData: setProductOwners },
      { url: PRODUCT_OWNER_URL + "/1", setData: setProductOwnerByProductId },
    ]);
  }, []);

  const addRenter = async (event) => {
    event.preventDefault();

    await fetch(RENTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        address: address
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success: ' + JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });
  };

  return (
    <ChakraProvider>
      <VStack alignItems="flex-start">
        <Heading>Add Renter</Heading>
        <Box
          display="flex"
        >
          <form onSubmit={addRenter}>
            <VStack
              alignItems="flex-start"
            >
              <VStack
                alignItems="flex-start"
              >
                <FormLabel>First Name</FormLabel>
                <Input w="50vw" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              </VStack>
              <VStack
                alignItems="flex-start"
              >
                <FormLabel>Last Name</FormLabel>
                <Input w="50vw" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              </VStack>
              <VStack
                alignItems="flex-start"
              >
                <FormLabel>Address</FormLabel>
                <Input w="50vw" value={address} onChange={(event) => setAddress(event.target.value)} />
              </VStack>
              <HStack bottom="0" position="fixed" w="90vw">
                <Button type="submit"> Submit </Button>
                <Button> Clear </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
