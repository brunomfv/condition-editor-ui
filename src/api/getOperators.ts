import { PropertyType } from '../types';

import { isValidOperator } from '../helpers';

export const getOperators = (propertyType: PropertyType) => {
	return window.datastore.getOperators().filter(operator => isValidOperator(propertyType, operator.id));
};
