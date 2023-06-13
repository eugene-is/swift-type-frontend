import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_APP_URL || 'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

instance.interceptors.response.use(
  (response) => {
    // Обработка успешного ответа
    return response;
  },
  (error) => {
    // Обработка ошибки
    if (error.response) {
      // Ошибка с ответом от сервера
      // console.log('Status:', error.response.status);
      // console.log('Data:', error.response.data);
			// console.log(error.response.data.message);
      // console.log('Headers:', error.response.headers);
    } else if (error.request) {
      // Ошибка без ответа от сервера
      // console.log('Request:', error.request);
    } else {
      // Другие ошибки
      // console.log('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;