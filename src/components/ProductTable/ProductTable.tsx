import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';

import { Product, Property } from '../../types';

const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
	'& :first-of-type': {
		position: 'sticky',
		left: 0,
		zIndex: 2,
		backgroundColor: theme.palette.background.paper,
	},
}));

const StyledTableBodyRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
	'& :first-of-type': {
		position: 'sticky',
		left: 0,
		zIndex: 2,
		backgroundColor: theme.palette.background.paper,
	},
}));

interface IProductTableProps {
	products: Product[];
	properties: Property[];
}

export const ProductTable = ({ products, properties }: IProductTableProps) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<StyledTableHeaderRow>
						{properties.map((property, index) => (
							<TableCell key={`th-${property.id}`} align={index > 0 ? 'right' : 'left'}>
								{property.name}
							</TableCell>
						))}
					</StyledTableHeaderRow>
				</TableHead>

				<TableBody>
					{products.map(product => (
						<StyledTableBodyRow key={`tr-${product.id}`}>
							{properties.map((property, index) => (
								<TableCell key={`td-${product.id}-${property.id}`} align={index > 0 ? 'right' : 'left'}>
									{product.property_values.find(pv => pv.property_id === property.id)?.value}
								</TableCell>
							))}
						</StyledTableBodyRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
