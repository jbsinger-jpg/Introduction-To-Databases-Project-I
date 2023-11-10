import { Box, Select, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';

export default function LandingPage() {
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
                        <VStack>
                            <Select>
                                <option value='add'>Add</option>
                                <option value='update'>Update</option>
                                <option value='delete'>Delete</option>
                            </Select>
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <Select>
                            <option value='add'>Add</option>
                            <option value='update'>Update</option>
                            <option value='delete'>Delete</option>
                        </Select>
                    </TabPanel>
                    <TabPanel>
                        <Select>
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
