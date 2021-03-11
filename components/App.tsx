import {useColorMode, Box} from '@chakra-ui/react';

import {useSearch} from '../services/Search.context';
import {useAlcoholFilter} from '../services/Alcohol.context';
import SideNav from '../components/SideNav';
import Header from '../components/Header';

const App = ({email, signOut, children, ...rest}: any) => {
    const {colorMode} = useColorMode();
    const searchBox = useSearch();
    const alcoholFilter = useAlcoholFilter();

    return (
        <>
            <Header email={email} signOut={signOut} searchBox={searchBox} alcoholFilter={alcoholFilter} />
            <Box>
                <SideNav display={['none', null, 'block']} maxWidth="18rem" width="full" />
                <Box pl={[0, null, '18rem']} mt="4rem">
                    <Box
                        as="section"
                        backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}
                        minHeight="calc(100vh - 4rem)"
                    >
                        <Box {...rest}>{children}</Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default App;