import { describe, it, expect, vitest, beforeEach } from 'vitest';

import { render, screen, fireEvent, getByRole } from '@testing-library/react';

import { AutocompleteControl } from './AutocompleteControl';

describe('AutocompleteControl', () => {
	const options = ['Option 1', 'Option 2', 'Option 3'];
	const onChange = vitest.fn();

	beforeEach(() => {
		render(<AutocompleteControl id="test-id" label="Test Label" options={options} onChange={onChange} />);
	});

	it('should render Autocomplete', () => {
		const autocomplete = screen.getByTestId('autocomplete-control');

		expect(autocomplete).toBeInTheDocument();
	});

	it('should call onChange with selected values in correct format', () => {
		const autocomplete = screen.getByTestId('autocomplete-control');

		fireEvent.mouseDown(getByRole(autocomplete, 'combobox'));

		autocomplete.focus();

		const option1 = screen.getByText('Option 1');
		const option2 = screen.getByText('Option 2');
		const option3 = screen.getByText('Option 3');

		fireEvent.click(option1);
		fireEvent.click(option2);
		fireEvent.click(option3);

		expect(onChange).toHaveBeenCalledWith('Option 1, Option 2, Option 3');
	});
});
