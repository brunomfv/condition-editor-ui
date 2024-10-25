import { PropertyType, OperatorType } from '../types';

const operators: Record<PropertyType, OperatorType[]> = {
	[PropertyType.String]: [
		OperatorType.Equals,
		OperatorType.HasAnyValue,
		OperatorType.HasNoValue,
		OperatorType.IsAnyOf,
		OperatorType.Contains,
	],
	[PropertyType.Number]: [
		OperatorType.Equals,
		OperatorType.GreaterThan,
		OperatorType.LessThan,
		OperatorType.HasAnyValue,
		OperatorType.HasNoValue,
		OperatorType.IsAnyOf,
	],
	[PropertyType.Enumerated]: [
		OperatorType.Equals,
		OperatorType.HasAnyValue,
		OperatorType.HasNoValue,
		OperatorType.IsAnyOf,
	],
};

export const isValidOperator = (propertyType: PropertyType, operatorType: OperatorType) => {
	return operators[propertyType].includes(operatorType as OperatorType);
};
