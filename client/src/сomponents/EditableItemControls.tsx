import React from 'react';
import {
	Flex,
	ButtonProps,
	useEditableControls,
	ButtonGroup,
	IconButton,
} from '@chakra-ui/react';
import {
	CheckIcon,
	CloseIcon,
	DeleteIcon,
	EditIcon,
} from '@chakra-ui/icons';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useApiContext } from '../hooks/ApiContext';
import { TodoListItemProps } from './TodoListItem';

export const EditableControls = ({ item }: TodoListItemProps) => {
	const { editItem, deleteItem } = useApiContext();

	const {
		isEditing,
		getSubmitButtonProps,
		getCancelButtonProps,
		getEditButtonProps,
	} = useEditableControls();

	const handleToggleDoneClick = () => {
		editItem({
			...item,
			isDone: !item.isDone,
		});
	};

	const handleDeleteClick = () => {
		deleteItem(item.id);
	};

	const toggleStyle = item.isDone ? buttonUndoneStyles : buttonDoneStyles;

	return isEditing ? (
		<ButtonGroup justifyContent="center" size="sm">
			<IconButton
				aria-label="Save"
				icon={<CheckIcon />}
				{...getSubmitButtonProps()}
				{...buttonDoneStyles}
				ml="4"
			/>
			<IconButton
				aria-label="Close"
				icon={<CloseIcon />}
				{...getCancelButtonProps()}
				{...buttonDeleteStyles}
			/>
		</ButtonGroup>
	) : (
		<Flex justifyContent="center">
			<IconButton
				{...toggleStyle}
				mr="2"
				aria-label="Done"
				icon={item.isDone ? <RiArrowGoBackFill /> : <CheckIcon />}
				onClick={handleToggleDoneClick}
			/>
			<IconButton
				{...buttonEditStyles}
				mr="2"
				aria-label="Edit"
				icon={<EditIcon />}
				{...getEditButtonProps()}
			/>
			<IconButton
				{...buttonDeleteStyles}
				aria-label="Delete"
				icon={<DeleteIcon />}
				onClick={handleDeleteClick}
			/>
		</Flex>
	);
};

const buttonEditStyles: ButtonProps = {
	w: '10',
	h: '10',
	bg: 'blue.400',
	_hover: { bg: 'blue.500' },
	_active: { bg: 'blue.600' },
	color: 'white',
};

const buttonDoneStyles: ButtonProps = {
	...buttonEditStyles,
	bg: 'green.400',
	_hover: { bg: 'green.500' },
	_active: { bg: 'green.600' },
};

const buttonUndoneStyles: ButtonProps = {
	...buttonEditStyles,
	bg: 'orange.400',
	_hover: { bg: 'orange.500' },
	_active: { bg: 'orange.600' },
};

const buttonDeleteStyles: ButtonProps = {
	...buttonEditStyles,
	ml: '0',
	bg: 'red.400',
	_hover: { bg: 'red.500' },
	_active: { bg: 'red.600' },
};
