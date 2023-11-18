import { useEffect, useState } from "react";
import { TRANSACTION_URL, getInitialData } from "../../backend_config";
import { Box, Button, FormLabel, HStack, Heading, Select, VStack } from "@chakra-ui/react";

export default function DeleteTransaction() {
    // transaction data
    const [transactionData, setTransactionData] = useState(null);
    const [transactionOptions, setTransactionOptions] = useState(null);
    const [transactionDataIsLoaded, setTransactionDataIsLoaded] = useState(false);
    const [transaction, setTransaction] = useState("");

    const removetransaction = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${TRANSACTION_URL}/${transaction}`, {
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

            getInitialData([{ url: TRANSACTION_URL, setData: setTransactionData }]);
        } catch (error) {
            console.error('DELETE request error:', error.message);
        }
    };

    const handleClearEntries = () => {
        setTransaction("");
    };

    useEffect(() => {
        if (!transactionDataIsLoaded) {
            getInitialData([
                { url: TRANSACTION_URL, setData: setTransactionData }
            ]);

            if (transactionData) {
                setTransactionDataIsLoaded(true);
                let options = [];

                for (let i = 0; i < transactionData.length; i++) {
                    options.push({ label: transactionData[i].alias, key: transactionData[i].id, value: transactionData[i].id });
                }

                setTransactionOptions(options);
            }
        }
        // eslint-disable-next-line
    }, [transactionData]);

    return (
        <>
            {transactionData && transactionData.length ?
                <VStack alignItems="flex-start">
                    <Heading>Remove transaction</Heading>
                    <Box
                        display="flex"
                    >
                        <form onSubmit={removetransaction}>
                            <VStack
                                alignItems="flex-start"
                            >
                                <VStack alignItems="start">
                                    <FormLabel>Transaction</FormLabel>
                                    <Select w="50vw"
                                        value={transaction}
                                        onChange={(event) => setTransaction(event.target.value)}
                                    >
                                        <option value="" key={-1}>N/A</option>
                                        {transactionOptions && transactionOptions.map(transaction => {
                                            return (
                                                <option
                                                    key={transaction.key}
                                                    value={transaction.value}
                                                >
                                                    {transaction.label}
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
                        No transactions Exist Add One!
                    </div>
                </VStack>
            }
        </>
    );
}
