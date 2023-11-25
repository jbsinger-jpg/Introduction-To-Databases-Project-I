import { Box, Button, FormLabel, HStack, Heading, Input, Select, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SELLER_URL, getInitialData } from '../../backend_config';

export default function UpdateSeller() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [street, setStreet] = useState("");

    const [sellerData, setSellerData] = useState(null);
    const [sellerDataIsLoaded, setSellerDataIsLoaded] = useState(false);
    const [sellerOptions, setSellerOptions] = useState(null);
    const [selectedSellerOption, setSelectedSellerOption] = useState(null);

    const updateSeller = async (event) => {
        event.preventDefault();

        await fetch(`${SELLER_URL}/${selectedSellerOption}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                address: `${street}, ${city}, ${state}, ${zip}`
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
        setFirstName("");
        setLastName("");
        setStreet("");
        setCity("");
        setState("");
        setZip("");
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
                                        onChange={(event) => {
                                            setSelectedSellerOption(event.target.value);
                                            for (let i = 0; i < sellerData.length; i++) {
                                                if (Number(sellerData[i].id) === Number(event.target.value)) {
                                                    setFirstName(sellerData[i].first_name);
                                                    setLastName(sellerData[i].last_name);
                                                    const parsedAddressValues = sellerData[i].address.split(",");

                                                    setStreet(parsedAddressValues[0]);
                                                    setCity(parsedAddressValues[1]);
                                                    setState(parsedAddressValues[2]);
                                                    setZip(parsedAddressValues[3]);
                                                }
                                                else if (!event.target.value) {
                                                    handleClearEntries();
                                                }
                                            }
                                        }}
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
                                    <HStack>
                                        <VStack
                                            alignItems="flex-start"
                                        >
                                            <FormLabel>Street</FormLabel>
                                            <Input
                                                value={street}
                                                onChange={(event) => setStreet(event.target.value)}
                                                isRequired
                                            />
                                        </VStack>
                                        <VStack
                                            alignItems="flex-start"
                                        >
                                            <FormLabel>City</FormLabel>
                                            <Input
                                                value={city}
                                                onChange={(event) => setCity(event.target.value)}
                                                isRequired
                                            />
                                        </VStack>
                                        <VStack
                                            alignItems="flex-start"
                                        >
                                            <FormLabel>State</FormLabel>
                                            <Input
                                                value={state}
                                                onChange={(event) => setState(event.target.value)}
                                                isRequired
                                            />
                                        </VStack>
                                        <VStack
                                            alignItems="flex-start"
                                        >
                                            <FormLabel>Zip</FormLabel>
                                            <Input
                                                value={zip}
                                                onChange={(event) => setZip(event.target.value)}
                                                isRequired
                                            />
                                        </VStack>
                                    </HStack>
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
