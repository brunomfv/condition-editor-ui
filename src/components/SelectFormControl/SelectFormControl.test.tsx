import { describe, it, expect, vitest } from 'vitest';

import { fireEvent, getByRole, render, screen } from '@testing-library/react';

import { SelectProps } from '@mui/material';

import { SelectFormControl } from './SelectFormControl';

describe('SelectFormControl', () => {
	const defaultProps: SelectProps = {
		label: 'Test Label',
		value: '',
		children: [<div key="test">Option 1</div>],
		onChange: vitest.fn(),
	};

	it('should render SelectFormControl', () => {
		render(<SelectFormControl {...defaultProps} />);

		const selectFormControl = screen.getByTestId('select-form-control');

		expect(selectFormControl).toBeInTheDocument();
	});

	it('should render SelectFormControl with options', () => {
		const options = [
			{ key: 'option1', value: 'option1', label: 'Option 1' },
			{ key: 'option2', value: 'option2', label: 'Option 2' },
			{ key: 'option3', value: 'option3', label: 'Option 3' },
		];

		render(
			<SelectFormControl
				{...defaultProps}
				children={options.map(option => (
					<div key={option.key}>{option.label}</div>
				))}
			/>
		);

		const selectFormControl = screen.getByTestId('select-form-control');

		expect(selectFormControl).toBeInTheDocument();

        fireEvent.mouseDown(getByRole(selectFormControl, 'combobox'));

		options.forEach(option => {
			const optionElement = screen.getByText(option.label);

			expect(optionElement).toBeInTheDocument();
		});
	});
});
