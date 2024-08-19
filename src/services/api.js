import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
    return await axios.get(`${API_URL}/users`);
};

export const fetchUserDetails = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}`);
};

export const fetchUserPosts = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/posts`);
};

export const fetchUserAlbums = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/albums`);
};

export const fetchUserTodos = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/todos`);
};

