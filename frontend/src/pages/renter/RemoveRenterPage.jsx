import { useEffect, useState } from 'react';
import { RENTER_URL, getInitialData } from '../../backend_config';
import { Box, Button, FormLabel, HStack, Heading, Select, VStack } from '@chakra-ui/react';

export default function RemoveRenterPage() {
    const [renterData, setRenterData] = useState(null);
    const [renterOptions, setRenterOptions] = useState(null);
    const [selectedRenterOption, setSelectedRenterOption] = useState("");
    const [renterDataIsLoaded, setRenterDataIsLoaded] = useState(false);

    const removeRenter = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${RENTER_URL}/${selectedRenterOption}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`DELETE request failed with status ${response.status}`);
            }

            // Process the successful response
            const result = await response.json();
            console.log('DELETE successful:', result);

            getInitialData([{ url: RENTER_URL, setData: setRenterData }]);
        } catch (error) {
            console.error('DELETE request error:', error.message);
        }
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
                    <Heading>Remove Renter</Heading>
                    <Box
                        display="flex"
                    >
                        <form onSubmit={removeRenter}>
                            <VStack
                                alignItems="flex-start"
                            >
                                <FormLabel>Renter Options</FormLabel>
                                <Select w="50vw"
                                    value={selectedRenterOption}
                                    onChange={(event) => setSelectedRenterOption(event.target.value)}
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
                                <HStack bottom="0" position="fixed" w="90vw">
                                    <Button type="submit"> Submit </Button>
                                    {/* <Button onClick={handleClearEntries}> Clear </Button> */}
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
