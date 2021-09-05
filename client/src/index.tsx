import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './App';
import { theme } from './theme';
import { ApiContextProvider } from './hooks/ApiContext';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ApiContextProvider>
				<App />
			</ApiContextProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
