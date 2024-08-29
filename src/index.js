import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/UserContext';
import axios from 'axios';
import '@shopify/polaris/build/esm/styles.css';
import { BrowserRouter } from 'react-router-dom';

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
};

(async () => {
    try {
        const [users, posts, comments, albums, photos, todos] = await Promise.all([
            fetchData('https://jsonplaceholder.typicode.com/users'),
            fetchData('https://jsonplaceholder.typicode.com/posts'),
            fetchData('https://jsonplaceholder.typicode.com/comments'),
            fetchData('https://jsonplaceholder.typicode.com/albums'),
            fetchData('https://jsonplaceholder.typicode.com/photos'),
            fetchData('https://jsonplaceholder.typicode.com/todos'),
        ]);

        // Hợp nhất dữ liệu liên quan vào user object
        const usersWithDetails = users.map(user => ({
            ...user,
            posts: posts.filter(post => post.userId === user.id),
            albums: albums.filter(album => album.userId === user.id),
            todos: todos.filter(todo => todo.userId === user.id),
        }));

        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <BrowserRouter>
                    <UserProvider initialData={{ users: usersWithDetails, posts, comments, albums, photos, todos }}>
                        <App />
                    </UserProvider>
                </BrowserRouter>
            </React.StrictMode>
        );
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
})();

reportWebVitals();
