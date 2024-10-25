import { describe, it, expect, vitest } from 'vitest';

import { getProducts } from './getProducts';

import { OperatorType, Product, Property, PropertyType } from '../types';

describe('compare', () => {
	const products: Product[] = [
		{
			id: 0,
			property_values: [
				{
					property_id: 0,
					value: 'Mouse',
				},
				{
					property_id: 1,
					value: 'plastic',
				},
				{
					property_id: 2,
					value: 10,
				},
			],
		},
		{
			id: 1,
			property_values: [
				{
					property_id: 0,
					value: 'Webcam',
				},
				{
					property_id: 1,
					value: 'plastic',
				},
				{
					property_id: 2,
					value: 20,
				},
			],
		},
		{
			id: 2,
			property_values: [
				{
					property_id: 0,
					value: 'Bottle',
				},
				{
					property_id: 1,
					value: 'metal',
				},
				{
					property_id: 2,
					value: 5,
				},
			],
		},
	];

	const properties: Property[] = [
		{
			id: 0,
			name: 'Product Name',
			type: PropertyType.String,
		},
		{
			id: 1,
			name: 'material',
			type: PropertyType.Enumerated,
			values: ['plastic', 'metal'],
		},
		{
			id: 2,
			name: 'price',
			type: PropertyType.Number,
		},
	];

	window.datastore.getProducts = vitest.fn().mockReturnValue(products);
	window.datastore.getProperties = vitest.fn().mockReturnValue(properties);

	it('should return return all products when no property or value are provided', () => {
		const result = getProducts(OperatorType.Equals, undefined, undefined);

		expect(result).toBe(products);
	});

	it.each([
		{
			property: properties[1],
			operator: OperatorType.Equals,
			value: 'metal',
			expected: [products[2]],
		},
		{
			property: properties[2],
			operator: OperatorType.GreaterThan,
			value: '5',
			expected: [products[0], products[1]],
		},
		{
			property: properties[2],
			operator: OperatorType.LessThan,
			value: '10',
			expected: [products[2]],
		},
		{
			property: properties[0],
			operator: OperatorType.HasAnyValue,
			expected: [products[0], products[1], products[2]],
		},
		{
			property: properties[1],
			operator: OperatorType.HasNoValue,
			expected: [],
		},
		{
			property: properties[0],
			operator: OperatorType.IsAnyOf,
			value: 'Mouse, Bottle',
			expected: [products[0], products[2]],
		},
		{ property: properties[0], operator: OperatorType.Contains, value: 'ouse', expected: [products[0]] },
	])(
		'should return products for: property: $property.name, operator: $operator and value $value',
		({ property, operator, value, expected }) => {
			const result = getProducts(operator, property, value);

			expect(result).toStrictEqual(expected);
		}
	);
});
