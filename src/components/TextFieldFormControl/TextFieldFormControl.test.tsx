import { describe, it, expect, vitest } from 'vitest';

import { render, screen } from '@testing-library/react';

import { TextFieldFormControl } from './TextFieldFormControl';

describe('TextFieldFormControl', () => {
	const defaultProps = {
		label: 'Test Label',
		value: 'Test Value',
		onChange: vitest.fn(),
	};

	it('should render TextField with given props', () => {
		render(<TextFieldFormControl props={defaultProps} />);

		const textField = screen.getByLabelText('Test Label');

		expect(textField).toBeInTheDocument();
		expect(textField).toHaveValue('Test Value');
	});

	it('should show tooltip when showTooltip is true', () => {
		render(<TextFieldFormControl props={defaultProps} tooltip="this is a tooltip" showTooltip={true} />);

		const tooltip = screen.getByText('this is a tooltip');
		expect(tooltip).toBeInTheDocument();
	});

	it('should not show tooltip when showTooltip is false', () => {
		render(<TextFieldFormControl props={defaultProps} tooltip="this is a tooltip" showTooltip={false} />);

		const tooltip = screen.queryByText('this is a tooltip');
		expect(tooltip).not.toBeInTheDocument();
	});
});
