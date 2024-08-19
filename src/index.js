import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/UserContext';
import axios from 'axios';
import '@shopify/polaris/build/esm/styles.css';


const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
};

(async () => {
    try {
        const users = await fetchData('https://jsonplaceholder.typicode.com/users');
        const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
        const albums = await fetchData('https://jsonplaceholder.typicode.com/albums');
        const photos = await fetchData('https://jsonplaceholder.typicode.com/photos');
        const todos = await fetchData('https://jsonplaceholder.typicode.com/todos');

        ReactDOM.createRoot(document.getElementById('root')).render(
                    <UserProvider initialData={{ users, posts, comments, albums, photos, todos }}>
                        <App />
                    </UserProvider>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

reportWebVitals();
