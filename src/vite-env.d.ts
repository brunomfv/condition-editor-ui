/// <reference types="vite/client" />

import { Operator, Product, Property } from './types';

declare global {
	interface Window {
		datastore: {
			getOperators: () => Operator[];
			getProducts: () => Product[];
			getProperties: () => Property[];
		};
	}
}
