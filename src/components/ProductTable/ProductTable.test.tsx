import { describe, it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Property, PropertyType } from '../../types';

import { ProductTable } from './ProductTable';

const products = [
	{
		id: 1,
		property_values: [
			{ property_id: 1, value: 'Value 1' },
			{ property_id: 2, value: 'Value 2' },
		],
	},
	{
		id: 2,
		property_values: [
			{ property_id: 1, value: 'Value 3' },
			{ property_id: 2, value: 'Value 4' },
		],
	},
];

const properties: Property[] = [
	{ id: 1, type: PropertyType.Enumerated, name: 'Property 1', values: [] },
	{ id: 2, type: PropertyType.String, name: 'Property 2' },
];

describe('ProductTable', () => {
	it('should render table correctly', () => {
		render(<ProductTable products={products} properties={properties} />);

		const tableHeaders = screen.getAllByRole('columnheader');

		expect(tableHeaders).toHaveLength(properties.length);
		expect(tableHeaders[0]).toHaveTextContent('Property 1');
		expect(tableHeaders[1]).toHaveTextContent('Property 2');

		const tableRows = screen.getAllByRole('row');

		expect(tableRows).toHaveLength(products.length + 1);

		expect(tableRows[1].querySelectorAll('td')[0]).toHaveTextContent('Value 1');
		expect(tableRows[1].querySelectorAll('td')[1]).toHaveTextContent('Value 2');
		expect(tableRows[2].querySelectorAll('td')[0]).toHaveTextContent('Value 3');
		expect(tableRows[2].querySelectorAll('td')[1]).toHaveTextContent('Value 4');
	});
});
