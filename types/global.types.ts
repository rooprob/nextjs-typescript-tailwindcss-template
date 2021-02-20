import { NextPageContext } from 'next';
import { type } from 'os';
import { UserInfo } from './auth.types';

// re-read this comparison of props behaviour from react prop-types and typescript...
// https://www.benmvp.com/blog/react-prop-types-with-typescript/

export interface GlobalStatus {
  message: string;
}

export interface AppContext {
  Component: any;
  ctx: NextPageContext;
}

export interface RedirectOptions {
  ctx: NextPageContext;
  status: number;
}

export interface SearchContextType {
  search: string;
  onSearch: (ev: any) => string;
}

export type DayOfWeek = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT"
export type AlcoholType = "WINE" | "BEER" | "LIQUOR" | "FOOD";

export interface AlcoholContextType {
  search: string;
  dayOfWeek: DayOfWeek;
  alcoholTypeFilter: AlcoholType[];
  onSearch: (search: string) => void;
  onChangeDayOfWeek: (dayOfWeek: DayOfWeek) => void;
  onChangeFilterAlcoholType: (alcoholType: AlcoholType) => void;
}

export type DealCardProps = {
  id: string,
  daysActive: any[],
  location: any,
  score: number,
  userDeals: any,
  description: string,
  alcoholType: AlcoholType
};