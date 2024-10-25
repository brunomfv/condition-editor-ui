import { FormControl, TextField, TextFieldProps, Tooltip } from '@mui/material';

interface TextFieldFormControlProps {
	props: TextFieldProps;
	tooltip?: string;
	showTooltip?: boolean;
}

export const TextFieldFormControl = ({ props, tooltip, showTooltip }: TextFieldFormControlProps) => {
	return (
		<FormControl sx={{ minWidth: 120 }} data-testid="text-field-form-control">
			<Tooltip title={tooltip} open={showTooltip} placement="right">
				<TextField {...props} />
			</Tooltip>
		</FormControl>
	);
};
