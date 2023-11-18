import { Box, Select, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import AddRenterPage from './renter/AddRenterPage';
import UpdateRenterPage from './renter/UpdateRenterPage';
import RemoveRenterPage from './renter/RemoveRenterPage';

import AddSellerPage from './seller/AddSellerPage';
import UpdateSeller from './seller/UpdateSeller';
import RemoveSeller from './seller/RemoveSeller';

import AddProductPage from './product/AddProductPage';
import UpdateProductPage from './product/UpdateProductPage';
import RemoveProductPage from './product/RemoveProductPage';
import AddTransaction from './transactions/AddTransaction';
import DeleteTransaction from './transactions/DeleteTransaction';

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
                    <Tab>Transaction</Tab>
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
                        {seletedCRUDOperation === "add" && <AddSellerPage />}
                        {seletedCRUDOperation === "update" && <UpdateSeller />}
                        {seletedCRUDOperation === "delete" && <RemoveSeller />}
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
                        {seletedCRUDOperation === "add" && <AddProductPage />}
                        {seletedCRUDOperation === "update" && <UpdateProductPage />}
                        {seletedCRUDOperation === "delete" && <RemoveProductPage />}
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
                        {seletedCRUDOperation === "add" && <AddTransaction />}
                        {seletedCRUDOperation === "update" && <UpdateProductPage />}
                        {seletedCRUDOperation === "delete" && <DeleteTransaction />}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
