import { Box, Button, FormLabel, HStack, Heading, Select, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SELLER_URL, getInitialData } from '../../backend_config';

export default function RemoveSeller() {
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [sellerData, setSellerData] = useState(null);
    const [sellerDataIsLoaded, setSellerDataIsLoaded] = useState(false);
    const [sellerOptions, setSellerOptions] = useState(null);
    const [selectedSellerOption, setSelectedSellerOption] = useState("");

    const removeSeller = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(SELLER_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    address: address,
                }),
            });

            if (!response.ok) {
                throw new Error(`DELETE request failed with status ${response.status}`);
            }

            // Process the successful response
            const result = await response.json();
            console.log('DELETE successful:', result);
        } catch (error) {
            console.error('DELETE request error:', error.message);
        }
    };

    const handleClearEntries = () => {
        setAddress("");
        setFirstName("");
        setLastName("");
    };

    useEffect(() => {
        if (!sellerDataIsLoaded) {
            getInitialData([{ url: SELLER_URL, setData: setSellerData }]);

            if (sellerData) {
                setSellerDataIsLoaded(true);
                let options = [];

                for (let i = 0; i < sellerData.length; i++) {
                    options.push({ label: sellerData[i].first_name + " " + sellerData[i].last_name, key: sellerData[i].id, value: sellerData[i].id });
                }

                setSellerOptions(options);
            }
        }
        // eslint-disable-next-line
    }, [sellerData]);

    return (
        <>
            {sellerData && sellerData.length ?
                <VStack alignItems="flex-start">
                    <Heading>Remove Seller</Heading>
                    <Box
                        display="flex"
                    >
                        <form onSubmit={removeSeller}>
                            <VStack
                                alignItems="flex-start"
                            >
                                <VStack
                                    alignItems="flex-start"
                                >
                                    <FormLabel>Seller Options</FormLabel>
                                    <Select w="50vw"
                                        value={selectedSellerOption}
                                        onChange={(event) => setSelectedSellerOption(event.target.value)}
                                    >
                                        <option value="" key={-1}>N/A</option>
                                        {sellerOptions && sellerOptions.map(seller => {
                                            return (
                                                <option
                                                    key={seller.key}
                                                    value={seller.value}
                                                >
                                                    {seller.label}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </VStack>
                                <HStack bottom="0" position="fixed" w="90vw">
                                    <Button type="submit"> Submit </Button>
                                    <Button onClick={handleClearEntries}> Clear </Button>
                                </HStack>
                            </VStack>
                        </form>
                    </Box>
                </VStack>
                :
                <VStack h="70vh" w="50vw" alignItems="center" justifyContent="center">
                    <div>
                        No Sellers Exist Add One!
                    </div>
                </VStack>
            }
        </>
    );
}
