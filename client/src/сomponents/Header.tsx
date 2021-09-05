import React, { useEffect } from 'react';
import {
	ButtonProps,
	Checkbox,
	Flex,
	FlexProps,
	IconButton,
	Input,
} from '@chakra-ui/react';
import { useApiContext } from '../hooks/ApiContext';
import { AddIcon, RepeatIcon } from '@chakra-ui/icons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export const Header = () => {
	const {
		liveSearchString,
		setLiveSearchStringing,
		searchTodoItems,
		showDoneItems,
		toggleShowDoneItems,
		refreshList,
		addItem,
	} = useApiContext();

	const searchQueryString = useDebouncedValue(liveSearchString);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLiveSearchStringing(e.target.value);
	};

	useEffect(() => {
		searchTodoItems(searchQueryString);
	}, [searchQueryString, searchTodoItems]);

	return (
		<Flex {...headerStyles}>
			<IconButton
				aria-label="Add"
				icon={<AddIcon />}
				onClick={() => addItem('')}
				{...buttonEditStyles}
				title="Add new item"
			/>
			<Input
				placeholder="Live search..."
				mx="4"
				value={liveSearchString}
				onChange={handleSearch}
				w="400px"
			/>
			<Checkbox
				size="lg"
				mr="4"
				isChecked={showDoneItems}
				onChange={toggleShowDoneItems}
			>
				Show done items
			</Checkbox>
			<IconButton
				aria-label="Refresh"
				icon={<RepeatIcon />}
				onClick={refreshList}
				{...buttonEditStyles}
				title="Refresh list"
			/>
		</Flex>
	);
};

const headerStyles: FlexProps = {
	justify: 'center',
	align: 'center',
	p: '4',
	boxShadow: 'xl',
	border: '1px',
	borderColor: 'gray.300',
	mb: '8',
	position: 'sticky',
	top: '0',
	bg: 'gray.100',
	zIndex: 'sticky',
};

const buttonEditStyles: ButtonProps = {
	w: '10',
	h: '10',
	bg: 'gray.400',
	_hover: { bg: 'gray.500' },
	_active: { bg: 'gray.600' },
	color: 'white',
};
