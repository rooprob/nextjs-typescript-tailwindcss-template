import React, { createContext, useContext } from "react";
import { format } from "date-fns";

import { AlcoholContextType, DayOfWeek, AlcoholType } from '../types/global.types';

export const AlcoholContext = createContext<AlcoholContextType>({
  search: "search me",
  dayOfWeek: "MON",
  alcoholTypeFilter: ["BEER"],
  onSearch: (search) => console.warn("no"),
  onChangeDayOfWeek: (dayOfWeek) => console.warn("no"),
  onChangeFilterAlcoholType: (alcoholList) => console.warn("no"),
});

export const useAlcoholFilter = () => useContext(AlcoholContext);

type AlcoholProviderProps = {};

export const AlcoholProvider: React.FC<AlcoholProviderProps> = ({ children }) => {
  const [search, setSearch] = React.useState("search");
  const [dayOfWeek, setDayOfWeek] = React.useState<DayOfWeek>("MON");
  const [alcoholTypeFilter, setAlcoholTypeFilters] = React.useState<AlcoholType[]>(["WINE"]);
  
  const onSearch = (search: string) => {
    setSearch(search);
  }
  const onChangeDayOfWeek = (e: any): void => {
    setDayOfWeek(e.target.value);
  };

  const onChangeFilterAlcoholType = (newValues: any): void => {
    setAlcoholTypeFilters(newValues);
  };

  return (
    <AlcoholContext.Provider value={{ search, onSearch, dayOfWeek, onChangeDayOfWeek, alcoholTypeFilter, onChangeFilterAlcoholType }}>
      {children}
    </AlcoholContext.Provider>
  );
}
