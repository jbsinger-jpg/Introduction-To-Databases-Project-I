import { Box, Select, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import AddRenterPage from './renter/AddRenterPage';
import UpdateRenterPage from './renter/UpdateRenterPage';
import RemoveRenterPage from './renter/RemoveRenterPage';

export default function LandingPage() {
    const [seletedCRUDOperation, setSeletedCRUDOperation] = useState("add");

    return (
        <Box
            alignItems="start"
        >
            <Tabs
                isFitted
                w="60vw"
            >
                <TabList>
                    <Tab>Renter</Tab>
                    <Tab>Seller</Tab>
                    <Tab>Product</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VStack spacing="1">
                            <Select
                                value={seletedCRUDOperation}
                                onChange={(event) => setSeletedCRUDOperation(event.target.value)}
                            >
                                <option value='add'>Add</option>
                                <option value='update'>Update</option>
                                <option value='delete'>Delete</option>
                            </Select>
                            {seletedCRUDOperation === "add" && <AddRenterPage />}
                            {seletedCRUDOperation === "update" && <UpdateRenterPage />}
                            {seletedCRUDOperation === "delete" && <RemoveRenterPage />}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <Select
                            value={seletedCRUDOperation}
                            onChange={(event) => setSeletedCRUDOperation(event.target.value)}
                        >
                            <option value='add'>Add</option>
                            <option value='update'>Update</option>
                            <option value='delete'>Delete</option>
                        </Select>
                    </TabPanel>
                    <TabPanel>
                        <Select
                            value={seletedCRUDOperation}
                            onChange={(event) => setSeletedCRUDOperation(event.target.value)}
                        >
                            <option value='add'>Add</option>
                            <option value='update'>Update</option>
                            <option value='delete'>Delete</option>
                        </Select>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
