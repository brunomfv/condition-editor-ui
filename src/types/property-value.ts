import { Property } from './property';

export type PropertyValue = {
	property_id: Property['id'];
	value: string | number;
};
