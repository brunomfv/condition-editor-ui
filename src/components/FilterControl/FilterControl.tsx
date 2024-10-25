import { MenuItem } from '@mui/material';

import { OperatorType, Property, PropertyType } from '../../types';

import { SelectFormControl } from '../SelectFormControl';

import { TextFieldFormControl } from '../TextFieldFormControl';

import { AutocompleteControl } from '../AutocompleteControl';

interface FilterControlProps {
	selectedOperatorId: string;
	filter: string;
	onFilterChange: (filter: string) => void;
	selectedProperty: Property;
}

export const FilterControl = ({ selectedOperatorId, filter, onFilterChange, selectedProperty }: FilterControlProps) => {
	const handleFilterChange = (value: string) => {
		onFilterChange(value);
	};

	const isEnumeratedType = selectedProperty.type === PropertyType.Enumerated;
	const isAnyOfOperator = selectedOperatorId === OperatorType.IsAnyOf;

	if (isEnumeratedType) {
		if (isAnyOfOperator) {
			return (
				<AutocompleteControl
					id="filter-multi-select"
					label="Filter"
					options={selectedProperty.values}
					onChange={handleFilterChange}
				/>
			);
		}

		return (
			<SelectFormControl
				id="filter-select"
				label="Filter"
				placeholder="Select a Filter"
				value={filter}
				onChange={e => handleFilterChange(e.target.value as string)}
				children={selectedProperty.values.map(value => (
					<MenuItem key={value} value={value}>
						{value}
					</MenuItem>
				))}
			/>
		);
	}

	return (
		<TextFieldFormControl
			props={{
				id: 'filter-select',
				label: 'Filter',
				placeholder: 'Enter a value',
				value: filter,
				onChange: e => handleFilterChange(e.target.value),
			}}
			tooltip="e.g.: 'Key, Cup'"
			showTooltip={!isEnumeratedType && isAnyOfOperator}
		/>
	);
};
