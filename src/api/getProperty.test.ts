import { describe, expect, it, vitest } from 'vitest';

import { getProperty } from './getProperty';

import { Property, PropertyType } from '../types';

describe('getProperty', () => {
	const properties: Property[] = [
		{ id: 1, type: PropertyType.String, name: 'Property 1' },
		{ id: 2, type: PropertyType.Number, name: 'Property 2' },
		{ id: 3, type: PropertyType.Enumerated, name: 'Property 3', values: [] },
	];

	it('should return the property with the matching id', () => {
		window.datastore = {
			getProperties: () => properties,
			getOperators: vitest.fn(),
			getProducts: vitest.fn(),
		};

		expect(getProperty('2')).toEqual({ id: 2, type: PropertyType.Number, name: 'Property 2' });
	});

	it('should return undefined if no property with the matching id is found', () => {
		window.datastore = {
			getOperators: () => [],
			getProducts: () => [],
			getProperties: () => properties,
		};

		expect(getProperty('4')).toBeUndefined();
	});
});
