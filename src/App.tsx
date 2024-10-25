import { useMemo, useState } from 'react';

import { Box, Container, Typography, Stack, MenuItem, Button, SelectChangeEvent } from '@mui/material';

import './App.css';

import './data/datastore';

import { FilterControl, ProductTable, SelectFormControl } from './components';

import { getOperators, getProducts, getProperties, getProperty } from './api';

import { OperatorType } from './types';

function App() {
	const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
	const [selectedOperatorId, setSelectedOperatorId] = useState<string>('');
	const [filter, setFilter] = useState<string>('');

	const properties = getProperties();

	const selectedProperty = useMemo(() => getProperty(selectedPropertyId), [selectedPropertyId]);

	const products = useMemo(
		() => getProducts(selectedOperatorId as OperatorType, selectedProperty, filter),
		[selectedProperty, selectedOperatorId, filter]
	);

	const operators = useMemo(() => getOperators(selectedProperty!.type), [selectedProperty]);

	const isFilterVisible = useMemo(() => {
		return (
			selectedProperty &&
			selectedOperatorId !== '' &&
			![OperatorType.HasAnyValue, OperatorType.HasNoValue].includes(selectedOperatorId as OperatorType)
		);
	}, [selectedOperatorId, selectedProperty]);

	const handlePropertyChange = (event: SelectChangeEvent<unknown>) => {
		setSelectedPropertyId(event.target.value as string);
		setSelectedOperatorId('');
		setFilter('');
	};

	const handleOperatorChange = (event: SelectChangeEvent<unknown>) => {
		setSelectedOperatorId(event.target.value as string);
		setFilter('');
	};

	const handleFilterChange = (value: string) => {
		setFilter(value);
	};

	const handleClearClick = () => {
		setSelectedPropertyId('');
		setSelectedOperatorId('');
		setFilter('');
	};

	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4 }}>
				<Typography variant="h1">Condition Editor UI</Typography>
				<Typography variant="h2" component="h3" sx={{ mb: 4 }}>
					by Bruno Vilaça
				</Typography>

				<Stack direction={{ xs: 'column', md: 'row' }} justifyContent="flex-start" gap={3} sx={{ mb: 2 }}>
					<SelectFormControl
						id="property-select"
						labelId="property-select-label"
						label="Property"
						placeholder="Select a Property"
						value={selectedPropertyId}
						onChange={handlePropertyChange}
						children={properties.map(property => (
							<MenuItem key={property.id} value={property.id}>
								{property.name}
							</MenuItem>
						))}
						data-testid="property-select"
					/>

					<SelectFormControl
						id="operator-select"
						labelId="property-select-label"
						label="Operator"
						placeholder="Select an Operator"
						value={selectedOperatorId}
						onChange={handleOperatorChange}
						children={operators.map(operator => (
							<MenuItem key={operator.id} value={operator.id}>
								{operator.text}
							</MenuItem>
						))}
						disabled={selectedPropertyId === ''}
						data-testid="operator-select"
					/>

					{isFilterVisible && (
						<FilterControl
							selectedOperatorId={selectedOperatorId}
							filter={filter}
							onFilterChange={handleFilterChange}
							selectedProperty={selectedProperty!}
							data-testid="filter-control"
						/>
					)}

					<Button
						variant="outlined"
						sx={{ flexGrow: { xs: 1, md: 0 }, marginLeft: { xs: 0, md: 'auto' } }}
						onClick={handleClearClick}
						disabled={selectedPropertyId === ''}
						data-testid="clear-button"
					>
						Clear
					</Button>
				</Stack>

				<ProductTable products={products} properties={properties} />
			</Box>
		</Container>
	);
}

export default App;
