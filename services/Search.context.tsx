import React, { createContext, useContext } from "react";
//import { format } from "date-fns";

import { SearchContextType /*DayOfWeek, AlcoholType*/ } from '../types/global.types';

export const SearchContext = createContext<SearchContextType>({
  search: "search me",
  onSearch: (search) => "no",
});

export const useSearch = () => useContext(SearchContext);

type SearchProviderProps = {};

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [search, setSearch] = React.useState("Search");
  
  const onSearch = (e: any): string => {
    e.preventDefault();

    const searchValue = e.target.value;
    const valueWithoutSlash = searchValue.replace("/", "");

    console.log(`onSearch receiving keypress: ${searchValue}`);

    setSearch(valueWithoutSlash);
    return valueWithoutSlash;
  };

  return (
    <SearchContext.Provider value={{ search, onSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

/*

const useSearchProvider = () => {
  const today = format(new Date(), "EEEE");
  const [search, setSearch] = useState<Search>();
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(today);
  const [alcoholTypeFilters, setAlcoholTypeFilters] = useState<AlcoholType[]>([
    "BEER",
    "WINE",
    "LIQUOR",
    "FOOD",
  ]);

  const onChangeDayOfWeek = (e: any): void => {
    setDayOfWeek(e.target.value);
  };

  const onFilterAlcoholType = (newValues: any): void => {
    setAlcoholTypeFilters(newValues);
  };

  const onSearch = (e: any): string => {
    e.preventDefault();

    const searchValue = e.target.value;
    const valueWithoutSlash = searchValue.replace("/", "");

    setSearch({search: valueWithoutSlash});
    return valueWithoutSlash;
  };

  return {
    alcoholTypeFilters,
    dayOfWeek,
    onFilterAlcoholType,
    onChangeDayOfWeek,
    onSearch,
    setSearch,
    search,
  };
}
*/