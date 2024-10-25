import { OperatorType, Product, Property, PropertyType } from '../types';

type Operand = string | string[] | undefined;

const compare = (propType: PropertyType, operatorType: OperatorType, a: Operand, b: Operand) => {
	switch (propType) {
		case PropertyType.String:
			switch (operatorType) {
				case OperatorType.Equals:
					return a === b;
				case OperatorType.HasAnyValue:
					return (a as string).length > 0;
				case OperatorType.HasNoValue:
					return a === null || a === undefined || (a as string).length === 0;
				case OperatorType.IsAnyOf:
					return (b as string[]).includes(a as string);
				case OperatorType.Contains:
					return (a as string).toLowerCase().includes((b as string).toLowerCase());
			}
			break;
		case PropertyType.Number:
			switch (operatorType) {
				case OperatorType.Equals:
					return Number(a) === Number(b);
				case OperatorType.GreaterThan:
					return Number(a) > Number(b);
				case OperatorType.LessThan:
					return Number(a) < Number(b);
				case OperatorType.HasAnyValue:
					return !!a || Number(a) >= 0;
				case OperatorType.HasNoValue:
					return a === null || a === undefined;
				case OperatorType.IsAnyOf:
					b = (b as string).split(',').map(value => value.trim().toLowerCase());
					return !!b && !!a && Array.isArray(b) && b.includes(a as string);
			}
			break;
		case PropertyType.Enumerated:
			switch (operatorType) {
				case OperatorType.Equals:
					return !!a && a.includes((b as string).toLowerCase());
				case OperatorType.HasAnyValue:
					return a && a.length > 0;
				case OperatorType.HasNoValue:
					return a === null || a === undefined || a.length === 0;
				case OperatorType.IsAnyOf:
					b = (b as string).split(',').map(value => value.trim().toLowerCase());
					return !!a && Array.isArray(b) && b.some(value => a.includes(value));
			}
			break;
	}

	return () => true;
};

const getProductFilter = (property: Property, operatorId: OperatorType, value?: string | string[]) => {
	return (product: Product) =>
		product.property_values.find(propertyValue => {
			const compareTo: Operand = String(propertyValue.value);

			return propertyValue.property_id === property.id && compare(property.type, operatorId, compareTo, value);
		});
};

export const getProducts = (operatorId: OperatorType, property?: Property, value?: string | string[]) => {
	if (!!property && operatorId.length > 0) {
		const productFilter = getProductFilter(property, operatorId, value);

		return window.datastore.getProducts().filter(product => productFilter(product));
	}

	return window.datastore.getProducts();
};
