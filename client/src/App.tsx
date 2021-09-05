import React from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './сomponents/Header';
import { TodoList } from './сomponents/TodoList';

export const App = () => (
	<Box>
		<Header />
		<TodoList />
	</Box>
);
