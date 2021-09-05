import React from 'react';
import {
	Editable,
	EditablePreview,
	EditableInput,
	ChakraProps,
} from '@chakra-ui/react';
import { useApiContext } from '../hooks/ApiContext';
import { ITodoItem } from '../utils/types';
import { EditableControls } from './EditableItemControls';

export interface TodoListItemProps {
	item: ITodoItem;
}

export const TodoListItem = ({ item }: TodoListItemProps) => {
	const { editItem } = useApiContext();

	const handleEditClick = (text: string) => {
		editItem({
			...item,
			text,
		});
	};

	return (
		<Editable
			{...todoItemStyles}
			defaultValue={item.text}
			fontSize="md"
			isPreviewFocusable={false}
			startWithEditView={!item.text}
			onSubmit={(newText) => handleEditClick(newText)}
            bg={item.isDone ? 'green.50' : 'white'}
		>
			<EditablePreview />
			<EditableInput autoFocus />
			<EditableControls item={item} />
		</Editable>
	);
};

const todoItemStyles: ChakraProps = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	py: '2',
	px: '4',
	m: '2',
	boxShadow: 'md',
	border: '1px',
	borderColor: 'gray.300',
	borderRadius: 'xl',
};
