import { describe, expect, it, vitest } from 'vitest';

import { getProperties } from './getProperties';

import { Property, PropertyType } from '../types';

describe('getProperties', () => {
	it('should return list of properties', () => {
		const properties: Property[] = [
			{ id: 1, type: PropertyType.String, name: 'Property 1' },
			{ id: 2, type: PropertyType.Number, name: 'Property 2' },
		];

		window.datastore = {
			getProperties: vitest.fn(() => properties),
			getOperators: vitest.fn(),
			getProducts: vitest.fn(),
		};

		const result = getProperties();

		expect(result).toBe(properties);
	});
});
