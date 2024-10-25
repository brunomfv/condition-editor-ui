import { createTheme, SimplePaletteColorOptions } from '@mui/material';
import { themePalette } from './palette';

const halloweenTheme = createTheme({
	palette: themePalette,
	typography: {
		fontFamily: '"Roboto", sans-serif',
		h1: {
			fontFamily: 'sans-serif',
			fontSize: '3rem',
			color: themePalette.text?.secondary,
			textShadow: '2px 2px 4px black',
		},
		h2: {
			fontFamily: 'sans-serif',
			fontSize: '2.5rem',
			color: (themePalette.secondary as SimplePaletteColorOptions)?.main,
		},
		body1: {
			fontFamily: '"Roboto", sans-serif',
			color: themePalette.text?.secondary,
		},
		body2: {
			fontFamily: '"Roboto", sans-serif',
			color: themePalette.text?.secondary,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					color: themePalette.text?.secondary,
					'&:hover': {
						backgroundColor: (themePalette.primary as SimplePaletteColorOptions)?.main,
						color: themePalette.text?.primary,
					},
					fontFamily: '"Roboto", sans-serif',
					textTransform: 'capitalize',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: themePalette.background?.paper,
					color: themePalette.text?.primary,
					textTransform: 'capitalize',
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					textTransform: 'capitalize',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					textTransform: 'capitalize',
				},
			},
		},
	},
});

export default halloweenTheme;
