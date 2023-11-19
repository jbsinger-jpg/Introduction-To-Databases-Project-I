import { useEffect, useState } from 'react';
import { RENTER_URL, getInitialData } from '../../backend_config';
import { Box, Button, FormLabel, HStack, Heading, Input, Select, VStack } from '@chakra-ui/react';

export default function UpdateRenterPage() {
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [renterOptions, setRenterOptions] = useState(null);
    const [renterData, setRenterData] = useState(null);
    const [renterDataIsLoaded, setRenterDataIsLoaded] = useState(false);
    const [selectedRenterOption, setSelectedRenterOption] = useState("");

    const updateRenter = async (event) => {
        event.preventDefault();

        await fetch(`${RENTER_URL}/${selectedRenterOption}`, {
            method: 'PATCH',
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
                getInitialData([{ url: RENTER_URL, setData: setRenterData }]);
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
        if (!renterDataIsLoaded) {
            getInitialData([{ url: RENTER_URL, setData: setRenterData }]);

            if (renterData) {
                setRenterDataIsLoaded(true);
                let options = [];
                for (let i = 0; i < renterData.length; i++) {
                    options.push({ label: renterData[i].first_name + " " + renterData[i].last_name, key: renterData[i].id, value: renterData[i].id });
                }

                setRenterOptions(options);
            }
        }
        // eslint-disable-next-line
    }, [renterData]);

    return (
        <>
            {renterData && renterData.length ?
                <VStack alignItems="flex-start">
                    <Heading>Update Renter</Heading>
                    <Box
                        display="flex"
                    >
                        <form onSubmit={updateRenter}>
                            <VStack
                                alignItems="flex-start"
                            >
                                <VStack
                                    alignItems="flex-start"
                                >
                                    <FormLabel>Renter Options</FormLabel>
                                    <Select w="50vw"
                                        value={selectedRenterOption}
                                        onChange={(event) => {
                                            setSelectedRenterOption(event.target.value);

                                            for (let i = 0; i < renterData.length; i++) {
                                                if (Number(renterData[i].id) === Number(event.target.value)) {
                                                    setFirstName(renterData[i].first_name);
                                                    setLastName(renterData[i].last_name);
                                                    setAddress(renterData[i].address);
                                                }
                                                else if (!event.target.value) {
                                                    handleClearEntries();
                                                }
                                            }
                                        }}
                                    >
                                        <option value="" key={-1}>N/A</option>
                                        {renterOptions && renterOptions.map(renter => {
                                            return (
                                                <option
                                                    key={renter.key}
                                                    value={renter.value}
                                                >
                                                    {renter.label}
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
                        No Renters Exist Add One!
                    </div>
                </VStack>
            }
        </>
    );
}
