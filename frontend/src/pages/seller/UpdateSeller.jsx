import { Box, Button, FormLabel, HStack, Heading, Input, Select, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SELLER_URL, getInitialData } from '../../backend_config';

export default function UpdateSeller() {
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [sellerData, setSellerData] = useState(null);
    const [sellerDataIsLoaded, setSellerDataIsLoaded] = useState(false);
    const [sellerOptions, setSellerOptions] = useState(null);
    const [selectedSellerOption, setSelectedSellerOption] = useState(null);

    const updateSeller = async (event) => {
        event.preventDefault();

        await fetch(SELLER_URL, {
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

    const handleClearEntries = () => {
        setAddress("");
        setFirstName("");
        setLastName("");
    };

    useEffect(() => {
        if (!sellerDataIsLoaded) {
            getInitialData([{ url: SELLER_URL, setData: setSellerData }]);

            if (sellerData) {
                let options = [];
                setSellerDataIsLoaded(true);
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
                    <Heading>Update Seller</Heading>
                    <Box
                        display="flex"
                    >
                        <form onSubmit={updateSeller}>
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
