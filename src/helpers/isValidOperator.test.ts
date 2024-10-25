// isValidOperator.test.ts
import { describe, it, expect } from 'vitest';

import { PropertyType, OperatorType } from '../types';

import { isValidOperator } from './isValidOperator';

describe('isValidOperator', () => {
	it.each([
		{ propertyType: PropertyType.String, operatorType: OperatorType.Equals, expected: true },
		{ propertyType: PropertyType.String, operatorType: OperatorType.GreaterThan, expected: false },
		{ propertyType: PropertyType.String, operatorType: OperatorType.LessThan, expected: false },
		{ propertyType: PropertyType.String, operatorType: OperatorType.HasAnyValue, expected: true },
		{ propertyType: PropertyType.String, operatorType: OperatorType.HasNoValue, expected: true },
		{ propertyType: PropertyType.String, operatorType: OperatorType.IsAnyOf, expected: true },
		{ propertyType: PropertyType.String, operatorType: OperatorType.Contains, expected: true },
		{ propertyType: PropertyType.Number, operatorType: OperatorType.Equals, expected: true },
		{ propertyType: PropertyType.Number, operatorType: OperatorType.GreaterThan, expected: true },
		{ propertyType: PropertyType.Number, operatorType: OperatorType.LessThan, expected: true },
		{ propertyType: PropertyType.Number, operatorType: OperatorType.HasAnyValue, expected: true },
		{ propertyType: PropertyType.Number, operatorType: OperatorType.HasNoValue, expected: true },
		{ propertyType: PropertyType.Number, operatorType: OperatorType.IsAnyOf, expected: true },
		{ propertyType: PropertyType.Number, operatorType: OperatorType.Contains, expected: false },
		{ propertyType: PropertyType.Enumerated, operatorType: OperatorType.Equals, expected: true },
		{ propertyType: PropertyType.Enumerated, operatorType: OperatorType.GreaterThan, expected: false },
		{ propertyType: PropertyType.Enumerated, operatorType: OperatorType.LessThan, expected: false },
		{ propertyType: PropertyType.Enumerated, operatorType: OperatorType.HasAnyValue, expected: true },
		{ propertyType: PropertyType.Enumerated, operatorType: OperatorType.HasNoValue, expected: true },
		{ propertyType: PropertyType.Enumerated, operatorType: OperatorType.IsAnyOf, expected: true },
		{ propertyType: PropertyType.Enumerated, operatorType: OperatorType.Contains, expected: false },
	])(
		'should return $expected for operator of type $operatorType for property of type $propertyType',
		({ propertyType, operatorType, expected }) => {
			expect(isValidOperator(propertyType, operatorType)).toBe(expected);
		}
	);
});
