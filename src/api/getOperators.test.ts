import { describe, it, expect, vitest } from 'vitest';

import { getOperators } from './getOperators';

import { Operator, OperatorType, PropertyType } from '../types';

describe('getOperators', () => {
	const operators: Operator[] = [
		{ id: OperatorType.Equals, text: 'Equals' },
		{ id: OperatorType.IsAnyOf, text: 'Is any of' },
		{ id: OperatorType.GreaterThan, text: 'Is greater than' },
		{ id: OperatorType.Contains, text: 'Contains' },
	];

	window.datastore.getOperators = vitest.fn(() => operators);
	window.datastore.getProducts = vitest.fn();
	window.datastore.getProperties = vitest.fn();

	it('should return an array of operators for the given property type', () => {
		const result = getOperators(PropertyType.String);

		expect(result).toEqual([
			{ id: OperatorType.Equals, text: 'Equals' },
			{ id: OperatorType.IsAnyOf, text: 'Is any of' },
			{ id: OperatorType.Contains, text: 'Contains' },
		]);
	});
});
