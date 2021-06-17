//@flow

import { createContext } from 'react';

const initialState = {
	name: "Points",
	active: true,
}

const context = createContext<typeof initialState>(initialState);

export default context;