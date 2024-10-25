import { SyntheticEvent } from 'react';

import { Autocomplete, Checkbox, TextField } from '@mui/material';

import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';

interface AutocompleteControlProps {
	id: string;
	label: string;
	options: string[];
	onChange: (value: string) => void;
}

export const AutocompleteControl = ({ id, label, options, onChange }: AutocompleteControlProps) => {
	const icon = <CheckBoxOutlineBlank fontSize="small" />;
	const checkedIcon = <CheckBox fontSize="small" />;

	const handleAutocompleteChange = (_event: SyntheticEvent<Element, Event>, value: string[]) => {
		onChange(value.join(', '));
	};

	return (
		<Autocomplete
			multiple
			id={id}
			data-testid="autocomplete-control"
			options={options}
			disableCloseOnSelect
			getOptionLabel={option => option}
			renderOption={(props, option, { selected }) => {
				const { key, ...optionProps } = props;
				return (
					<li key={key} {...optionProps}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
						{option}
					</li>
				);
			}}
			style={{ flexGrow: 1 }}
			renderInput={params => <TextField {...params} label={label} />}
			onChange={handleAutocompleteChange}
		/>
	);
};
