import {Text, Flex, Spinner} from '@chakra-ui/react';

//import {useDeals} from '../graphql/hooks';
import {useAuth} from '../services/Auth.context';
import {useSearch} from '../services/Search.context';
import { useAlcoholFilter } from '../services/Alcohol.context';
// import {withApollo} from '../graphql/apollo';
import App from '../components/App';
import DealCard from '../components/DealCard';
import AddDealModal from '../components/AddDealModal';
import EmptySearch from '../components/EmptySearch';
import { AlcoholType, DealCardProps } from '../types/global.types';

interface Deals {
    deals: DealCardProps[],
}

const DealsPage = () => {
    const {userId} = useAuth();
    console.log(userId);
    const {search} = useSearch();
    const {dayOfWeek, alcoholTypeFilter} = useAlcoholFilter();
    // const {data, loading} = useDeals(dayOfWeek);
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 2);
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 45);

    const data: Deals = {
        deals: [
            { id: "42", description: "Really big beer night out", alcoholType: "BEER", daysActive: [startDate, endDate], location: [-123,72], score: 4, userDeals: "win" },
            { id: "43", description: "Really big wine night out", alcoholType: "WINE", daysActive: [startDate, endDate], location: [-123,72], score: 2, userDeals: "win" },
            { id: "44", description: "Really big food night out", alcoholType: "FOOD", daysActive: [startDate, endDate], location: [-123,72], score: 1, userDeals: "win" },
        ]
    };
    const loading = false;

    const matchesSearch = (deal: DealCardProps) => deal.description.toLowerCase().includes(search.toLowerCase());
    const matchesAlcoholType = (deal: DealCardProps) => alcoholTypeFilter.includes(deal.alcoholType);
    const allDeals = data ? data.deals : [];
    const filteredDeals = allDeals.filter(matchesSearch).filter(matchesAlcoholType);

    return (
        <App width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
            <Text mb={2} fontSize="sm">
                {'Active '}
                <b>{dayOfWeek}</b>
                {' in '}
                <b>{'Des Moines'}</b>
            </Text>
            {loading ? (
                <Flex pt={24} align="center" justify="center">
                    <Spinner size="xl" label="Loading Deals" />
                </Flex>
            ) : (
                <>
                    {filteredDeals.length ? (
                        filteredDeals.map((deal) => <DealCard key={deal.id} {...deal} />)
                    ) : (
                        <EmptySearch />
                    )}
                    <Flex justify="flex-end" as="i" color="gray.500">
                        {`Showing ${filteredDeals.length} out of ${allDeals.length} deals in Des Moines`}
                    </Flex>
                    <Flex mt={8} display={['block', 'none', 'none', 'none']}>
                        <AddDealModal />
                    </Flex>
                </>
            )}
        </App>
    );
};

export default DealsPage;
/*
export default withApollo(DealsPage, {
    ssr: false
});*/