import { describe, it, expect, vitest } from 'vitest';

import { render, screen, fireEvent, within, getByRole } from '@testing-library/react';

import { Product, Property, PropertyType } from './types';

import App from './App';

describe('App', () => {
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

	it('renders the title', () => {
		render(<App />);

		const titleElement = screen.getByText('Condition Editor UI');

		expect(titleElement).toBeInTheDocument();
	});

	it('renders the property select', () => {
		render(<App />);

		const propertySelect = screen.getByTestId('property-select');

		expect(propertySelect).toBeInTheDocument();
	});

	it('renders the operator select', () => {
		render(<App />);

		const operatorSelect = screen.getByTestId('operator-select');

		expect(operatorSelect).toBeInTheDocument();
	});

	it('renders the product table', () => {
		render(<App />);

		const productTable = screen.getByRole('table');

		expect(productTable).toBeInTheDocument();
	});

	it('enables the operator select after a property is selected', () => {
		render(<App />);

		const propertySelect = screen.getByTestId('property-select');

		fireEvent.mouseDown(getByRole(propertySelect, 'combobox'));

		const listbox = within(screen.getByRole('listbox'));

		fireEvent.click(listbox.getByText(/name/i));

		const operatorSelect = screen.getByTestId('operator-select');

		expect(operatorSelect).toBeInTheDocument();

		expect(operatorSelect).toBeEnabled();
	});

	it('renders the filter control after a property and an operator are selected', () => {
		render(<App />);

		const propertySelect = screen.getByTestId('property-select');

		fireEvent.mouseDown(getByRole(propertySelect, 'combobox'));

		let listbox = within(screen.getByRole('listbox'));

		fireEvent.click(listbox.getByText(/name/i));

		const operatorSelect = screen.getByTestId('operator-select');

		fireEvent.mouseDown(getByRole(operatorSelect, 'combobox'));

		listbox = within(screen.getByRole('listbox'));

		fireEvent.click(listbox.getByText(/equals/i));

		const filterControl = screen.getByLabelText('Filter');

		expect(filterControl).toBeInTheDocument();
	});

	it('renders the clear button when a property is selected', () => {
		render(<App />);

		const propertySelect = screen.getByTestId('property-select');

		fireEvent.mouseDown(getByRole(propertySelect, 'combobox'));

		const listbox = within(screen.getByRole('listbox'));

		fireEvent.click(listbox.getByText(/name/i));

		const clearButton = screen.getByRole('button', { name: 'Clear' });

		expect(clearButton).toBeInTheDocument();
	});

	it('should hide the filter control when the clear button is clicked', () => {
        render(<App />);

		const propertySelect = screen.getByTestId('property-select');

		fireEvent.mouseDown(getByRole(propertySelect, 'combobox'));

		let listbox = within(screen.getByRole('listbox'));
        
		fireEvent.click(listbox.getByText(/name/i));
        
		const operatorSelect = screen.getByTestId('operator-select');

		fireEvent.mouseDown(getByRole(operatorSelect, 'combobox'));

		listbox = within(screen.getByRole('listbox'));

		fireEvent.click(listbox.getByText(/equals/i));

		const filterControl = screen.getByLabelText('Filter');

        expect(filterControl).toBeInTheDocument();

		const clearButton = screen.getByRole('button', { name: 'Clear' });

        fireEvent.click(clearButton);

        expect(filterControl).not.toBeInTheDocument();
    });
});
