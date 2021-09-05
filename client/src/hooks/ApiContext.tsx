import React, { createContext, useContext, useState, useCallback } from 'react';
import { ITodoItem } from '../utils/types';
import {
	getTodoList,
	addListItem,
	editListItem,
	deleteListItem,
} from '../utils/api';

export interface ApiContent {
	todoList: ITodoItem[];
	showDoneItems: boolean;
	liveSearchString: string;
	refreshList: () => void;
	addItem: (text: string) => void;
	deleteItem: (id: number) => void;
	editItem: (item: ITodoItem) => void;
	toggleShowDoneItems: () => void;
	searchTodoItems: (str: string) => void;
	setLiveSearchStringing: (str: string) => void;
}

const defaultTodoList = [] as ITodoItem[];

const ApiContext = createContext<ApiContent>({
	todoList: defaultTodoList,
	showDoneItems: false,
	liveSearchString: '',
	refreshList: () => {},
	addItem: (text: string) => {},
	deleteItem: (id: number) => {},
	editItem: (item: ITodoItem) => {},
	toggleShowDoneItems: () => {},
	searchTodoItems: (str: string) => {},
	setLiveSearchStringing: (str: string) => {},
});

interface ApiContextProviderProps {
	children: React.ReactNode;
}

export const ApiContextProvider = ({ children }: ApiContextProviderProps) => {
	const [todoList, setTodoList] = useState<ITodoItem[]>(defaultTodoList);
	const [showDoneItems, setShowDoneItems] = useState(true);
	const [liveSearchString, setLiveSearchStringing] = useState<string>('');

	const searchTodoItems = useCallback((search?: string) => {
		getTodoList(search).then((list) => setTodoList(list));
	}, []);

	const refreshList = () => {
		setShowDoneItems(true);
		setLiveSearchStringing('');
	};

	const addItem = (text: string) => {
		addListItem(text).then((list) => setTodoList(list));
	};

	const editItem = (item: ITodoItem) => {
		editListItem(item).then((list) => setTodoList(list));
	};

	const deleteItem = (id: number) => {
		const answer = window.confirm('Do you want to delete this item?');
		answer && deleteListItem(id).then((list) => setTodoList(list));
	};

	const toggleShowDoneItems = () => {
		setShowDoneItems((prevShowDoneItems) => !prevShowDoneItems);
	};

	return (
		<ApiContext.Provider
			value={{
				todoList,
				showDoneItems,
				liveSearchString,
				refreshList,
				addItem,
				editItem,
				deleteItem,
				toggleShowDoneItems,
				searchTodoItems,
				setLiveSearchStringing,
			}}
		>
			{children}
		</ApiContext.Provider>
	);
};

export const useApiContext = () => useContext(ApiContext);
