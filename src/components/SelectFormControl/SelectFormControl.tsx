import { FormControl, InputLabel, Select, SelectProps } from '@mui/material';

export const SelectFormControl = (props: SelectProps) => {
	return (
		<FormControl sx={{ minWidth: 120 }} data-testid="select-form-control">
			<InputLabel id={props.labelId}>{props.label}</InputLabel>
			<Select {...props} />
		</FormControl>
	);
};
