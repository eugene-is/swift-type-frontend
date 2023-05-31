import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/slices/theme.js';

export const useTheme = () => {
	const isDarkTheme = window?.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;
	const defaultTheme = isDarkTheme ? 'dark' : 'light';

	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTheme(localStorage.getItem('app-theme') || defaultTheme));
	}, [dispatch]);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('app-theme', theme);
	}, [theme]);

	const updateTheme = (newTheme) => {
		dispatch(setTheme(newTheme));
	};

	return { theme, updateTheme }; // Возвращаем исправленное имя функции
};
