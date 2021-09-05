import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../config';
import { ITodoItem } from './types';

(() => {
	axios.defaults.baseURL = baseUrl;
	axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
})();

const parseResponse = ({ data, status }: AxiosResponse) => {
	if (status === 200 && Array.isArray(data)) return data as ITodoItem[];

	return [];
};

export const getTodoList = async (search?: string) =>
	parseResponse(
		await axios.get(`/getList${search ? `?search=${search}` : ''}`)
	);

export const addListItem = async (text: string) =>
	parseResponse(await axios.post('/addItem', { text }));

export const editListItem = async (body: ITodoItem) =>
	parseResponse(await axios.post('/editItem', body));

export const deleteListItem = async (id: number) =>
	parseResponse(await axios.post('/deleteItem', { id }));
