import React, { useContext, useEffect, useReducer } from 'react';

import { AuthInfo } from '../types/auth.types';
export const AuthStateContext = React.createContext({});

const initialState: AuthInfo = { email: '', id: '', token: '' };

export enum ActionType {
	SetDetails = 'setAuthDetails',
	RemoveDetails = 'removeAuthDetails'
}

export interface Action {
	type: ActionType;
	payload: AuthInfo;
}

const reducer: React.Reducer<{}, Action> = (state, action) => {
	switch (action.type) {
		case ActionType.SetDetails:
			return {
				id: action.payload.id,
				email: action.payload.email,
				token: action.payload.token
			};
		case ActionType.RemoveDetails:
			return {
				id: initialState.id,
				email: initialState.email,
				token: initialState.token
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export const AuthProvider = ({ children }: any) => {
	let localState = null;
	if (typeof localStorage !== 'undefined' && localStorage.getItem('userInfo')) {
		localState = JSON.parse(localStorage.getItem('userInfo') || '');
	}
	const [state, dispatch] = useReducer(reducer, localState || initialState);

	if (typeof localStorage !== 'undefined') {
		useEffect(() => {
			localStorage.setItem('userInfo', JSON.stringify(state));
		}, [state]);
	}
	return (
		<AuthStateContext.Provider value={[state, dispatch]}>
			{children}
		</AuthStateContext.Provider>
	);
};

// useContext hook - export here to keep code for global auth state
// together in this file, allowing user info to be accessed and updated
// in any functional component using the hook
export const useAuth: any = () => useContext(AuthStateContext);