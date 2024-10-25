import { render, screen } from '@testing-library/react';

import { describe, it, expect, vitest } from 'vitest';

import { FilterControl } from './FilterControl';

import { OperatorType, Property, PropertyType } from '../../types';

describe('FilterControl', () => {
	const filter = 'Value 1';
	const onFilterChange = vitest.fn();
	const selectedProperty: Property = {
		id: 0,
		type: PropertyType.Enumerated,
		name: 'Property 1',
		values: ['Value 1', 'Value 2', 'Value 3'],
	};

	it(`should render AutocompleteControl when selectedProperty is ${PropertyType.Enumerated} and selectedOperatorId is ${OperatorType.IsAnyOf}`, () => {
		render(
			<FilterControl
				selectedOperatorId={OperatorType.IsAnyOf}
				filter={filter}
				onFilterChange={onFilterChange}
				selectedProperty={selectedProperty}
			/>
		);

		const autocompleteControl = screen.getByTestId('autocomplete-control');

		expect(autocompleteControl).toBeInTheDocument();
	});

	it(`should render SelectFormControl when selectedProperty is ${PropertyType.Enumerated} and selectedOperatorId is not ${OperatorType.IsAnyOf}`, () => {
		render(
			<FilterControl
				selectedOperatorId={OperatorType.Equals}
				filter={filter}
				onFilterChange={onFilterChange}
				selectedProperty={selectedProperty}
			/>
		);

		const selectFormControl = screen.getByTestId('select-form-control');

		expect(selectFormControl).toBeInTheDocument();
	});

	it(`should render TextFieldFormControl when selectedProperty is not ${PropertyType.Enumerated}`, () => {
		render(
			<FilterControl
				selectedOperatorId={OperatorType.Equals}
				filter={filter}
				onFilterChange={onFilterChange}
				selectedProperty={{ ...selectedProperty, type: PropertyType.String }}
			/>
		);

		const textFieldFormControl = screen.getByTestId('text-field-form-control');

		expect(textFieldFormControl).toBeInTheDocument();
	});
});
