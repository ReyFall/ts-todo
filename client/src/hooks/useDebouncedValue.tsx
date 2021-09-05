import { useState, useEffect } from 'react';

export const useDebouncedValue = <T,>(input: T, time = 300) => {
	const [debouncedValue, setDebouncedValue] = useState(input);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(input);
		}, time);

		return () => {
			clearTimeout(timeout);
		};
	}, [input, time]);

	return debouncedValue;
};
