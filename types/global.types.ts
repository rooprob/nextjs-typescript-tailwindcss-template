import { NextPageContext } from 'next';

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