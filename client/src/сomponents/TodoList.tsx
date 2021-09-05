import React from 'react';
import { Box } from '@chakra-ui/react';
import { useApiContext } from '../hooks/ApiContext';
import { TodoListItem } from './TodoListItem';

export const TodoList = () => {
	const { todoList, showDoneItems } = useApiContext();

	return (
		<Box maxW="1000px" mx='auto'>
			{todoList
				.filter((item) => !showDoneItems ? !item.isDone : true)
				.map((item) => (
					<TodoListItem key={item.id} item={item} />
				))}
		</Box>
	);
};
